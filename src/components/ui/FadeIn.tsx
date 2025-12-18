'use client';

import { cn } from '@/lib/utils';
import { useInView } from '@/hooks';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** アニメーションの方向 */
  direction?: AnimationDirection;
  /** 遅延（ms） */
  delay?: number;
  /** アニメーション時間（ms） */
  duration?: number;
  /** 一度だけアニメーションするか */
  once?: boolean;
  /** HTML要素タイプ */
  as?: 'div' | 'section' | 'li' | 'span' | 'p';
}

const directionStyles: Record<AnimationDirection, string> = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: 'translate-x-8',
  right: '-translate-x-8',
  none: '',
};

/**
 * スクロール連動フェードインアニメーションコンポーネント
 *
 * @example
 * <FadeIn direction="up" delay={200}>
 *   <h2>タイトル</h2>
 * </FadeIn>
 */
export function FadeIn({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 600,
  once = true,
  as: Component = 'div',
}: FadeInProps) {
  const { ref, isInView } = useInView({ triggerOnce: once });

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn(
        'transition-all ease-out',
        !isInView && `opacity-0 ${directionStyles[direction]}`,
        isInView && 'opacity-100 translate-x-0 translate-y-0',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Component>
  );
}

/**
 * 子要素を順番にフェードインさせるコンテナ
 *
 * @example
 * <FadeInStagger>
 *   <FadeInItem>Item 1</FadeInItem>
 *   <FadeInItem>Item 2</FadeInItem>
 * </FadeInStagger>
 */
export function FadeInStagger({
  children,
  className,
  staggerDelay = 100,
  direction = 'up',
  duration = 600,
}: {
  children: React.ReactNode;
  className?: string;
  /** 各要素間の遅延（ms） */
  staggerDelay?: number;
  direction?: AnimationDirection;
  duration?: number;
}) {
  const { ref, isInView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn(
                'transition-all ease-out',
                !isInView && `opacity-0 ${directionStyles[direction]}`,
                isInView && 'opacity-100 translate-x-0 translate-y-0'
              )}
              style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: isInView ? `${index * staggerDelay}ms` : '0ms',
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
