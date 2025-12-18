import Link from 'next/link';
import { Section, Container, SectionHeader, FadeIn, Button } from '@/components/ui';
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
    <FadeIn direction="up" delay={delay}>
      <Link
        href={`/services/${service.id}`}
        className="group relative block h-full overflow-hidden rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        {/* 背景装飾 */}
        <div
          className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-site-accent/5 transition-transform duration-500 group-hover:scale-150"
          aria-hidden="true"
        />

        {/* コンテンツ */}
        <div className="relative">
          {/* アイコン */}
          <div className="mb-6 inline-flex">
            <div className="relative">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-site-accent/10 transition-all duration-300 group-hover:bg-site-accent group-hover:shadow-lg"
                aria-hidden="true"
              >
                <Icon className="h-8 w-8 text-site-accent transition-colors duration-300 group-hover:text-white" />
              </div>
              {/* アイコン装飾 */}
              <div
                className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-beige transition-all duration-300 group-hover:bg-site-accent/30"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* タイトル */}
          <h3 className="font-display text-2xl tracking-wide transition-colors duration-300 group-hover:text-site-accent">
            {service.title}
          </h3>

          {/* 説明 */}
          <p className="mt-4 leading-relaxed text-text-light">
            {renderMultilineText(service.description)}
          </p>

          {/* 詳細リンク */}
          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-site-accent">
            <span>詳細を見る</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
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
    <Section id="services" variant="alternate" aria-labelledby="services-heading">
      <Container>
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

        <FadeIn direction="up" delay={400} className="mt-14 flex justify-center">
          <Button href="/contact" aria-label={text.sections.services.ctaAria}>
            {text.sections.services.cta}
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
