import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { services, text } from '@/config';
import { PageLayout } from '@/components/layout';
import { BackLink, Button } from '@/components/ui';
import { CheckIcon, VideoIcon, PlayIcon } from '@/components/icons';
import { locales } from '@/i18n/config';

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    services.map((service) => ({
      locale,
      id: service.id,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return {
      title: text.pages.services.notFound,
    };
  }

  return {
    title: `${service.title} | ${text.pages.services.metaTitleSuffix}`,
    description: service.detailedDescription,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  const IconComponent = service.icon === 'video' ? VideoIcon : PlayIcon;

  return (
    <PageLayout>
      <div className="mx-auto max-w-2xl px-6">
        <BackLink href="/#services" label={text.pages.services.backToServices} />

          <article>
            <header className="text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-site-accent/10">
                <IconComponent className="h-8 w-8 text-site-accent" />
              </div>

              <h1 className="font-display text-3xl tracking-wide md:text-4xl">
                {service.title}
              </h1>

              <p className="mx-auto mt-6 max-w-md whitespace-pre-line leading-relaxed text-text-light">
                {service.description}
              </p>
            </header>

            <div className="mt-12 rounded-lg bg-white p-8 shadow-sm">
              <p className="leading-relaxed text-text-light">
                {service.detailedDescription}
              </p>
            </div>

            {service.features.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-center font-display text-xl">
                  {text.pages.services.featuresHeading}
                </h2>
                <ul className="space-y-4 rounded-lg bg-white p-8 shadow-sm">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-site-accent/10">
                        <CheckIcon className="h-4 w-4 text-site-accent" />
                      </span>
                      <span className="text-text-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12 text-center">
              <Button href="/contact" variant="primary" rounded="full" size="large">
                {text.pages.services.ctaButton}
              </Button>
            </div>
          </article>

          <div className="mt-16 text-center">
            <Button href="/" variant="outline" rounded="full" size="small">
              {text.pages.services.backToTop}
            </Button>
          </div>
        </div>
    </PageLayout>
  );
}
