import Image from 'next/image';
import Link from 'next/link';
import { Section, Container, SectionHeader, FadeIn, Button } from '@/components/ui';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';
import { staffMembers, text } from '@/config';
import type { Staff } from '@/types';

function StaffCard({ staff, isPriority, delay }: { staff: Staff; isPriority: boolean; delay: number }) {
  return (
    <FadeIn direction="scale-up" delay={delay} duration={700} easing="smooth" className="h-full">
      <Link
        href={`/staff/${staff.id}`}
        className="group relative block h-full overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:shadow-site-accent/10 hover:bg-white md:p-8"
      >
        {/* 背景グロー */}
        <div
          className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-site-accent/0 to-gold/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-site-accent/15 group-hover:to-gold/10 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* 背景装飾 - グラデーション強化 */}
        <div
          className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-site-accent/10 to-gold/5 transition-all duration-700 group-hover:scale-150 group-hover:from-site-accent/15"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
          {/* プロフィール画像 - リング装飾追加 */}
          <div className="relative mb-6 shrink-0 sm:mb-0 sm:mr-6">
            {/* 外側リング装飾 */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-site-accent/20 via-transparent to-gold/20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-180" aria-hidden="true" />

            <figure className="relative h-28 w-28 overflow-hidden rounded-full bg-beige shadow-lg ring-4 ring-white/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:ring-site-accent/20 sm:h-32 sm:w-32">
              {staff.imageUrl ? (
                <Image
                  src={staff.imageUrl}
                  alt={`${staff.name}${text.sections.about.profileAltSuffix}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 112px, 128px"
                  priority={isPriority}
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-beige"
                  role="img"
                  aria-label={`${staff.name}${text.sections.about.profileAltMissingSuffix}`}
                >
                  <span className="text-4xl text-text-light/40">👤</span>
                </div>
              )}
            </figure>
            {/* 装飾ドット - グロー追加 */}
            <div
              className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-br from-site-accent/30 to-gold/20 shadow-sm transition-all duration-500 group-hover:scale-125 group-hover:shadow-md group-hover:shadow-site-accent/30"
              aria-hidden="true"
            />
          </div>

          {/* テキストコンテンツ */}
          <div className="flex-1">
            <h3 className="font-display text-2xl tracking-wide transition-all duration-500 group-hover:text-site-accent">
              {staff.name}
            </h3>

            <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-site-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-site-accent to-gold animate-pulse" aria-hidden="true" />
              {staff.role}
            </p>

            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-text-light">
              {staff.bio}
            </p>

            {/* 詳細リンク - リッチ化 */}
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-site-accent transition-all duration-300 group-hover:gap-3 sm:mt-6">
              <span>プロフィールを見る</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-site-accent/10 transition-all duration-300 group-hover:bg-site-accent group-hover:text-white" aria-hidden="true">
                →
              </span>
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
