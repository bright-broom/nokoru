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
    'bg-site-accent text-white shadow-sm hover:bg-site-accent/90 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]',
  outline:
    'border-2 border-text bg-transparent hover:bg-text hover:text-cream hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]',
  gradient:
    'bg-gradient-to-r from-site-accent to-site-accent-light text-white shadow-md hover:shadow-lg hover:shadow-site-accent/25 hover:-translate-y-0.5 active:scale-[0.98]',
  ghost:
    'bg-transparent text-text hover:bg-beige hover:text-site-accent active:scale-[0.98]',
  glow:
    'bg-site-accent text-white shadow-[0_0_20px_rgba(122,142,197,0.3)] hover:shadow-[0_0_30px_rgba(122,142,197,0.5)] hover:-translate-y-0.5 active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  small: 'px-4 py-1.5 text-xs',
  default: 'px-7 py-2.5',
  large: 'px-9 py-3.5 text-base',
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
