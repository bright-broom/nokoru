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
  // Signatureプラン（竹）を強く強調
  const isSignature = plan.id === 'signature';
  // Premiumプラン（松）は高級感
  const isPremium = plan.id === 'premium';
  // Lightプラン（梅）はシンプルに
  const isLight = plan.id === 'light';

  // 特典項目を論理的に分割
  const renderFeatures = (features: readonly { readonly text: string }[]) => {
    if (features.length === 0) return null;

    const groups = [];
    for (let i = 0; i < features.length; i += 3) {
      groups.push(features.slice(i, i + 3));
    }

    return (
      <div className="space-y-6">
        {groups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <span className="plan-feature-group-label">HIGHLIGHTS {groupIdx + 1}</span>
            <ul className="space-y-3">
              {group.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 group/item">
                  <div className={cn(
                    "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                    isSignature ? "bg-gold/20 text-gold" : "bg-beige/40 text-site-accent/40 group-hover/item:bg-gold/20 group-hover/item:text-gold"
                  )}>
                    <CheckIcon className="h-2.5 w-2.5 fill-current" />
                  </div>
                  <span className="text-[13px] leading-relaxed text-text-light/80 transition-colors duration-500 group-hover/item:text-text">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <FadeIn direction="scale-up" delay={delay} duration={1200} easing="smooth" className="h-full">
      <Link
        href={`/plans/${plan.id}`}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-[32px] transition-all duration-700',
          // Light: シンプル
          isLight && 'bg-white border border-beige shadow-sm hover:shadow-elevated hover:border-gold/30',
          // Signature: ゴールド・ガラスモーフィズム（本命）
          isSignature && 'glass-gold p-[2px] shadow-premium transform md:-translate-y-4 md:hover:-translate-y-6 z-10',
          // Premium: プラチナ/ダークトーン（高級アンカー）
          isPremium && 'bg-slate-50 border border-site-accent/10 shadow-elevated hover:shadow-premium',
          // Coming Soon
          isComingSoon && 'border-2 border-dashed border-beige/60 bg-beige/5'
        )}
      >
        {/* Signature専用の背景ハイライト */}
        {isSignature && (
          <div className="absolute inset-0 bg-white/80 rounded-[30px]" />
        )}

        {/* ラベル: 戦略的誘導 */}
        {plan.bestFor && (
          <div className={cn(
            "absolute top-0 inset-x-0 py-1.5 text-center text-[9px] font-bold uppercase tracking-[0.2em] z-20",
            isSignature ? "bg-gold text-white shadow-glow-gold" : "bg-site-accent/5 text-site-accent/60"
          )}>
            {isSignature ? "Most Popular Choice" : "Recommended For You"}
          </div>
        )}

        <div className="relative flex flex-1 flex-col pt-8">
          {/* ヘッダー部分 */}
          <div className={cn('px-8 pt-6 pb-8 text-center', isComingSoon && 'opacity-60')}>
            <h3 className={cn(
              "font-display tracking-[0.2em] uppercase mb-4",
              isSignature ? "text-lg text-gold font-bold" : "text-sm text-site-accent/60"
            )}>
              {plan.name}
            </h3>

            <div className="price-label justify-center">
              <span className="price-unit">¥</span>
              <span className={cn('price-amount', isSignature ? 'gradient-text-gold scale-110' : 'text-text')}>
                {plan.price}
              </span>
            </div>

            <p className="mt-2 text-[10px] text-text-light/60">{plan.priceNote}</p>

            {/* ターゲット層の提示（心理的安全性） */}
            {plan.bestFor && (
              <p className="mt-4 text-[11px] font-medium text-site-accent/80 border-t border-dashed border-site-accent/10 pt-3 mx-4">
                {plan.bestFor}
              </p>
            )}
          </div>

          {/* コンテンツ部分 */}
          <div className="relative flex flex-1 flex-col px-8 pb-10">
            {!isComingSoon ? (
              <div className="flex-1">
                {renderFeatures(plan.features)}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                <p className="text-[13px] leading-relaxed text-text-light/60 italic">
                  {renderMultilineText(plan.description || '')}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10">
              <div
                className={cn(
                  'relative w-full rounded-xl py-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500',
                  isSignature
                    ? 'bg-gold text-white shadow-glow-gold group-hover:bg-gold-dark'
                    : 'bg-site-accent/5 text-site-accent group-hover:bg-site-accent group-hover:text-white'
                )}
              >
                View Details
              </div>
            </div>
          </div>
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

        {/* 導入コピー: 比較を促す */}
        <FadeIn direction="blur-up" delay={200} className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-[14px] leading-relaxed text-text-light/80">
            ご希望のスタイルに合わせて、最適なプランをお選びください。<br />
            迷われた際は、最もバランスの取れた<span className="text-gold font-bold"> Signature </span>プランがおすすめです。
          </p>
        </FadeIn>

        <div className="mt-16 relative px-4 md:px-0">
          {/* モバイルスクロールインジケーター */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-6 text-[10px] font-bold uppercase tracking-widest text-gold/60">
            <span className="animate-pulse">←</span>
            <span>Swipe to Compare</span>
            <span className="animate-pulse">→</span>
          </div>

          <ul
            className="grid list-none items-stretch gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0"
            aria-label={text.sections.plans.listAria}
          >
            {plans.map((plan, index) => (
              <li
                key={plan.id}
                className={cn(
                  'h-full min-w-[280px] snap-center md:min-w-0',
                  // Signatureプランは少し上にずらして強調（PCのみ）
                  plan.id === 'signature' && 'md:-mt-4 md:mb-4'
                )}
              >
                <PlanCard plan={plan} delay={index * 150} />
              </li>
            ))}
          </ul>
        </div>

        <FadeIn direction="scale" delay={500} easing="bounce" className="mt-16 flex justify-center">
          <Button href="/contact" variant="glow" className="px-12" aria-label={text.sections.plans.ctaAria}>
            {text.sections.plans.cta}
          </Button>
        </FadeIn>
      </Container>
      {/* セクション下部の装飾 */}
      <SectionDivider variant="diamond" className="mt-8" />
    </Section>
  );
}
