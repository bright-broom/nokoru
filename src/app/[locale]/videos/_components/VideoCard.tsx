'use client';

import Image from 'next/image';
import { FadeIn, cardPreset } from '@/components/ui';
import { PlayIcon } from '@/components/icons';
import { cardStyles } from '@/lib';
import type { Video } from '@/types';

interface VideoCardProps {
  video: Video;
  delay: number;
  onPlay: () => void;
}

export function VideoCard({ video, delay, onPlay }: VideoCardProps) {
  return (
    <FadeIn {...cardPreset} delay={delay}>
      <article className={`${cardStyles.base} ${cardStyles.hover} overflow-hidden`}>
        <button
          onClick={onPlay}
          className="group relative aspect-video w-full overflow-hidden"
          aria-label={`${video.title}を再生`}
        >
          <Image
            src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
            alt={video.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all group-hover:bg-black/40">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-site-accent shadow-lg transition-transform group-hover:scale-110">
              <PlayIcon className="h-6 w-6 translate-x-0.5" />
            </div>
          </div>
          <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
            {video.duration}
          </span>
        </button>

        <div className="p-5">
          <h3 className="font-display text-lg tracking-wide">{video.title}</h3>
          <p className="mt-2 text-sm text-text-light line-clamp-2">{video.description}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-text-light">
            {video.location && <span>{video.location}</span>}
            <span>{video.date}</span>
          </div>
        </div>
      </article>
    </FadeIn>
  );
}
