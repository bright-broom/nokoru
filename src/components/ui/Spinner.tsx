import { cn } from '@/lib/utils';
import { text } from '@/config/text';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-8 w-8 border-4',
};

/**
 * ローディングスピナーコンポーネント
 */
export function Spinner({ className, size = 'sm' }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label={text.ui.loadingAria}
    >
      <span className="sr-only">{text.ui.loadingSrOnly}</span>
    </div>
  );
}
