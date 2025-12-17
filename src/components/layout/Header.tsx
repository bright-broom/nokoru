'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig, navItems } from '@/config/site';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-sm"
      role="banner"
    >
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-site-accent focus:px-4 focus:py-2 focus:text-white"
      >
        メインコンテンツへスキップ
      </a>

      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        role="navigation"
        aria-label="メインナビゲーション"
      >
        <Link
          href="/"
          className="font-display text-xl tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2"
          aria-label={`${siteConfig.name} - ホームへ戻る`}
        >
          {siteConfig.name}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden gap-8 text-sm md:flex" role="menubar">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-site-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2"
              role="menuitem"
              aria-label={item.ariaLabel}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          <span className="sr-only">
            {isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          </span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          'absolute left-0 right-0 top-full bg-cream/95 backdrop-blur-sm transition-all duration-200 md:hidden',
          isMobileMenuOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0'
        )}
        role="menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col gap-4 px-6 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 text-lg transition hover:text-site-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent"
              role="menuitem"
              aria-label={item.ariaLabel}
              onClick={closeMobileMenu}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
