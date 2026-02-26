/**
 * パスワードマネージャーや自動補完による意図しないスタイルの崩れや
 * 誤動作を防止するための共通属性
 */
export const PASSWORD_MANAGER_IGNORE_PROPS = {
   'data-np-ignore': 'true',
   'data-lpignore': 'true',
   suppressHydrationWarning: true,
} as const;

/**
 * アニメーション遅延設定
 * カード等のスタッガーアニメーションで使用
 */
export const ANIMATION_DELAYS = {
  /** カードのスタッガー間隔 (150ms) */
  CARD_STAGGER: 150,
  /** Works カードのスタッガー間隔 (100ms) */
  WORK_STAGGER: 100,
  /** コンサルテーションカードの開始遅延 (400ms) */
  CONSULTATION_START: 400,
  /** プロセスステップの開始遅延 (1000ms) */
  PROCESS_START: 1000,
  /** CTA ボタンの遅延 (400ms) */
  CTA_DELAY: 400,
} as const;

/**
 * スクロール閾値
 */
export const SCROLL_THRESHOLDS = {
  /** ヘッダー背景変化の閾値 */
  HEADER_SCROLL: 50,
} as const;
