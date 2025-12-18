'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import type { WorkImage } from '@/types';

interface WorksNavigationProps {
  works: readonly WorkImage[];
  currentIndex: number;
  text: {
    prevLabel: string;
    nextLabel: string;
    counterSeparator: string;
    keyboardHint: string;
  };
}

interface NavButtonProps {
  work: WorkImage;
  direction: 'prev' | 'next';
  label: string;
}

function NavButton({ work, direction, label }: NavButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isPrev = direction === 'prev';

  return (
    <Link
      href={`/works/${work.id}`}
      className={cn(
        'group relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300',
        'hover:bg-white hover:shadow-lg',
        isPrev ? 'flex-row' : 'flex-row-reverse'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${label}: ${work.alt}`}
    >
      {/* Arrow Icon */}
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          'bg-site-accent/10 text-site-accent transition-all duration-300',
          'group-hover:bg-site-accent group-hover:text-white'
        )}
      >
        {isPrev ? (
          <ChevronLeftIcon className="h-5 w-5" />
        ) : (
          <ChevronRightIcon className="h-5 w-5" />
        )}
      </span>

      {/* Thumbnail Preview */}
      <div
        className={cn(
          'relative overflow-hidden rounded-lg transition-all duration-300',
          isHovered ? 'w-20 h-14 opacity-100' : 'w-0 h-14 opacity-0'
        )}
      >
        <Image
          src={work.src}
          alt={work.alt}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Label & Title */}
      <div className={cn('transition-all duration-300', isPrev ? 'text-left' : 'text-right')}>
        <span className="block text-xs text-text-light">{label}</span>
        <span
          className={cn(
            'block max-w-[120px] truncate text-sm font-medium transition-all duration-300',
            isHovered ? 'text-site-accent' : 'text-text'
          )}
        >
          {work.alt}
        </span>
      </div>
    </Link>
  );
}

export function WorksNavigation({ works, currentIndex, text }: WorksNavigationProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
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

  // Swipe detection thresholds
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
    <div
      ref={containerRef}
      className="mt-12"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Indicator */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {works.map((_, index) => (
          <Link
            key={index}
            href={`/works/${works[index].id}`}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'w-8 bg-site-accent'
                : 'w-1.5 bg-beige hover:bg-site-accent/50'
            )}
            aria-label={`${index + 1} ${text.counterSeparator} ${works.length}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="mb-8 text-center text-sm text-text-light">
        <span className="font-medium text-site-accent">{currentIndex + 1}</span>
        <span className="mx-2">{text.counterSeparator}</span>
        <span>{works.length}</span>
      </p>

      {/* Navigation Buttons */}
      <nav
        className="flex items-center justify-between"
        aria-label="作品ナビゲーション"
      >
        <div className="min-w-[140px]">
          {prevWork && (
            <NavButton work={prevWork} direction="prev" label={text.prevLabel} />
          )}
        </div>

        <div className="min-w-[140px] flex justify-end">
          {nextWork && (
            <NavButton work={nextWork} direction="next" label={text.nextLabel} />
          )}
        </div>
      </nav>

      {/* Keyboard Hint (desktop only) */}
      <p className="mt-8 hidden text-center text-xs text-text-light/60 md:block">
        {text.keyboardHint}
      </p>
    </div>
  );
}
