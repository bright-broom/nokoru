import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // ロケールの検証
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // 静的レンダリングを有効化
  setRequestLocale(locale);

  // メッセージを取得
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <head>
        {/* YouTube */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        {/* Cal.com */}
        <link rel="preconnect" href="https://cal.com" />
        <link rel="preconnect" href="https://app.cal.com" />
        {/* Google Fonts (next/font uses these) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Analytics */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      {children}
    </NextIntlClientProvider>
  );
}
