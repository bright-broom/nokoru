/**
 * 画像をSupabase Storageに移行するスクリプト（最適化版）
 *
 * 使用方法:
 *   npx tsx scripts/migrate-images.ts [options]
 *
 * オプション:
 *   --dry-run    実際にはアップロードせず、対象ファイルを確認
 *   --skip-existing  既存ファイルをスキップ
 *   --concurrency=N  同時アップロード数（デフォルト: 5）
 *   --dir=NAME   特定のディレクトリのみ移行（works, staff, videos）
 *
 * 例:
 *   npx tsx scripts/migrate-images.ts --dry-run
 *   npx tsx scripts/migrate-images.ts --skip-existing --concurrency=3
 *   npx tsx scripts/migrate-images.ts --dir=works
 *
 * 注意: 実行前にSupabaseダッシュボードで以下を設定してください:
 * 1. Storage > New bucket > 'media' を作成
 * 2. Policies > New policy > 'Enable read access for all users' を選択
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// ============================================================
// 型定義
// ============================================================

interface UploadResult {
  localPath: string;
  storagePath: string;
  publicUrl: string;
  success: boolean;
  skipped: boolean;
  fileSize: number;
  error?: string;
}

interface MigrationOptions {
  dryRun: boolean;
  skipExisting: boolean;
  concurrency: number;
  targetDir?: string;
}

interface FileInfo {
  localPath: string;
  storagePath: string;
  fileSize: number;
}

// ============================================================
// 定数
// ============================================================

const BUCKET_NAME = 'media';
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images');
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.mp4', '.webm'];
const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};
const DEFAULT_DIRECTORIES = ['works', 'staff', 'videos'];

// ============================================================
// ユーティリティ
// ============================================================

function parseArgs(): MigrationOptions {
  const args = process.argv.slice(2);
  const options: MigrationOptions = {
    dryRun: false,
    skipExisting: false,
    concurrency: 5,
    targetDir: undefined,
  };

  for (const arg of args) {
    if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--skip-existing') {
      options.skipExisting = true;
    } else if (arg.startsWith('--concurrency=')) {
      const value = parseInt(arg.split('=')[1], 10);
      if (!isNaN(value) && value > 0) {
        options.concurrency = value;
      }
    } else if (arg.startsWith('--dir=')) {
      options.targetDir = arg.split('=')[1];
    }
  }

  return options;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}秒`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}分${remainingSeconds}秒`;
}

// ============================================================
// 並列実行ユーティリティ
// ============================================================

async function parallelLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  let currentIndex = 0;

  async function worker(): Promise<void> {
    while (currentIndex < items.length) {
      const index = currentIndex++;
      const item = items[index];
      results[index] = await fn(item, index);
    }
  }

  const workers = Array(Math.min(limit, items.length))
    .fill(null)
    .map(() => worker());

  await Promise.all(workers);
  return results;
}

// ============================================================
// Supabase操作
// ============================================================

function createSupabaseClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error('❌ 環境変数が設定されていません');
    console.error('NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください');
    process.exit(1);
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function ensureBucketExists(supabase: SupabaseClient): Promise<boolean> {
  const { data: buckets, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error('❌ バケット一覧の取得に失敗:', error.message);
    return false;
  }

  const bucketExists = buckets?.some((b) => b.name === BUCKET_NAME);

  if (!bucketExists) {
    console.log(`📦 バケット '${BUCKET_NAME}' を作成中...`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 52428800, // 50MB
      allowedMimeTypes: Object.values(MIME_TYPES),
    });

    if (createError) {
      console.error('❌ バケットの作成に失敗:', createError.message);
      return false;
    }
    console.log(`✅ バケット '${BUCKET_NAME}' を作成しました`);
  } else {
    console.log(`✅ バケット '${BUCKET_NAME}' は既に存在します`);
  }

  return true;
}

async function getExistingFiles(supabase: SupabaseClient, dir: string): Promise<Set<string>> {
  const existing = new Set<string>();

  const { data, error } = await supabase.storage.from(BUCKET_NAME).list(dir);

  if (!error && data) {
    for (const file of data) {
      if (file.name) {
        existing.add(`${dir}/${file.name}`);
      }
    }
  }

  return existing;
}

async function uploadFile(
  supabase: SupabaseClient,
  file: FileInfo,
  options: MigrationOptions,
  existingFiles: Set<string>
): Promise<UploadResult> {
  const result: UploadResult = {
    localPath: file.localPath,
    storagePath: file.storagePath,
    publicUrl: '',
    success: false,
    skipped: false,
    fileSize: file.fileSize,
  };

  // 既存ファイルスキップチェック
  if (options.skipExisting && existingFiles.has(file.storagePath)) {
    result.skipped = true;
    result.success = true;
    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file.storagePath);
    result.publicUrl = data.publicUrl;
    return result;
  }

  // ドライランモード
  if (options.dryRun) {
    result.success = true;
    result.publicUrl = `[DRY-RUN] ${file.storagePath}`;
    return result;
  }

  try {
    const fileBuffer = fs.readFileSync(file.localPath);
    const ext = path.extname(file.localPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const { error } = await supabase.storage.from(BUCKET_NAME).upload(file.storagePath, fileBuffer, {
      contentType,
      upsert: true,
    });

    if (error) {
      result.error = error.message;
      return result;
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file.storagePath);
    result.publicUrl = data.publicUrl;
    result.success = true;
    return result;
  } catch (err) {
    result.error = err instanceof Error ? err.message : 'Unknown error';
    return result;
  }
}

// ============================================================
// ファイル収集
// ============================================================

function collectFiles(directories: string[]): FileInfo[] {
  const files: FileInfo[] = [];

  for (const dir of directories) {
    const dirPath = path.join(PUBLIC_DIR, dir);

    if (!fs.existsSync(dirPath)) {
      continue;
    }

    const dirFiles = fs.readdirSync(dirPath).filter((f) => {
      const ext = path.extname(f).toLowerCase();
      return SUPPORTED_EXTENSIONS.includes(ext);
    });

    for (const file of dirFiles) {
      const localPath = path.join(dirPath, file);
      const stats = fs.statSync(localPath);

      files.push({
        localPath,
        storagePath: `${dir}/${file}`,
        fileSize: stats.size,
      });
    }
  }

  return files;
}

// ============================================================
// メイン処理
// ============================================================

async function main() {
  const startTime = Date.now();
  const options = parseArgs();
  const supabase = createSupabaseClient();

  // ヘッダー表示
  console.log('═'.repeat(60));
  console.log('🚀 Supabase Storage マイグレーション');
  console.log('═'.repeat(60));
  console.log(`📍 Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
  console.log(`📍 バケット名: ${BUCKET_NAME}`);
  console.log(`📍 ソース: ${PUBLIC_DIR}`);
  console.log('');
  console.log('📋 オプション:');
  console.log(`   ドライラン: ${options.dryRun ? 'はい' : 'いいえ'}`);
  console.log(`   既存スキップ: ${options.skipExisting ? 'はい' : 'いいえ'}`);
  console.log(`   同時実行数: ${options.concurrency}`);
  if (options.targetDir) {
    console.log(`   対象ディレクトリ: ${options.targetDir}`);
  }
  console.log('');

  // バケット確認
  if (!options.dryRun) {
    const bucketReady = await ensureBucketExists(supabase);
    if (!bucketReady) {
      process.exit(1);
    }
  }

  // 対象ディレクトリ決定
  const directories = options.targetDir ? [options.targetDir] : DEFAULT_DIRECTORIES;

  // ファイル収集
  const files = collectFiles(directories);

  if (files.length === 0) {
    console.log('⚠️ 移行対象のファイルがありません');
    return;
  }

  const totalSize = files.reduce((sum, f) => sum + f.fileSize, 0);
  console.log(`📊 対象ファイル: ${files.length}件 (合計 ${formatBytes(totalSize)})`);
  console.log('');

  // 既存ファイル取得（スキップオプション有効時）
  const existingFiles = new Set<string>();
  if (options.skipExisting && !options.dryRun) {
    console.log('🔍 既存ファイルを確認中...');
    for (const dir of directories) {
      const existing = await getExistingFiles(supabase, dir);
      existing.forEach((f) => existingFiles.add(f));
    }
    console.log(`   ${existingFiles.size}件の既存ファイルを検出`);
    console.log('');
  }

  // アップロード進捗表示
  let completed = 0;
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  console.log('📤 アップロード中...');
  console.log('─'.repeat(60));

  const results = await parallelLimit(files, options.concurrency, async (file, index) => {
    const result = await uploadFile(supabase, file, options, existingFiles);
    completed++;

    const status = result.skipped ? '⏭️' : result.success ? '✅' : '❌';
    const sizeStr = formatBytes(file.fileSize).padStart(8);
    const progress = `[${completed}/${files.length}]`.padStart(10);

    console.log(`${progress} ${status} ${sizeStr}  ${file.storagePath}`);

    if (result.skipped) {
      skipped++;
    } else if (result.success) {
      uploaded++;
    } else {
      failed++;
    }

    return result;
  });

  // 結果サマリー
  const duration = Date.now() - startTime;
  const uploadedSize = results
    .filter((r) => r.success && !r.skipped)
    .reduce((sum, r) => sum + r.fileSize, 0);

  console.log('');
  console.log('═'.repeat(60));
  console.log('📊 移行結果サマリー');
  console.log('═'.repeat(60));
  console.log(`✅ アップロード: ${uploaded}件 (${formatBytes(uploadedSize)})`);
  console.log(`⏭️ スキップ: ${skipped}件`);
  console.log(`❌ 失敗: ${failed}件`);
  console.log(`⏱️ 実行時間: ${formatDuration(duration)}`);

  if (failed > 0) {
    console.log('');
    console.log('❌ 失敗したファイル:');
    results
      .filter((r) => !r.success && !r.skipped)
      .forEach((r) => {
        console.log(`   ${r.storagePath}: ${r.error}`);
      });
  }

  // URL一覧出力
  const successfulUploads = results.filter((r) => r.success && !r.skipped && !options.dryRun);
  if (successfulUploads.length > 0) {
    console.log('');
    console.log('📝 アップロードされたファイルのURL:');
    console.log('─'.repeat(60));
    successfulUploads.forEach((r) => {
      console.log(`${r.storagePath}`);
      console.log(`  → ${r.publicUrl}`);
    });
  }

  console.log('');
  console.log('✨ 完了!');
}

main().catch(console.error);
