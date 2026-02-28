import { memo } from 'react';
import Link from 'next/link';
import { Section, Container, SectionHeader, SectionDivider, FadeIn, SectionCTA, FloatingDecoration, cardPreset, contentPreset } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { plans, text } from '@/config';
import { cn } from '@/lib/utils';
import { ANIMATION_DELAYS } from '@/lib/constants';
import type { Plan } from '@/types';

const PlanCard = memo(function PlanCard({ plan, index }: { plan: Plan; index: number }) {
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
});

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

        {/* 追加オプション */}
        <FadeIn {...contentPreset} delay={400} className="mt-16">
          <div className="rounded-2xl border border-beige/50 bg-white/60 p-6 md:p-8">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <div>
                <h3 className="font-display text-lg tracking-wide text-text">
                  {text.sections.plans.optionsTitle}
                </h3>
                <p className="mt-1 text-sm text-text-light/70">
                  ご希望に合わせてカスタマイズ可能です
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {text.sections.plans.options.map((option, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-full bg-beige/50 px-3 py-1.5 text-xs"
                  >
                    <span className="font-medium text-text">{option.name}</span>
                    <span className="text-gold">+¥{option.price}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 早期予約特典 */}
        <FadeIn {...contentPreset} delay={450} className="mt-6">
          <div className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-gold/10 via-gold/15 to-gold/10 px-6 py-4">
            <span className="text-lg">✨</span>
            <div className="text-center">
              <span className="font-display text-sm tracking-wide text-gold">
                {text.sections.plans.earlyBirdTitle}
              </span>
              <span className="mx-2 text-text-light/40">|</span>
              <span className="text-sm font-medium text-text">
                {text.sections.plans.earlyBirdNote}
              </span>
            </div>
            <span className="text-lg">✨</span>
          </div>
        </FadeIn>

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
