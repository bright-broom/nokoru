import dynamic from 'next/dynamic';
import { Section, Container, SectionHeader, FadeIn } from '@/components/ui';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { ClockIcon, CheckIcon, iconMap, type IconMapKey } from '@/components/icons';
import { text } from '@/config';
import { cn, cardStyles } from '@/lib/utils';

// Cal.comを遅延読み込み
const CalEmbed = dynamic(
  () => import('@/components/ui/CalEmbed').then((mod) => mod.CalEmbed),
  {
    loading: () => (
      <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-white/50 backdrop-blur-sm">
        <div className="text-center">
          <div className="relative mx-auto mb-4 h-12 w-12">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-site-accent" />
            <div className="absolute inset-1 animate-spin rounded-full border-2 border-transparent border-b-gold" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <p className="text-sm text-text-light">{text.sections.booking.loadingCalendar}</p>
        </div>
      </div>
    ),
  }
);

export interface BookingSectionProps {
  calLink: string;
}

interface ConsultationCardProps {
  title: string;
  duration: string;
  description: string;
  icon: IconMapKey;
  delay: number;
  index: number;
}

function ConsultationCard({ title, duration, description, icon, delay, index }: ConsultationCardProps) {
  const Icon = iconMap[icon];

  return (
    <FadeIn direction="scale-up" delay={delay} duration={900} easing="smooth">
      <div
        className={cn(
          'group relative h-full overflow-hidden rounded-[32px] bg-white p-10',
          'border border-site-accent/5 shadow-elevated transition-all duration-700',
          'hover:shadow-premium hover:-translate-y-3'
        )}
      >
        {/* 背景の柔らかなアクセント */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-site-accent/5 via-transparent to-transparent opacity-60 transition-all duration-700 group-hover:from-site-accent/15" aria-hidden="true" />

        {/* 番号バッジ - 洗練 */}
        <div
          className="absolute top-6 right-8 font-display text-4xl text-site-accent/5 transition-all duration-700 group-hover:text-site-accent/10"
          aria-hidden="true"
        >
          0{index + 1}
        </div>

        <div className="relative">
          {/* Icon - ラグジュアリー */}
          <div className="relative mb-10 h-20 w-20">
            <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-beige/40 transition-all duration-700 group-hover:bg-site-accent group-hover:shadow-glow group-hover:shadow-site-accent/30">
              <Icon className="h-10 w-10 text-site-accent transition-all duration-700 group-hover:text-white group-hover:scale-110" />
            </div>
            {/* 装飾アクセント */}
            <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-gold/10 backdrop-blur-sm transition-all duration-700 group-hover:bg-gold group-hover:scale-125" />
          </div>

          {/* Content */}
          <div className="text-left">
            <h3 className="font-display text-lg tracking-wide transition-colors duration-500 group-hover:text-site-accent md:text-xl">
              {title}
            </h3>

            {/* 時間バッジ - プレミアム */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-1.5 bg-gold/5">
              <ClockIcon className="h-3.5 w-3.5 text-gold" />
              <span className="track-label text-xs font-bold uppercase text-gold">{duration}</span>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-text-light/90">
              {description}
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function ProcessStep({
  step,
  title,
  description,
  isLast,
  delay,
}: {
  step: string;
  title: string;
  description: string;
  isLast: boolean;
  delay: number;
}) {
  return (
    <FadeIn direction="scale-up" delay={delay} duration={800} easing="smooth" className="flex flex-1 items-center gap-6">
      <div className="relative shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-site-accent shadow-premium ring-1 ring-site-accent/10 font-display text-lg">
          {step}
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-sm font-bold tracking-wide text-text uppercase">{title}</p>
        <p className="mt-0.5 text-xs text-text-light/70 tracking-wide leading-relaxed">{description}</p>
      </div>

      {!isLast && (
        <div className="hidden flex-1 md:block ml-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-site-accent/20 via-beige to-transparent" />
        </div>
      )}
    </FadeIn>
  );
}

export function BookingSection({ calLink }: BookingSectionProps) {
  const { consultationCards, processSteps } = text.sections.booking;

  return (
    <Section id="booking" aria-labelledby="booking-heading" className="relative overflow-hidden">
      {/* 背景装飾 - プレミアム */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FloatingDecoration shape="lace" size="xl" color="accent" opacity={10} position={{ top: '-10%', left: '-10%' }} />
        <FloatingDecoration shape="lace" size="lg" color="gold" opacity={5} position={{ bottom: '10%', right: '5%' }} animationDelay={2000} />
        <FloatingDecoration shape="blur" size="xl" color="beige" opacity={40} position={{ top: '30%', right: '10%' }} />
      </div>

      <Container className="relative z-10">
        {/* Header with Luxury Free Badge */}
        <FadeIn direction="scale" easing="smooth">
          <div className="mb-10 flex justify-center">
            <div className="track-super group relative inline-flex items-center gap-3 rounded-full border border-site-accent/5 bg-white px-8 py-3 text-xs font-bold uppercase text-site-accent shadow-elevated">
              <CheckIcon className="h-4 w-4 text-gold" />
              <span>{text.sections.booking.freeBadge}</span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-12 bg-gold/40 rounded-full" />
            </div>
          </div>
        </FadeIn>

        <SectionHeader
          id="booking-heading"
          title={text.sections.booking.title}
          subtitle={text.sections.booking.subtitle}
          className="mb-16"
        />

        {/* Description - Editorial */}
        <FadeIn direction="blur-up" delay={200} duration={1200}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-lg leading-relaxed text-text/80 tracking-wide md:text-xl">
              {text.sections.booking.description}
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-gold/30" />
              <p className="track-label text-sm font-bold uppercase text-text-light/60">
                {text.sections.booking.subDescription}
              </p>
              <span className="h-px w-8 bg-gold/30" />
            </div>
          </div>
        </FadeIn>

        {/* Consultation Types - Luxury Cards */}
        <div className="mx-auto mt-24 grid max-w-6xl gap-8 md:grid-cols-3">
          {consultationCards.map((card, index) => (
            <ConsultationCard
              key={card.title}
              title={card.title}
              duration={card.duration}
              description={card.description}
              icon={card.icon as IconMapKey}
              delay={400 + index * 150}
              index={index}
            />
          ))}
        </div>

        {/* Process Visualizer */}
        <FadeIn direction="blur-up" delay={800}>
          <div className="mx-auto mt-32 max-w-5xl">
            <div className="relative overflow-hidden rounded-[40px] bg-beige/10 p-12 border border-beige/40">
              <div className="absolute top-0 right-0 p-8 font-display text-8xl text-beige/20 select-none">✦</div>

              <p className="track-ultra mb-12 text-center text-xs font-bold uppercase text-site-accent/40">
                The Journey of Your Story
              </p>

              <div className="flex flex-col gap-10 md:flex-row md:items-center">
                {processSteps.map((step, index) => (
                  <ProcessStep
                    key={step.step}
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    isLast={index === processSteps.length - 1}
                    delay={1000 + index * 150}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Calendar - Grand Stage */}
        <FadeIn direction="blur-up" delay={1200}>
          <div className="mt-32">
            <div className="mb-16 flex flex-col items-center">
              <h3 className="font-display text-base tracking-widest text-text md:text-lg">
                {text.sections.booking.calendarHeading}
              </h3>
              <div className="mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>

            <div className="group relative mx-auto max-w-5xl">
              <div className="absolute -inset-10 rounded-[40px] bg-gradient-to-br from-site-accent/10 via-gold/5 to-site-accent/10 blur-3xl opacity-40 transition-opacity duration-1000 group-hover:opacity-70" aria-hidden="true" />

              <div className="relative overflow-hidden rounded-[32px] bg-white shadow-premium p-1 md:p-2 ring-1 ring-site-accent/5">
                <CalEmbed calLink={calLink} />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Fine Print - Elegant */}
        <FadeIn direction="blur-up" delay={1500}>
          <div className="mx-auto mt-20 flex max-w-3xl flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16">
            {text.sections.booking.notes.map((note, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 text-sm text-text-light/60 transition-all duration-500 hover:text-site-accent"
              >
                <div className="h-2 w-2 rounded-full border border-gold/40 transition-all duration-500 group-hover:bg-gold group-hover:scale-125" />
                <span className="tracking-wide">{note}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
      <SectionDivider variant="wave" className="mt-16" />
    </Section>
  );
}
