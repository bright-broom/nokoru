import Image from 'next/image';
import { Section, Container, SectionHeader, Button, FadeIn } from '@/components/ui';
import { workImages } from '@/config/site';
import { text } from '@/config/text';
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
      <figure className="group relative h-full overflow-hidden rounded-2xl border border-beige bg-white shadow-sm">
        <div className="relative h-full min-h-[220px] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-black/0 to-black/0 opacity-80" />
        </div>

        {(image.locationTag || image.alt) && (
          <figcaption className="absolute bottom-0 left-0 right-0 p-4">
            {image.locationTag && (
              <span className="mb-2 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs tracking-wide text-text">
                {image.locationTag}
              </span>
            )}
            <p className="text-sm text-white/95 drop-shadow">{image.alt}</p>
          </figcaption>
        )}
      </figure>
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

        <div className="mt-16 grid gap-6">
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
          <Button href="#contact" aria-label={text.sections.works.ctaAria}>
            {text.sections.works.cta}
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
