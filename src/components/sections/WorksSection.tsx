import Image from 'next/image';
import Link from 'next/link';
import { Section, Container, SectionHeader, Button, FadeIn } from '@/components/ui';
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
    <FadeIn direction="up" delay={delay} className={className}>
      <Link href={`/works/${image.id}`} className="block h-full">
        <figure className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
          <div className="relative h-full min-h-[220px] w-full overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-black/0 opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
          </div>

          {(image.locationTag || image.alt) && (
            <figcaption className="absolute bottom-0 left-0 right-0 p-5">
              {image.locationTag && (
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium tracking-wide text-text shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-site-accent" aria-hidden="true" />
                  {image.locationTag}
                </span>
              )}
              <p className="text-sm font-medium text-white drop-shadow-md md:text-base">{image.alt}</p>
            </figcaption>
          )}

          {/* Hover overlay indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-text shadow-lg">
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
    <Section id="works" aria-labelledby="works-heading">
      <Container>
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

        <FadeIn direction="up" className="mt-14 flex justify-center">
          <Button href="/contact" aria-label={text.sections.works.ctaAria}>
            {text.sections.works.cta}
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
