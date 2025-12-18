'use client';

import { cn } from '@/lib/utils';

type DecorationShape = 'circle' | 'ring' | 'dot' | 'blur';

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
  sm: 'w-16 h-16',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
  xl: 'w-64 h-64',
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

export function FloatingDecoration({
  shape = 'circle',
  size = 'md',
  position = {},
  color = 'accent',
  opacity = 10,
  animate = true,
  animationDelay = 0,
  className,
}: FloatingDecorationProps) {
  const positionStyle = {
    top: position.top,
    right: position.right,
    bottom: position.bottom,
    left: position.left,
  };

  const baseClasses = cn(
    'absolute pointer-events-none',
    sizeClasses[size],
    animate && 'animate-float',
    className
  );

  const animationStyle = {
    animationDelay: `${animationDelay}ms`,
    opacity: opacity / 100,
  };

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
        className={cn(baseClasses, 'rounded-full border-2', ringColorClasses[color], 'bg-transparent')}
        style={{ ...positionStyle, ...animationStyle }}
      />
    );
  }

  if (shape === 'dot') {
    return (
      <div
        className={cn(baseClasses, 'rounded-full', colorClasses[color])}
        style={{ ...positionStyle, ...animationStyle, width: '8px', height: '8px' }}
      />
    );
  }

  if (shape === 'blur') {
    return (
      <div
        className={cn(baseClasses, 'rounded-full blur-3xl', colorClasses[color])}
        style={{ ...positionStyle, ...animationStyle }}
      />
    );
  }

  return null;
}

// 複数の装飾を配置するためのプリセット
interface FloatingDecorationsProps {
  preset?: 'hero' | 'section' | 'minimal';
  className?: string;
}

export function FloatingDecorations({ preset = 'section', className }: FloatingDecorationsProps) {
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
}
