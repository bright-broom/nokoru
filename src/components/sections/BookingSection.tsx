import dynamic from 'next/dynamic';
import { Section, Container, SectionHeader, FadeIn } from '@/components/ui';
import { CameraIcon, FilmIcon, PackageIcon, ClockIcon, CheckIcon } from '@/components/icons';
import { text } from '@/config';
import { cn } from '@/lib/utils';

// Cal.comを遅延読み込み
const CalEmbed = dynamic(
  () => import('@/components/ui/CalEmbed').then((mod) => mod.CalEmbed),
  {
    loading: () => (
      <div className="flex min-h-[500px] items-center justify-center rounded-xl bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-beige border-t-site-accent" />
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
}

function ConsultationCard({ title, duration, description, icon, delay }: ConsultationCardProps) {
  const Icon = iconMap[icon];

  return (
    <FadeIn direction="up" delay={delay}>
      <div
        className={cn(
          'group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm',
          'border-2 border-transparent transition-all duration-300',
          'hover:border-site-accent/30 hover:shadow-md hover:-translate-y-1'
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            'mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full',
            'bg-site-accent/10 transition-all duration-300',
            'group-hover:bg-site-accent group-hover:scale-110'
          )}
        >
          <Icon
            className={cn(
              'h-6 w-6 text-site-accent transition-colors duration-300',
              'group-hover:text-white'
            )}
          />
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="font-display text-lg">{title}</h3>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-site-accent/10 px-3 py-1">
            <ClockIcon className="h-3.5 w-3.5 text-site-accent" />
            <span className="text-sm font-medium text-site-accent">{duration}</span>
          </div>
          <p className="mt-3 text-sm text-text-light">{description}</p>
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
    <FadeIn direction="up" delay={delay} className="flex items-center gap-3">
      {/* Step number */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-site-accent text-sm font-semibold text-white">
        {step}
      </div>

      {/* Content */}
      <div className="min-w-0">
        <p className="text-sm font-medium text-text">{title}</p>
        <p className="text-xs text-text-light">{description}</p>
      </div>

      {/* Connector */}
      {!isLast && (
        <div className="hidden flex-1 md:block">
          <div className="h-0.5 w-full bg-linear-to-r from-site-accent/30 to-site-accent/10" />
        </div>
      )}
    </FadeIn>
  );
}

export function BookingSection({ calLink }: BookingSectionProps) {
  const { consultationCards, processSteps } = text.sections.booking;

  return (
    <Section id="booking" variant="alternate" aria-labelledby="booking-heading">
      <Container>
        {/* Header with Free Badge */}
        <FadeIn direction="up">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
              <CheckIcon className="h-4 w-4" />
              {text.sections.booking.freeBadge}
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
        <FadeIn direction="up" delay={100}>
          <div className="mx-auto mt-6 max-w-xl text-center">
            <p className="text-text-light">{text.sections.booking.description}</p>
            <p className="mt-2 text-sm text-text-light/80">
              {text.sections.booking.subDescription}
            </p>
          </div>
        </FadeIn>

        {/* Consultation Type Cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {consultationCards.map((card, index) => (
            <ConsultationCard
              key={card.title}
              title={card.title}
              duration={card.duration}
              description={card.description}
              icon={card.icon as keyof typeof iconMap}
              delay={200 + index * 100}
            />
          ))}
        </div>

        {/* Process Steps */}
        <FadeIn direction="up" delay={500}>
          <div className="mx-auto mt-12 max-w-2xl rounded-xl bg-white/50 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.step}
                  step={step.step}
                  title={step.title}
                  description={step.description}
                  isLast={index === processSteps.length - 1}
                  delay={600 + index * 100}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Calendar Section */}
        <FadeIn direction="up" delay={700}>
          <div className="mt-12">
            <h3 className="mb-6 text-center font-display text-xl text-text">
              {text.sections.booking.calendarHeading}
            </h3>
            <div className="overflow-hidden rounded-xl bg-white shadow-lg">
              <CalEmbed calLink={calLink} />
            </div>
          </div>
        </FadeIn>

        {/* Notes */}
        <FadeIn direction="up" delay={800}>
          <div className="mx-auto mt-8 flex max-w-lg flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
            {text.sections.booking.notes.map((note, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-text-light"
              >
                <CheckIcon className="h-4 w-4 shrink-0 text-green-600" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
