import Link from 'next/link';
import { Section, Container, SectionHeader, SectionDivider, FadeIn, SectionCTA, FloatingDecoration, cardPreset, contentPreset } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { plans, text } from '@/config';
import { cn } from '@/lib/utils';
import { ANIMATION_DELAYS } from '@/lib/constants';
import type { Plan } from '@/types';

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const isSignature = plan.id === 'signature';
  const isComplete = plan.id === 'complete';

  return (
    <FadeIn {...cardPreset} delay={index * ANIMATION_DELAYS.CARD_STAGGER} className="h-full">
      <Link
        href={`/plans/${plan.id}`}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500',
          isSignature
            ? 'bg-white ring-2 ring-gold shadow-2xl shadow-gold/20 md:-translate-y-4'
            : 'bg-white/80 border border-beige/50 shadow-lg hover:shadow-xl hover:-translate-y-2'
        )}
      >
        {/* 推奨バッジ */}
        {isSignature && (
          <div className="absolute top-0 inset-x-0 bg-gold py-2 text-center">
            <span className="track-label text-xs font-bold uppercase text-white">
              {text.sections.plans.recommendedBadge}
            </span>
          </div>
        )}

        <div className={cn('flex flex-1 flex-col p-8 md:px-10 md:py-12', isSignature && 'pt-12 md:pt-14')}>
          {/* プラン名 */}
          <h3 className={cn(
            'track-label-wide text-center font-display text-sm uppercase',
            isSignature ? 'text-gold' : 'text-site-accent/60'
          )}>
            {plan.name}
          </h3>

          {/* 価格 */}
          <div className="mt-6 text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-sm text-site-accent/50">¥</span>
              <span className={cn(
                'font-display text-5xl tracking-tight md:text-6xl',
                isSignature ? 'text-gold' : 'text-text'
              )}>
                {plan.price}
              </span>
            </div>
            <p className="mt-2 text-sm text-text-light/60">{plan.priceNote}</p>
          </div>

          {/* ターゲット説明 */}
          {plan.bestFor && (
            <p className={cn(
              'mt-6 text-center text-sm leading-relaxed',
              isSignature ? 'text-gold/80 font-medium' : 'text-text-light'
            )}>
              {plan.bestFor}
            </p>
          )}

          {/* 区切り線 */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-beige to-transparent" />

          {/* 特徴リスト */}
          <ul className="flex-1 space-y-4">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                  isSignature ? 'bg-gold/15 text-gold' : 'bg-beige text-site-accent/50'
                )}>
                  <CheckIcon className="h-3 w-3" />
                </div>
                <span className="text-sm leading-relaxed text-text-light">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-auto pt-8">
            <div className={cn(
              'track-label w-full h-12 flex items-center justify-center rounded-xl px-4 text-center text-sm font-bold uppercase transition-all duration-300',
              isSignature
                ? 'bg-gold text-white group-hover:bg-gold-dark'
                : 'bg-site-accent/5 text-site-accent group-hover:bg-site-accent group-hover:text-white'
            )}>
              詳細を見る
            </div>
          </div>
        </div>

        {/* フッター領域（全カード統一高さ） */}
        <div className={cn('h-14', isComplete && 'border-t border-beige/50 bg-beige/20')}>
          {isComplete && (
            <div className="flex h-full items-center justify-center px-8">
              <span className="track-meta text-xs font-medium uppercase text-site-accent/60">
                衣装・ヘアメイク全て込み
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
      </div>

      <Container className="relative z-10">
        <SectionHeader
          id="plans-heading"
          title={text.sections.plans.title}
          subtitle={text.sections.plans.subtitle}
        />

        {/* 説明テキスト */}
        <FadeIn {...contentPreset} delay={100} className="mt-6 text-center">
          <p className="text-sm text-text-light/70">
            {text.sections.plans.allInclusiveNote}
          </p>
        </FadeIn>

        {/* プランカード */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* CTA */}
        <SectionCTA
          href="/contact"
          label={text.sections.plans.cta}
          ariaLabel={text.sections.plans.ctaAria}
          variant="glow"
          delay={500}
        />
      </Container>

      <SectionDivider variant="diamond" className="mt-16" />
    </Section>
  );
}
