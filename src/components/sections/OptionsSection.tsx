import Link from 'next/link';
import { Section, Container, SectionHeader, FadeIn, Button } from '@/components/ui';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';
import { options, text } from '@/config';
import type { Option } from '@/types';

function OptionCard({ option, delay }: { option: Option; delay: number }) {
  return (
    <FadeIn direction="scale-up" delay={delay} duration={900} easing="smooth">
      <Link
        href={`/options/${option.id}`}
        className="group relative block overflow-hidden rounded-[20px] bg-white p-8 text-center shadow-elevated border border-site-accent/5 transition-all duration-700 hover:shadow-premium hover:-translate-y-2"
      >
        {/* 透明感のあるアクセント背景 */}
        <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-gold/5 via-transparent to-transparent transition-all duration-700 group-hover:from-gold/15" aria-hidden="true" />

        <div className="relative">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-site-accent/40 transition-colors duration-500 group-hover:text-site-accent">
            {option.name}
          </p>
          <div className="mt-4 flex flex-col items-center">
            <span className="font-display text-3xl gradient-text tracking-tighter sm:text-4xl">
              {option.price}
            </span>
          </div>

          {/* ホバー時の洗練されたガイド */}
          <div className="mt-6 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/0 transition-all duration-500 group-hover:text-gold group-hover:translate-y-0 translate-y-2">
            <span>Details</span>
            <div className="h-px w-6 bg-gold/30" />
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

export function OptionsSection() {
  return (
    <Section id="options" variant="alternate" aria-labelledby="options-heading" className="relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <FloatingDecoration
          shape="blur"
          size="lg"
          color="accent"
          opacity={4}
          position={{ top: '20%', right: '-5%' }}
          animationDelay={0}
        />
        <FloatingDecoration
          shape="ring"
          size="sm"
          color="gold"
          opacity={10}
          position={{ bottom: '30%', left: '8%' }}
          animationDelay={1500}
        />
      </div>

      <Container className="relative z-10">
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

        <FadeIn direction="scale" delay={400} easing="bounce" className="mt-12 flex justify-center">
          <Button href="/contact" variant="gradient" aria-label={text.sections.options.ctaAria}>
            {text.sections.options.cta}
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
