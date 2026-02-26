/**
 * 汎用ユーティリティ関数
 */

import { Fragment } from 'react';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Tailwind CSS クラスをマージ
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
 * 改行を含む文字列をReactノードに変換
 */
export function renderMultilineText(text: string): React.ReactNode {
  return text.split('\n').map((line, index, array) => (
    <Fragment key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </Fragment>
  ));
}
