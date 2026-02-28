/**
 * 画像ストレージユーティリティ
 * public/images/ のローカル画像を使用
 *
 * Note: Vercel では public/ フォルダが自動的に CDN で配信されるため、
 * 外部ストレージに依存せず確実に画像を表示できます。
 */

/** メディアタイプ */
export type MediaType = 'works' | 'staff' | 'videos';

/**
 * 画像URLを取得
 * @param path - ファイルパス (例: 'works/couple-cliff.jpg')
 * @returns 公開URL
 */
export function getStorageUrl(path: string): string {
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
