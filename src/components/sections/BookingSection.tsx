import dynamic from 'next/dynamic';
import { Section, Container, SectionHeader, FadeIn } from '@/components/ui';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { CameraIcon, FilmIcon, PackageIcon, ClockIcon, CheckIcon } from '@/components/icons';
import { text } from '@/config';
import { cn } from '@/lib/utils';

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

const iconMap = {
  camera: CameraIcon,
  film: FilmIcon,
  package: PackageIcon,
} as const;

interface ConsultationCardProps {
  title: string;
  duration: string;
  description: string;
  icon: keyof typeof iconMap;
  delay: number;
  index: number;
}

function ConsultationCard({ title, duration, description, icon, delay, index }: ConsultationCardProps) {
  const Icon = iconMap[icon];

  return (
    <FadeIn direction="scale-up" delay={delay} duration={600} easing="smooth">
      <div
        className={cn(
          'group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8',
          'border border-white/50 shadow-lg transition-all duration-500',
          'hover:bg-white hover:shadow-2xl hover:-translate-y-3 hover:shadow-site-accent/10'
        )}
      >
        {/* 背景グロー */}
        <div
          className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-site-accent/0 to-gold/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-site-accent/20 group-hover:to-gold/10 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* 上部装飾ライン */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-gradient-to-r from-site-accent via-gold to-site-accent transition-all duration-500 rounded-b-full group-hover:w-2/3"
          aria-hidden="true"
        />

        {/* 番号バッジ */}
        <div
          className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-beige/50 text-xs text-text-light/50 transition-all duration-300 group-hover:bg-site-accent/10 group-hover:text-site-accent"
          aria-hidden="true"
        >
          0{index + 1}
        </div>

        <div className="relative">
          {/* Icon */}
          <div className="relative mx-auto mb-6 h-16 w-16">
            {/* 外側リング */}
            <div
              className="absolute -inset-2 rounded-full border border-site-accent/10 transition-all duration-500 group-hover:border-site-accent/30 group-hover:scale-110"
              aria-hidden="true"
            />

            {/* メインアイコン背景 */}
            <div
              className={cn(
                'flex h-full w-full items-center justify-center rounded-full',
                'bg-gradient-to-br from-site-accent/10 to-gold/5 transition-all duration-500',
                'group-hover:from-site-accent group-hover:to-site-accent-light group-hover:shadow-lg group-hover:shadow-site-accent/30'
              )}
            >
              <Icon
                className={cn(
                  'h-7 w-7 text-site-accent transition-all duration-500',
                  'group-hover:text-white group-hover:scale-110'
                )}
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 className="font-display text-xl tracking-wide transition-colors duration-300 group-hover:text-site-accent">
              {title}
            </h3>

            {/* 時間バッジ */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-site-accent/5 to-gold/5 px-4 py-1.5 border border-site-accent/10">
              <ClockIcon className="h-4 w-4 text-site-accent" />
              <span className="text-sm font-medium gradient-text">{duration}</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-text-light">
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
    <FadeIn direction="scale-up" delay={delay} easing="smooth" className="flex items-center gap-4">
      {/* Step number */}
      <div className="relative">
        {/* 外側リング */}
        <div
          className="absolute -inset-1 rounded-full border border-site-accent/20"
          aria-hidden="true"
        />
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-site-accent to-site-accent-light text-sm font-semibold text-white shadow-md shadow-site-accent/20">
          {step}
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0">
        <p className="text-sm font-medium text-text">{title}</p>
        <p className="text-xs text-text-light">{description}</p>
      </div>

      {/* Connector */}
      {!isLast && (
        <div className="hidden flex-1 md:block">
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-beige">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-site-accent/50 to-transparent" />
          </div>
        </div>
      )}
    </FadeIn>
  );
}

export function BookingSection({ calLink }: BookingSectionProps) {
  const { consultationCards, processSteps } = text.sections.booking;

  return (
    <Section id="booking" variant="alternate" aria-labelledby="booking-heading" className="relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FloatingDecoration
          shape="blur"
          size="xl"
          color="accent"
          opacity={4}
          position={{ top: '5%', left: '-10%' }}
          animationDelay={0}
        />
        <FloatingDecoration
          shape="blur"
          size="lg"
          color="gold"
          opacity={5}
          position={{ bottom: '10%', right: '-5%' }}
          animationDelay={2000}
        />
        <FloatingDecoration
          shape="ring"
          size="md"
          color="accent"
          opacity={8}
          position={{ top: '40%', right: '5%' }}
          animationDelay={1000}
        />
        <FloatingDecoration
          shape="ring"
          size="sm"
          color="gold"
          opacity={10}
          position={{ bottom: '30%', left: '8%' }}
          animationDelay={3000}
        />
      </div>

      <Container className="relative z-10">
        {/* Header with Free Badge */}
        <FadeIn direction="scale" easing="bounce">
          <div className="mb-6 flex justify-center">
            <span className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 px-5 py-2 text-sm font-semibold text-emerald-700 shadow-sm border border-emerald-100">
              {/* グロー効果 */}
              <span
                className="absolute -inset-1 rounded-full bg-emerald-400/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <CheckIcon className="relative h-4 w-4" />
              <span className="relative">{text.sections.booking.freeBadge}</span>
            </span>
          </div>
        </FadeIn>

        <SectionHeader
          id="booking-heading"
          title={text.sections.booking.title}
          subtitle={text.sections.booking.subtitle}
          className="text-center"
        />

        {/* Description */}
        <FadeIn direction="blur-up" delay={100}>
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <p className="text-lg text-text-light leading-relaxed">{text.sections.booking.description}</p>
            <p className="mt-3 text-sm text-text-light/70">
              {text.sections.booking.subDescription}
            </p>
          </div>
        </FadeIn>

        {/* 区切り装飾 */}
        <FadeIn direction="scale" delay={200}>
          <div className="my-12 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-beige" />
            <span className="text-beige">{text.footer.decorativeMark}</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-beige" />
          </div>
        </FadeIn>

        {/* Consultation Type Cards */}
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          {consultationCards.map((card, index) => (
            <ConsultationCard
              key={card.title}
              title={card.title}
              duration={card.duration}
              description={card.description}
              icon={card.icon as keyof typeof iconMap}
              delay={300 + index * 100}
              index={index}
            />
          ))}
        </div>

        {/* Process Steps */}
        <FadeIn direction="blur-up" delay={600}>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm p-8 shadow-lg border border-white/50">
              {/* プロセスヘッダー */}
              <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-text-light/50">
                Booking Process
              </p>

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-4">
                {processSteps.map((step, index) => (
                  <ProcessStep
                    key={step.step}
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    isLast={index === processSteps.length - 1}
                    delay={700 + index * 100}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Calendar Section */}
        <FadeIn direction="blur-up" delay={900}>
          <div className="mt-16">
            <h3 className="mb-8 text-center">
              <span className="font-display text-2xl tracking-wide text-text">
                {text.sections.booking.calendarHeading}
              </span>
              <span className="mt-2 block h-px w-24 mx-auto bg-gradient-to-r from-transparent via-site-accent/30 to-transparent" />
            </h3>

            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/5 border border-beige/30">
              {/* 上部装飾 */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-site-accent via-gold to-site-accent" aria-hidden="true" />

              <CalEmbed calLink={calLink} />
            </div>
          </div>
        </FadeIn>

        {/* Notes */}
        <FadeIn direction="blur-up" delay={1000}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
            {text.sections.booking.notes.map((note, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 text-sm text-text-light transition-colors duration-300 hover:text-text"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 transition-all duration-300 group-hover:bg-emerald-100 group-hover:scale-110">
                  <CheckIcon className="h-3.5 w-3.5 text-emerald-600" />
                </span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>

      {/* セクション下部の装飾 */}
      <SectionDivider variant="wave" className="mt-16" />
    </Section>
  );
}
