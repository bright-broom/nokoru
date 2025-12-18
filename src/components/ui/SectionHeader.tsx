'use client';

import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';
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
          'mb-6 flex items-center justify-center gap-3 transition-all duration-700 ease-out',
          isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        )}
      >
        <div className="h-px w-8 bg-site-accent/40" />
        <span className="text-site-accent/60 text-sm">✦</span>
        <div className="h-px w-8 bg-site-accent/40" />
      </div>

      <h2
        id={id}
        className={cn(
          'font-display text-3xl md:text-4xl tracking-wide transition-all duration-700 ease-out',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-text-light tracking-wide transition-all duration-700 ease-out delay-200',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
