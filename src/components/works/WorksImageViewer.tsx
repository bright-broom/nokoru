'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import type { WorkImage } from '@/types';

interface WorksImageViewerProps {
  work: WorkImage;
  works: readonly WorkImage[];
  currentIndex: number;
  prevLabel: string;
  nextLabel: string;
}

export function WorksImageViewer({
  work,
  works,
  currentIndex,
  prevLabel,
  nextLabel,
}: WorksImageViewerProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const prevWork = currentIndex > 0 ? works[currentIndex - 1] : null;
  const nextWork = currentIndex < works.length - 1 ? works[currentIndex + 1] : null;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isNavigating) return;

      if (e.key === 'ArrowLeft' && prevWork) {
        setIsNavigating(true);
        router.push(`/works/${prevWork.id}`);
      } else if (e.key === 'ArrowRight' && nextWork) {
        setIsNavigating(true);
        router.push(`/works/${nextWork.id}`);
      }
    },
    [prevWork, nextWork, router, isNavigating]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Reset navigation state when currentIndex changes
  useEffect(() => {
    setIsNavigating(false);
  }, [currentIndex]);

  // Swipe gesture handling
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isNavigating) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && nextWork) {
      setIsNavigating(true);
      router.push(`/works/${nextWork.id}`);
    } else if (isRightSwipe && prevWork) {
      setIsNavigating(true);
      router.push(`/works/${prevWork.id}`);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <figure
      className="group relative overflow-hidden rounded-lg shadow-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={work.src}
        alt={work.alt}
        width={1200}
        height={800}
        className="h-auto w-full object-cover"
        priority
      />

      {/* Left Arrow Overlay - Always visible on mobile, hover on desktop */}
      {prevWork && (
        <Link
          href={`/works/${prevWork.id}`}
          className={cn(
            'absolute left-0 top-0 flex h-full w-1/4 items-center justify-start',
            'transition-opacity duration-300',
            'opacity-70 md:opacity-0 md:group-hover:opacity-100',
            'cursor-pointer'
          )}
          aria-label={`${prevLabel}: ${prevWork.alt}`}
        >
          <span
            className={cn(
              'ml-3 flex h-10 w-10 items-center justify-center rounded-full',
              'bg-black/40 text-white backdrop-blur-sm',
              'transition-all duration-300',
              'md:ml-4 md:h-12 md:w-12 md:hover:bg-black/60 md:hover:scale-110'
            )}
          >
            <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
          </span>
        </Link>
      )}

      {/* Right Arrow Overlay - Always visible on mobile, hover on desktop */}
      {nextWork && (
        <Link
          href={`/works/${nextWork.id}`}
          className={cn(
            'absolute right-0 top-0 flex h-full w-1/4 items-center justify-end',
            'transition-opacity duration-300',
            'opacity-70 md:opacity-0 md:group-hover:opacity-100',
            'cursor-pointer'
          )}
          aria-label={`${nextLabel}: ${nextWork.alt}`}
        >
          <span
            className={cn(
              'mr-3 flex h-10 w-10 items-center justify-center rounded-full',
              'bg-black/40 text-white backdrop-blur-sm',
              'transition-all duration-300',
              'md:mr-4 md:h-12 md:w-12 md:hover:bg-black/60 md:hover:scale-110'
            )}
          >
            <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
          </span>
        </Link>
      )}

      {/* Swipe hint for mobile */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 md:hidden">
        <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
          スワイプで移動
        </span>
      </div>
    </figure>
  );
}
