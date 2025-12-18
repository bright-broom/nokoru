import Image from 'next/image';
import { Section, Container, SectionHeader } from '@/components/ui';
import { staffMembers } from '@/config/site';
import type { Staff } from '@/types';
import { text } from '@/config/text';

function StaffCard({ staff }: { staff: Staff }) {
  return (
    <article className="text-center">
      <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full bg-beige">
        {staff.imageUrl ? (
          <Image
            src={staff.imageUrl}
            alt={`${staff.name}${text.sections.about.profileAltSuffix}`}
            width={128}
            height={128}
            className="h-full w-full object-cover"
            sizes="128px"
            priority={staff.id === 'aki'}
          />
        ) : (
          <div
            className="h-full w-full"
            role="img"
            aria-label={`${staff.name}${text.sections.about.profileAltMissingSuffix}`}
          />
        )}
      </div>
      <h3 className="font-display text-xl">{staff.name}</h3>
      <p className="mt-2 text-sm text-text-light">{staff.role}</p>
    </article>
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
        <div
          className="mt-16 grid gap-12 md:grid-cols-2"
          role="list"
          aria-label={text.sections.about.listAria}
        >
          {staffMembers.map((staff) => (
            <div key={staff.id} role="listitem">
              <StaffCard staff={staff} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
