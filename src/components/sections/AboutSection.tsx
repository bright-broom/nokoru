import Image from 'next/image';
import Link from 'next/link';
import { Section, Container, SectionHeader, FadeIn, Button } from '@/components/ui';
import { staffMembers, text } from '@/config';
import type { Staff } from '@/types';

function StaffCard({ staff, isPriority }: { staff: Staff; isPriority: boolean }) {
  return (
    <li className="text-center">
      <Link
        href={`/staff/${staff.id}`}
        className="group block rounded-lg p-4 transition hover:bg-white/50"
      >
        <figure className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full bg-beige transition group-hover:shadow-lg sm:h-40 sm:w-40">
          {staff.imageUrl ? (
            <Image
              src={staff.imageUrl}
              alt={`${staff.name}${text.sections.about.profileAltSuffix}`}
              width={160}
              height={160}
              className="h-full w-full object-cover"
              sizes="(max-width: 640px) 128px, 160px"
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
        <h3 className="font-display text-xl">{staff.name}</h3>
        <p className="mt-1 text-sm text-site-accent">{staff.role}</p>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-light">
          {staff.bio}
        </p>
      </Link>
    </li>
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
          className="mt-16 grid list-none gap-12 md:grid-cols-2"
          aria-label={text.sections.about.listAria}
        >
          {staffMembers.map((staff, index) => (
            <StaffCard key={staff.id} staff={staff} isPriority={index === 0} />
          ))}
        </ul>

        <FadeIn direction="up" delay={400} className="mt-12 flex justify-center">
          <Button href="/contact" aria-label={text.sections.about.ctaAria}>
            {text.sections.about.cta}
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
