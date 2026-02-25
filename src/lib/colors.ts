/**
 * カラー設定の集中管理
 * CSS変数は globals.css の @theme ブロックで定義
 */

export const siteColors = {
  cream: '#fbf9f6',
  beige: '#f5f2ec',
  accent: '#64748b', // Silver Slate
  gold: '#c5a059',   // Champagne Gold
  text: '#2d2d2d',
  textLight: '#525252',
  error: '#ef4444',
  errorLight: '#fef2f2',
  errorDark: '#dc2626',
  success: '#dcfce7',
  successDark: '#22c55e',
  white: '#ffffff',
  black: '#000000',
} as const;

export type SiteColor = keyof typeof siteColors;
