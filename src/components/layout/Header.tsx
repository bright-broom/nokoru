'use client';

import { useState, useCallback, useEffect, useMemo, memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig, navItems, text } from '@/config';
import { MenuIcon, CloseIcon } from '@/components/icons';
import { NavLink } from '@/components/ui/NavLink';
import { useScrollBackground } from '@/hooks';
import { SCROLL_THRESHOLDS } from '@/lib/constants';

// ナビゲーションリストをメモ化（再レンダリング防止）
const NavItemList = memo(function NavItemList({
  items,
  className,
}: {
  items: typeof navItems;
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.href}>
          <NavLink href={item.href} label={item.label} variant="header" />
        </li>
      ))}
    </ul>
  );
});

export const Header = memo(function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollBackground(SCROLL_THRESHOLDS.HEADER_SCROLL);

  // ナビゲーションを左右に分割
  const { leftNavItems, rightNavItems } = useMemo(() => {
    const midpoint = Math.ceil(navItems.length / 2);
    return {
      leftNavItems: navItems.slice(0, midpoint),
      rightNavItems: navItems.slice(midpoint),
    };
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
            ? 'bg-cream/95 backdrop-blur-md'
            : 'bg-cream/80 backdrop-blur-sm'
        )}
        role="banner"
      >
        {/* 下部ボーダー - 常に表示、控えめに */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-text/[0.06]"
          aria-hidden="true"
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-site-accent focus:px-4 focus:py-2 focus:text-white"
        >
          {text.nav.skipToMain}
        </a>

        <nav
          className={cn(
            'mx-auto flex max-w-6xl items-center px-6 transition-all duration-500',
            isScrolled ? 'py-2.5' : 'py-3'
          )}
          role="navigation"
          aria-label={text.nav.ariaMainNav}
        >
          {/* 左ナビゲーション */}
          <NavItemList
            items={leftNavItems}
            className="hidden flex-1 items-center gap-10 lg:flex"
          />

          {/* 中央ロゴ */}
          <Link
            href="/"
            className="flex items-center font-display text-xl tracking-[0.25em] text-text transition-colors duration-300 hover:text-text/70 lg:mx-8"
            aria-label={`${siteConfig.name} - ${text.nav.homeAriaSuffix}`}
          >
            {siteConfig.name}
          </Link>

          {/* 右ナビゲーション */}
          <NavItemList
            items={rightNavItems}
            className="hidden flex-1 items-center justify-end gap-10 lg:flex"
          />

          {/* モバイルメニューボタン */}
          <button
            type="button"
            className="ml-auto flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? text.nav.mobileMenuClose : text.nav.mobileMenuOpen}
          >
            <MenuIcon className="h-4 w-4 text-text/50" />
          </button>
        </nav>
      </header>

      {/* モバイルメニュー */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-60 bg-cream transition-opacity duration-300 lg:hidden',
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-3">
          <span className="font-display text-base tracking-[0.35em]">{siteConfig.name}</span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center"
            onClick={closeMobileMenu}
            aria-label={text.nav.mobileMenuClose}
          >
            <CloseIcon className="h-4 w-4 text-text/50" />
          </button>
        </div>

        {/* ナビゲーション - 中央寄せ */}
        <nav
          className="flex h-[calc(100vh-64px)] flex-col items-center justify-center"
          aria-label={text.nav.ariaMobileNav}
        >
          <ul className="space-y-6 text-center">
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className={cn(
                  'transition-all duration-300',
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                )}
                style={{ transitionDelay: isMobileMenuOpen ? `${100 + index * 50}ms` : '0ms' }}
              >
                <NavLink
                  href={item.href}
                  label={item.label}
                  variant="mobile"
                  onClick={closeMobileMenu}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
});
