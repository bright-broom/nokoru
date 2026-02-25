import Link from 'next/link';
import { cn, getExternalLinkProps } from '@/lib/utils';
import type { PropsWithClassName } from '@/types';

type ButtonVariant = 'primary' | 'outline' | 'gradient' | 'ghost' | 'glow';
type ButtonSize = 'default' | 'large' | 'small';

/** 共通のボタンプロパティ */
interface ButtonBaseProps extends PropsWithClassName {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  'aria-label'?: string;
  /** アイコンを左に配置 */
  iconLeft?: React.ReactNode;
  /** アイコンを右に配置 */
  iconRight?: React.ReactNode;
}

/** リンクとして使用する場合 */
interface LinkButtonProps extends ButtonBaseProps {
  href: string;
  isExternal?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
  'aria-busy'?: never;
}

/** ボタンとして使用する場合 */
interface NativeButtonProps extends ButtonBaseProps {
  href?: never;
  isExternal?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-busy'?: boolean;
}

type ButtonProps = LinkButtonProps | NativeButtonProps;

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
  small: 'px-4 py-2 min-h-[40px] text-xs tracking-wider',
  default: 'px-6 py-3 min-h-[48px] text-sm tracking-widest uppercase font-semibold',
  large: 'track-label px-8 py-4 min-h-[56px] text-base uppercase font-bold',
};

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = 'outline',
    size = 'default',
    'aria-label': ariaLabel,
    iconLeft,
    iconRight,
  } = props;

  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  const content = (
    <>
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </>
  );

  // リンクボタンの場合
  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        aria-label={ariaLabel}
        {...getExternalLinkProps(props.isExternal)}
      >
        {content}
      </Link>
    );
  }

  // ネイティブボタンの場合
  const { onClick, type = 'button', disabled, 'aria-busy': ariaBusy } = props as NativeButtonProps;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-busy={ariaBusy}
    >
      {content}
    </button>
  );
}
