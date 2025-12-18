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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-md shadow-black/5'
            : 'bg-white/70 backdrop-blur-md'
        )}
        role="banner"
      >
        {/* 上部のグラデーションライン */}
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-site-accent/50 to-transparent transition-opacity duration-500',
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
            'mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-500',
            isScrolled ? 'py-3' : 'py-4'
          )}
          role="navigation"
          aria-label={text.nav.ariaMainNav}
        >
          {/* ロゴ - グラデーション対応 */}
          <Link
            href="/"
            className="group font-display text-xl tracking-wider transition-all duration-300 hover:text-site-accent"
            aria-label={`${siteConfig.name} - ${text.nav.homeAriaSuffix}`}
          >
            <span className="relative">
              {siteConfig.name}
              <span
                className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-site-accent to-gold transition-all duration-300 group-hover:w-full"
                aria-hidden="true"
              />
            </span>
          </Link>

          {/* デスクトップナビゲーション - リッチ化 */}
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative px-4 py-2 text-sm transition-all duration-300 hover:text-site-accent"
                >
                  {item.label}
                  {/* グラデーションアンダーライン */}
                  <span
                    className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-site-accent to-site-accent-light transition-all duration-300 group-hover:w-2/3 rounded-full"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* モバイルメニューボタン - リッチ化 */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:bg-site-accent/10 hover:text-site-accent md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? text.nav.mobileMenuClose : text.nav.mobileMenuOpen}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
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
            'absolute inset-0 bg-cream transition-opacity duration-300',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* ヘッダー部分 */}
        <div className="relative flex items-center justify-between px-6 py-4">
          <span className="font-display text-xl tracking-wider">
            {siteConfig.name}
          </span>
          <button
            type="button"
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-md transition-all duration-300 hover:bg-beige',
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            )}
            onClick={closeMobileMenu}
            aria-label={text.nav.mobileMenuClose}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* ナビゲーション */}
        <nav
          className="relative flex flex-col px-6 pt-8"
          aria-label={text.nav.ariaMobileNav}
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className={cn(
                  'transition-all duration-400',
                  isMobileMenuOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-4 opacity-0'
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${100 + index * 50}ms` : '0ms',
                }}
              >
                <Link
                  href={item.href}
                  className="group flex items-center justify-between border-b border-beige py-4 text-lg transition-colors hover:text-site-accent"
                  onClick={closeMobileMenu}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  <span>{item.label}</span>
                  <span
                    className="text-text-light transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* 装飾 */}
          <div
            className={cn(
              'mt-12 text-center transition-all duration-500',
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            )}
            style={{ transitionDelay: isMobileMenuOpen ? '400ms' : '0ms' }}
            aria-hidden="true"
          >
            <span className="text-xl text-beige">{text.footer.decorativeMark}</span>
          </div>
        </nav>
      </div>
    </>
  );
}
