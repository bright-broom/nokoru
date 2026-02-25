'use client';

import { cn } from '@/lib/utils';
import { useInView } from '@/hooks';
import type { PropsWithClassName } from '@/types';

interface SectionHeaderProps extends PropsWithClassName {
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeader({
  title,
  subtitle,
  id,
  className,
}: SectionHeaderProps) {
  const { ref, isInView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div
        className={cn(
          'mb-4 flex items-center justify-center gap-4 transition-all duration-1000 ease-premium',
          isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-sm'
        )}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-site-accent/40 to-transparent" />
        <span className="font-display text-sm tracking-[0.3em] text-site-accent/60">✦</span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent via-site-accent/40 to-transparent" />
      </div>

      <h2
        id={id}
        className={cn(
          'font-display text-3xl md:text-5xl tracking-wider transition-all duration-1000 delay-100 ease-premium',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-text-light tracking-wide transition-all duration-1000 delay-300 ease-premium',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
