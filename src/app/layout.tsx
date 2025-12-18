import type { Metadata, Viewport } from 'next';
import { siteConfig, text } from '@/config';
import { siteColors } from '@/lib/colors';
import { getSupabaseUrl } from '@/lib/env';
import { fontVariables } from '@/lib/fonts';
import './globals.css';

const BASE_URL = text.seo.baseUrl;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteColors.cream,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${siteConfig.name} | ${text.seo.titleDefaultSuffix}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: text.seo.descriptionLong,
  keywords: [...text.seo.keywords],
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
    title: `${siteConfig.name} | ${text.seo.titleDefaultSuffix}`,
    description: text.seo.descriptionOg,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${text.seo.titleDefaultSuffix}`,
    description: text.seo.descriptionTwitter,
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
  verification: {},
  category: text.seo.category,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={fontVariables} suppressHydrationWarning>
      <head>
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
