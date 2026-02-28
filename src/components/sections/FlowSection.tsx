import { memo } from 'react';
import { Section, Container, SectionHeader, FadeIn, SectionCTA, FloatingDecoration, cardPreset, contentPreset } from '@/components/ui';
import { text } from '@/config';
import { cn } from '@/lib/utils';
import { ANIMATION_DELAYS } from '@/lib/constants';

interface FlowStepData {
  step: string;
  title: string;
  description: string;
  duration: string;
}

const FlowStep = memo(function FlowStep({
  step,
  index,
  isLast,
}: {
  step: FlowStepData;
  index: number;
  isLast: boolean;
}) {
  return (
    <FadeIn {...cardPreset} delay={index * ANIMATION_DELAYS.CARD_STAGGER} className="relative">
      <div className="flex gap-6">
        {/* ステップ番号とライン */}
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold/80 shadow-glow-gold">
            <span className="font-display text-lg text-white">{step.step}</span>
          </div>
          {!isLast && (
            <div className="mt-4 h-full w-px bg-gradient-to-b from-gold/40 to-transparent" />
          )}
        </div>

        {/* コンテンツ */}
        <div className={cn('flex-1 pb-12', isLast && 'pb-0')}>
          <div className="flex items-center gap-3">
            <h3 className="font-display text-xl tracking-wide text-text">
              {step.title}
            </h3>
            <span className="rounded-full bg-beige/50 px-2.5 py-0.5 text-xs text-text-light/70">
              {step.duration}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-light/80">
            {step.description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
});

export function FlowSection() {
  const steps = text.sections.flow.steps;

  return (
    <Section id="flow" aria-labelledby="flow-heading" className="relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FloatingDecoration
          shape="blur"
          size="lg"
          color="gold"
          opacity={6}
          position={{ top: '10%', right: '5%' }}
          animationDelay={0}
        />
        <FloatingDecoration
          shape="ring"
          size="md"
          color="accent"
          opacity={10}
          position={{ bottom: '20%', left: '10%' }}
          animationDelay={1500}
        />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          id="flow-heading"
          title={text.sections.flow.title}
          subtitle={text.sections.flow.subtitle}
        />

        {/* ステップ */}
        <div className="mx-auto mt-12 max-w-2xl">
          {steps.map((step, index) => (
            <FlowStep
              key={step.step}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* 注釈 */}
        <FadeIn {...contentPreset} delay={400} className="mt-8">
          <p className="text-center text-sm text-text-light/60">
            {text.sections.flow.note}
          </p>
        </FadeIn>

        {/* CTA */}
        <SectionCTA
          href="/#booking"
          label="無料相談を予約する"
          ariaLabel="予約セクションへ移動"
          variant="glow"
          delay={500}
        />
      </Container>
    </Section>
  );
}
