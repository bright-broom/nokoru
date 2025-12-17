import type { Metadata, Viewport } from 'next';
import { Playfair_Display } from 'next/font/google';
import { siteConfig } from '@/config/site';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

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
    <html lang="ja" className={playfair.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
