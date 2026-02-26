import Link from 'next/link';
import { siteConfig, navItems, text } from '@/config';
import { InstagramIcon, LinkIcon } from '@/components/icons';
import { AnimatedLine } from '@/components/ui/AnimatedLine';
import { NavLink } from '@/components/ui/NavLink';
import { SocialButton } from '@/components/ui/SocialButton';

export function Footer() {
  return (
    <footer
      className="relative bg-gradient-to-b from-text via-text/98 to-text/95 text-cream overflow-hidden"
      role="contentinfo"
    >
      {/* 上部の装飾ライン - より豪華に */}
      <div className="absolute top-0 left-0 right-0" aria-hidden="true">
        <div className="h-px bg-gradient-to-r from-transparent via-site-accent/40 to-transparent" />
        <div className="h-px mt-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      {/* 背景装飾 - より立体的に */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* メイン装飾 */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-site-accent/5 blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold/5 blur-[80px] -translate-x-1/3 translate-y-1/3" />

        {/* 繊細なパターン */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.02]">
          <div className="absolute inset-0 rounded-full border border-cream" />
          <div className="absolute inset-8 rounded-full border border-cream" />
          <div className="absolute inset-16 rounded-full border border-cream" />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-12">
        {/* 上部セクション：ブランド中心 */}
        <div className="text-center mb-16">
          {/* ブランドロゴ */}
          <Link
            href="/"
            className="group inline-block"
          >
            <span className="track-label font-display text-2xl text-cream/90 transition-all duration-500 group-hover:text-cream">
              {siteConfig.name}
            </span>
            <AnimatedLine variant="footer-logo" className="mt-2 block" />
          </Link>

          {/* サブテキスト */}
          <p className="mt-6 text-sm tracking-wider text-cream/40 font-light">
            {text.site.subTagline}
          </p>

          {/* エリア情報 */}
          <p className="mt-3 text-xs text-cream/30">
            {text.site.areas}
          </p>
        </div>

        {/* SNS */}
        <div className="flex justify-center gap-4 pb-10 border-b border-cream/10">
          <SocialButton
            href={text.content.links.instagramFooter}
            icon={InstagramIcon}
            label={text.footer.instagramFollowAria}
            glowColor="accent"
          />
          <SocialButton
            href={`https://${text.content.links.litlinkLabel}`}
            icon={LinkIcon}
            label="Lit.link"
            glowColor="gold"
          />
        </div>

        {/* 下部セクション */}
        <div className="pt-8 flex flex-col items-center gap-6">
          {/* ナビゲーションリンク */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navItems.slice(0, 5).map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} variant="footer" />
            ))}
            <span className="text-cream/10">|</span>
            <NavLink href="/videos" label={text.nav.labels.videos} variant="footer" />
            <NavLink href="/blog" label={text.nav.labels.blog} variant="footer" />
            <NavLink href="/faq" label={text.nav.labels.faq} variant="footer" />
          </nav>

          {/* コピーライト */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs tracking-wider text-cream/25">
            <p>{siteConfig.copyright}</p>
            <span className="hidden md:inline text-cream/10">·</span>
            <p>{text.site.year}</p>
          </div>
        </div>
      </div>

      {/* 最下部の装飾ライン */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cream/5 to-transparent" aria-hidden="true" />
    </footer>
  );
}
