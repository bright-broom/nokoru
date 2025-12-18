/**
 * 環境変数の型安全なアクセスと起動時バリデーション
 *
 * このモジュールを使用することで:
 * - 環境変数の欠落を起動時に検出
 * - 型安全なアクセスを提供
 * - ハードコードされたURLを排除
 */

import { text } from '@/config/text';

// サーバーサイド専用環境変数
interface ServerEnv {
  SUPABASE_SERVICE_ROLE_KEY: string;
  ADMIN_TOKEN?: string;
}

// クライアント・サーバー共通環境変数
interface PublicEnv {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
}

// バリデーション済み環境変数のキャッシュ
let serverEnvCache: ServerEnv | null = null;
let publicEnvCache: PublicEnv | null = null;

/**
 * 必須環境変数が設定されているか検証
 */
function validateRequired(key: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(
      `環境変数 ${key} が設定されていません。.env.local ファイルを確認してください。`
    );
  }
  return value;
}

/**
 * 公開環境変数を取得（クライアント・サーバー両方で使用可能）
 */
export function getPublicEnv(): PublicEnv {
  if (publicEnvCache) return publicEnvCache;

  publicEnvCache = {
    NEXT_PUBLIC_SUPABASE_URL: validateRequired(
      'NEXT_PUBLIC_SUPABASE_URL',
      process.env.NEXT_PUBLIC_SUPABASE_URL
    ),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: validateRequired(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
  };

  return publicEnvCache;
}

/**
 * サーバーサイド専用環境変数を取得
 * クライアントサイドで呼び出すとエラー
 */
export function getServerEnv(): ServerEnv {
  if (typeof window !== 'undefined') {
    throw new Error(text.errors.serverEnvOnly);
  }

  if (serverEnvCache) return serverEnvCache;

  serverEnvCache = {
    SUPABASE_SERVICE_ROLE_KEY: validateRequired(
      'SUPABASE_SERVICE_ROLE_KEY',
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ),
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,
  };

  return serverEnvCache;
}

/**
 * Supabase URLを取得（preconnect等で使用）
 */
export function getSupabaseUrl(): string {
  return getPublicEnv().NEXT_PUBLIC_SUPABASE_URL;
}

/**
 * 開発環境かどうかを判定
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * 本番環境かどうかを判定
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
