'use client';

import { memo, useMemo } from 'react';
import Cal from '@calcom/embed-react';
import { siteColors } from '@/lib/colors';
import { useCalInit } from '@/hooks';

export interface CalEmbedProps {
  /**
   * Cal.comのユーザー名/イベントタイプ
   * Example: username or username/event-type
   */
  calLink: string;
  /**
   * カレンダーのレイアウト
   */
  layout?: 'month_view' | 'week_view' | 'column_view';
  /**
   * ブランドカラー（HEX形式）
   */
  brandColor?: string;
  /**
   * 追加のCSSクラス
   */
  className?: string;
}

/**
 * Cal.com埋め込みコンポーネント
 *
 * NOKORUのブランドに合わせたスタイリングで
 * Cal.comの予約カレンダーを表示
 */
// スタイルオブジェクトをコンポーネント外に移動（不変のため）
const calStyle = {
  width: '100%',
  height: '100%',
  overflow: 'scroll',
  minHeight: '500px',
} as const;

export const CalEmbed = memo(function CalEmbed({
  calLink,
  layout = 'month_view',
  brandColor = siteColors.accent,
  className,
}: CalEmbedProps) {
  useCalInit(brandColor);

  // configオブジェクトをメモ化（layout変更時のみ再生成）
  const config = useMemo(
    () => ({
      layout,
      theme: 'light' as const,
    }),
    [layout]
  );

  return (
    <div className={className}>
      <Cal calLink={calLink} style={calStyle} config={config} />
    </div>
  );
});
