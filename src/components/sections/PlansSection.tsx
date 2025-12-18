import Link from 'next/link';
import { Section, Container, SectionHeader, FadeIn, Button } from '@/components/ui';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { CheckIcon, StarIcon } from '@/components/icons';
import { plans, text } from '@/config';
import { cn } from '@/lib/utils';
import { renderMultilineText } from '@/lib/helpers';
import type { Plan } from '@/types';

function PlanCard({ plan, delay }: { plan: Plan; delay: number }) {
  const isComingSoon = plan.isComingSoon;
  const isRecommended = plan.isRecommended;

  return (
    <FadeIn direction="scale-up" delay={delay} duration={700} easing="smooth" className="h-full">
      <Link
        href={`/plans/${plan.id}`}
        className={cn(
          'group relative flex h-full flex-col rounded-2xl transition-all duration-500',
          isComingSoon && 'border-2 border-dashed border-beige/60 bg-beige/20',
          isRecommended && 'bg-white shadow-2xl ring-2 ring-site-accent hover:shadow-[0_25px_60px_-12px_rgba(122,142,197,0.3)]',
          !isComingSoon && !isRecommended && 'bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:shadow-site-accent/10'
        )}
      >
        {/* 背景グロー（推奨カード） */}
        {isRecommended && (
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-site-accent/20 to-gold/10 opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-70" aria-hidden="true" />
        )}

        {/* シマー効果（推奨カード） */}
        {isRecommended && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] transition-transform duration-1000 group-hover:translate-x-[200%]" />
          </div>
        )}

        {/* おすすめバッジ - リッチ化 */}
        {isRecommended && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-site-accent to-site-accent-light px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-site-accent/30 animate-pulse">
              <StarIcon className="h-3.5 w-3.5" />
              {text.sections.plans.recommendedBadge}
            </div>
          </div>
        )}

        {/* ヘッダー部分 */}
        <div
          className={cn(
            'relative rounded-t-2xl px-6 py-8 text-center',
            isRecommended && 'bg-gradient-to-b from-site-accent/10 to-transparent pt-10',
            isComingSoon && 'opacity-60'
          )}
        >
          <h3
            className={cn(
              'font-display text-2xl tracking-wide transition-colors duration-300',
              isComingSoon && 'text-text-light',
              !isComingSoon && 'group-hover:text-site-accent'
            )}
          >
            {plan.name}
          </h3>

          <div className="mt-4">
            <span
              className={cn(
                'text-4xl font-light tracking-tight md:text-5xl transition-all duration-300',
                isComingSoon && 'text-text-light',
                isRecommended && 'gradient-text'
              )}
            >
              {plan.price}
            </span>
            {plan.priceNote && (
              <span className="ml-1 text-lg text-text-light">{plan.priceNote}</span>
            )}
          </div>
        </div>

        {/* 区切り線 - グラデーション */}
        <div className={cn(
          'mx-6 h-px',
          isRecommended ? 'bg-gradient-to-r from-transparent via-site-accent/30 to-transparent' : 'bg-beige'
        )} />

        {/* コンテンツ部分 */}
        <div className="relative flex flex-1 flex-col px-6 py-6">
          {plan.features.length > 0 ? (
            <ul className="flex-1 space-y-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 group/item">
                  <span
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                      isRecommended
                        ? 'bg-gradient-to-br from-site-accent/20 to-gold/10 group-hover/item:from-site-accent/30 group-hover/item:to-gold/20'
                        : 'bg-beige group-hover/item:bg-site-accent/10'
                    )}
                  >
                    <CheckIcon
                      className={cn(
                        'h-3 w-3 transition-colors duration-300',
                        isRecommended ? 'text-site-accent' : 'text-text-light group-hover/item:text-site-accent'
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

          {/* カード内CTA - リッチ化 */}
          {!isComingSoon && (
            <div className="mt-6 pt-4">
              <span
                className={cn(
                  'block w-full rounded-full py-3 text-center text-sm font-medium transition-all duration-500',
                  isRecommended
                    ? 'bg-gradient-to-r from-site-accent to-site-accent-light text-white shadow-md group-hover:shadow-lg group-hover:shadow-site-accent/25'
                    : 'border border-site-accent/30 text-site-accent group-hover:bg-gradient-to-r group-hover:from-site-accent group-hover:to-site-accent-light group-hover:text-white group-hover:border-transparent group-hover:shadow-md'
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
    <Section id="plans" aria-labelledby="plans-heading" className="relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FloatingDecoration
          shape="blur"
          size="xl"
          color="accent"
          opacity={4}
          position={{ top: '5%', right: '-15%' }}
          animationDelay={0}
        />
        <FloatingDecoration
          shape="blur"
          size="lg"
          color="gold"
          opacity={6}
          position={{ bottom: '10%', left: '-10%' }}
          animationDelay={2000}
        />
        <FloatingDecoration
          shape="ring"
          size="sm"
          color="accent"
          opacity={10}
          position={{ top: '40%', left: '5%' }}
          animationDelay={1000}
        />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          id="plans-heading"
          title={text.sections.plans.title}
          subtitle={text.sections.plans.subtitle}
        />

        <ul
          className="mt-16 grid list-none items-stretch gap-6 md:grid-cols-3 md:gap-8"
          aria-label={text.sections.plans.listAria}
        >
          {plans.map((plan, index) => (
            <li key={plan.id} className={cn('h-full', plan.isRecommended && 'md:-mt-4 md:mb-4')}>
              <PlanCard plan={plan} delay={index * 150} />
            </li>
          ))}
        </ul>

        <FadeIn direction="scale" delay={500} easing="bounce" className="mt-14 flex justify-center">
          <Button href="/contact" variant="gradient" aria-label={text.sections.plans.ctaAria}>
            {text.sections.plans.cta}
          </Button>
        </FadeIn>
      </Container>

      {/* セクション下部の装飾 */}
      <SectionDivider variant="diamond" className="mt-8" />
    </Section>
  );
}
