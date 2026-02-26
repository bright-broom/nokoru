import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { text } from '@/config';
import { PageLayout } from '@/components/layout';
import { FadeIn, SectionHeader, BackLink, Button, simplePreset } from '@/components/ui';
import { FAQSection } from './_components';

export const metadata: Metadata = {
  title: `${text.pages.faq.metaTitle} | ${text.site.name}`,
  description: text.pages.faq.metaDescription,
};

type FAQCategory = keyof typeof text.pages.faq.categories;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const categories: FAQCategory[] = ['shooting', 'pricing', 'movie', 'booking'];

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-6">
        <BackLink href="/" label={text.pages.faq.backToTop} />

        <SectionHeader
          title={text.pages.faq.title}
          subtitle={text.pages.faq.subtitle}
          className="mb-12"
        />

        <div className="space-y-8">
          {categories.map((category, index) => (
            <FAQSection
              key={category}
              category={category}
              items={text.pages.faq.items}
              delay={index * 150}
            />
          ))}
        </div>

        <FadeIn {...simplePreset} delay={600} className="mt-16 rounded-2xl bg-white p-8 text-center shadow-sm">
          <h3 className="font-display text-xl tracking-wide">{text.pages.faq.cta}</h3>
          <p className="mt-3 text-text-light">{text.pages.faq.ctaDescription}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/contact" variant="primary" rounded="full" size="small">
              お問い合わせ
            </Button>
            <Button href="/#booking" variant="outline" rounded="full" size="small">
              無料相談を予約
            </Button>
          </div>
        </FadeIn>
      </div>
    </PageLayout>
  );
}
