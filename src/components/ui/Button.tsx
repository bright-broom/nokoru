import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { PropsWithClassName } from '@/types';

type ButtonVariant = 'primary' | 'outline' | 'gradient' | 'ghost' | 'glow';
type ButtonSize = 'default' | 'large' | 'small';

interface ButtonProps extends PropsWithClassName {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isExternal?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
  /** アイコンを左に配置 */
  iconLeft?: React.ReactNode;
  /** アイコンを右に配置 */
  iconRight?: React.ReactNode;
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide rounded-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-site-accent text-white shadow-sm hover:bg-site-accent/90 hover:shadow-premium hover:-translate-y-1 active:scale-[0.98]',
  outline:
    'border border-text/20 bg-transparent text-text hover:border-site-accent hover:text-site-accent hover:shadow-elevated hover:-translate-y-1 active:scale-[0.98]',
  gradient:
    'bg-gradient-to-r from-site-accent to-site-accent-light text-white shadow-md hover:shadow-premium hover:shadow-site-accent/20 hover:-translate-y-1 active:scale-[0.98]',
  ghost:
    'bg-transparent text-text/70 hover:bg-beige/40 hover:text-site-accent active:scale-[0.96]',
  glow:
    'relative bg-white text-site-accent border border-site-accent/10 shadow-glow hover:shadow-glow-gold hover:border-gold/30 hover:-translate-y-1 active:scale-[0.98] after:absolute after:inset-0 after:rounded-md after:shadow-[inset_0_0_15px_rgba(255,255,255,0.5)] after:pointer-events-none',
};

const sizeClasses: Record<ButtonSize, string> = {
  small: 'px-5 py-2 text-[13px] tracking-wider',
  default: 'px-8 py-3 text-[14px] tracking-widest uppercase font-semibold',
  large: 'px-11 py-4 text-[16px] tracking-[0.2em] uppercase font-bold',
};

export function Button({
  children,
  className,
  href,
  variant = 'outline',
  size = 'default',
  isExternal = false,
  onClick,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
  iconLeft,
  iconRight,
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  const content = (
    <>
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </>
  );

  if (href) {
    const externalProps = isExternal
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <Link href={href} className={classes} aria-label={ariaLabel} {...externalProps}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
