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
        // h-10 (40px) で Header.tsx の top-10 と一致させる
        // CSS Grid + place-items-center で確実な中央揃え
        'grid h-10 place-items-center bg-gradient-to-r from-gold/90 via-gold to-gold/90 text-sm font-medium text-site-dark',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline">✨</span>
        <span className="inline-flex items-center">
          <strong>2026年春撮影</strong>
          <span className="mx-1">早期予約特典｜</span>
          <span className="hidden sm:inline">3ヶ月前予約で</span>
          <strong className="ml-1 text-site-accent">10%OFF</strong>
        </span>
        <Link
          href="/#booking"
          className="inline-flex h-6 items-center whitespace-nowrap rounded-full bg-site-dark/90 px-3 text-xs font-bold text-white transition-colors hover:bg-site-dark"
        >
          予約する
        </Link>
      </div>
    </div>
  );
});
