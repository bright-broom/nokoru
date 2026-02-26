'use client';

import { useCallback } from 'react';
import { Button, YouTubeEmbed, FadeIn, FloatingDecoration, heroPreset, ctaPreset, contentPreset } from '@/components/ui';
import { siteConfig, text } from '@/config';
import { renderMultilineText, scrollToElement } from '@/lib/utils';

export function HeroSection() {
  const scrollToWorks = useCallback(() => {
    scrollToElement('works');
  }, []);

  return (
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 pb-20 md:px-12 md:pt-20"
        aria-labelledby="hero-heading"
      >
        {/* 背景装飾 - さらにプレミアムに */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* 銀色のレース装飾 */}
          <FloatingDecoration
            shape="lace"
            size="xl"
            color="accent"
            opacity={12}
            position={{ top: '-10%', right: '-5%' }}
            animationDelay={0}
          />
          <FloatingDecoration
            shape="lace"
            size="lg"
            color="gold"
            opacity={8}
            position={{ bottom: '15%', left: '5%' }}
            animationDelay={2000}
          />

          {/* 柔らかな光の玉 */}
          <FloatingDecoration
            shape="blur"
            size="xl"
            color="beige"
            opacity={50}
            position={{ top: '20%', left: '-10%' }}
            animationDelay={1000}
          />
          <FloatingDecoration
            shape="blur"
            size="xl"
            color="accent"
            opacity={5}
            position={{ bottom: '-10%', right: '-5%' }}
            animationDelay={3000}
          />
        </div>

        <h1 className="sr-only">
          {text.sections.hero.seoHiddenHeading}
        </h1>

        {/* メインコンテンツ */}
        {/* 62% for content, with whitespace balanced around it */}
        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center text-center">
          {/* サブタグライン */}
          <FadeIn {...heroPreset}>
            <div className="mb-8 flex items-center gap-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-site-accent/30 to-transparent" aria-hidden="true" />
              <p className="track-ultra text-xs font-bold uppercase text-site-accent/80 md:text-sm">
                {siteConfig.subTagline}
              </p>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-site-accent/30 to-transparent" aria-hidden="true" />
            </div>
          </FadeIn>

          {/* メインタグライン - 優雅な出現 */}
          <FadeIn direction="none" delay={300} duration={1500} className="animate-reveal">
            <p
              id="hero-heading"
              className="font-display text-4xl leading-[1.15] tracking-tight gradient-text md:text-5xl lg:text-6xl"
              role="heading"
              aria-level={2}
            >
              {renderMultilineText(siteConfig.tagline)}
            </p>
          </FadeIn>

          {/* エリア・年度 */}
          <FadeIn {...contentPreset} delay={800}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <p className="track-meta text-base font-medium text-text-light/90">
                {siteConfig.areas}
              </p>
              <div className="h-8 w-px bg-gradient-to-b from-site-accent/40 to-transparent" />
              <p className="track-kicker font-display text-sm text-gold italic">{siteConfig.year}</p>
            </div>
          </FadeIn>

          {/* 動画セクション */}
          <FadeIn direction="scale-up" delay={1200} duration={1500} easing="smooth" className="mt-20 w-full max-w-5xl">
            <div className="group relative">
              {/* プレミアムな外枠グロー */}
              <div
                className="absolute -inset-10 rounded-[40px] bg-gradient-to-br from-site-accent/15 via-gold/5 to-site-accent/10 blur-3xl opacity-60 transition-all duration-1000 group-hover:opacity-100 group-hover:scale-110"
                aria-hidden="true"
              />

              {/* フレーム装飾 */}
              <div className="absolute -inset-1 border border-site-accent/5 rounded-[28px]" aria-hidden="true" />

              {/* メインフレーム - プレミアムガラス */}
              <div className="relative overflow-hidden rounded-[24px] bg-white p-2 shadow-premium md:p-3">
                <div className="overflow-hidden rounded-[16px]">
                  <YouTubeEmbed
                    videoId={siteConfig.heroVideoId}
                    title={text.sections.hero.videoTitle}
                    className="transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* 装飾アクセント */}
              <div className="absolute -top-6 -right-6 font-display text-6xl text-gold/20 select-none animate-float opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true">✦</div>
              <div className="absolute -bottom-6 -left-6 font-display text-5xl text-site-accent/20 select-none animate-float-slow opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true">✧</div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn {...ctaPreset} delay={1800}>
            <Button
              href="/contact"
              variant="glow"
              size="large"
              className="mt-16 sm:px-12 w-full sm:w-auto"
              aria-label={text.sections.hero.ctaAria}
            >
              {text.sections.hero.cta}
            </Button>
          </FadeIn>
        </div>

        {/* スクロールインジケーター - リッチ化 */}
        <FadeIn
          direction="blur-up"
          delay={1200}
          duration={800}
          easing="smooth"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            type="button"
            onClick={scrollToWorks}
            className="group flex flex-col items-center gap-3 text-text-light transition-all duration-300 hover:text-site-accent"
            aria-label="作品セクションへスクロール"
          >
            <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
            <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-current/50 p-1.5 transition-all duration-300 group-hover:border-site-accent group-hover:shadow-[0_0_15px_rgba(122,142,197,0.3)]">
              <span className="h-2.5 w-1 animate-bounce rounded-full bg-current transition-colors group-hover:bg-site-accent" />
            </span>
          </button>
        </FadeIn>
      </section>
    );
  }
