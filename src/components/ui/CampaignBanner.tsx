import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CampaignBannerProps {
  className?: string;
}

export const CampaignBanner = memo(function CampaignBanner({ className }: CampaignBannerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gradient-to-r from-gold/90 via-gold to-gold/90 py-2.5 text-sm font-medium text-site-dark',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline">✨</span>
        <span>
          <strong>2026年春撮影</strong> 早期予約特典｜
          <span className="hidden sm:inline">3ヶ月前予約で </span>
          <strong className="text-site-accent">10%OFF</strong>
        </span>
        <Link
          href="/#booking"
          className="whitespace-nowrap rounded-full bg-site-dark/90 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-site-dark"
        >
          予約する
        </Link>
      </div>
    </div>
  );
});
