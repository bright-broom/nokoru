import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import { getSupabaseUrl } from '@/lib/env';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

const BASE_URL = 'https://silverlacewedding.netlify.app';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbf9f6',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${siteConfig.name} | 大阪・関西のロケーション前撮り・ウェディングムービー制作`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    '大阪・関西発のロケーション前撮り専門。シネマティックなウェディングムービーと写真撮影で、おふたりの大切な瞬間を美しく残します。オープニングムービー制作、全国出張対応。2026年撮影受付中。',
  keywords: [
    'ロケーション前撮り',
    'ウェディングムービー',
    '前撮り 大阪',
    '前撮り 関西',
    '結婚式 ムービー',
    'オープニングムービー',
    'ウェディング 撮影',
    '前撮り 動画',
    '結婚式 動画制作',
    'ブライダル ムービー',
    '前撮り カメラマン 大阪',
    'ウェディングフォト 動画',
    'プロフィールムービー',
    '結婚式 映像',
    '前撮り 京都',
    '前撮り 神戸',
    '前撮り 奈良',
    'ロケーションフォト',
    'シネマティック ウェディング',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: BASE_URL,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | 大阪・関西のロケーション前撮り・ウェディングムービー制作`,
    description:
      '大阪・関西発のロケーション前撮り専門。シネマティックなウェディングムービーと写真撮影で、おふたりの大切な瞬間を美しく残します。',
    // 画像は opengraph-image.tsx で自動生成
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | 大阪・関西のロケーション前撮り・ウェディングムービー制作`,
    description:
      '大阪・関西発のロケーション前撮り専門。シネマティックなウェディングムービーと写真撮影。',
    // 画像は twitter-image.tsx で自動生成
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console 認証コード（設定後に追加）
    // google: 'your-google-verification-code',
  },
  category: 'wedding',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: ブラウザ拡張機能（VSCode等）による属性追加を許容
    <html lang="ja" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* 外部リソースへのプリコネクト（パフォーマンス最適化） */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href={getSupabaseUrl()} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
