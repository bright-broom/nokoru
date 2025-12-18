'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { WorkImage } from '@/types';

interface WorksCarouselProps {
  works: readonly WorkImage[];
}

export function WorksCarousel({ works }: WorksCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [velocity, setVelocity] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const cardWidth = 85; // vw
  const gap = 4; // vw

  // Calculate total offset for current index
  const getTargetOffset = useCallback(
    (index: number) => {
      return -index * (cardWidth + gap);
    },
    [cardWidth, gap]
  );

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
      const cardUnit = cardWidth + gap;
      let targetIndex = Math.round(-predictedOffset / cardUnit);

      // Clamp to valid range
      targetIndex = Math.max(0, Math.min(works.length - 1, targetIndex));

      setCurrentIndex(targetIndex);
      setDragOffset(0);
      setVelocity(0);
    },
    [works.length, cardWidth, gap]
  );

  // Handle momentum animation
  useEffect(() => {
    if (!isDragging && velocity !== 0) {
      const currentOffset = getTargetOffset(currentIndex) + dragOffset;
      snapToNearest(currentOffset, velocity);
    }
  }, [isDragging, velocity, currentIndex, dragOffset, getTargetOffset, snapToNearest]);

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

    setIsDragging(true);
    setVelocity(0);
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
      setVelocity(velocityX / timeDelta * 16); // Normalize to ~60fps
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
    setIsDragging(false);
  }, []);

  // Navigate to specific index
  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(works.length - 1, index)));
    setDragOffset(0);
  }, [works.length]);

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
            transform: `translateX(calc(${translateX}vw + ${(100 - cardWidth) / 2}vw))`,
            gap: `${gap}vw`,
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
              style={{ width: `${cardWidth}vw` }}
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
      <div className="mt-6 flex justify-center gap-2">
        {works.map((_, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'w-6 bg-site-accent'
                : 'w-2 bg-beige hover:bg-site-accent/50'
            )}
            onClick={() => goToIndex(index)}
            aria-label={`作品 ${index + 1} を表示`}
          />
        ))}
      </div>
    </div>
  );
}
