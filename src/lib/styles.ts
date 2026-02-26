/**
 * スタイルユーティリティ
 * 共通スタイル定義とユーティリティ関数
 */

import { cn } from './utils';

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
 * カードコンポーネント共通スタイル
 */
export const cardStyles = {
  /** カード基本スタイル */
  base: 'group relative overflow-hidden rounded-2xl bg-white shadow-elevated transition-all duration-700',
  /** ホバー時のエフェクト（上昇 + シャドウ強化） */
  hover: 'hover:shadow-premium hover:-translate-y-2',
} as const;

/**
 * アイコンボックス共通スタイル
 */
export const iconBoxStyles = {
  /** アイコンボックス基本スタイル */
  base: 'flex items-center justify-center rounded-xl bg-site-accent/10 transition-all duration-500',
  /** グループホバー時のエフェクト */
  groupHover: 'group-hover:bg-site-accent group-hover:scale-110 group-hover:text-white',
} as const;

/**
 * ホバー時の出現アニメーション用クラス
 */
export const revealOnHoverClasses = cn(
  'translate-y-4 opacity-0',
  'group-hover:translate-y-0 group-hover:opacity-100',
  'transition-all duration-700'
);
