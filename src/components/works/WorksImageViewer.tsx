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

  return (
    <figure className="group relative overflow-hidden rounded-lg shadow-lg">
      <Image
        src={work.src}
        alt={work.alt}
        width={1200}
        height={800}
        className="h-auto w-full object-cover"
        priority
      />

      {/* Left Arrow Overlay */}
      {prevWork && (
        <Link
          href={`/works/${prevWork.id}`}
          className={cn(
            'absolute left-0 top-0 flex h-full w-1/3 items-center justify-start',
            'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            'cursor-pointer'
          )}
          aria-label={`${prevLabel}: ${prevWork.alt}`}
        >
          <span
            className={cn(
              'ml-4 flex h-12 w-12 items-center justify-center rounded-full',
              'bg-black/40 text-white backdrop-blur-sm',
              'transition-all duration-300 hover:bg-black/60 hover:scale-110'
            )}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </span>
        </Link>
      )}

      {/* Right Arrow Overlay */}
      {nextWork && (
        <Link
          href={`/works/${nextWork.id}`}
          className={cn(
            'absolute right-0 top-0 flex h-full w-1/3 items-center justify-end',
            'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            'cursor-pointer'
          )}
          aria-label={`${nextLabel}: ${nextWork.alt}`}
        >
          <span
            className={cn(
              'mr-4 flex h-12 w-12 items-center justify-center rounded-full',
              'bg-black/40 text-white backdrop-blur-sm',
              'transition-all duration-300 hover:bg-black/60 hover:scale-110'
            )}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </span>
        </Link>
      )}
    </figure>
  );
}
