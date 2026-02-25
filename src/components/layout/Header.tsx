'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig, navItems, text } from '@/config';
import { MenuIcon, CloseIcon } from '@/components/icons';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // モバイルメニュー開閉時のスクロール制御
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          isScrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-lg shadow-black/[0.03]'
            : 'bg-white/80 backdrop-blur-xl'
        )}
        role="banner"
      >
        {/* 上部の装飾ライン - 2重グラデーション */}
        <div className="absolute top-0 left-0 right-0" aria-hidden="true">
          <div
            className={cn(
              'h-[2px] bg-gradient-to-r from-transparent via-site-accent/60 to-transparent transition-all duration-700',
              isScrolled ? 'opacity-100' : 'opacity-0'
            )}
          />
          <div
            className={cn(
              'h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-all duration-700 delay-100',
              isScrolled ? 'opacity-100' : 'opacity-0'
            )}
          />
        </div>

        {/* 下部のシャドウライン */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-beige/50 to-transparent transition-opacity duration-500',
            isScrolled ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden="true"
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-gradient-to-r focus:from-site-accent focus:to-site-accent-light focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          {text.nav.skipToMain}
        </a>

        <nav
          className={cn(
            'mx-auto grid max-w-6xl grid-cols-3 items-center px-6 transition-all duration-500',
            isScrolled ? 'py-3' : 'py-5'
          )}
          role="navigation"
          aria-label={text.nav.ariaMainNav}
        >
          {/* 左: ロゴ */}
          <div className="flex justify-start">
            <Link
              href="/"
              className="group relative"
              aria-label={`${siteConfig.name} - ${text.nav.homeAriaSuffix}`}
            >
              <span className="track-meta relative font-display text-xl transition-all duration-500">
                <span className="bg-gradient-to-r from-text via-text to-text bg-clip-text transition-all duration-500 group-hover:from-site-accent group-hover:via-text group-hover:to-gold group-hover:text-transparent">
                  {siteConfig.name}
                </span>
              </span>
              <span
                className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-site-accent via-gold to-site-accent transition-all duration-500 group-hover:w-full"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* 中央: デスクトップナビゲーション */}
          <ul className="hidden items-center justify-center gap-1 md:flex">
            {navItems.slice(0, -1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative px-3 py-2"
                >
                  <span className="relative text-sm tracking-wide text-text/70 transition-all duration-300 group-hover:text-site-accent">
                    {item.label}
                  </span>
                  <span
                    className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-site-accent transition-all duration-300 group-hover:w-2/3"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* 右: CTAボタン / モバイルメニュー */}
          <div className="flex justify-end">
            {/* デスクトップCTA */}
            <Link
              href="/contact"
              className="hidden rounded-full bg-site-accent px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-site-accent/90 hover:shadow-lg md:block"
            >
              {text.nav.ctaButton}
            </Link>

            {/* モバイルメニューボタン */}
            <button
              type="button"
              className="group relative flex h-10 w-10 items-center justify-center md:hidden"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? text.nav.mobileMenuClose : text.nav.mobileMenuOpen}
            >
              <MenuIcon className="h-5 w-5 text-text/70 transition-colors group-hover:text-site-accent" />
            </button>
          </div>
        </nav>
      </header>

      {/* フルスクリーンモバイルメニュー */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-60 md:hidden',
          isMobileMenuOpen ? 'visible' : 'invisible pointer-events-none'
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* 背景オーバーレイ */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream/95 transition-opacity duration-500',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* 背景装飾 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className={cn(
              'absolute -top-20 -right-20 w-80 h-80 rounded-full bg-site-accent/5 blur-[80px] transition-all duration-700',
              isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            )}
          />
          <div
            className={cn(
              'absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gold/5 blur-[60px] transition-all duration-700 delay-200',
              isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            )}
          />
        </div>

        {/* ヘッダー部分 */}
        <div className="relative flex items-center justify-between px-6 py-5">
          <span className="track-meta font-display text-xl">
            {siteConfig.name}
          </span>
          <button
            type="button"
            className={cn(
              'group relative flex h-11 w-11 items-center justify-center transition-all duration-300',
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            )}
            onClick={closeMobileMenu}
            aria-label={text.nav.mobileMenuClose}
          >
            <span
              className="absolute inset-0 rounded-xl border border-transparent transition-all duration-300 group-hover:border-text/10 group-hover:bg-text/5"
              aria-hidden="true"
            />
            <CloseIcon className="relative h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        {/* ナビゲーション */}
        <nav
          className="relative flex flex-col px-6 pt-8"
          aria-label={text.nav.ariaMobileNav}
        >
          <ul className="flex flex-col">
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className={cn(
                  'transition-all duration-500',
                  isMobileMenuOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0'
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${150 + index * 60}ms` : '0ms',
                }}
              >
                <Link
                  href={item.href}
                  className="group relative flex items-center justify-between py-5"
                  onClick={closeMobileMenu}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  {/* 背景ホバー */}
                  <span
                    className="absolute inset-0 -mx-4 rounded-xl bg-gradient-to-r from-site-accent/0 to-gold/0 transition-all duration-300 group-hover:from-site-accent/5 group-hover:to-gold/5"
                    aria-hidden="true"
                  />

                  {/* 左側の装飾ライン */}
                  <span
                    className="absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 rounded-full bg-gradient-to-b from-site-accent to-gold transition-all duration-300 group-hover:h-1/2"
                    aria-hidden="true"
                  />

                  <span className="relative pl-4 text-lg font-light tracking-wide transition-all duration-300 group-hover:pl-6 group-hover:text-site-accent">
                    {item.label}
                  </span>

                  <span
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border border-beige text-text-light transition-all duration-300 group-hover:border-site-accent/30 group-hover:bg-site-accent/10 group-hover:text-site-accent"
                    aria-hidden="true"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>

                {/* 区切り線 */}
                {index < navItems.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-beige/50 via-beige to-transparent" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>

          {/* 下部装飾 */}
          <div
            className={cn(
              'mt-16 flex flex-col items-center gap-4 transition-all duration-700',
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: isMobileMenuOpen ? '500ms' : '0ms' }}
            aria-hidden="true"
          >
            {/* 装飾リング */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-full border border-beige/30" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-beige/50 bg-beige/20">
                <span className="text-lg text-text-light/50">{text.footer.decorativeMark}</span>
              </div>
            </div>

            {/* サブテキスト */}
            <p className="text-xs tracking-widest text-text-light/40">
              {text.site.subTagline}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
