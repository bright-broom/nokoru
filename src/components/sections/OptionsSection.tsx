import { Section, Container, SectionHeader } from '@/components/ui';
import { options } from '@/config/site';
import type { Option } from '@/types';
import { text } from '@/config/text';

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
          title={text.sections.options.title}
          subtitle={text.sections.options.subtitle}
        />
        <div
          className="mt-16 grid gap-6 md:grid-cols-3"
          role="list"
          aria-label={text.sections.options.listAria}
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
