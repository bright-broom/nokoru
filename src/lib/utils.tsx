/**
 * ユーティリティ関数
 */

/**
 * クラス名を結合する
 * @param classes - 結合するクラス名の配列
 * @returns 結合されたクラス名文字列
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * 価格を日本円フォーマットで表示
 * @param price - 価格（数値）
 * @returns フォーマットされた価格文字列
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
 * @param isExternal - 外部リンクかどうか
 * @returns rel と target 属性のオブジェクト
 */
export function getExternalLinkProps(isExternal: boolean = false) {
  if (!isExternal) return {};
  return {
    target: '_blank' as const,
    rel: 'noopener noreferrer' as const,
  };
}

/**
 * 改行を含む文字列をReactノードに変換
 * @param text - 改行を含むテキスト
 * @returns React要素の配列
 */
export function renderMultilineText(text: string): React.ReactNode[] {
  return text.split('\n').map((line, index, array) => (
    <span key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </span>
  ));
}
