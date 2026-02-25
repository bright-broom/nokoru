import Link from 'next/link';
import { siteConfig, navItems, text } from '@/config';
import { InstagramIcon, LinkIcon } from '@/components/icons';

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
            <span className="track-label font-display text-3xl text-cream/90 transition-all duration-500 group-hover:text-cream">
              {siteConfig.name}
            </span>
            <span
              className="block mt-2 h-px w-0 mx-auto bg-gradient-to-r from-site-accent via-gold to-site-accent transition-all duration-700 group-hover:w-full"
              aria-hidden="true"
            />
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

        {/* 中央セクション：3カラム */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-8 pb-12 border-b border-cream/10">
          {/* ナビゲーション */}
          <div className="text-center md:text-left">
            <h3 className="track-kicker mb-5 text-xs font-medium uppercase text-cream/30">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-cream/50 transition-all duration-300 hover:text-cream"
                  >
                    <span
                      className="h-px w-0 bg-gradient-to-r from-site-accent to-gold transition-all duration-300 group-hover:w-4"
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 中央：装飾 */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="relative">
              {/* 外側リング */}
              <div className="absolute -inset-4 rounded-full border border-cream/5" aria-hidden="true" />
              <div className="absolute -inset-8 rounded-full border border-cream/[0.02]" aria-hidden="true" />

              {/* 中央マーク */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/10 bg-cream/[0.02]">
                <span className="text-2xl text-cream/20">{text.footer.decorativeMark}</span>
              </div>
            </div>
          </div>

          {/* SNS・コンタクト */}
          <div className="text-center md:text-right">
            <h3 className="track-kicker mb-5 text-xs font-medium uppercase text-cream/30">
              Connect
            </h3>
            <div className="flex justify-center gap-4 md:justify-end">
              <Link
                href={text.content.links.instagramFooter}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-12 w-12 items-center justify-center"
                aria-label={text.footer.instagramFollowAria}
              >
                {/* 背景グロー */}
                <span
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-site-accent/20 to-site-accent/0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                {/* ボーダー */}
                <span
                  className="absolute inset-0 rounded-full border border-cream/20 transition-all duration-500 group-hover:border-site-accent/50 group-hover:scale-110"
                  aria-hidden="true"
                />
                <InstagramIcon className="relative h-5 w-5 text-cream/60 transition-all duration-300 group-hover:text-cream group-hover:scale-110" />
              </Link>

              <Link
                href={`https://${text.content.links.litlinkLabel}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-12 w-12 items-center justify-center"
                aria-label="Lit.link"
              >
                {/* 背景グロー */}
                <span
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold/0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                {/* ボーダー */}
                <span
                  className="absolute inset-0 rounded-full border border-cream/20 transition-all duration-500 group-hover:border-gold/50 group-hover:scale-110"
                  aria-hidden="true"
                />
                <LinkIcon className="relative h-5 w-5 text-cream/60 transition-all duration-300 group-hover:text-cream group-hover:scale-110" />
              </Link>
            </div>

            {/* お問い合わせリンク */}
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-xs text-cream/40 transition-all duration-300 hover:text-cream/70"
            >
              <span>お問い合わせ</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* 下部セクション：コピーライト */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="order-2 text-xs tracking-wider text-cream/25 md:order-1">
            {siteConfig.copyright}
          </p>

          {/* 装飾マーク - モバイルのみ */}
          <span className="text-cream/10 order-1 md:hidden" aria-hidden="true">
            {text.footer.decorativeMark}
          </span>

          {/* 年度表示 */}
          <p className="order-3 text-xs tracking-wider text-cream/25 md:order-2">
            {text.site.year}
          </p>
        </div>
      </div>

      {/* 最下部の装飾ライン */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cream/5 to-transparent" aria-hidden="true" />
    </footer>
  );
}
