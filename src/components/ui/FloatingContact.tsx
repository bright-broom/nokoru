'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FloatingContactProps {
  lineUrl?: string;
  className?: string;
}

export const FloatingContact = memo(function FloatingContact({
  lineUrl = 'https://lin.ee/XXXXXXX', // TODO: 実際のLINE URLに置き換え
  className,
}: FloatingContactProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn('fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3', className)}>
      {/* 展開メニュー */}
      <div
        className={cn(
          'flex flex-col gap-2 transition-all duration-300',
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        {/* LINE相談 */}
        <Link
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#06C755] px-4 py-2.5 text-white shadow-lg transition-transform hover:scale-105"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          <span className="text-sm font-medium">LINEで相談</span>
        </Link>

        {/* 電話相談 */}
        <Link
          href="tel:090-0000-0000"
          className="flex items-center gap-2 rounded-full bg-site-accent px-4 py-2.5 text-white shadow-lg transition-transform hover:scale-105"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-sm font-medium">電話で相談</span>
        </Link>
      </div>

      {/* メインボタン */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300',
          isExpanded
            ? 'bg-text rotate-45'
            : 'bg-gradient-to-br from-gold to-gold/80 hover:scale-110'
        )}
        aria-label={isExpanded ? '閉じる' : 'お問い合わせ'}
        aria-expanded={isExpanded}
      >
        <svg
          className={cn('h-6 w-6 transition-colors', isExpanded ? 'text-white' : 'text-white')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
});
