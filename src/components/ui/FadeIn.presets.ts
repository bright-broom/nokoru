/**
 * FadeIn アニメーションプリセット
 * 一貫したアニメーション体験を提供
 */

type AnimationDirection =
  | 'up' | 'down' | 'left' | 'right' | 'none'
  | 'scale' | 'scale-up' | 'blur' | 'blur-up'
  | 'diagonal-left' | 'diagonal-right';

type AnimationEasing = 'ease-out' | 'ease-in-out' | 'bounce' | 'smooth';

interface FadeInPreset {
  direction: AnimationDirection;
  duration: number;
  easing: AnimationEasing;
}

/**
 * カード要素用プリセット
 * ServiceCard, PlanCard, StaffCard, WorkCard などで使用
 */
export const cardPreset: FadeInPreset = {
  direction: 'scale-up',
  duration: 1000,
  easing: 'smooth',
};

/**
 * コンテンツブロック用プリセット
 * セクション内のテキストブロックで使用
 */
export const contentPreset: FadeInPreset = {
  direction: 'blur-up',
  duration: 1200,
  easing: 'smooth',
};

/**
 * CTA ボタン用プリセット
 * バウンス効果付き
 */
export const ctaPreset: FadeInPreset = {
  direction: 'scale',
  duration: 600,
  easing: 'bounce',
};

/**
 * シンプルなフェードイン
 * ContactCards などで使用
 */
export const simplePreset: FadeInPreset = {
  direction: 'up',
  duration: 600,
  easing: 'ease-out',
};

/**
 * Hero セクション用プリセット
 * ブラー効果でドラマチックに
 */
export const heroPreset: FadeInPreset = {
  direction: 'blur',
  duration: 1200,
  easing: 'smooth',
};

/**
 * 全プリセットをまとめたオブジェクト
 */
export const fadeInPresets = {
  card: cardPreset,
  content: contentPreset,
  cta: ctaPreset,
  simple: simplePreset,
  hero: heroPreset,
} as const;

export type FadeInPresetName = keyof typeof fadeInPresets;
