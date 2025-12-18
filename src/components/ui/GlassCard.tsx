'use client';

import { cn } from '@/lib/utils';
import type { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

type GlassCardVariant = 'default' | 'subtle' | 'strong';

interface GlassCardProps<T extends ElementType = 'div'> {
  children: ReactNode;
  as?: T;
  variant?: GlassCardVariant;
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

const variantStyles: Record<GlassCardVariant, string> = {
  default: 'bg-white/70 backdrop-blur-[12px] border border-white/30',
  subtle: 'bg-white/50 backdrop-blur-[8px] border border-white/20',
  strong: 'bg-white/80 backdrop-blur-[16px] border border-white/40',
};

export function GlassCard<T extends ElementType = 'div'>({
  children,
  as,
  variant = 'default',
  hover = false,
  glow = false,
  className,
  ...props
}: GlassCardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof GlassCardProps<T>>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn(
        'rounded-2xl',
        variantStyles[variant],
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        glow && 'hover:shadow-[0_0_30px_rgba(122,142,197,0.2)]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
