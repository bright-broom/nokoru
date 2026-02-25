import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { plans, text } from '@/config';
import { Header, Footer } from '@/components/layout';
import { CheckIcon, StarIcon } from '@/components/icons';

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

  const description = plan.features.map((f) => f.text).join('、');

  return {
    title: `${plan.name} | ${text.pages.plans.metaTitleSuffix}`,
    description: `${plan.name}プラン（¥${plan.price} ${plan.priceNote ?? ''}）- ${description}`,
  };
}

export default async function PlanDetailPage({ params }: PageProps) {
  const { id } = await params;
  const plan = plans.find((p) => p.id === id);

  if (!plan) {
    notFound();
  }

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
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-white">
                  <StarIcon className="h-3.5 w-3.5" />
                  {text.sections.plans.recommendedBadge}
                </div>
              )}

              <h1 className="font-display text-3xl tracking-wide md:text-4xl">
                {plan.name}
              </h1>

              <div className="mt-6 flex items-baseline justify-center gap-1">
                <span className="text-xl text-site-accent/50">¥</span>
                <span className="text-5xl font-light tracking-tight md:text-6xl">
                  {plan.price}
                </span>
              </div>
              {plan.priceNote && (
                <p className="mt-2 text-sm text-text-light/60">{plan.priceNote}</p>
              )}

              {plan.bestFor && (
                <p className="mt-6 text-text-light">{plan.bestFor}</p>
              )}
            </header>

            <div className="mt-12">
              <h2 className="mb-6 text-center font-display text-xl">
                {text.pages.plans.featuresHeading}
              </h2>
              <ul className="space-y-4 rounded-2xl bg-white p-8 shadow-lg">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <CheckIcon className="h-4 w-4 text-gold" />
                    </span>
                    <span className="text-text-light">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {(plan.includes || plan.notIncludes) && (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {plan.includes && plan.includes.length > 0 && (
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-beige/50">
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Includes</h3>
                      <ul className="space-y-2">
                        {plan.includes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-text-light">
                            <span className="text-gold">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {plan.notIncludes && plan.notIncludes.length > 0 && (
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-beige/50">
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-site-accent/40">Not Includes</h3>
                      <ul className="space-y-2 text-text-light/60">
                        {plan.notIncludes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <span className="text-site-accent/20">×</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-medium text-white transition hover:bg-gold-dark"
              >
                {text.pages.plans.ctaButton}
              </Link>
            </div>
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
