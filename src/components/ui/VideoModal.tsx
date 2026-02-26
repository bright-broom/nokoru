'use client';

import { useEffect } from 'react';
import { YouTubeEmbed } from './YouTubeEmbed';
import { CloseIcon } from '@/components/icons';

interface VideoModalProps {
  videoId: string;
  title: string;
  onClose: () => void;
}

/**
 * YouTube動画再生用モーダル
 */
export function VideoModal({ videoId, title, onClose }: VideoModalProps) {
  // Escapeキーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="mb-4 ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="閉じる"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        <YouTubeEmbed videoId={videoId} title={title} />
      </div>
    </div>
  );
}
