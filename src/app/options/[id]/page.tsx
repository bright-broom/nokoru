import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { options, text } from '@/config';
import { Header, Footer } from '@/components/layout';
import { CheckIcon } from '@/components/icons';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return options.map((option) => ({
    id: option.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const option = options.find((o) => o.id === id);

  if (!option) {
    return {
      title: text.pages.options.notFound,
    };
  }

  return {
    title: `${option.name} | ${text.pages.options.metaTitleSuffix}`,
    description: `${option.name}（${option.price}）- ${option.description}`,
  };
}

export default async function OptionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const option = options.find((o) => o.id === id);

  if (!option) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main id="main-content" className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <nav className="mb-12">
            <Link
              href="/#options"
              className="inline-flex items-center gap-2 text-sm text-text-light transition hover:text-text"
            >
              <span aria-hidden="true">←</span>
              {text.pages.options.backToOptions}
            </Link>
          </nav>

          <article>
            <header className="text-center">
              <h1 className="font-display text-3xl tracking-wide md:text-4xl">
                {option.name}
              </h1>

              <p className="mt-4 text-4xl font-light tracking-tight md:text-5xl">
                {option.price}
              </p>
            </header>

            <div className="mt-12">
              <p className="text-center text-text-light">
                {option.description}
              </p>
            </div>

            {option.features && option.features.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-center font-display text-xl">
                  {text.pages.options.featuresHeading}
                </h2>
                <ul className="space-y-4 rounded-lg bg-white p-8 shadow-sm">
                  {option.features.map((feature, index) => (
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

            <p className="mt-8 text-center text-sm text-text-light">
              {text.pages.options.note}
            </p>

            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-site-accent px-8 py-4 font-medium text-white transition hover:bg-site-accent/90"
              >
                {text.pages.options.ctaButton}
              </Link>
            </div>
          </article>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-site-accent px-6 py-3 text-sm text-site-accent transition hover:bg-site-accent hover:text-white"
            >
              {text.pages.options.backToTop}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
