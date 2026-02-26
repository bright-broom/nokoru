import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { staffMembers, text } from '@/config';
import { PageLayout } from '@/components/layout';
import { BackLink, Button } from '@/components/ui';
import { locales } from '@/i18n/config';

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    staffMembers.map((staff) => ({
      locale,
      id: staff.id,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const staff = staffMembers.find((s) => s.id === id);

  if (!staff) {
    return {
      title: text.pages.staff.notFound,
    };
  }

  return {
    title: `${staff.name} | ${text.pages.staff.metaTitleSuffix}`,
    description: staff.bio.replace(/\n/g, ' '),
  };
}

export default async function StaffDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const staff = staffMembers.find((s) => s.id === id);

  if (!staff) {
    notFound();
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-2xl px-6">
        <BackLink href="/#about" label={text.pages.staff.backToAbout} />

          <article className="text-center">
            <figure className="mx-auto mb-8 h-48 w-48 overflow-hidden rounded-full bg-beige sm:h-64 sm:w-64">
              {staff.imageUrl ? (
                <Image
                  src={staff.imageUrl}
                  alt={`${staff.name}${text.sections.about.profileAltSuffix}`}
                  width={256}
                  height={256}
                  className="h-full w-full object-cover"
                  priority
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-beige"
                  role="img"
                  aria-label={`${staff.name}${text.sections.about.profileAltMissingSuffix}`}
                >
                  <span className="text-6xl text-text-light/40">👤</span>
                </div>
              )}
            </figure>

            <h1 className="font-display text-3xl tracking-wide md:text-4xl">
              {staff.name}
            </h1>
            <p className="mt-2 text-lg text-site-accent">{staff.role}</p>

            <div className="mx-auto mt-8 max-w-md">
              <p className="whitespace-pre-line leading-relaxed text-text-light">
                {staff.bio}
              </p>
            </div>
          </article>

          <div className="mt-16 text-center">
            <Button href="/" variant="outline" rounded="full" size="small">
              {text.pages.staff.backToTop}
            </Button>
          </div>
        </div>
    </PageLayout>
  );
}
