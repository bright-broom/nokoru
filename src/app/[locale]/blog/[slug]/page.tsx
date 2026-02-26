import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { blogPosts, text } from '@/config';
import { PageLayout } from '@/components/layout';
import { FadeIn, BackLink, MarkdownContent, CategoryBadge, simplePreset } from '@/components/ui';
import { formatDate } from '@/lib';
import { locales } from '@/i18n/config';
import { RelatedPosts } from '../_components';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: `記事が見つかりません | ${text.site.name}`,
    };
  }

  return {
    title: `${post.title} | ${text.site.name}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  return (
    <PageLayout>
      <article className="mx-auto max-w-3xl px-6">
        <BackLink href="/blog" label={text.pages.blog.backToBlog} />

        <FadeIn {...simplePreset}>
          <header className="mb-12">
            {post.coverImageUrl && (
              <div className="mb-8 overflow-hidden rounded-2xl">
                <img
                  src={post.coverImageUrl}
                  alt=""
                  className="aspect-video w-full object-cover"
                />
              </div>
            )}

            <div className="mb-4 flex items-center gap-3">
              <CategoryBadge category={post.category} />
              <time className="text-sm text-text-light" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>

            <h1 className="font-display text-2xl tracking-wide md:text-3xl">
              {post.title}
            </h1>

            {post.author && (
              <p className="mt-4 text-sm text-text-light">
                執筆: {post.author}
              </p>
            )}
          </header>
        </FadeIn>

        <FadeIn {...simplePreset} delay={200}>
          <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
            <MarkdownContent content={post.content} />
          </div>
        </FadeIn>

        {post.tags && post.tags.length > 0 && (
          <FadeIn {...simplePreset} delay={300}>
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-beige px-3 py-1 text-xs text-text-light"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </FadeIn>
        )}
      </article>

      <RelatedPosts posts={relatedPosts} />
    </PageLayout>
  );
}
