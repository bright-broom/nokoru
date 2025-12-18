import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { getPublicEnv, getServerEnv } from './env';

let browserClient: SupabaseClient<Database> | null = null;

/**
 * ブラウザ用Supabaseクライアント（シングルトン）
 * @throws ブラウザ以外で呼び出された場合
 */
export function createBrowserClient(): SupabaseClient<Database> {
  if (typeof window === 'undefined') {
    throw new Error('createBrowserClient must be called from browser');
  }

  if (browserClient) return browserClient;

  const env = getPublicEnv();
  browserClient = createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return browserClient;
}

/**
 * サーバー用Supabaseクライアント（毎回新規作成）
 * service_role keyを使用するためRLSをバイパス
 */
export function createServerClient(): SupabaseClient<Database> {
  if (typeof window !== 'undefined') {
    throw new Error('createServerClient must be called from server');
  }

  const publicEnv = getPublicEnv();
  const serverEnv = getServerEnv();

  return createClient<Database>(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
