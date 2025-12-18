import { Section, Container, SectionHeader, FadeIn } from '@/components/ui';
import { VideoIcon, PlayIcon } from '@/components/icons';
import { services } from '@/config/site';
import { renderMultilineText } from '@/lib/helpers';
import type { Service } from '@/types';
import { text } from '@/config/text';

const iconMap = {
  video: VideoIcon,
  play: PlayIcon,
} as const;

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const Icon = iconMap[service.icon];

  return (
    <FadeIn direction="up" delay={delay}>
      <article className="text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cream"
          aria-hidden="true"
        >
          <Icon className="h-8 w-8 text-site-accent" />
        </div>
        <h3 className="font-display text-xl">{service.title}</h3>
        <p className="mt-3 text-text-light">
          {renderMultilineText(service.description)}
        </p>
      </article>
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
        <div
          className="mt-16 grid gap-12 md:grid-cols-2"
          role="list"
          aria-label={text.sections.services.listAria}
        >
          {services.map((service, index) => (
            <div key={service.id} role="listitem">
              <ServiceCard service={service} delay={index * 150} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
