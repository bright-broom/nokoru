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
 */
function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined');
  }
  return url;
}

/**
 * Supabase Storage の公開URLを取得
 * @param path - ファイルパス (例: 'works/couple-cliff.jpg')
 * @returns 公開URL
 */
export function getStorageUrl(path: string): string {
  return `${getSupabaseUrl()}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
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
