import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { PropsWithClassName } from '@/types';

interface ButtonProps extends PropsWithClassName {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline';
  size?: 'default' | 'large';
  isExternal?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
}

const baseClasses =
  'inline-flex items-center justify-center text-sm font-medium tracking-wide rounded-md shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variantClasses = {
  primary:
    'bg-site-accent text-white hover:bg-site-accent/90 hover:shadow-md active:scale-[0.98]',
  outline:
    'border-2 border-text bg-transparent hover:bg-text hover:text-cream hover:shadow-md active:scale-[0.98]',
} as const;

const sizeClasses = {
  default: 'px-7 py-2.5',
  large: 'px-9 py-3.5 text-base',
} as const;

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
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    const externalProps = isExternal
      ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
      : {};

    return (
      <Link href={href} className={classes} aria-label={ariaLabel} {...externalProps}>
        {children}
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
      {children}
    </button>
  );
}
