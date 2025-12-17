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
  'inline-flex items-center justify-center text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variantClasses = {
  primary: 'bg-text text-cream hover:bg-text/90',
  outline: 'border border-text bg-transparent hover:bg-text hover:text-cream',
} as const;

const sizeClasses = {
  default: 'px-6 py-2.5',
  large: 'px-8 py-3',
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
