import dynamic from 'next/dynamic';
import { Section, Container, SectionHeader } from '@/components/ui';

// Cal.comを遅延読み込み
const CalEmbed = dynamic(
  () => import('@/components/ui/CalEmbed').then((mod) => mod.CalEmbed),
  {
    loading: () => (
      <div className="flex min-h-[500px] items-center justify-center rounded-lg bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-beige border-t-site-accent" />
          <p className="text-sm text-text-light">カレンダーを読み込み中...</p>
        </div>
      </div>
    ),
  }
);

export interface BookingSectionProps {
  /**
   * Cal.comのユーザー名/イベントタイプ
   * 例: "silver-lace-weddings" または "silver-lace-weddings/consultation"
   */
  calLink: string;
}

export function BookingSection({ calLink }: BookingSectionProps) {
  return (
    <Section id="booking" variant="alternate" aria-labelledby="booking-heading">
      <Container>
        <SectionHeader
          id="booking-heading"
          title="Book a Consultation"
          subtitle="無料オンライン相談のご予約"
          className="text-center"
        />

        <div className="mt-12">
          {/* 説明テキスト */}
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-text-light">
              ご希望の日時を選択して、オンライン相談をご予約ください。
              <br />
              予約完了後、Google Meetの参加URLをメールでお送りします。
            </p>
          </div>

          {/* 相談メニュー説明 */}
          <div className="mx-auto mb-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            <ConsultationTypeCard
              title="ロケーション前撮り"
              duration="60分"
              description="撮影場所・衣装・スケジュールのご相談"
            />
            <ConsultationTypeCard
              title="ムービー制作"
              duration="45分"
              description="オープニングムービーの構成・演出相談"
            />
            <ConsultationTypeCard
              title="総合プラン"
              duration="90分"
              description="前撮り＋ムービーのトータルプラン相談"
            />
          </div>

          {/* Cal.com埋め込み */}
          <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
            <CalEmbed calLink={calLink} />
          </div>

          {/* 注意事項 */}
          <div className="mt-6 text-center text-sm text-text-light">
            <p>
              ※ 予約確定後、確認メールをお送りします。届かない場合は迷惑メールフォルダをご確認ください。
            </p>
            <p className="mt-1">
              ※ キャンセル・日程変更は、メール内のリンクから24時間前まで可能です。
            </p>
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
