import { Section, Container, SectionHeader } from '@/components/ui';
import { options } from '@/config/site';
import type { Option } from '@/types';

function OptionCard({ option }: { option: Option }) {
  return (
    <article className="rounded-lg bg-white p-6 text-center">
      <p className="text-text-light">{option.name}</p>
      <p className="mt-2 font-display text-2xl">{option.price}</p>
    </article>
  );
}

export function OptionsSection() {
  return (
    <Section variant="alternate" aria-labelledby="options-heading">
      <Container>
        <SectionHeader
          id="options-heading"
          title="Options"
          subtitle="オプション"
        />
        <div
          className="mt-16 grid gap-6 md:grid-cols-3"
          role="list"
          aria-label="オプション一覧"
        >
          {options.map((option) => (
            <div key={option.id} role="listitem">
              <OptionCard option={option} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
