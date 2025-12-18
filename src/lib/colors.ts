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

export const tailwindClasses = {
  bgCream: 'bg-cream',
  bgBeige: 'bg-beige',
  bgAccent: 'bg-site-accent',
  bgError: 'bg-error',
  bgErrorLight: 'bg-error-light',
  bgSuccess: 'bg-success',
  textCream: 'text-cream',
  textAccent: 'text-site-accent',
  textText: 'text-text',
  textTextLight: 'text-text-light',
  textError: 'text-error',
  textErrorDark: 'text-error-dark',
  textSuccess: 'text-success-dark',
  borderBeige: 'border-beige',
  borderAccent: 'border-site-accent',
  ringAccent: 'focus-visible:ring-site-accent',
} as const;

export type SiteColor = keyof typeof siteColors;
export type CssVarName = keyof typeof cssVarNames;
