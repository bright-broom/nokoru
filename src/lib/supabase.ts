import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { getPublicEnv, getServerEnv } from './env';

let supabaseInstance: SupabaseClient<Database> | null = null;

/**
 * クライアント用Supabaseインスタンスを取得
 */
export function getSupabase(): SupabaseClient<Database> {
  if (supabaseInstance) return supabaseInstance;

  const env = getPublicEnv();
  supabaseInstance = createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  return supabaseInstance;
}

/**
 * サーバー用Supabaseクライアント（service_role key使用）
 */
export function createServerSupabaseClient(): SupabaseClient<Database> {
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
