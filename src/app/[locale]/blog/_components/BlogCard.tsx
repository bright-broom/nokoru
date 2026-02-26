import Link from 'next/link';
import { text } from '@/config';
import { FadeIn, CategoryBadge, cardPreset } from '@/components/ui';
import { cardStyles, formatDate } from '@/lib';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  delay: number;
}

export function BlogCard({ post, delay }: BlogCardProps) {
  return (
    <FadeIn {...cardPreset} delay={delay}>
      <article className={`${cardStyles.base} ${cardStyles.hover} flex h-full flex-col overflow-hidden`}>
        {post.coverImageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.coverImageUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-3">
            <CategoryBadge category={post.category} />
            <time className="text-xs text-text-light" dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>

          <h2 className="font-display text-lg tracking-wide transition-colors group-hover:text-site-accent">
            {post.title}
          </h2>

          <p className="mt-3 flex-1 text-sm text-text-light line-clamp-3">
            {post.excerpt}
          </p>

          <Link
            href={`/blog/${post.slug}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-site-accent transition hover:gap-3"
          >
            {text.pages.blog.readMore}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </FadeIn>
  );
}
