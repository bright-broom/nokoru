import { cn } from '@/lib/utils';
import type { PropsWithClassName } from '@/types';

interface ContainerProps extends PropsWithClassName {
  children: React.ReactNode;
  as?: 'div' | 'section' | 'article' | 'main';
  size?: 'default' | 'narrow' | 'wide';
}

const sizeClasses = {
  narrow: 'max-w-2xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
} as const;

export function Container({
  children,
  className,
  as: Component = 'div',
  size = 'default',
}: ContainerProps) {
  return (
    <Component className={cn('mx-auto px-6', sizeClasses[size], className)}>
      {children}
    </Component>
  );
}
