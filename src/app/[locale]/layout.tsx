import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';
import { getSupabaseUrl } from '@/lib/env';

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
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href={getSupabaseUrl()} />
      </head>
      {children}
    </NextIntlClientProvider>
  );
}
