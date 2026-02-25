import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * フォーム入力コンポーネント共通スタイル
 * Input, Textareaで共有
 */
export const formInputStyles = {
  base: "w-full rounded-lg border-2 border-beige bg-white text-base shadow-sm transition-all duration-200",
  placeholder: "placeholder:text-text-light/60",
  hover: "hover:border-site-accent/40 hover:bg-cream/30",
  focus: "focus-visible:border-site-accent focus-visible:ring-4 focus-visible:ring-site-accent/20 focus-visible:shadow-md focus-visible:outline-none",
  invalid: "aria-invalid:border-error aria-invalid:ring-4 aria-invalid:ring-error/20",
  disabled: "disabled:bg-beige/50 disabled:cursor-not-allowed disabled:opacity-60",
} as const;

/** 全てのフォーム入力共通スタイルを結合 */
export const formInputBaseClasses = [
  formInputStyles.base,
  formInputStyles.placeholder,
  formInputStyles.hover,
  formInputStyles.focus,
  formInputStyles.invalid,
  formInputStyles.disabled,
].join(" ");

/**
 * 外部リンクの属性を生成
 */
export function getExternalLinkProps(isExternal: boolean = false) {
  if (!isExternal) return {};
  return {
    target: '_blank' as const,
    rel: 'noopener noreferrer' as const,
  };
}
/**
 * 指定したIDの要素へスムーズにスクロール
 */
export function scrollToElement(id: string, behavior: ScrollBehavior = 'smooth') {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior });
  }
}

/**
 * カードコンポーネント共通スタイル
 */
export const cardStyles = {
  /** カード基本スタイル */
  base: 'group relative overflow-hidden rounded-2xl bg-white shadow-elevated transition-all duration-700',
  /** ホバー時のエフェクト（上昇 + シャドウ強化） */
  hover: 'hover:shadow-premium hover:-translate-y-2',
  /** ホバー時のエフェクト（控えめ） */
  hoverSubtle: 'hover:shadow-xl hover:-translate-y-1',
} as const;

/** カード基本スタイル + ホバーエフェクト */
export const cardBaseClasses = cn(cardStyles.base, cardStyles.hover);

/**
 * アイコンボックス共通スタイル
 */
export const iconBoxStyles = {
  /** アイコンボックス基本スタイル */
  base: 'flex items-center justify-center rounded-xl bg-site-accent/10 transition-all duration-500',
  /** グループホバー時のエフェクト */
  groupHover: 'group-hover:bg-site-accent group-hover:scale-110 group-hover:text-white',
} as const;

/** アイコンボックス基本 + ホバーエフェクト */
export const iconBoxBaseClasses = cn(iconBoxStyles.base, iconBoxStyles.groupHover);

/**
 * グラデーション装飾線スタイル
 */
export const dividerStyles = {
  /** 水平グラデーション線 */
  horizontal: 'h-px bg-gradient-to-r from-transparent via-site-accent/20 to-transparent',
  /** 短い装飾線 */
  short: 'h-px w-12 bg-gradient-to-r from-transparent via-site-accent/30 to-transparent',
  /** 幅広い装飾線 */
  wide: 'h-px w-24 bg-gradient-to-r from-transparent via-site-accent/30 to-transparent',
} as const;

/**
 * ホバー時の出現アニメーション用スタイル
 */
export const revealOnHoverStyles = {
  /** 初期状態（非表示） */
  hidden: 'translate-y-4 opacity-0',
  /** ホバー時（表示） */
  visible: 'group-hover:translate-y-0 group-hover:opacity-100',
  /** トランジション */
  transition: 'transition-all duration-700',
} as const;

/** ホバー時出現アニメーション全体 */
export const revealOnHoverClasses = cn(
  revealOnHoverStyles.hidden,
  revealOnHoverStyles.visible,
  revealOnHoverStyles.transition
);
