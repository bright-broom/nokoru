import dynamic from 'next/dynamic';
import { Section, Container, SectionHeader } from '@/components/ui';
import { text } from '@/config/text';

// Cal.comを遅延読み込み
const CalEmbed = dynamic(
  () => import('@/components/ui/CalEmbed').then((mod) => mod.CalEmbed),
  {
    loading: () => (
      <div className="flex min-h-[500px] items-center justify-center rounded-lg bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-beige border-t-site-accent" />
          <p className="text-sm text-text-light">{text.sections.booking.loadingCalendar}</p>
        </div>
      </div>
    ),
  }
);

export interface BookingSectionProps {
  /**
   * Cal.comのユーザー名/イベントタイプ
   * Example: silver-lace-weddings or silver-lace-weddings/consultation
   */
  calLink: string;
}

export function BookingSection({ calLink }: BookingSectionProps) {
  return (
    <Section id="booking" variant="alternate" aria-labelledby="booking-heading">
      <Container>
        <SectionHeader
          id="booking-heading"
          title={text.sections.booking.title}
          subtitle={text.sections.booking.subtitle}
          className="text-center"
        />

        <div className="mt-12">
          {/* 説明テキスト */}
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-text-light whitespace-pre-line">
              {text.sections.booking.description}
            </p>
          </div>

          {/* 相談メニュー説明 */}
          <div className="mx-auto mb-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            <ConsultationTypeCard
              title={text.sections.booking.consultationCards[0].title}
              duration={text.sections.booking.consultationCards[0].duration}
              description={text.sections.booking.consultationCards[0].description}
            />
            <ConsultationTypeCard
              title={text.sections.booking.consultationCards[1].title}
              duration={text.sections.booking.consultationCards[1].duration}
              description={text.sections.booking.consultationCards[1].description}
            />
            <ConsultationTypeCard
              title={text.sections.booking.consultationCards[2].title}
              duration={text.sections.booking.consultationCards[2].duration}
              description={text.sections.booking.consultationCards[2].description}
            />
          </div>

          {/* Cal.com埋め込み */}
          <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
            <CalEmbed calLink={calLink} />
          </div>

          {/* 注意事項 */}
          <div className="mt-6 text-center text-sm text-text-light">
            <p>{text.sections.booking.notes[0]}</p>
            <p className="mt-1">{text.sections.booking.notes[1]}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * 相談タイプカード
 */
function ConsultationTypeCard({
  title,
  duration,
  description,
}: {
  title: string;
  duration: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-white p-4 text-center shadow-sm">
      <h3 className="font-display text-lg">{title}</h3>
      <p className="mt-1 text-sm font-medium text-site-accent">{duration}</p>
      <p className="mt-2 text-xs text-text-light">{description}</p>
    </div>
  );
}
