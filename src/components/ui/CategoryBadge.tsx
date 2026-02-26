import { text } from '@/config';
import type { BlogCategory } from '@/types';

const categoryColors: Record<BlogCategory, string> = {
  news: 'bg-blue-100 text-blue-700',
  report: 'bg-green-100 text-green-700',
  tips: 'bg-amber-100 text-amber-700',
};

interface CategoryBadgeProps {
  category: BlogCategory;
}

/**
 * ブログカテゴリーバッジ
 */
export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[category]}`}>
      {text.pages.blog.categories[category]}
    </span>
  );
}
