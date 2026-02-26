import { cn } from '@/lib/utils';

interface DecorativeDividerProps {
  /** 中央のシンボル */
  symbol?: string;
  /** 線の幅 */
  lineWidth?: 'sm' | 'md' | 'lg';
  /** カスタムクラス */
  className?: string;
}

const lineWidthConfig = {
  sm: 'w-8',
  md: 'w-12',
  lg: 'w-16',
} as const;

/**
 * 装飾用の区切り線
 * セクションヘッダーやフッターで使用
 */
export function DecorativeDivider({
  symbol = '✦',
  lineWidth = 'md',
  className,
}: DecorativeDividerProps) {
  const width = lineWidthConfig[lineWidth];

  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <div
        className={cn(
          'h-px bg-gradient-to-r from-transparent via-site-accent/40 to-transparent',
          width
        )}
        aria-hidden="true"
      />
      <span className="track-kicker font-display text-sm text-site-accent/60">
        {symbol}
      </span>
      <div
        className={cn(
          'h-px bg-gradient-to-l from-transparent via-site-accent/40 to-transparent',
          width
        )}
        aria-hidden="true"
      />
    </div>
  );
}
