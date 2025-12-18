'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig, navItems, text } from '@/config';
import { MenuIcon, CloseIcon } from '@/components/icons';

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
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-beige/40 shadow-sm"
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-site-accent focus:px-4 focus:py-2 focus:text-white"
      >
        {text.nav.skipToMain}
      </a>

      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        role="navigation"
        aria-label={text.nav.ariaMainNav}
      >
        <Link
          href="/"
          className="font-display text-xl tracking-wider transition-colors hover:text-site-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2"
          aria-label={`${siteConfig.name} - ${text.nav.homeAriaSuffix}`}
        >
          {siteConfig.name}
        </Link>

        <ul className="hidden gap-8 text-sm md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition hover:text-site-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? text.nav.mobileMenuClose : text.nav.mobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </nav>

      <nav
        id="mobile-menu"
        className={cn(
          'absolute left-0 right-0 top-full bg-cream/95 backdrop-blur-sm transition-all duration-200 md:hidden',
          isMobileMenuOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0'
        )}
        aria-label={text.nav.ariaMobileNav}
        aria-hidden={!isMobileMenuOpen}
      >
        <ul className="flex flex-col gap-4 px-6 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-2 text-lg transition hover:text-site-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent"
                onClick={closeMobileMenu}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
