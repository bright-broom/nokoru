'use client';

import { Button } from './Button';
import { siteColors } from '@/lib/colors';
import { useCalInit } from '@/hooks';

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
  useCalInit(brandColor);

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
