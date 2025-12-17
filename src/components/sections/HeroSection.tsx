import Image from 'next/image';
import { Button } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { renderMultilineText } from '@/lib/helpers';

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/works/couple-sea.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        {/* 読みやすさ優先のやわらかい被せ */}
        <div className="absolute inset-0 bg-cream/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-cream/90" />
      </div>

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
        aria-label="予約相談・お問い合わせセクションへ移動"
      >
        予約相談する
      </Button>
    </section>
  );
}
