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
    <FadeIn direction="scale-up" delay={delay} duration={1000} easing="smooth" className="h-full">
      <Link
        href={`/plans/${plan.id}`}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-[32px] transition-all duration-700',
          isComingSoon && 'border-2 border-dashed border-beige/60 bg-beige/10',
          isRecommended && 'bg-white shadow-premium ring-1 ring-gold/20 hover:ring-gold/40',
          !isComingSoon && !isRecommended && 'bg-white shadow-elevated border border-site-accent/5 hover:shadow-premium hover:-translate-y-2'
        )}
      >
        {/* 背景の柔らかなグロー（推奨カード） */}
        {isRecommended && (
          <div className="absolute -inset-10 rounded-[40px] bg-gradient-to-br from-gold/10 via-site-accent/5 to-transparent blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000" aria-hidden="true" />
        )}

        {/* おすすめバッジ - プレミアム */}
        {isRecommended && (
          <div className="absolute top-6 right-6 z-10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold shadow-glow-gold text-white animate-float">
              <StarIcon className="h-5 w-5 fill-current" />
            </div>
          </div>
        )}

        {/* ヘッダー部分 */}
        <div
          className={cn(
            'relative px-10 pt-12 pb-8 text-center',
            isComingSoon && 'opacity-60'
          )}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-site-accent/20" />
            <h3 className="font-display text-2xl tracking-widest text-text/80">
              {plan.name}
            </h3>
            <span className="h-px w-6 bg-site-accent/20" />
          </div>

          <div className="mt-6 flex flex-col items-center gap-1">
            <div className="flex items-baseline gap-1">
              <span className="text-[15px] font-bold text-site-accent/40 tracking-wider">¥</span>
              <span
                className={cn(
                  'font-display text-5xl tracking-tighter sm:text-6xl',
                  isRecommended ? 'gradient-text-gold' : 'text-text'
                )}
              >
                {plan.price}
              </span>
            </div>
            {plan.priceNote && (
              <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-site-accent/40">{plan.priceNote}</span>
            )}
          </div>
        </div>

        {/* コンテンツ部分 */}
        <div className="relative flex flex-1 flex-col px-10 pb-12">
          {plan.features.length > 0 ? (
            <ul className="flex-1 space-y-5">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                    <CheckIcon className={cn('h-3.5 w-3.5', isRecommended ? 'text-gold' : 'text-site-accent/40')} />
                  </div>
                  <span className="text-[14px] leading-relaxed text-text-light/90">{feature.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            plan.description && (
              <p className="flex-1 text-[14px] leading-relaxed text-text-light/90">
                {renderMultilineText(plan.description)}
              </p>
            )
          )}

          {/* CTA - リッチ化 */}
          {!isComingSoon ? (
            <div className="mt-10">
              <div
                className={cn(
                  'w-full rounded-full py-4 text-center text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500',
                  isRecommended
                    ? 'bg-gold text-white shadow-glow-gold hover:shadow-[0_15px_30px_rgba(197,160,89,0.3)]'
                    : 'border border-site-accent/20 text-site-accent hover:bg-site-accent hover:text-white hover:border-transparent hover:shadow-glow'
                )}
              >
                View Collection
              </div>
            </div>
          ) : (
            <div className="mt-10">
              <div className="w-full rounded-full border border-dashed border-beige py-4 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-text-light/40">
                Enchanting Soon
              </div>
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
