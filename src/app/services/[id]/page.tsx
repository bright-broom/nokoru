import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { services, text } from '@/config';
import { Header, Footer } from '@/components/layout';
import { CheckIcon, VideoIcon, PlayIcon } from '@/components/icons';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
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
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  const IconComponent = service.icon === 'video' ? VideoIcon : PlayIcon;

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main id="main-content" className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <nav className="mb-12">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-sm text-text-light transition hover:text-text"
            >
              <span aria-hidden="true">←</span>
              {text.pages.services.backToServices}
            </Link>
          </nav>

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
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-site-accent px-8 py-4 font-medium text-white transition hover:bg-site-accent/90"
              >
                {text.pages.services.ctaButton}
              </Link>
            </div>
          </article>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-site-accent px-6 py-3 text-sm text-site-accent transition hover:bg-site-accent hover:text-white"
            >
              {text.pages.services.backToTop}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
