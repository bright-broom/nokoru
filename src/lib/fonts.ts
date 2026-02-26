import { Cormorant_Garamond, Shippori_Mincho } from 'next/font/google';

/**
 * フォント設定
 *
 * - Cormorant Garamond: 見出し用（エレガントな英字セリフ体）
 * - Shippori Mincho: 本文用（美しい日本語明朝体）
 *
 * Next.js が --font-cormorant, --font-shippori を html 要素に設定
 * Tailwind の @theme で font-display, font-sans クラスとして使用可能
 */

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const shipporiMincho = Shippori_Mincho({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-shippori',
  display: 'swap',
  // 日本語グリフはGoogle Fontsのunicode-rangeにより自動的に読み込まれる
  preload: true,
});

export const fontVariables = `${cormorant.variable} ${shipporiMincho.variable}`;
