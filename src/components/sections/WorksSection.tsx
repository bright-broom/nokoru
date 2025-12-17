import Image from 'next/image';
import { Section, Container, SectionHeader, Button, FadeIn } from '@/components/ui';
import { workImages } from '@/config/site';

function WorkCard({
  src,
  alt,
  locationTag,
  priority,
  className,
  delay = 0,
}: {
  src: string;
  alt: string;
  locationTag?: string;
  priority?: boolean;
  className?: string;
  delay?: number;
}) {
  return (
    <FadeIn direction="up" delay={delay} className={className}>
      <figure className="group relative h-full overflow-hidden rounded-2xl border border-beige bg-white shadow-sm">
        <div className="relative h-full min-h-[220px] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-80" />
        </div>

        {(locationTag || alt) && (
          <figcaption className="absolute bottom-0 left-0 right-0 p-4">
            {locationTag && (
              <span className="mb-2 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs tracking-wide text-text">
                {locationTag}
              </span>
            )}
            <p className="text-sm text-white/95 drop-shadow">{alt}</p>
          </figcaption>
        )}
      </figure>
    </FadeIn>
  );
}

export function WorksSection() {
  const featured = workImages.find((img) => img.id === 'works-couple-sea');
  const rest = workImages.filter((img) => img.id !== 'works-couple-sea');

  return (
    <Section id="works" aria-labelledby="works-heading">
      <Container>
        <SectionHeader
          id="works-heading"
          title="Works"
          subtitle="作品ギャラリー"
        />

        <div className="mt-16 grid gap-6">
          {featured && (
            <WorkCard
              src={featured.src}
              alt={featured.alt}
              locationTag={featured.locationTag}
              priority
              className="aspect-[16/9] md:aspect-[21/9]"
            />
          )}

          <div className="grid gap-6 md:grid-cols-12">
            {rest.map((img, idx) => (
              <WorkCard
                key={img.id}
                src={img.src}
                alt={img.alt}
                locationTag={img.locationTag}
                delay={(idx + 1) * 100}
                className={[
                  // ほどよく"編集された感"が出るモザイク配置
                  idx === 0 ? 'md:col-span-7 aspect-[4/3]' : '',
                  idx === 1 ? 'md:col-span-5 aspect-[4/3]' : '',
                  idx === 2 ? 'md:col-span-5 aspect-[4/3]' : '',
                  idx === 3 ? 'md:col-span-7 aspect-[4/3]' : '',
                ].join(' ')}
              />
            ))}
          </div>
        </div>

        <FadeIn direction="up" className="mt-14 flex justify-center">
          <Button href="#contact" aria-label="お問い合わせへ移動">
            撮影の相談をする
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}


