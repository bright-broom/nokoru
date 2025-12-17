import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { InstagramIcon } from '@/components/icons';

export function Footer() {
  return (
    <footer
      className="bg-gradient-to-b from-text to-text/95 py-16 text-cream"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* 装飾ライン */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-cream/30" />
          <span className="text-cream/40">✦</span>
          <div className="h-px w-12 bg-cream/30" />
        </div>

        {/* ロゴ */}
        <p className="text-center font-display text-2xl tracking-widest">
          {siteConfig.name}
        </p>

        {/* SNSリンク */}
        <div className="mt-6 flex justify-center gap-6">
          <Link
            href="https://www.instagram.com/silver_lace_weddings/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream/70 transition-all hover:border-cream hover:text-cream hover:scale-110"
            aria-label="Instagramをフォロー"
          >
            <InstagramIcon className="h-5 w-5" />
          </Link>
        </div>

        {/* 区切り線 */}
        <div className="mx-auto mt-10 h-px w-24 bg-cream/20" />

        {/* コピーライト */}
        <p className="mt-6 text-center text-sm text-cream/50">
          {siteConfig.copyright}
        </p>
      </div>
    </footer>
  );
}
