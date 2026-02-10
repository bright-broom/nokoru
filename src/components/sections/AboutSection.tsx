import Image from 'next/image';
import Link from 'next/link';
import { Section, Container, SectionHeader, FadeIn, Button } from '@/components/ui';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';
import { staffMembers, text } from '@/config';
import type { Staff } from '@/types';

function StaffCard({ staff, isPriority, delay }: { staff: Staff; isPriority: boolean; delay: number }) {
  return (
    <FadeIn direction="scale-up" delay={delay} duration={1000} easing="smooth" className="h-full">
      <Link
        href={`/staff/${staff.id}`}
        className="group relative block h-full overflow-hidden rounded-2xl bg-white p-8 shadow-elevated transition-all duration-700 hover:shadow-premium hover:-translate-y-2 md:p-10"
      >
        {/* 背景の柔らかなアクセント */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-60 transition-all duration-1000 group-hover:scale-125 group-hover:from-gold/10" aria-hidden="true" />

        <div className="relative flex flex-col items-center text-center gap-8 sm:flex-row sm:items-start sm:text-left">
          {/* プロフィール画像 - エディトリアル・フレーム */}
          <div className="relative shrink-0">
            {/* 装飾リング */}
            <div className="absolute -inset-3 rounded-full border border-site-accent/5 transition-all duration-1000 group-hover:border-site-accent/20 group-hover:rotate-45" aria-hidden="true" />

            <figure className="relative h-32 w-32 overflow-hidden rounded-full bg-beige/30 p-1 md:h-40 md:w-40">
              <div className="h-full w-full overflow-hidden rounded-full ring-1 ring-gold/10">
                {staff.imageUrl ? (
                  <Image
                    src={staff.imageUrl}
                    alt={`${staff.name}${text.sections.about.profileAltSuffix}`}
                    fill
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                    sizes="(max-width: 640px) 128px, 160px"
                    priority={isPriority}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-beige/20 text-4xl opacity-40">👤</div>
                )}
              </div>
            </figure>

            {/* ステータスドット */}
            <div className="absolute bottom-2 right-2 h-6 w-6 rounded-full border-4 border-white bg-gold shadow-glow-gold transition-transform duration-700 group-hover:scale-125" aria-hidden="true" />
          </div>

          {/* テキストコンテンツ */}
          <div className="flex-1 lg:pt-4">
            <h3 className="font-display text-3xl tracking-wide transition-colors duration-500 group-hover:text-site-accent">
              {staff.name}
            </h3>

            <div className="mt-2 flex items-center justify-center gap-3 sm:justify-start">
              <span className="h-px w-6 bg-gold/40" />
              <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-gold italic">
                {staff.role}
              </p>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-text-light/90">
              {staff.bio}
            </p>

            {/* 詳細への誘い */}
            <div className="mt-8 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-site-accent/40 transition-all duration-500 group-hover:text-site-accent group-hover:gap-5 sm:justify-start">
              <span>Biography</span>
              <div className="h-px w-8 bg-site-accent/20 transition-all duration-500 group-hover:w-12 group-hover:bg-site-accent" />
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

export function AboutSection() {
  return (
    <Section id="about" aria-labelledby="about-heading" className="relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FloatingDecoration
          shape="blur"
          size="xl"
          color="accent"
          opacity={5}
          position={{ top: '10%', right: '-10%' }}
          animationDelay={0}
        />
        <FloatingDecoration
          shape="ring"
          size="md"
          color="gold"
          opacity={8}
          position={{ bottom: '15%', left: '5%' }}
          animationDelay={2500}
        />
        <FloatingDecoration
          shape="ring"
          size="sm"
          color="accent"
          opacity={12}
          position={{ top: '50%', left: '10%' }}
          animationDelay={1000}
        />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          id="about-heading"
          title={text.sections.about.title}
          subtitle={text.sections.about.subtitle}
        />

        <ul
          className="mt-16 grid list-none items-stretch gap-8 md:grid-cols-2"
          aria-label={text.sections.about.listAria}
        >
          {staffMembers.map((staff, index) => (
            <li key={staff.id}>
              <StaffCard staff={staff} isPriority={index === 0} delay={index * 150} />
            </li>
          ))}
        </ul>

        <FadeIn direction="scale" delay={400} easing="bounce" className="mt-14 flex justify-center">
          <Button href="/contact" variant="gradient" aria-label={text.sections.about.ctaAria}>
            {text.sections.about.cta}
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
