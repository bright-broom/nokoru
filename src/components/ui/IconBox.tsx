import { cn } from '@/lib/utils';
import type { ComponentType, SVGProps } from 'react';

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

interface IconBoxProps {
  icon: IconComponent;
  /** サイズバリアント */
  size?: 'sm' | 'md' | 'lg';
  /** 形状バリアント */
  shape?: 'rounded' | 'circle';
  /** アクセントドット表示 */
  withAccentDot?: boolean;
  /** カスタムクラス */
  className?: string;
}

const sizeConfig = {
  sm: {
    box: 'h-12 w-12',
    icon: 'h-5 w-5',
    dot: 'h-4 w-4 -bottom-1 -right-1',
  },
  md: {
    box: 'h-14 w-14 md:h-16 md:w-16',
    icon: 'h-7 w-7 md:h-8 md:w-8',
    dot: 'h-5 w-5 -bottom-1 -right-1',
  },
  lg: {
    box: 'h-20 w-20',
    icon: 'h-10 w-10',
    dot: 'h-6 w-6 -bottom-2 -right-2',
  },
} as const;

const shapeConfig = {
  rounded: 'rounded-2xl',
  circle: 'rounded-full',
} as const;

/**
 * 統一されたアイコンボックスコンポーネント
 * カード内のアイコン表示に使用
 */
export function IconBox({
  icon: Icon,
  size = 'md',
  shape = 'rounded',
  withAccentDot = false,
  className,
}: IconBoxProps) {
  const config = sizeConfig[size];

  return (
    <div className={cn('relative inline-flex', className)}>
      <div
        className={cn(
          'flex items-center justify-center bg-beige/50 transition-all duration-700',
          'group-hover:bg-site-accent group-hover:shadow-glow group-hover:shadow-site-accent/20',
          config.box,
          shapeConfig[shape]
        )}
      >
        <Icon
          className={cn(
            'text-site-accent transition-all duration-700',
            'group-hover:scale-110 group-hover:text-white',
            config.icon
          )}
        />
      </div>
      {withAccentDot && (
        <div
          className={cn(
            'absolute rounded-full bg-gold/10 shadow-sm backdrop-blur-sm transition-all duration-700',
            'group-hover:scale-125 group-hover:bg-gold',
            config.dot
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
