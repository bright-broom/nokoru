/**
 * lib バレルエクスポート
 */

// ユーティリティ
export { cn, getExternalLinkProps, scrollToElement, renderMultilineText, formatDate } from './utils';

// スタイル
export {
  formInputStyles,
  formInputBaseClasses,
  cardStyles,
  iconBoxStyles,
  revealOnHoverClasses,
} from './styles';

// カラー
export { siteColors } from './colors';
export type { SiteColor } from './colors';

// フォント
export { cormorant, shipporiMincho, fontVariables } from './fonts';

// 定数
export { PASSWORD_MANAGER_IGNORE_PROPS, ANIMATION_DELAYS, SCROLL_THRESHOLDS } from './constants';

// ストレージ
export {
  getStorageUrl,
  getMediaUrl,
  getWorkImageUrl,
  getStaffImageUrl,
  getVideoUrl,
} from './storage';
export type { MediaType } from './storage';
