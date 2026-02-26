import { Section, Container, SectionHeader, SectionCTA } from '@/components/ui';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';
import { WorksCarousel, WorkCard } from '@/components/works';
import { workImages, text } from '@/config';

export function WorksSection() {
  const featured = workImages.find((img) => img.isFeatured);
  const rest = workImages.filter((img) => !img.isFeatured);

  return (
    <Section id="works" aria-labelledby="works-heading" className="relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FloatingDecoration
          shape="blur"
          size="lg"
          color="accent"
          opacity={5}
          position={{ top: '10%', right: '-5%' }}
          animationDelay={0}
        />
        <FloatingDecoration
          shape="ring"
          size="sm"
          color="gold"
          opacity={10}
          position={{ bottom: '20%', left: '5%' }}
          animationDelay={2000}
        />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          id="works-heading"
          title={text.sections.works.title}
          subtitle={text.sections.works.subtitle}
        />

        {/* Mobile: Carousel */}
        <div className="mt-12">
          <WorksCarousel works={workImages} />
        </div>

        {/* Desktop: Grid Layout */}
        <div className="mt-16 hidden gap-6 md:grid">
          {featured && (
            <WorkCard
              image={featured}
              priority
              aspectRatio="aspect-video md:aspect-[1.618/1]"
            />
          )}

          <div className="grid gap-6 md:grid-cols-12">
            {rest.map((img, idx) => (
              <WorkCard
                key={img.id}
                image={img}
                delay={(idx + 1) * 100}
                className={img.gridSpan === 7 ? 'md:col-span-7' : 'md:col-span-5'}
                aspectRatio={img.gridSpan === 7 ? 'aspect-[1.618/1]' : 'aspect-[1/1.618]'}
              />
            ))}
          </div>
        </div>

        <SectionCTA
          href="/contact"
          label={text.sections.works.cta}
          ariaLabel={text.sections.works.ctaAria}
          delay={300}
        />
      </Container>

      {/* セクション下部の装飾ライン */}
      <SectionDivider variant="gradient" className="mt-8" />
    </Section>
  );
}
