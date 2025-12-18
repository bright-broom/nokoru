'use client';

import { Button, YouTubeEmbed, FadeIn } from '@/components/ui';
import { FloatingDecoration } from '@/components/ui/FloatingDecoration';
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
      {/* 背景装飾 - リッチ化 */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* 右上のグローブラー */}
        <FloatingDecoration
          shape="blur"
          size="xl"
          color="accent"
          opacity={8}
          position={{ top: '-5%', right: '-10%' }}
          animationDelay={0}
        />
        {/* 左下の大きなグロー */}
        <FloatingDecoration
          shape="blur"
          size="xl"
          color="beige"
          opacity={40}
          position={{ bottom: '-10%', left: '-15%' }}
          animationDelay={2000}
        />
        {/* 左上のリング装飾 */}
        <FloatingDecoration
          shape="ring"
          size="sm"
          color="accent"
          opacity={15}
          position={{ top: '15%', left: '8%' }}
          animationDelay={1000}
        />
        {/* 右下のリング装飾 */}
        <FloatingDecoration
          shape="ring"
          size="md"
          color="gold"
          opacity={10}
          position={{ bottom: '25%', right: '10%' }}
          animationDelay={3000}
        />
        {/* 中央上のドット */}
        <FloatingDecoration
          shape="circle"
          size="sm"
          color="accent"
          opacity={5}
          position={{ top: '30%', left: '50%' }}
          animationDelay={1500}
        />
      </div>

      <h1 className="sr-only">
        {text.sections.hero.seoHiddenHeading}
      </h1>

      {/* メインコンテンツ */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* サブタグライン */}
        <FadeIn direction="blur" duration={800} easing="smooth">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-site-accent/50" aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.3em] text-site-accent font-medium">
              {siteConfig.subTagline}
            </p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-site-accent/50" aria-hidden="true" />
          </div>
        </FadeIn>

        {/* メインタグライン - グラデーションテキスト */}
        <FadeIn direction="blur-up" delay={200} duration={900} easing="smooth">
          <p
            id="hero-heading"
            className="font-display text-4xl leading-tight md:text-6xl lg:text-7xl gradient-text"
            role="heading"
            aria-level={2}
          >
            {renderMultilineText(siteConfig.tagline)}
          </p>
        </FadeIn>

        {/* エリア・年度 */}
        <FadeIn direction="blur-up" delay={400} duration={800} easing="smooth">
          <p className="mt-8 max-w-xl text-text-light tracking-wide">
            {siteConfig.areas}
            <br />
            <span className="text-site-accent/80">{siteConfig.year}</span>
          </p>
        </FadeIn>

        {/* 動画 */}
        <FadeIn direction="scale-up" delay={600} duration={900} easing="smooth" className="mt-14 w-full max-w-5xl">
          <div className="group relative">
            {/* 背景グロー - 強化 */}
            <div
              className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-site-accent/20 via-site-accent/5 to-gold/10 blur-3xl transition-all duration-700 group-hover:opacity-90 group-hover:scale-105 md:-inset-10"
              aria-hidden="true"
            />

            {/* コーナー装飾 - グラデーション化 */}
            <div className="absolute -top-3 -left-3 h-12 w-12 md:-top-5 md:-left-5 md:h-16 md:w-16" aria-hidden="true">
              <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-site-accent/60 to-transparent" />
              <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-site-accent/60 to-transparent" />
            </div>
            <div className="absolute -bottom-3 -right-3 h-12 w-12 md:-bottom-5 md:-right-5 md:h-16 md:w-16" aria-hidden="true">
              <div className="absolute bottom-0 right-0 h-full w-0.5 bg-gradient-to-t from-site-accent/60 to-transparent" />
              <div className="absolute bottom-0 right-0 h-0.5 w-full bg-gradient-to-l from-site-accent/60 to-transparent" />
            </div>

            {/* メインフレーム - ガラス効果 */}
            <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm p-2 shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.2)] md:p-3">
              <YouTubeEmbed
                videoId={siteConfig.heroVideoId}
                title={text.sections.hero.videoTitle}
                className="rounded-xl"
              />
            </div>

            {/* フローティングアクセント - グラデーション強化 */}
            <div
              className="absolute -right-2 top-1/4 h-24 w-1 rounded-full bg-gradient-to-b from-site-accent/50 via-site-accent/20 to-transparent md:-right-4 md:h-32"
              aria-hidden="true"
            />
            <div
              className="absolute -left-2 bottom-1/4 h-20 w-1 rounded-full bg-gradient-to-t from-gold/40 via-gold/15 to-transparent md:-left-4 md:h-28"
              aria-hidden="true"
            />
          </div>
        </FadeIn>

        {/* CTA - グローバリアント */}
        <FadeIn direction="scale" delay={800} duration={800} easing="bounce">
          <Button
            href="/contact"
            variant="glow"
            size="large"
            className="mt-12"
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
