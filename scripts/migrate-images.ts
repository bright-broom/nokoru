/**
 * 画像をSupabase Storageに移行するスクリプト
 *
 * 使用方法:
 * npx tsx scripts/migrate-images.ts
 *
 * 注意: 実行前にSupabaseダッシュボードで以下を設定してください:
 * 1. Storage > New bucket > 'media' を作成
 * 2. Policies > New policy > 'Enable read access for all users' を選択
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// 環境変数を直接読み込み
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ 環境変数が設定されていません');
  console.error('NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const BUCKET_NAME = 'media';
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images');

interface UploadResult {
  localPath: string;
  storagePath: string;
  publicUrl: string;
  success: boolean;
  error?: string;
}

async function ensureBucketExists(): Promise<boolean> {
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
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'video/mp4', 'video/webm'],
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

async function uploadFile(localPath: string, storagePath: string): Promise<UploadResult> {
  const result: UploadResult = {
    localPath,
    storagePath,
    publicUrl: '',
    success: false,
  };

  try {
    const fileBuffer = fs.readFileSync(localPath);
    const ext = path.extname(localPath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.avif': 'image/avif',
      '.mp4': 'video/mp4',
      '.webm': 'video/webm',
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      result.error = error.message;
      return result;
    }

    const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

    result.publicUrl = urlData.publicUrl;
    result.success = true;
    return result;
  } catch (err) {
    result.error = err instanceof Error ? err.message : 'Unknown error';
    return result;
  }
}

async function migrateDirectory(subDir: string): Promise<UploadResult[]> {
  const results: UploadResult[] = [];
  const dirPath = path.join(PUBLIC_DIR, subDir);

  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️ ディレクトリが存在しません: ${dirPath}`);
    return results;
  }

  const files = fs.readdirSync(dirPath).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.mp4', '.webm'].includes(ext);
  });

  console.log(`\n📁 ${subDir}/ (${files.length} ファイル)`);

  for (const file of files) {
    const localPath = path.join(dirPath, file);
    const storagePath = `${subDir}/${file}`;

    process.stdout.write(`  ⏳ ${file}...`);
    const result = await uploadFile(localPath, storagePath);
    results.push(result);

    if (result.success) {
      console.log(` ✅`);
    } else {
      console.log(` ❌ ${result.error}`);
    }
  }

  return results;
}

async function main() {
  console.log('🚀 Supabase Storage への画像移行を開始します\n');
  console.log(`📍 Supabase URL: ${SUPABASE_URL}`);
  console.log(`📍 バケット名: ${BUCKET_NAME}`);
  console.log(`📍 ソース: ${PUBLIC_DIR}\n`);

  // バケットの確認・作成
  const bucketReady = await ensureBucketExists();
  if (!bucketReady) {
    process.exit(1);
  }

  // ディレクトリごとに移行
  const allResults: UploadResult[] = [];
  const directories = ['works', 'staff'];

  for (const dir of directories) {
    const results = await migrateDirectory(dir);
    allResults.push(...results);
  }

  // 結果サマリー
  const successful = allResults.filter((r) => r.success);
  const failed = allResults.filter((r) => !r.success);

  console.log('\n' + '='.repeat(60));
  console.log('📊 移行結果サマリー');
  console.log('='.repeat(60));
  console.log(`✅ 成功: ${successful.length} ファイル`);
  console.log(`❌ 失敗: ${failed.length} ファイル`);

  if (failed.length > 0) {
    console.log('\n失敗したファイル:');
    failed.forEach((r) => {
      console.log(`  - ${r.localPath}: ${r.error}`);
    });
  }

  if (successful.length > 0) {
    console.log('\n📝 新しい画像URL一覧:');
    console.log('-'.repeat(60));
    successful.forEach((r) => {
      console.log(`${r.storagePath}:`);
      console.log(`  ${r.publicUrl}`);
    });
  }

  // config更新用のマッピングを出力
  if (successful.length > 0) {
    console.log('\n📋 site.ts 更新用のマッピング:');
    console.log('-'.repeat(60));
    console.log('// Works');
    successful
      .filter((r) => r.storagePath.startsWith('works/'))
      .forEach((r) => {
        const filename = path.basename(r.storagePath, path.extname(r.storagePath));
        const varName = filename.replace(/-/g, '_').toUpperCase();
        console.log(`// ${varName}: '${r.publicUrl}'`);
      });

    console.log('\n// Staff');
    successful
      .filter((r) => r.storagePath.startsWith('staff/'))
      .forEach((r) => {
        const filename = path.basename(r.storagePath, path.extname(r.storagePath));
        const varName = filename.replace(/-/g, '_').toUpperCase();
        console.log(`// ${varName}: '${r.publicUrl}'`);
      });
  }

  console.log('\n✨ 移行完了!');
}

main().catch(console.error);
