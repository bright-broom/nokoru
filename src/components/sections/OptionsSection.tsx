import { Section, Container, SectionHeader, FadeIn } from '@/components/ui';
import { options } from '@/config/site';
import type { Option } from '@/types';
import { text } from '@/config/text';

function OptionCard({ option, delay }: { option: Option; delay: number }) {
  return (
    <FadeIn direction="up" delay={delay}>
      <div className="rounded-lg bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <p className="text-text-light">{option.name}</p>
        <p className="mt-2 font-display text-2xl">{option.price}</p>
      </div>
    </FadeIn>
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
        <ul
          className="mt-16 grid list-none gap-6 md:grid-cols-3"
          aria-label={text.sections.options.listAria}
        >
          {options.map((option, index) => (
            <li key={option.id}>
              <OptionCard option={option} delay={index * 100} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
