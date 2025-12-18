import { Cormorant_Garamond, Shippori_Mincho } from 'next/font/google';

/**
 * フォント設定の集中管理
 * - Cormorant Garamond: 見出し用（英字セリフ体）
 * - Shippori Mincho: 本文用（日本語明朝体）
 */

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontVariables = `${cormorant.variable} ${shipporiMincho.variable}`;
