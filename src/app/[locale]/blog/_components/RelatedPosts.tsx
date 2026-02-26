import Link from 'next/link';
import { text } from '@/config';
import { FadeIn, CategoryBadge, simplePreset } from '@/components/ui';
import { formatDate } from '@/lib';
import type { BlogPost } from '@/types';

interface RelatedPostsProps {
  posts: BlogPost[];
  delay?: number;
}

export function RelatedPosts({ posts, delay = 400 }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <FadeIn {...simplePreset} delay={delay}>
      <section className="mx-auto mt-16 max-w-3xl px-6">
        <h2 className="mb-8 font-display text-xl tracking-wide">
          {text.pages.blog.relatedPosts}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2">
                <CategoryBadge category={post.category} />
                <time className="text-xs text-text-light" dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <h3 className="font-display tracking-wide transition-colors group-hover:text-site-accent">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
