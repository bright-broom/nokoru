'use client';

import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { Button } from './Button';
import { siteColors } from '@/lib/colors';

export interface CalButtonProps {
  /**
   * Cal.comのユーザー名/イベントタイプ
   */
  calLink: string;
  /**
   * ボタンのテキスト
   */
  children: React.ReactNode;
  /**
   * ブランドカラー（HEX形式）
   */
  brandColor?: string;
  /**
   * ボタンのサイズ
   */
  size?: 'default' | 'large';
  /**
   * 追加のCSSクラス
   */
  className?: string;
}

/**
 * Cal.comポップアップを開くボタン
 *
 * クリックするとモーダルで予約カレンダーが開く
 */
export function CalButton({
  calLink,
  children,
  brandColor = siteColors.accent,
  size = 'default',
  className,
}: CalButtonProps) {
  useEffect(() => {
    (async function initCal() {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'light',
        styles: {
          branding: {
            brandColor,
          },
        },
      });
    })();
  }, [brandColor]);

  return (
    <Button
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}
