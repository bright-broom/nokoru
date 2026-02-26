'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { ProgressDots } from '@/components/ui';
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
          unoptimized
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
  const prevWork = currentIndex > 0 ? works[currentIndex - 1] : null;
  const nextWork = currentIndex < works.length - 1 ? works[currentIndex + 1] : null;

  return (
    <div className="mt-12">
      {/* Progress Indicator */}
      <ProgressDots
        count={works.length}
        currentIndex={currentIndex}
        className="mb-6 justify-center"
        getHref={(index) => `/works/${works[index].id}`}
        getAriaLabel={(index) => `${index + 1} ${text.counterSeparator} ${works.length}`}
      />

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
