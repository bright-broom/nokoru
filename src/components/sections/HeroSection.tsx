import { Button } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { renderMultilineText } from '@/lib/utils';

export function HeroSection() {
  return (
    <section
      className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center"
      aria-labelledby="hero-heading"
    >
      <p className="mb-4 text-sm uppercase tracking-widest text-text-light">
        {siteConfig.subTagline}
      </p>
      <h1
        id="hero-heading"
        className="font-display text-4xl leading-tight md:text-6xl lg:text-7xl"
      >
        {renderMultilineText(siteConfig.tagline)}
      </h1>
      <p className="mt-8 max-w-xl text-text-light">
        {siteConfig.areas}
        <br />
        {siteConfig.year}
      </p>
      <Button
        href="#contact"
        size="large"
        className="mt-12"
        aria-label="お問い合わせセクションへ移動"
      >
        お問い合わせ
      </Button>
    </section>
  );
}
