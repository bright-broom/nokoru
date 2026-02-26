import { FadeIn } from './FadeIn';
import { Button } from './Button';

interface SectionCTAProps {
  href: string;
  label: string;
  ariaLabel: string;
  /** ボタンのバリアント */
  variant?: 'gradient' | 'glow';
  /** アニメーション遅延（ms） */
  delay?: number;
  /** 上部マージンのカスタマイズ */
  className?: string;
}

/**
 * セクション共通のCTAボタン
 * FadeInアニメーション付き
 */
export function SectionCTA({
  href,
  label,
  ariaLabel,
  variant = 'gradient',
  delay = 400,
  className = 'mt-14',
}: SectionCTAProps) {
  return (
    <FadeIn direction="scale" delay={delay} easing="bounce" className={`flex justify-center ${className}`}>
      <Button href={href} variant={variant} aria-label={ariaLabel}>
        {label}
      </Button>
    </FadeIn>
  );
}
