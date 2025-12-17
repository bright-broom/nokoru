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
      <h2
        id={id}
        className={cn(
          'font-display text-3xl md:text-4xl transition-all duration-700 ease-out',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-text-light transition-all duration-700 ease-out delay-200',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
