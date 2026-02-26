import { cn } from '@/lib/utils';

type LineVariant = 'accent-expand' | 'footer-nav' | 'footer-logo' | 'white-expand';

interface AnimatedLineProps {
  /** プリセットバリアント */
  variant: LineVariant;
  /** カスタムクラス */
  className?: string;
}

const variantStyles: Record<LineVariant, string> = {
  // ServicesSection, AboutSection: w-8 → w-12, accent色
  'accent-expand': cn(
    'h-px w-8 bg-site-accent/20 transition-all duration-500',
    'group-hover:w-12 group-hover:bg-site-accent'
  ),
  // Footer navigation: w-0 → w-4, gradient
  'footer-nav': cn(
    'h-px w-0 bg-gradient-to-r from-site-accent to-gold transition-all duration-300',
    'group-hover:w-4'
  ),
  // Footer logo: w-0 → w-full, gradient
  'footer-logo': cn(
    'h-px w-0 mx-auto bg-gradient-to-r from-site-accent via-gold to-site-accent transition-all duration-700',
    'group-hover:w-full'
  ),
  // WorkCard: w-0 → w-8, white
  'white-expand': cn(
    'h-px w-0 bg-white/40 transition-all duration-500',
    'group-hover:w-8'
  ),
};

/**
 * ホバー時に伸びるアニメーション線
 * group要素内で使用
 */
export function AnimatedLine({ variant, className }: AnimatedLineProps) {
  return (
    <span
      className={cn(variantStyles[variant], className)}
      aria-hidden="true"
    />
  );
}
