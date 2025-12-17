import { Button } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { renderMultilineText } from '@/lib/helpers';

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
      <p className="mt-6 max-w-xl text-text-light">
        {siteConfig.areas}
        <br />
        {siteConfig.year}
      </p>

      {/* YouTube Video */}
      <div className="mt-10 w-full max-w-3xl">
        <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/g7AeR7aV698?rel=0&modestbranding=1"
            title="Silver Lace Weddings - ロケーション前撮り映像"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>

      <Button
        href="#contact"
        size="large"
        className="mt-10"
        aria-label="予約相談・お問い合わせセクションへ移動"
      >
        予約相談する
      </Button>
    </section>
  );
}
