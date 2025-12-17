import { cn } from '@/lib/utils';
import type { SectionProps } from '@/types';

interface Props extends SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'alternate';
  'aria-labelledby'?: string;
}

export function Section({
  children,
  id,
  className,
  variant = 'default',
  'aria-labelledby': ariaLabelledby,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(
        'py-24',
        variant === 'alternate' && 'bg-beige',
        className
      )}
    >
      {children}
    </section>
  );
}
