/**
 * Supabase Storage ユーティリティ
 * 画像・動画の保存と取得を管理
 */

/** ストレージバケット名 */
export const STORAGE_BUCKET = 'media' as const;

/** メディアタイプ */
export type MediaType = 'works' | 'staff' | 'videos';

/**
 * Supabase URL を取得（遅延評価）
 * 環境変数が設定されていない場合は null を返す
 */
function getSupabaseUrl(): string | null {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || null;
}

/**
 * Supabase Storage の公開URLを取得
 * 環境変数が未設定の場合はローカルの画像パスにフォールバック
 * @param path - ファイルパス (例: 'works/couple-cliff.jpg')
 * @returns 公開URL
 */
export function getStorageUrl(path: string): string {
  const supabaseUrl = getSupabaseUrl();
  if (supabaseUrl) {
    return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
  }
  // フォールバック: ローカルの public/images を使用
  return `/images/${path}`;
}

/**
 * メディアタイプとファイル名からURLを取得
 * @param type - メディアタイプ
 * @param filename - ファイル名
 * @returns 公開URL
 */
export function getMediaUrl(type: MediaType, filename: string): string {
  return getStorageUrl(`${type}/${filename}`);
}

/**
 * 作品画像のURLを取得
 * @param filename - ファイル名 (例: 'couple-cliff.jpg')
 * @returns 公開URL
 */
export function getWorkImageUrl(filename: string): string {
  return getMediaUrl('works', filename);
}

/**
 * スタッフ画像のURLを取得
 * @param filename - ファイル名 (例: 'aki.jpg')
 * @returns 公開URL
 */
export function getStaffImageUrl(filename: string): string {
  return getMediaUrl('staff', filename);
}

/**
 * 動画のURLを取得
 * @param filename - ファイル名
 * @returns 公開URL
 */
export function getVideoUrl(filename: string): string {
  return getMediaUrl('videos', filename);
}
