import Link from 'next/link';
import { Section, Container, SectionHeader, FadeIn, Button } from '@/components/ui';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';
import { options, text } from '@/config';
import type { Option } from '@/types';

function OptionCard({ option, delay }: { option: Option; delay: number }) {
  return (
    <FadeIn direction="scale-up" delay={delay} duration={600} easing="smooth">
      <Link
        href={`/options/${option.id}`}
        className="group relative block overflow-hidden rounded-xl bg-white p-6 text-center shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:shadow-site-accent/10"
      >
        {/* 背景グロー */}
        <div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-site-accent/0 to-gold/0 opacity-0 blur-lg transition-all duration-500 group-hover:from-site-accent/10 group-hover:to-gold/5 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* 上部装飾ライン */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-gradient-to-r from-site-accent to-gold transition-all duration-500 group-hover:w-full rounded-b-full"
          aria-hidden="true"
        />

        <div className="relative">
          <p className="text-text-light font-medium transition-colors duration-300 group-hover:text-text">{option.name}</p>
          <p className="mt-3 font-display text-2xl gradient-text">{option.price}</p>

          {/* ホバー時の詳細リンク表示 */}
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-site-accent opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
            <span>詳細を見る</span>
            <span>→</span>
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
