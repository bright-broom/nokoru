import Link from 'next/link';
import { Section, Container, SectionHeader, FadeIn, Button } from '@/components/ui';
import { CheckIcon, StarIcon } from '@/components/icons';
import { plans, text } from '@/config';
import { cn } from '@/lib/utils';
import { renderMultilineText } from '@/lib/helpers';
import type { Plan } from '@/types';

function PlanCard({ plan, delay }: { plan: Plan; delay: number }) {
  const isComingSoon = plan.isComingSoon;
  const isRecommended = plan.isRecommended;

  return (
    <FadeIn direction="up" delay={delay}>
      <Link
        href={`/plans/${plan.id}`}
        className={cn(
          'group relative flex h-full flex-col rounded-2xl transition-all duration-300',
          isComingSoon && 'border-2 border-dashed border-beige/60 bg-beige/20',
          isRecommended && 'bg-white shadow-xl ring-2 ring-site-accent',
          !isComingSoon && !isRecommended && 'bg-white shadow-md hover:shadow-xl hover:-translate-y-1'
        )}
      >
        {/* おすすめバッジ */}
        {isRecommended && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-site-accent px-5 py-2 text-xs font-semibold text-white shadow-lg">
              <StarIcon className="h-3.5 w-3.5" />
              {text.sections.plans.recommendedBadge}
            </div>
          </div>
        )}

        {/* ヘッダー部分 */}
        <div
          className={cn(
            'rounded-t-2xl px-6 py-8 text-center',
            isRecommended && 'bg-site-accent/5 pt-10',
            isComingSoon && 'opacity-60'
          )}
        >
          <h3
            className={cn(
              'font-display text-2xl tracking-wide',
              isComingSoon && 'text-text-light'
            )}
          >
            {plan.name}
          </h3>

          <div className="mt-4">
            <span
              className={cn(
                'text-4xl font-light tracking-tight md:text-5xl',
                isComingSoon && 'text-text-light',
                isRecommended && 'text-site-accent'
              )}
            >
              {plan.price}
            </span>
            {plan.priceNote && (
              <span className="ml-1 text-lg text-text-light">{plan.priceNote}</span>
            )}
          </div>
        </div>

        {/* 区切り線 */}
        <div className="mx-6 h-px bg-beige" />

        {/* コンテンツ部分 */}
        <div className="flex flex-1 flex-col px-6 py-6">
          {plan.features.length > 0 ? (
            <ul className="flex-1 space-y-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                      isRecommended ? 'bg-site-accent/20' : 'bg-beige'
                    )}
                  >
                    <CheckIcon
                      className={cn(
                        'h-3 w-3',
                        isRecommended ? 'text-site-accent' : 'text-text-light'
                      )}
                    />
                  </span>
                  <span className="text-sm text-text-light">{feature.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            plan.description && (
              <p className="flex-1 text-sm leading-relaxed text-text-light">
                {renderMultilineText(plan.description)}
              </p>
            )
          )}

          {/* カード内CTA */}
          {!isComingSoon && (
            <div className="mt-6 pt-4">
              <span
                className={cn(
                  'block w-full rounded-full py-3 text-center text-sm font-medium transition-all duration-300',
                  isRecommended
                    ? 'bg-site-accent text-white group-hover:bg-site-accent/90'
                    : 'border border-site-accent/30 text-site-accent group-hover:bg-site-accent group-hover:text-white'
                )}
              >
                詳細を見る
              </span>
            </div>
          )}

          {isComingSoon && (
            <div className="mt-6 pt-4">
              <span className="block w-full rounded-full border border-dashed border-beige py-3 text-center text-sm text-text-light">
                準備中
              </span>
            </div>
          )}
        </div>
      </Link>
    </FadeIn>
  );
}

export function PlansSection() {
  return (
    <Section id="plans" aria-labelledby="plans-heading">
      <Container>
        <SectionHeader
          id="plans-heading"
          title={text.sections.plans.title}
          subtitle={text.sections.plans.subtitle}
        />

        <ul
          className="mt-16 grid list-none gap-6 md:grid-cols-3 md:gap-8"
          aria-label={text.sections.plans.listAria}
        >
          {plans.map((plan, index) => (
            <li key={plan.id} className={cn(plan.isRecommended && 'md:-mt-4 md:mb-4')}>
              <PlanCard plan={plan} delay={index * 150} />
            </li>
          ))}
        </ul>

        <FadeIn direction="up" delay={500} className="mt-14 flex justify-center">
          <Button href="/contact" aria-label={text.sections.plans.ctaAria}>
            {text.sections.plans.cta}
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
