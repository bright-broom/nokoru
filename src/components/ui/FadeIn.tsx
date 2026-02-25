'use client';

import { cn } from '@/lib/utils';
import { useInView } from '@/hooks';

type AnimationDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'none'
  | 'scale'
  | 'scale-up'
  | 'blur'
  | 'blur-up'
  | 'diagonal-left'
  | 'diagonal-right';

type AnimationEasing = 'ease-out' | 'ease-in-out' | 'bounce' | 'smooth';

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
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'article';
  /** イージング */
  easing?: AnimationEasing;
}

// 非表示状態のスタイル
const hiddenStyles: Record<AnimationDirection, string> = {
  up: 'translate-y-8 opacity-0',
  down: '-translate-y-8 opacity-0',
  left: 'translate-x-8 opacity-0',
  right: '-translate-x-8 opacity-0',
  none: 'opacity-0',
  scale: 'scale-90 opacity-0',
  'scale-up': 'scale-90 translate-y-4 opacity-0',
  blur: 'opacity-0 blur-sm',
  'blur-up': 'translate-y-6 opacity-0 blur-sm',
  'diagonal-left': 'translate-x-6 translate-y-6 opacity-0',
  'diagonal-right': '-translate-x-6 translate-y-6 opacity-0',
};

// 表示状態のスタイル
const visibleStyles: Record<AnimationDirection, string> = {
  up: 'translate-y-0 opacity-100',
  down: 'translate-y-0 opacity-100',
  left: 'translate-x-0 opacity-100',
  right: 'translate-x-0 opacity-100',
  none: 'opacity-100',
  scale: 'scale-100 opacity-100',
  'scale-up': 'scale-100 translate-y-0 opacity-100',
  blur: 'opacity-100 blur-0',
  'blur-up': 'translate-y-0 opacity-100 blur-0',
  'diagonal-left': 'translate-x-0 translate-y-0 opacity-100',
  'diagonal-right': 'translate-x-0 translate-y-0 opacity-100',
};

const easingClasses: Record<AnimationEasing, string> = {
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  bounce: '[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',
  smooth: '[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]',
};

/**
 * スクロール連動フェードインアニメーションコンポーネント
 *
 * @example
 * <FadeIn direction="up" delay={200}>
 *   <h2>タイトル</h2>
 * </FadeIn>
 *
 * @example blur効果
 * <FadeIn direction="blur-up" duration={800} easing="smooth">
 *   <p>ブラーからフェードイン</p>
 * </FadeIn>
 *
 * @example スケール効果
 * <FadeIn direction="scale" easing="bounce">
 *   <Card>バウンス付きスケールイン</Card>
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
  easing = 'ease-out',
}: FadeInProps) {
  const { ref, isInView } = useInView<HTMLElement>({ triggerOnce: once });

  return (
    <Component
      ref={ref as React.RefObject<never>}
      className={cn(
        'transition-all',
        easingClasses[easing],
        !isInView && hiddenStyles[direction],
        isInView && visibleStyles[direction],
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
  easing = 'ease-out',
}: {
  children: React.ReactNode;
  className?: string;
  /** 各要素間の遅延（ms） */
  staggerDelay?: number;
  direction?: AnimationDirection;
  duration?: number;
  easing?: AnimationEasing;
}) {
  const { ref, isInView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn(
                'transition-all',
                easingClasses[easing],
                !isInView && hiddenStyles[direction],
                isInView && visibleStyles[direction]
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
