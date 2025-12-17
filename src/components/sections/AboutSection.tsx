import { Section, Container, SectionHeader } from '@/components/ui';
import { staffMembers } from '@/config/site';
import type { Staff } from '@/types';

function StaffCard({ staff }: { staff: Staff }) {
  return (
    <article className="text-center">
      <div
        className="mx-auto mb-6 h-32 w-32 rounded-full bg-beige"
        role="img"
        aria-label={`${staff.name}のプロフィール画像`}
      />
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
          title="About"
          subtitle="スタッフ紹介"
        />
        <div
          className="mt-16 grid gap-12 md:grid-cols-2"
          role="list"
          aria-label="スタッフ一覧"
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
