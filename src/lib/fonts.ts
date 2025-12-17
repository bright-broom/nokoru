import { Cormorant_Garamond, Shippori_Mincho } from 'next/font/google';

/**
 * フォント設定の集中管理
 *
 * 使用フォント:
 * - Cormorant Garamond: 見出し・タイトル用（エレガントな英字セリフ体）
 * - Shippori Mincho: 本文用（優雅な日本語明朝体）
 */

// 見出し用フォント（英字）- エレガントで洗練されたセリフ体
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// 本文用フォント（日本語対応）- 優雅で繊細な明朝体
export const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// CSS変数クラス名を結合（layout.tsxで使用）
export const fontVariables = `${cormorant.variable} ${shipporiMincho.variable}`;
