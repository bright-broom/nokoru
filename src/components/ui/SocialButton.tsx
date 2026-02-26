import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentType, SVGProps } from 'react';

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

interface SocialButtonProps {
  href: string;
  icon: IconComponent;
  label: string;
  /** グロー効果の色 */
  glowColor?: 'accent' | 'gold';
  /** サイズ */
  size?: 'sm' | 'md' | 'lg';
  /** 外部リンクかどうか */
  isExternal?: boolean;
}

const sizeClasses = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-14 w-14',
} as const;

const iconSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
} as const;

const glowColorClasses = {
  accent: {
    glow: 'from-site-accent/20 to-site-accent/0',
    border: 'group-hover:border-site-accent/50',
  },
  gold: {
    glow: 'from-gold/20 to-gold/0',
    border: 'group-hover:border-gold/50',
  },
} as const;

/**
 * SNS・外部リンク用ボタン
 * グロー効果付きの円形アイコンボタン
 */
export function SocialButton({
  href,
  icon: Icon,
  label,
  glowColor = 'accent',
  size = 'md',
  isExternal = true,
}: SocialButtonProps) {
  const colorConfig = glowColorClasses[glowColor];

  return (
    <Link
      href={href}
      className={cn('group relative flex items-center justify-center', sizeClasses[size])}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={label}
    >
      {/* 背景グロー */}
      <span
        className={cn(
          'absolute inset-0 rounded-full bg-gradient-to-br blur-md',
          'opacity-0 transition-opacity duration-500 group-hover:opacity-100',
          colorConfig.glow
        )}
        aria-hidden="true"
      />
      {/* ボーダー */}
      <span
        className={cn(
          'absolute inset-0 rounded-full border border-cream/20',
          'transition-all duration-500 group-hover:scale-110',
          colorConfig.border
        )}
        aria-hidden="true"
      />
      {/* アイコン */}
      <Icon
        className={cn(
          'relative text-cream/60 transition-all duration-300',
          'group-hover:text-cream group-hover:scale-110',
          iconSizeClasses[size]
        )}
      />
    </Link>
  );
}
