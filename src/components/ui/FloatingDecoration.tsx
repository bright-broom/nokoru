'use client';

import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';

type DecorationShape = 'circle' | 'ring' | 'dot' | 'blur' | 'lace';

interface FloatingDecorationProps {
  shape?: DecorationShape;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  color?: 'accent' | 'gold' | 'beige';
  opacity?: number;
  animate?: boolean;
  animationDelay?: number;
  className?: string;
}

const sizeClasses = {
  sm: 'w-24 h-24',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
  xl: 'w-96 h-96',
};

const colorClasses = {
  accent: 'bg-site-accent',
  gold: 'bg-gold',
  beige: 'bg-beige',
};

const ringColorClasses = {
  accent: 'border-site-accent',
  gold: 'border-gold',
  beige: 'border-beige',
};

const svgColorClasses = {
  accent: 'text-site-accent',
  gold: 'text-gold',
  beige: 'text-beige',
};

// 事前計算された円の位置（ハイドレーションエラー回避のため）
const laceCirclePositions = [
  { cx: 85, cy: 50 },
  { cx: 80.31, cy: 67.5 },
  { cx: 67.5, cy: 80.31 },
  { cx: 50, cy: 85 },
  { cx: 32.5, cy: 80.31 },
  { cx: 19.69, cy: 67.5 },
  { cx: 15, cy: 50 },
  { cx: 19.69, cy: 32.5 },
  { cx: 32.5, cy: 19.69 },
  { cx: 50, cy: 15 },
  { cx: 67.5, cy: 19.69 },
  { cx: 80.31, cy: 32.5 },
] as const;

export const FloatingDecoration = memo(function FloatingDecoration({
  shape = 'circle',
  size = 'md',
  position = {},
  color = 'accent',
  opacity = 10,
  animate = true,
  animationDelay = 0,
  className,
}: FloatingDecorationProps) {
  // スタイルオブジェクトをメモ化
  const positionStyle = useMemo(
    () => ({
      top: position.top,
      right: position.right,
      bottom: position.bottom,
      left: position.left,
    }),
    [position.top, position.right, position.bottom, position.left]
  );

  const baseClasses = cn(
    'absolute pointer-events-none transition-opacity duration-1000',
    sizeClasses[size],
    animate && 'animate-float-slow',
    className
  );

  const animationStyle = useMemo(
    () => ({
      animationDelay: `${animationDelay}ms`,
      opacity: opacity / 100,
    }),
    [animationDelay, opacity]
  );

  if (shape === 'circle') {
    return (
      <div
        className={cn(baseClasses, 'rounded-full', colorClasses[color])}
        style={{ ...positionStyle, ...animationStyle }}
      />
    );
  }

  if (shape === 'ring') {
    return (
      <div
        className={cn(baseClasses, 'rounded-full border border-current', ringColorClasses[color], 'bg-transparent')}
        style={{ ...positionStyle, ...animationStyle }}
      />
    );
  }

  if (shape === 'dot') {
    return (
      <div
        className={cn(baseClasses, 'rounded-full', colorClasses[color])}
        style={{ ...positionStyle, ...animationStyle, width: '4px', height: '4px' }}
      />
    );
  }

  if (shape === 'blur') {
    return (
      <div
        className={cn(baseClasses, 'rounded-full blur-[80px]', colorClasses[color])}
        style={{ ...positionStyle, ...animationStyle }}
      />
    );
  }

  if (shape === 'lace') {
    return (
      <div
        className={cn(baseClasses, svgColorClasses[color])}
        style={{ ...positionStyle, ...animationStyle }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.1" />
          {laceCirclePositions.map((pos, i) => (
            <circle
              key={i}
              cx={pos.cx}
              cy={pos.cy}
              r="4"
              stroke="currentColor"
              strokeWidth="0.1"
            />
          ))}
          <path
            d="M50 2L52 10L60 12L52 14L50 22L48 14L40 12L48 10L50 2Z"
            fill="currentColor"
            className="animate-pulse"
            style={{ transformOrigin: '50% 50%' }}
          />
        </svg>
      </div>
    );
  }

  return null;
});

// 複数の装飾を配置するためのプリセット
interface FloatingDecorationsProps {
  preset?: 'hero' | 'section' | 'minimal';
  className?: string;
}

export const FloatingDecorations = memo(function FloatingDecorations({ preset = 'section', className }: FloatingDecorationsProps) {
  if (preset === 'hero') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden', className)}>
        <FloatingDecoration
          shape="blur"
          size="xl"
          color="accent"
          opacity={5}
          position={{ top: '-10%', right: '-5%' }}
          animationDelay={0}
        />
        <FloatingDecoration
          shape="blur"
          size="lg"
          color="beige"
          opacity={30}
          position={{ bottom: '10%', left: '-5%' }}
          animationDelay={2000}
        />
        <FloatingDecoration
          shape="ring"
          size="sm"
          color="accent"
          opacity={20}
          position={{ top: '20%', left: '10%' }}
          animationDelay={1000}
        />
        <FloatingDecoration
          shape="ring"
          size="md"
          color="gold"
          opacity={10}
          position={{ bottom: '30%', right: '15%' }}
          animationDelay={3000}
        />
      </div>
    );
  }

  if (preset === 'section') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden', className)}>
        <FloatingDecoration
          shape="blur"
          size="lg"
          color="accent"
          opacity={5}
          position={{ top: '10%', right: '-10%' }}
          animationDelay={0}
        />
        <FloatingDecoration
          shape="ring"
          size="sm"
          color="accent"
          opacity={15}
          position={{ bottom: '20%', left: '5%' }}
          animationDelay={1500}
        />
      </div>
    );
  }

  if (preset === 'minimal') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden', className)}>
        <FloatingDecoration
          shape="blur"
          size="md"
          color="accent"
          opacity={3}
          position={{ top: '0', right: '0' }}
          animate={false}
        />
      </div>
    );
  }

  return null;
});
