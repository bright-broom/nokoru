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
    <FadeIn direction="scale-up" delay={delay} duration={700} easing="smooth" className={className}>
      <Link href={`/works/${image.id}`} className="block h-full perspective-1000">
        <figure className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:shadow-site-accent/10">
          {/* 背景グロー */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-site-accent/0 to-gold/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-site-accent/20 group-hover:to-gold/10 group-hover:opacity-100" />

          <div className="relative h-full min-h-[220px] w-full overflow-hidden rounded-2xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-700 group-hover:scale-110"
            />
            {/* グラデーションオーバーレイ - リッチ化 */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

            {/* シマー効果 */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] transition-transform duration-1000 group-hover:translate-x-[200%]" />
          </div>

          {(image.locationTag || image.alt) && (
            <figcaption className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300 group-hover:translate-y-0">
              {image.locationTag && (
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-medium tracking-wide text-text shadow-md transition-all duration-300 group-hover:bg-white group-hover:shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-site-accent animate-pulse" aria-hidden="true" />
                  {image.locationTag}
                </span>
              )}
              <p className="text-sm font-medium text-white drop-shadow-lg md:text-base">{image.alt}</p>
            </figcaption>
          )}

          {/* Hover overlay indicator - リッチ化 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
            <span className="rounded-full bg-white/95 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-text shadow-xl transform scale-90 transition-transform duration-300 group-hover:scale-100">
              詳細を見る
            </span>
          </div>
        </figure>
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
