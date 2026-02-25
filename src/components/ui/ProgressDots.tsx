'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProgressDotsProps {
   count: number;
   currentIndex: number;
   className?: string;
   dotClassName?: string;
   activeDotClassName?: string;
   /** ボタンとして機能する場合のコールバック */
   onDotClick?: (index: number) => void;
   /** リンクとして機能する場合のURL生成関数 */
   getHref?: (index: number) => string;
   /** アクセシビリティ用のラベル生成関数 */
   getAriaLabel?: (index: number) => string;
}

export function ProgressDots({
   count,
   currentIndex,
   className,
   dotClassName,
   activeDotClassName,
   onDotClick,
   getHref,
   getAriaLabel,
}: ProgressDotsProps) {
   const dots = Array.from({ length: count });

   return (
      <div className={cn('flex items-center gap-2', className)}>
         {dots.map((_, index) => {
            const isActive = index === currentIndex;
            const ariaLabel = getAriaLabel?.(index) || `Go to slide ${index + 1}`;
            const commonClasses = cn(
               'h-1.5 rounded-full transition-all duration-300',
               isActive
                  ? cn('w-8 bg-site-accent', activeDotClassName)
                  : cn('w-1.5 bg-beige hover:bg-site-accent/50', dotClassName)
            );

            if (getHref) {
               return (
                  <Link
                     key={index}
                     href={getHref(index)}
                     className={commonClasses}
                     aria-label={ariaLabel}
                     aria-current={isActive ? 'page' : undefined}
                  />
               );
            }

            return (
               <button
                  key={index}
                  type="button"
                  className={commonClasses}
                  onClick={() => onDotClick?.(index)}
                  aria-label={ariaLabel}
               />
            );
         })}
      </div>
   );
}
