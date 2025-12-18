import { Button, YouTubeEmbed, FadeIn } from '@/components/ui';
import { siteConfig, text } from '@/config';
import { renderMultilineText } from '@/lib/helpers';

export function HeroSection() {
  return (
    <section
      className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center"
      aria-labelledby="hero-heading"
    >
      <h1 className="sr-only">
        {text.sections.hero.seoHiddenHeading}
      </h1>

      <FadeIn direction="none" duration={800}>
        <p className="mb-4 text-sm uppercase tracking-widest text-text-light">
          {siteConfig.subTagline}
        </p>
      </FadeIn>
      <FadeIn direction="up" delay={200} duration={800}>
        <p
          id="hero-heading"
          className="font-display text-4xl leading-tight md:text-6xl lg:text-7xl"
          role="heading"
          aria-level={2}
        >
          {renderMultilineText(siteConfig.tagline)}
        </p>
      </FadeIn>
      <FadeIn direction="up" delay={400} duration={800}>
        <p className="mt-6 max-w-xl text-text-light">
          {siteConfig.areas}
          <br />
          {siteConfig.year}
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={600} duration={800} className="mt-10 w-full max-w-3xl">
        <YouTubeEmbed
          videoId={siteConfig.heroVideoId}
          title={text.sections.hero.videoTitle}
          className="shadow-lg"
        />
      </FadeIn>

      <FadeIn direction="up" delay={800} duration={800}>
        <Button
          href="#contact"
          size="large"
          className="mt-10"
          aria-label={text.sections.hero.ctaAria}
        >
          {text.sections.hero.cta}
        </Button>
      </FadeIn>
    </section>
  );
}
