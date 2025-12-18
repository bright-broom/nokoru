import Image from 'next/image';
import { Section, Container, SectionHeader } from '@/components/ui';
import { staffMembers } from '@/config/site';
import type { Staff } from '@/types';
import { text } from '@/config/text';

function StaffCard({ staff, isPriority }: { staff: Staff; isPriority: boolean }) {
  return (
    <li className="text-center">
      <figure className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full bg-beige sm:h-40 sm:w-40">
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
      <p className="mt-2 text-sm text-text-light">{staff.role}</p>
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
      </Container>
    </Section>
  );
}
