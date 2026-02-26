import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AnimatedLine } from './AnimatedLine';

type NavLinkVariant = 'header' | 'mobile' | 'footer';

interface NavLinkProps {
  href: string;
  label: string;
  variant?: NavLinkVariant;
  /** モバイルメニュー用: クリック時のコールバック */
  onClick?: () => void;
  /** モバイルメニュー用: tabIndex制御 */
  tabIndex?: number;
  className?: string;
}

const variantStyles: Record<NavLinkVariant, string> = {
  header: 'text-[11px] uppercase tracking-[0.2em] text-text/40 transition-colors duration-300 hover:text-text',
  mobile: 'block py-2 text-xl tracking-[0.15em] text-text/60 transition-colors duration-300 hover:text-text',
  footer: 'group inline-flex items-center gap-2 text-sm text-cream/50 transition-all duration-300 hover:text-cream',
};

/**
 * ナビゲーションリンクコンポーネント
 * Header/Footer で共通利用
 */
export function NavLink({
  href,
  label,
  variant = 'header',
  onClick,
  tabIndex,
  className,
}: NavLinkProps) {
  if (variant === 'footer') {
    return (
      <Link
        href={href}
        className={cn(variantStyles[variant], className)}
        onClick={onClick}
        tabIndex={tabIndex}
      >
        <AnimatedLine variant="footer-nav" />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(variantStyles[variant], className)}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {label}
    </Link>
  );
}
