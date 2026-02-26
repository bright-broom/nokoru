import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { workImages, text } from '@/config';
import { PageLayout } from '@/components/layout';
import { BackLink, Button } from '@/components/ui';
import { WorksNavigation, WorksImageViewer } from '@/components/works';
import { locales } from '@/i18n/config';

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    workImages.map((work) => ({
      locale,
      id: work.id,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const work = workImages.find((w) => w.id === id);

  if (!work) {
    return {
      title: text.pages.works.notFound,
    };
  }

  return {
    title: `${work.alt} | ${text.pages.works.metaTitleSuffix}`,
    description: work.description ?? work.alt,
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const currentIndex = workImages.findIndex((w) => w.id === id);

  if (currentIndex === -1) {
    notFound();
  }

  const work = workImages[currentIndex];

  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl px-6">
        <BackLink href="/#works" label={text.pages.works.backToWorks} />

          <article>
            <WorksImageViewer
              work={work}
              works={workImages}
              currentIndex={currentIndex}
              prevLabel={text.pages.works.navigation.prevLabel}
              nextLabel={text.pages.works.navigation.nextLabel}
            />

            <div className="mt-8 text-center">
              {work.locationTag && (
                <span className="inline-block rounded-full bg-site-accent/10 px-4 py-1.5 text-xs font-medium text-site-accent">
                  {text.pages.works.locationLabel}: {work.locationTag}
                </span>
              )}

              <h1 className="mt-4 font-display text-lg tracking-wide md:text-xl">
                {work.alt}
              </h1>

              {work.description && (
                <p className="mx-auto mt-6 max-w-lg leading-relaxed text-text-light">
                  {work.description}
                </p>
              )}
            </div>

            {/* Works Navigation */}
            <WorksNavigation
              works={workImages}
              currentIndex={currentIndex}
              text={text.pages.works.navigation}
            />

            <div className="mt-12 text-center">
              <Button href="/contact" variant="primary" rounded="full" size="large">
                {text.pages.works.ctaButton}
              </Button>
            </div>
          </article>

          <div className="mt-16 text-center">
            <Button href="/" variant="outline" rounded="full" size="small">
              {text.pages.works.backToTop}
            </Button>
          </div>
        </div>
    </PageLayout>
  );
}
