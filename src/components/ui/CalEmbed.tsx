'use client';

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
export function CalEmbed({
  calLink,
  layout = 'month_view',
  brandColor = siteColors.accent,
  className,
}: CalEmbedProps) {
  useCalInit(brandColor);

  return (
    <div className={className}>
      <Cal
        calLink={calLink}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'scroll',
          minHeight: '500px',
        }}
        config={{
          layout,
          theme: 'light',
        }}
      />
    </div>
  );
}
