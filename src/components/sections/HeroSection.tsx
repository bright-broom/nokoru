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
        <FadeIn direction="up" delay={600} duration={800} className="mt-14 w-full max-w-5xl">
          <div className="group relative">
            {/* 背景グロー */}
            <div
              className="absolute -inset-4 rounded-3xl bg-linear-to-br from-site-accent/20 via-transparent to-beige/30 blur-2xl transition-opacity duration-500 group-hover:opacity-80 md:-inset-8"
              aria-hidden="true"
            />

            {/* コーナー装飾 */}
            <div className="absolute -top-3 -left-3 h-12 w-12 border-l-2 border-t-2 border-site-accent/30 md:-top-5 md:-left-5 md:h-16 md:w-16" aria-hidden="true" />
            <div className="absolute -bottom-3 -right-3 h-12 w-12 border-r-2 border-b-2 border-site-accent/30 md:-bottom-5 md:-right-5 md:h-16 md:w-16" aria-hidden="true" />

            {/* メインフレーム */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-2xl md:p-3">
              <YouTubeEmbed
                videoId={siteConfig.heroVideoId}
                title={text.sections.hero.videoTitle}
                className="rounded-xl"
              />
            </div>

            {/* フローティングアクセント */}
            <div
              className="absolute -right-2 top-1/4 h-20 w-1 rounded-full bg-linear-to-b from-site-accent/40 to-transparent md:-right-4 md:h-28"
              aria-hidden="true"
            />
            <div
              className="absolute -left-2 bottom-1/4 h-16 w-1 rounded-full bg-linear-to-t from-beige to-transparent md:-left-4 md:h-24"
              aria-hidden="true"
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
