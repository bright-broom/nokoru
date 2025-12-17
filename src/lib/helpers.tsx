/**
 * React-specific helper functions
 */

/**
 * 改行を含む文字列をReactノードに変換
 */
export function renderMultilineText(text: string): React.ReactNode[] {
  return text.split('\n').map((line, index, array) => (
    <span key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </span>
  ));
}
