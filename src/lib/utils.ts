import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 価格を日本円フォーマットで表示
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(price);
}

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
