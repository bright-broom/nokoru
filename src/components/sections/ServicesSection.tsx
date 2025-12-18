import Link from 'next/link';
import { Section, Container, SectionHeader, FadeIn, Button } from '@/components/ui';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';
import { VideoIcon, PlayIcon } from '@/components/icons';
import { services, text } from '@/config';
import { renderMultilineText } from '@/lib/helpers';
import type { Service } from '@/types';

const iconMap = {
  video: VideoIcon,
  play: PlayIcon,
} as const;

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const Icon = iconMap[service.icon];

  return (
    <FadeIn direction="scale-up" delay={delay} duration={700} easing="smooth">
      <Link
        href={`/services/${service.id}`}
        className="group relative block h-full overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:shadow-site-accent/10"
      >
        {/* グラデーションボーダー効果 */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-site-accent/0 via-transparent to-gold/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ padding: '1px' }}>
          <div className="h-full w-full rounded-2xl bg-white" />
        </div>

        {/* 背景グロー */}
        <div
          className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-site-accent/0 to-gold/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-site-accent/15 group-hover:to-gold/10 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* 背景装飾 - リッチ化 */}
        <div
          className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-br from-site-accent/10 to-gold/5 transition-all duration-700 group-hover:scale-150 group-hover:from-site-accent/15 group-hover:to-gold/10"
          aria-hidden="true"
        />

        {/* コンテンツ */}
        <div className="relative">
          {/* アイコン - グラデーション強化 */}
          <div className="mb-6 inline-flex">
            <div className="relative">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-site-accent/10 to-site-accent/5 transition-all duration-500 group-hover:from-site-accent group-hover:to-site-accent-light group-hover:shadow-lg group-hover:shadow-site-accent/25"
                aria-hidden="true"
              >
                <Icon className="h-8 w-8 text-site-accent transition-all duration-500 group-hover:text-white group-hover:scale-110" />
              </div>
              {/* アイコン装飾 - パルス効果 */}
              <div
                className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-gold/30 transition-all duration-500 group-hover:bg-gold/60 group-hover:scale-125"
                aria-hidden="true"
              />
              {/* リング装飾 */}
              <div
                className="absolute -inset-2 rounded-2xl border border-site-accent/0 transition-all duration-500 group-hover:border-site-accent/20"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* タイトル - グラデーション対応 */}
          <h3 className="font-display text-2xl tracking-wide transition-all duration-500 group-hover:text-site-accent">
            {service.title}
          </h3>

          {/* 説明 */}
          <p className="mt-4 leading-relaxed text-text-light">
            {renderMultilineText(service.description)}
          </p>

          {/* 詳細リンク - リッチ化 */}
          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-site-accent transition-all duration-300 group-hover:gap-3">
            <span>詳細を見る</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-site-accent/10 transition-all duration-300 group-hover:bg-site-accent group-hover:text-white" aria-hidden="true">
              →
            </span>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

export function ServicesSection() {
  return (
    <Section id="services" variant="alternate" aria-labelledby="services-heading" className="relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FloatingDecoration
          shape="blur"
          size="xl"
          color="accent"
          opacity={5}
          position={{ top: '-10%', left: '-10%' }}
          animationDelay={0}
        />
        <FloatingDecoration
          shape="ring"
          size="md"
          color="accent"
          opacity={8}
          position={{ bottom: '10%', right: '5%' }}
          animationDelay={1500}
        />
        <FloatingDecoration
          shape="ring"
          size="sm"
          color="gold"
          opacity={12}
          position={{ top: '30%', right: '10%' }}
          animationDelay={3000}
        />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          id="services-heading"
          title={text.sections.services.title}
          subtitle={text.sections.services.subtitle}
        />

        <ul
          className="mt-16 grid list-none gap-8 md:grid-cols-2"
          aria-label={text.sections.services.listAria}
        >
          {services.map((service, index) => (
            <li key={service.id}>
              <ServiceCard service={service} delay={index * 150} />
            </li>
          ))}
        </ul>

        <FadeIn direction="scale" delay={400} easing="bounce" className="mt-14 flex justify-center">
          <Button href="/contact" variant="gradient" aria-label={text.sections.services.ctaAria}>
            {text.sections.services.cta}
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
