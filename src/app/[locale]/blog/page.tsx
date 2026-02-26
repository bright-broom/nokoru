import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { blogPosts, text } from '@/config';
import { PageLayout } from '@/components/layout';
import { FadeIn, SectionHeader, BackLink, simplePreset } from '@/components/ui';
import { BlogCard } from './_components';

export const metadata: Metadata = {
  title: `${text.pages.blog.metaTitle} | ${text.site.name}`,
  description: text.pages.blog.metaDescription,
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <PageLayout>
      <div className="mx-auto max-w-5xl px-6">
        <BackLink href="/" label={text.pages.blog.backToTop} />

        <SectionHeader
          title={text.pages.blog.title}
          subtitle={text.pages.blog.subtitle}
          className="mb-12"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} delay={index * 100} />
          ))}
        </div>

        {sortedPosts.length === 0 && (
          <FadeIn {...simplePreset}>
            <p className="text-center text-text-light">
              まだ記事がありません
            </p>
          </FadeIn>
        )}
      </div>
    </PageLayout>
  );
}
