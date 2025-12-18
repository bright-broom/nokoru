'use client';

import { cn } from '@/lib/utils';

type DividerVariant = 'line' | 'dots' | 'wave' | 'gradient' | 'diamond';

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
}

export function SectionDivider({ variant = 'line', className }: SectionDividerProps) {
  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      {variant === 'line' && (
        <div className="flex items-center justify-center gap-4 py-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-site-accent/40" />
          <div className="h-1.5 w-1.5 rotate-45 bg-site-accent/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-site-accent/40" />
        </div>
      )}

      {variant === 'dots' && (
        <div className="flex items-center justify-center gap-3 py-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                'rounded-full bg-site-accent transition-all duration-300',
                i === 2 ? 'h-2 w-2 opacity-60' : 'h-1.5 w-1.5 opacity-30'
              )}
            />
          ))}
        </div>
      )}

      {variant === 'wave' && (
        <div className="py-4">
          <svg
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="h-8 w-full"
          >
            <path
              d="M0,30 Q150,0 300,30 T600,30 T900,30 T1200,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-site-accent/30"
            />
          </svg>
        </div>
      )}

      {variant === 'gradient' && (
        <div className="py-8">
          <div className="mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-site-accent/40 to-transparent" />
        </div>
      )}

      {variant === 'diamond' && (
        <div className="flex items-center justify-center py-8">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-site-accent/30" />
          <div className="mx-4 flex items-center gap-2">
            <div className="h-1 w-1 rotate-45 bg-site-accent/40" />
            <div className="h-2 w-2 rotate-45 border border-site-accent/50" />
            <div className="h-1 w-1 rotate-45 bg-site-accent/40" />
          </div>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-site-accent/30" />
        </div>
      )}
    </div>
  );
}
