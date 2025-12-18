import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { plans, text } from '@/config';
import { Header, Footer } from '@/components/layout';
import { CheckIcon, StarIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { renderMultilineText } from '@/lib/helpers';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return plans.map((plan) => ({
    id: plan.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const plan = plans.find((p) => p.id === id);

  if (!plan) {
    return {
      title: text.pages.plans.notFound,
    };
  }

  const description = plan.features.length > 0
    ? plan.features.map((f) => f.text).join('、')
    : plan.description ?? '';

  return {
    title: `${plan.name} | ${text.pages.plans.metaTitleSuffix}`,
    description: `${plan.name}プラン（${plan.price}${plan.priceNote ?? ''}）- ${description}`,
  };
}

export default async function PlanDetailPage({ params }: PageProps) {
  const { id } = await params;
  const plan = plans.find((p) => p.id === id);

  if (!plan) {
    notFound();
  }

  const isComingSoon = plan.isComingSoon;
  const isRecommended = plan.isRecommended;

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main id="main-content" className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <nav className="mb-12">
            <Link
              href="/#plans"
              className="inline-flex items-center gap-2 text-sm text-text-light transition hover:text-text"
            >
              <span aria-hidden="true">←</span>
              {text.pages.plans.backToPlans}
            </Link>
          </nav>

          <article>
            <header className="text-center">
              {isRecommended && (
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-site-accent px-4 py-1.5 text-xs font-semibold text-white">
                  <StarIcon className="h-3.5 w-3.5" />
                  {text.sections.plans.recommendedBadge}
                </div>
              )}

              <h1
                className={cn(
                  'font-display text-3xl tracking-wide md:text-4xl',
                  isComingSoon && 'text-text-light'
                )}
              >
                {plan.name}
              </h1>

              <p
                className={cn(
                  'mt-4 text-4xl font-light tracking-tight md:text-5xl',
                  isComingSoon && 'text-text-light'
                )}
              >
                {plan.price}
                {plan.priceNote && (
                  <span className="ml-1 text-xl font-normal text-text-light">
                    {plan.priceNote}
                  </span>
                )}
              </p>
            </header>

            {isComingSoon ? (
              <div className="mt-12 rounded-lg border-2 border-dashed border-beige bg-beige/20 p-8 text-center">
                <p className="text-text-light">
                  {plan.description && renderMultilineText(plan.description)}
                </p>
                <p className="mt-4 text-sm text-text-light">
                  {text.pages.plans.comingSoonNote}
                </p>
              </div>
            ) : (
              <>
                {plan.features.length > 0 && (
                  <div className="mt-12">
                    <h2 className="mb-6 text-center font-display text-xl">
                      {text.pages.plans.featuresHeading}
                    </h2>
                    <ul className="space-y-4 rounded-lg bg-white p-8 shadow-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-site-accent/10">
                            <CheckIcon className="h-4 w-4 text-site-accent" />
                          </span>
                          <span className="text-text-light">{feature.text}</span>
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
                    {text.pages.plans.ctaButton}
                  </Link>
                </div>
              </>
            )}
          </article>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-site-accent px-6 py-3 text-sm text-site-accent transition hover:bg-site-accent hover:text-white"
            >
              {text.pages.plans.backToTop}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
