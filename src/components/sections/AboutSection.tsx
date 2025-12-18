import Image from 'next/image';
import Link from 'next/link';
import { Section, Container, SectionHeader, FadeIn, Button } from '@/components/ui';
import { staffMembers, text } from '@/config';
import type { Staff } from '@/types';

function StaffCard({ staff, isPriority, delay }: { staff: Staff; isPriority: boolean; delay: number }) {
  return (
    <FadeIn direction="up" delay={delay}>
      <Link
        href={`/staff/${staff.id}`}
        className="group relative block overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:p-8"
      >
        {/* 背景装飾 */}
        <div
          className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-site-accent/5 transition-transform duration-500 group-hover:scale-125"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
          {/* プロフィール画像 */}
          <div className="relative mb-6 shrink-0 sm:mb-0 sm:mr-6">
            <figure className="relative h-28 w-28 overflow-hidden rounded-full bg-beige shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-32 sm:w-32">
              {staff.imageUrl ? (
                <Image
                  src={staff.imageUrl}
                  alt={`${staff.name}${text.sections.about.profileAltSuffix}`}
                  fill
                  className="object-cover"
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
            {/* 装飾ドット */}
            <div
              className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-site-accent/20 transition-colors duration-300 group-hover:bg-site-accent/40"
              aria-hidden="true"
            />
          </div>

          {/* テキストコンテンツ */}
          <div className="flex-1">
            <h3 className="font-display text-2xl tracking-wide transition-colors duration-300 group-hover:text-site-accent">
              {staff.name}
            </h3>

            <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-site-accent">
              <span className="h-1 w-1 rounded-full bg-site-accent" aria-hidden="true" />
              {staff.role}
            </p>

            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-text-light">
              {staff.bio}
            </p>

            {/* 詳細リンク */}
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-site-accent sm:mt-6">
              <span>プロフィールを見る</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
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
    <Section id="about" aria-labelledby="about-heading">
      <Container>
        <SectionHeader
          id="about-heading"
          title={text.sections.about.title}
          subtitle={text.sections.about.subtitle}
        />

        <ul
          className="mt-16 grid list-none gap-8 md:grid-cols-2"
          aria-label={text.sections.about.listAria}
        >
          {staffMembers.map((staff, index) => (
            <li key={staff.id}>
              <StaffCard staff={staff} isPriority={index === 0} delay={index * 150} />
            </li>
          ))}
        </ul>

        <FadeIn direction="up" delay={400} className="mt-14 flex justify-center">
          <Button href="/contact" aria-label={text.sections.about.ctaAria}>
            {text.sections.about.cta}
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
