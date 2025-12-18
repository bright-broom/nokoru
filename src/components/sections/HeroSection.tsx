'use client';

import { Button, YouTubeEmbed, FadeIn } from '@/components/ui';
import { siteConfig, text } from '@/config';
import { renderMultilineText } from '@/lib/helpers';

export function HeroSection() {
  const scrollToWorks = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
      aria-labelledby="hero-heading"
    >
      {/* 背景装飾 */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* 右上の円 */}
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-site-accent/5" />
        {/* 左下の円 */}
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-beige/50" />
      </div>

      <h1 className="sr-only">
        {text.sections.hero.seoHiddenHeading}
      </h1>

      {/* メインコンテンツ */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* サブタグライン */}
        <FadeIn direction="none" duration={800}>
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-8 bg-site-accent/40" aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.25em] text-site-accent">
              {siteConfig.subTagline}
            </p>
            <span className="h-px w-8 bg-site-accent/40" aria-hidden="true" />
          </div>
        </FadeIn>

        {/* メインタグライン */}
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

        {/* エリア・年度 */}
        <FadeIn direction="up" delay={400} duration={800}>
          <p className="mt-8 max-w-xl text-text-light">
            {siteConfig.areas}
            <br />
            {siteConfig.year}
          </p>
        </FadeIn>

        {/* 動画 */}
        <FadeIn direction="up" delay={600} duration={800} className="mt-12 w-full max-w-4xl">
          <div className="relative">
            {/* 装飾フレーム */}
            <div
              className="absolute -inset-3 rounded-2xl border border-beige/60 md:-inset-4"
              aria-hidden="true"
            />
            <div
              className="absolute -inset-1.5 rounded-xl bg-white/50 md:-inset-2"
              aria-hidden="true"
            />
            <YouTubeEmbed
              videoId={siteConfig.heroVideoId}
              title={text.sections.hero.videoTitle}
              className="relative rounded-lg shadow-xl"
            />
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn direction="up" delay={800} duration={800}>
          <Button
            href="/contact"
            size="large"
            className="mt-12"
            aria-label={text.sections.hero.ctaAria}
          >
            {text.sections.hero.cta}
          </Button>
        </FadeIn>
      </div>

      {/* スクロールインジケーター */}
      <FadeIn
        direction="up"
        delay={1200}
        duration={800}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          type="button"
          onClick={scrollToWorks}
          className="group flex flex-col items-center gap-2 text-text-light transition-colors hover:text-site-accent"
          aria-label="作品セクションへスクロール"
        >
          <span className="text-xs tracking-wider">Scroll</span>
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-current p-1">
            <span className="h-2 w-1 animate-bounce rounded-full bg-current" />
          </span>
        </button>
      </FadeIn>
    </section>
  );
}
