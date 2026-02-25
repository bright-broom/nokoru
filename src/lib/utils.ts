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
