'use client';

import { text } from '@/config';
import { FadeIn, simplePreset } from '@/components/ui';
import { cn } from '@/lib';
import type { VideoCategory } from '@/types';

export type FilterCategory = 'all' | VideoCategory;

interface CategoryFilterProps {
  selected: FilterCategory;
  onChange: (category: FilterCategory) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const categories: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: text.pages.videos.categories.all },
    { key: 'openingMovie', label: text.pages.videos.categories.openingMovie },
    { key: 'locationShooting', label: text.pages.videos.categories.locationShooting },
    { key: 'digest', label: text.pages.videos.categories.digest },
  ];

  return (
    <FadeIn {...simplePreset} delay={200}>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={cn(
              'rounded-full px-4 py-2 text-sm transition-all',
              selected === key
                ? 'bg-site-accent text-white'
                : 'bg-white text-text-light hover:bg-beige hover:text-text'
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </FadeIn>
  );
}
