'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ProgressDots } from '@/components/ui';
import type { WorkImage } from '@/types';

interface WorksCarouselProps {
  works: readonly WorkImage[];
}

// 定数をコンポーネント外に移動して不要な再計算を防止
const CARD_WIDTH = 85; // vw
const CARD_GAP = 4; // vw
const CARD_UNIT = CARD_WIDTH + CARD_GAP; // 89vw

export function WorksCarousel({ works }: WorksCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const velocityRef = useRef(0);

  // Calculate total offset for current index
  const getTargetOffset = useCallback((index: number) => {
    return -index * CARD_UNIT;
  }, []);

  // Snap to nearest card with momentum
  const snapToNearest = useCallback(
    (currentOffset: number, currentVelocity: number) => {
      // Apply momentum: predict where we'll end up
      const friction = 0.95;
      const minVelocity = 0.5;
      let predictedOffset = currentOffset;
      let v = currentVelocity;

      // Simulate momentum to predict final position
      while (Math.abs(v) > minVelocity) {
        predictedOffset += v;
        v *= friction;
      }

      // Find nearest snap point
      let targetIndex = Math.round(-predictedOffset / CARD_UNIT);

      // Clamp to valid range
      targetIndex = Math.max(0, Math.min(works.length - 1, targetIndex));

      setCurrentIndex(targetIndex);
      setDragOffset(0);
    },
    [works.length]
  );

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    lastXRef.current = touch.clientX;
    startTimeRef.current = Date.now();
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;

    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const currentX = touch.clientX;
    const currentTime = Date.now();

    // Calculate drag offset in vw
    const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
    const deltaX = currentX - startXRef.current;
    const deltaVw = (deltaX / containerWidth) * 100;

    // Calculate velocity (vw per ms)
    const timeDelta = currentTime - lastTimeRef.current;
    if (timeDelta > 0) {
      const velocityX = ((currentX - lastXRef.current) / containerWidth) * 100;
      velocityRef.current = velocityX / timeDelta * 16; // Normalize to ~60fps
    }

    lastXRef.current = currentX;
    lastTimeRef.current = currentTime;

    // Rubber band effect at edges
    const currentOffset = getTargetOffset(currentIndex) + deltaVw;
    const maxOffset = 0;
    const minOffset = getTargetOffset(works.length - 1);

    let adjustedDelta = deltaVw;
    if (currentOffset > maxOffset) {
      // Left edge - apply resistance
      const overflow = currentOffset - maxOffset;
      adjustedDelta = deltaVw - overflow * 0.6;
    } else if (currentOffset < minOffset) {
      // Right edge - apply resistance
      const overflow = minOffset - currentOffset;
      adjustedDelta = deltaVw + overflow * 0.6;
    }

    setDragOffset(adjustedDelta);
  }, [isDragging, currentIndex, getTargetOffset, works.length]);

  const handleTouchEnd = useCallback(() => {
    const currentOffset = getTargetOffset(currentIndex) + dragOffset;
    snapToNearest(currentOffset, velocityRef.current);
    velocityRef.current = 0;
    setIsDragging(false);
  }, [currentIndex, dragOffset, getTargetOffset, snapToNearest]);

  // Navigate to specific index
  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(works.length - 1, index)));
    setDragOffset(0);
  }, [works.length]);

  // キーボードナビゲーション（アクセシビリティ向上）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // カルーセル外の要素にフォーカスがある場合は無視
      if (!containerRef.current?.contains(document.activeElement) &&
        document.activeElement !== document.body) {
        return;
      }

      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        goToIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < works.length - 1) {
        e.preventDefault();
        goToIndex(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, works.length, goToIndex]);

  const translateX = getTargetOffset(currentIndex) + dragOffset;

  return (
    <div className="md:hidden">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={cn(
            'flex',
            !isDragging && 'transition-transform duration-500 ease-out'
          )}
          style={{
            transform: `translateX(calc(${translateX}vw + ${(100 - CARD_WIDTH) / 2}vw))`,
            gap: `${CARD_GAP}vw`,
          }}
        >
          {works.map((work, index) => (
            <Link
              key={work.id}
              href={`/works/${work.id}`}
              className={cn(
                'relative shrink-0 overflow-hidden rounded-2xl shadow-lg transition-all duration-300',
                index === currentIndex ? 'scale-100' : 'scale-95 opacity-80'
              )}
              style={{ width: `${CARD_WIDTH}vw` }}
              onClick={(e) => {
                if (index !== currentIndex) {
                  e.preventDefault();
                  goToIndex(index);
                }
              }}
            >
              <figure className="relative aspect-4/3 w-full">
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  sizes="85vw"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/0 to-black/0" />

                {(work.locationTag || work.alt) && (
                  <figcaption className="absolute bottom-0 left-0 right-0 p-4">
                    {work.locationTag && (
                      <span className="mb-2 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs tracking-wide text-text">
                        {work.locationTag}
                      </span>
                    )}
                    <p className="text-sm text-white drop-shadow-md">{work.alt}</p>
                  </figcaption>
                )}
              </figure>
            </Link>
          ))}
        </div>
      </div>

      {/* Indicator Dots */}
      <ProgressDots
        count={works.length}
        currentIndex={currentIndex}
        className="mt-6 justify-center"
        onDotClick={(index) => goToIndex(index)}
        getAriaLabel={(index) => `作品 ${index + 1} を表示`}
      />
    </div>
  );
}
