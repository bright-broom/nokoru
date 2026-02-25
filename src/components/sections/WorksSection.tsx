import Image from 'next/image';
import Link from 'next/link';
import { Section, Container, SectionHeader, Button, FadeIn } from '@/components/ui';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';
import { WorksCarousel } from '@/components/works/WorksCarousel';
import { workImages, text } from '@/config';
import type { WorkImage } from '@/types';

function WorkCard({
  image,
  priority,
  className,
  delay = 0,
}: {
  image: WorkImage;
  priority?: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <FadeIn direction="scale-up" delay={delay} duration={900} easing="smooth" className={className}>
      <Link href={`/works/${image.id}`} className="group relative block h-full overflow-hidden rounded-2xl bg-white shadow-elevated transition-all duration-700 hover:shadow-premium hover:-translate-y-2">
        {/* 背景の柔らかなグロー */}
        <div className="absolute -inset-2 bg-gradient-to-br from-site-accent/10 via-transparent to-gold/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

        <div className="relative h-full min-h-[250px] w-full overflow-hidden rounded-2xl">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-110"
          />

          {/* プレミアム・オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 transition-opacity duration-700 group-hover:opacity-70" />

          {/* エディトリアル・コンテンツ */}
          <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            {image.locationTag && (
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-6 bg-gold/60" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-light">
                  {image.locationTag}
                </span>
              </div>
            )}
            <h3 className="font-display text-xl leading-tight text-white tracking-wide md:text-2xl">
              {image.alt}
            </h3>

            {/* Discover More link */}
            <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">
              <span>View Story</span>
              <div className="h-px w-0 bg-white/40 transition-all duration-500 group-hover:w-8" />
            </div>
          </div>

          {/* 装飾コーナー */}
          <div className="absolute top-4 right-4 h-8 w-8 opacity-0 transition-opacity duration-700 group-hover:opacity-40">
            <div className="absolute top-0 right-0 h-px w-full bg-white" />
            <div className="absolute top-0 right-0 h-full w-px bg-white" />
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

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
              className="aspect-video md:aspect-21/9"
            />
          )}

          <div className="grid gap-6 md:grid-cols-12">
            {rest.map((img, idx) => (
              <WorkCard
                key={img.id}
                image={img}
                delay={(idx + 1) * 100}
                className={`aspect-4/3 ${img.gridSpan === 7 ? 'md:col-span-7' : 'md:col-span-5'}`}
              />
            ))}
          </div>
        </div>

        <FadeIn direction="scale" delay={300} easing="bounce" className="mt-14 flex justify-center">
          <Button href="/contact" variant="gradient" aria-label={text.sections.works.ctaAria}>
            {text.sections.works.cta}
          </Button>
        </FadeIn>
      </Container>

      {/* セクション下部の装飾ライン */}
      <SectionDivider variant="gradient" className="mt-8" />
    </Section>
  );
}
