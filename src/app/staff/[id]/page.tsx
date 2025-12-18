import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { staffMembers, text } from '@/config';
import { Header, Footer } from '@/components/layout';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return staffMembers.map((staff) => ({
    id: staff.id,
  }));
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
  const { id } = await params;
  const staff = staffMembers.find((s) => s.id === id);

  if (!staff) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main id="main-content" className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <nav className="mb-12">
            <Link
              href="/#about"
              className="inline-flex items-center gap-2 text-sm text-text-light transition hover:text-text"
            >
              <span aria-hidden="true">←</span>
              {text.pages.staff.backToAbout}
            </Link>
          </nav>

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
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-site-accent px-6 py-3 text-sm text-site-accent transition hover:bg-site-accent hover:text-white"
            >
              {text.pages.staff.backToTop}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
