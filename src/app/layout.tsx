import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import { getSupabaseUrl } from '@/lib/env';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbf9f6',
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ロケーション前撮り映像制作`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'ウェディング',
    '前撮り',
    'ロケーション撮影',
    '結婚式',
    'ムービー',
    '大阪',
    '関西',
    'オープニングムービー',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ロケーション前撮り映像制作`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ロケーション前撮り映像制作`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
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
