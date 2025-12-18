import Link from 'next/link';
import { siteConfig, navItems, text } from '@/config';
import { InstagramIcon, LinkIcon } from '@/components/icons';

export function Footer() {
  return (
    <footer
      className="bg-linear-to-b from-text to-text/95 text-cream"
      role="contentinfo"
    >
      {/* メインコンテンツ */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* 上部：ロゴ＋ナビ＋情報 */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {/* ブランド */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="inline-block font-display text-2xl tracking-widest transition-opacity hover:opacity-80"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-cream/60">
              {text.site.areas}
            </p>
          </div>

          {/* ナビゲーション */}
          <div className="text-center">
            <p className="mb-4 text-xs uppercase tracking-widest text-cream/40">
              Menu
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SNS・リンク */}
          <div className="text-center md:text-right">
            <p className="mb-4 text-xs uppercase tracking-widest text-cream/40">
              Follow
            </p>
            <div className="flex justify-center gap-3 md:justify-end">
              <Link
                href={text.content.links.instagramFooter}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-all hover:border-cream/50 hover:text-cream"
                aria-label={text.footer.instagramFollowAria}
              >
                <InstagramIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Link>
              <Link
                href={`https://${text.content.links.litlinkLabel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/60 transition-all hover:border-cream/50 hover:text-cream"
                aria-label="Lit.link"
              >
                <LinkIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Link>
            </div>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="my-10 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-cream/10" />
          <span className="text-cream/20">{text.footer.decorativeMark}</span>
          <div className="h-px flex-1 bg-cream/10" />
        </div>

        {/* コピーライト */}
        <p className="text-center text-xs text-cream/40">
          {siteConfig.copyright}
        </p>
      </div>
    </footer>
  );
}
