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
    <FadeIn direction="scale-up" delay={delay} duration={1000} easing="smooth">
      <Link
        href={`/services/${service.id}`}
        className="group relative block h-full overflow-hidden rounded-2xl bg-white p-10 shadow-elevated transition-all duration-700 hover:shadow-premium hover:-translate-y-2"
      >
        {/* 透明感のあるアクセント背景 */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-site-accent/5 via-transparent to-transparent transition-all duration-700 group-hover:from-site-accent/15" aria-hidden="true" />

        {/* コンテンツ */}
        <div className="relative">
          {/* アイコン - 洗練された表示 */}
          <div className="mb-10 inline-flex">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-beige/50 transition-all duration-700 group-hover:bg-site-accent group-hover:shadow-glow group-hover:shadow-site-accent/20">
                <Icon className="h-10 w-10 text-site-accent transition-all duration-700 group-hover:text-white group-hover:scale-110" />
              </div>
              <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-gold/10 backdrop-blur-sm shadow-sm transition-all duration-700 group-hover:bg-gold group-hover:scale-125" aria-hidden="true" />
            </div>
          </div>

          <h3 className="font-display text-3xl tracking-wide transition-colors duration-500 group-hover:text-site-accent">
            {service.title}
          </h3>

          <p className="mt-6 text-[15px] leading-relaxed text-text-light/90">
            {renderMultilineText(service.description)}
          </p>

          <div className="mt-10 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-site-accent/60 transition-all duration-500 group-hover:text-site-accent group-hover:gap-6">
            <span>Discover Experience</span>
            <div className="h-px w-10 bg-site-accent/20 transition-all duration-500 group-hover:w-16 group-hover:bg-site-accent" aria-hidden="true" />
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
