/**
 * カラー設定の集中管理
 *
 * すべてのサイトカラーをここで定義し、一元管理します。
 * CSS変数は globals.css の @theme ブロックで定義されます。
 */

// サイトカラー定義
export const siteColors = {
  // 背景色
  cream: '#fbf9f6',
  beige: '#f5f2ec',

  // アクセントカラー
  accent: '#7a8ec5',

  // テキストカラー
  text: '#3d3d3d',
  textLight: '#6b6b6b',

  // ステータスカラー
  error: '#ef4444', // red-500相当
  errorLight: '#fef2f2', // red-50相当
  errorDark: '#dc2626', // red-600相当
  success: '#dcfce7', // green-100相当
  successDark: '#22c55e', // green-500相当

  // 汎用カラー
  white: '#ffffff',
  black: '#000000',
} as const;

// CSS変数名のマッピング
export const cssVarNames = {
  cream: '--color-cream',
  beige: '--color-beige',
  accent: '--color-site-accent',
  text: '--color-text',
  textLight: '--color-text-light',
  error: '--color-error',
  errorLight: '--color-error-light',
  errorDark: '--color-error-dark',
  success: '--color-success',
  successDark: '--color-success-dark',
} as const;

// Tailwindクラス名のマッピング（参照用）
export const tailwindClasses = {
  // 背景色
  bgCream: 'bg-cream',
  bgBeige: 'bg-beige',
  bgAccent: 'bg-site-accent',
  bgError: 'bg-error',
  bgErrorLight: 'bg-error-light',
  bgSuccess: 'bg-success',

  // テキスト色
  textCream: 'text-cream',
  textAccent: 'text-site-accent',
  textText: 'text-text',
  textTextLight: 'text-text-light',
  textError: 'text-error',
  textErrorDark: 'text-error-dark',
  textSuccess: 'text-success-dark',

  // ボーダー色
  borderBeige: 'border-beige',
  borderAccent: 'border-site-accent',

  // フォーカスリング
  ringAccent: 'focus-visible:ring-site-accent',
} as const;

// 型定義
export type SiteColor = keyof typeof siteColors;
export type CssVarName = keyof typeof cssVarNames;
