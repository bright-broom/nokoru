'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CampaignBannerProps {
  className?: string;
}

export const CampaignBanner = memo(function CampaignBanner({ className }: CampaignBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-gold/90 via-gold to-gold/90 py-2 text-sm font-medium text-site-dark',
        className
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* 左側スペーサー（デスクトップのみ） */}
        <div className="hidden w-20 sm:block" />

        {/* 中央コンテンツ */}
        <div className="flex flex-1 items-center justify-center gap-2">
          <span className="hidden sm:inline">✨</span>
          <span className="text-center">
            <strong>2026年春撮影</strong> 早期予約特典｜
            <span className="hidden sm:inline">3ヶ月前予約で </span>
            <strong className="text-site-accent">10%OFF</strong>
          </span>
        </div>

        {/* 右側アクション */}
        <div className="flex items-center gap-2">
          <Link
            href="/#booking"
            className="whitespace-nowrap rounded-full bg-site-dark/90 px-3 py-0.5 text-xs font-bold text-white transition-colors hover:bg-site-dark"
          >
            予約する
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-site-dark/60 transition-colors hover:text-site-dark"
            aria-label="バナーを閉じる"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});
