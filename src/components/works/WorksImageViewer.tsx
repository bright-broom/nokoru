'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
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
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);

  const prevWork = currentIndex > 0 ? works[currentIndex - 1] : null;
  const nextWork = currentIndex < works.length - 1 ? works[currentIndex + 1] : null;

  // Reset states when work changes
  // This is intentional - resetting navigation state when the displayed work changes
  /* eslint-disable react-hooks/set-state-in-effect -- Intentional reset on prop change */
  useEffect(() => {
    setIsNavigating(false);
    setDragOffset(0);
  }, [currentIndex]);
  /* eslint-enable react-hooks/set-state-in-effect */

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

  // Touch handlers with physics
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    lastXRef.current = touch.clientX;
    startTimeRef.current = Date.now();
    velocityRef.current = 0;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const currentX = touch.clientX;
    const deltaX = currentX - startXRef.current;

    // Calculate velocity
    const now = Date.now();
    const dt = now - startTimeRef.current;
    if (dt > 0) {
      velocityRef.current = (currentX - lastXRef.current) / dt;
    }
    lastXRef.current = currentX;

    // Apply rubber band effect at edges
    let adjustedDelta = deltaX;
    if ((deltaX > 0 && !prevWork) || (deltaX < 0 && !nextWork)) {
      // At edge - apply strong resistance
      adjustedDelta = deltaX * 0.2;
    }

    setDragOffset(adjustedDelta);
  }, [isDragging, prevWork, nextWork]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    const threshold = containerWidth * 0.15; // 15% of width
    const velocityThreshold = 0.3; // px/ms

    // Determine navigation based on offset and velocity
    const shouldGoNext = (dragOffset < -threshold || velocityRef.current < -velocityThreshold) && nextWork;
    const shouldGoPrev = (dragOffset > threshold || velocityRef.current > velocityThreshold) && prevWork;

    if (shouldGoNext && !isNavigating) {
      setIsNavigating(true);
      setDragOffset(-containerWidth); // Animate out
      setTimeout(() => {
        router.push(`/works/${nextWork!.id}`);
      }, 200);
    } else if (shouldGoPrev && !isNavigating) {
      setIsNavigating(true);
      setDragOffset(containerWidth); // Animate out
      setTimeout(() => {
        router.push(`/works/${prevWork!.id}`);
      }, 200);
    } else {
      // Snap back
      setDragOffset(0);
    }
  }, [isDragging, dragOffset, prevWork, nextWork, router, isNavigating]);

  // Calculate transform and opacity for adjacent previews
  const getTransformStyle = () => {
    if (isDragging || dragOffset !== 0) {
      return {
        transform: `translateX(${dragOffset}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      };
    }
    return {};
  };

  return (
    <figure
      ref={containerRef}
      className="group relative overflow-hidden rounded-xl shadow-xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Image */}
      <div style={getTransformStyle()}>
        <Image
          src={work.src}
          alt={work.alt}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Swipe progress indicator */}
      {isDragging && Math.abs(dragOffset) > 20 && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              'rounded-full bg-black/50 p-4 text-white backdrop-blur-sm transition-transform',
              dragOffset > 0 ? 'translate-x-8' : '-translate-x-8'
            )}
          >
            {dragOffset > 0 ? (
              <ChevronLeftIcon className="h-8 w-8" />
            ) : (
              <ChevronRightIcon className="h-8 w-8" />
            )}
          </div>
        </div>
      )}

      {/* Left Arrow Overlay */}
      {prevWork && (
        <Link
          href={`/works/${prevWork.id}`}
          className={cn(
            'absolute left-0 top-0 flex h-full w-1/4 items-center justify-start',
            'transition-opacity duration-300',
            'opacity-60 md:opacity-0 md:group-hover:opacity-100',
            'cursor-pointer'
          )}
          aria-label={`${prevLabel}: ${prevWork.alt}`}
        >
          <span
            className={cn(
              'ml-3 flex h-11 w-11 items-center justify-center rounded-full',
              'bg-black/40 text-white backdrop-blur-sm',
              'transition-all duration-300',
              'md:ml-4 md:h-12 md:w-12 md:hover:bg-black/60 md:hover:scale-110'
            )}
          >
            <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
          </span>
        </Link>
      )}

      {/* Right Arrow Overlay */}
      {nextWork && (
        <Link
          href={`/works/${nextWork.id}`}
          className={cn(
            'absolute right-0 top-0 flex h-full w-1/4 items-center justify-end',
            'transition-opacity duration-300',
            'opacity-60 md:opacity-0 md:group-hover:opacity-100',
            'cursor-pointer'
          )}
          aria-label={`${nextLabel}: ${nextWork.alt}`}
        >
          <span
            className={cn(
              'mr-3 flex h-11 w-11 items-center justify-center rounded-full',
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden">
        <span className="rounded-full bg-black/40 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
          スワイプで移動
        </span>
      </div>
    </figure>
  );
}
