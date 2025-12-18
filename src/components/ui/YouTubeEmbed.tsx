'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

/**
 * パフォーマンス最適化されたYouTube埋め込みコンポーネント
 * - サムネイル表示で初期ロードを軽量化
 * - クリック時のみiframeを読み込み
 * - LCP/TBT改善に貢献
 */
export function YouTubeEmbed({ videoId, title, className }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsLoaded(true);
      }
    },
    []
  );

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const thumbnailFallback = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (isLoaded) {
    return (
      <div className={cn('relative aspect-video', className)}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full rounded-lg"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'group relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2',
        className
      )}
      aria-label={`${title}を再生`}
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.src = thumbnailFallback;
        }}
      />

      <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform group-hover:scale-110 md:h-20 md:w-20">
          <svg
            className="ml-1 h-8 w-8 text-white md:h-10 md:w-10"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
        YouTube
      </div>
    </button>
  );
}
