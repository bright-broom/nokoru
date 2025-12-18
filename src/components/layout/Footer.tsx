import Link from 'next/link';
import { siteConfig, navItems, text } from '@/config';
import { InstagramIcon, LinkIcon } from '@/components/icons';

export function Footer() {
  return (
    <footer
      className="relative bg-gradient-to-b from-text via-text/98 to-text/95 text-cream overflow-hidden"
      role="contentinfo"
    >
      {/* 上部の装飾ライン */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-site-accent/30 to-transparent" aria-hidden="true" />

      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-site-accent/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-gold/5 blur-3xl" />
      </div>

      {/* メインコンテンツ */}
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        {/* 上部：ロゴ＋ナビ＋情報 */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {/* ブランド - グラデーション対応 */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="group inline-block font-display text-2xl tracking-widest transition-all duration-300"
            >
              <span className="relative">
                {siteConfig.name}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-site-accent/50 to-gold/50 transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                />
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-cream/60">
              {text.site.areas}
            </p>
          </div>

          {/* ナビゲーション - ホバー強化 */}
          <div className="text-center">
            <p className="mb-4 text-xs uppercase tracking-widest text-cream/40">
              Menu
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative text-sm text-cream/70 transition-all duration-300 hover:text-cream"
                  >
                    {item.label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px w-0 bg-site-accent/50 transition-all duration-300 group-hover:w-full"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SNS・リンク - グロー効果 */}
          <div className="text-center md:text-right">
            <p className="mb-4 text-xs uppercase tracking-widest text-cream/40">
              Follow
            </p>
            <div className="flex justify-center gap-3 md:justify-end">
              <Link
                href={text.content.links.instagramFooter}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-all duration-300 hover:border-site-accent/50 hover:text-cream hover:shadow-[0_0_15px_rgba(122,142,197,0.3)]"
                aria-label={text.footer.instagramFollowAria}
              >
                <InstagramIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Link>
              <Link
                href={`https://${text.content.links.litlinkLabel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-all duration-300 hover:border-gold/50 hover:text-cream hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                aria-label="Lit.link"
              >
                <LinkIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Link>
            </div>
          </div>
        </div>

        {/* 区切り線 - グラデーション強化 */}
        <div className="my-10 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cream/15" />
          <span className="text-cream/30 text-lg">{text.footer.decorativeMark}</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cream/15" />
        </div>

        {/* コピーライト */}
        <p className="text-center text-xs text-cream/40">
          {siteConfig.copyright}
        </p>
      </div>
    </footer>
  );
}
