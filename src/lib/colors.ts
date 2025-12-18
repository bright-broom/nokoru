/**
 * カラー設定の集中管理
 * CSS変数は globals.css の @theme ブロックで定義
 */

export const siteColors = {
  cream: '#fbf9f6',
  beige: '#f5f2ec',
  accent: '#7a8ec5',
  text: '#3d3d3d',
  textLight: '#6b6b6b',
  error: '#ef4444',
  errorLight: '#fef2f2',
  errorDark: '#dc2626',
  success: '#dcfce7',
  successDark: '#22c55e',
  white: '#ffffff',
  black: '#000000',
} as const;

export type SiteColor = keyof typeof siteColors;
