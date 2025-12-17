import { cn } from '@/lib/utils';
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
  return (
    <div className={cn('text-center', className)}>
      <h2
        id={id}
        className="font-display text-3xl md:text-4xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-light">{subtitle}</p>
      )}
    </div>
  );
}
