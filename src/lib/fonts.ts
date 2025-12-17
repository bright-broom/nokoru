import { Playfair_Display, Noto_Sans_JP } from 'next/font/google';

/**
 * フォント設定の集中管理
 *
 * 使用フォント:
 * - Playfair Display: 見出し・タイトル用（英字セリフ体）
 * - Noto Sans JP: 本文用（日本語対応サンセリフ体）
 */

// 見出し用フォント（英字）
export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// 本文用フォント（日本語対応）
export const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// CSS変数クラス名を結合（layout.tsxで使用）
export const fontVariables = `${playfair.variable} ${notoSansJP.variable}`;
