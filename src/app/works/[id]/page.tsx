import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { workImages, text } from '@/config';
import { Header, Footer } from '@/components/layout';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return workImages.map((work) => ({
    id: work.id,
  }));
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
  const { id } = await params;
  const work = workImages.find((w) => w.id === id);

  if (!work) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main id="main-content" className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <nav className="mb-12">
            <Link
              href="/#works"
              className="inline-flex items-center gap-2 text-sm text-text-light transition hover:text-text"
            >
              <span aria-hidden="true">←</span>
              {text.pages.works.backToWorks}
            </Link>
          </nav>

          <article>
            <figure className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={work.src}
                alt={work.alt}
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </figure>

            <div className="mt-8 text-center">
              {work.locationTag && (
                <span className="inline-block rounded-full bg-site-accent/10 px-4 py-1.5 text-xs font-medium text-site-accent">
                  {text.pages.works.locationLabel}: {work.locationTag}
                </span>
              )}

              <h1 className="mt-4 font-display text-2xl tracking-wide md:text-3xl">
                {work.alt}
              </h1>

              {work.description && (
                <p className="mx-auto mt-6 max-w-lg leading-relaxed text-text-light">
                  {work.description}
                </p>
              )}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-site-accent px-8 py-4 font-medium text-white transition hover:bg-site-accent/90"
              >
                {text.pages.works.ctaButton}
              </Link>
            </div>
          </article>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-site-accent px-6 py-3 text-sm text-site-accent transition hover:bg-site-accent hover:text-white"
            >
              {text.pages.works.backToTop}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
