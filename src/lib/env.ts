/**
 * 環境変数の型安全なアクセスと起動時バリデーション
 */

import { text } from '@/config';

interface ServerEnv {
  SUPABASE_SERVICE_ROLE_KEY: string;
  ADMIN_TOKEN?: string;
}

interface PublicEnv {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
}

let serverEnvCache: ServerEnv | null = null;
let publicEnvCache: PublicEnv | null = null;

function validateRequired(key: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(
      `環境変数 ${key} が設定されていません。.env.local ファイルを確認してください。`
    );
  }
  return value;
}

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

export function getSupabaseUrl(): string {
  return getPublicEnv().NEXT_PUBLIC_SUPABASE_URL;
}
