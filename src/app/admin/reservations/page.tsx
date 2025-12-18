import { notFound } from 'next/navigation';
import Link from 'next/link';
import { listReservations } from '@/lib/reservations';
import { text } from '@/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function normalizeToken(value: string | string[] | undefined) {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

export default async function ReservationsAdminPage({ searchParams }: PageProps) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) notFound();

  const params = (await searchParams) ?? {};
  const provided = normalizeToken(params.token);
  if (!provided || provided !== token) notFound();

  const reservations = await listReservations();

  return (
    <main className="min-h-screen bg-cream px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="font-display text-2xl tracking-wide">
            {text.admin.reservations.title}
          </h1>
          <Link
            href="/"
            className="text-sm text-text-light underline underline-offset-4 hover:text-text"
          >
            {text.admin.reservations.backToSite}
          </Link>
        </div>

        <p className="mt-2 text-sm text-text-light">
          {text.admin.reservations.totalLabel}{' '}
          <span className="text-text">{reservations.length}</span>{' '}
          {text.admin.reservations.totalUnit}
        </p>

        <div className="mt-6 overflow-x-auto rounded-lg bg-white">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-beige/40 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-text">
                  {text.admin.reservations.columns.receivedAt}
                </th>
                <th className="px-4 py-3 font-medium text-text">
                  {text.admin.reservations.columns.name}
                </th>
                <th className="px-4 py-3 font-medium text-text">
                  {text.admin.reservations.columns.email}
                </th>
                <th className="px-4 py-3 font-medium text-text">
                  {text.admin.reservations.columns.phone}
                </th>
                <th className="px-4 py-3 font-medium text-text">
                  {text.admin.reservations.columns.inquiryType}
                </th>
                <th className="px-4 py-3 font-medium text-text">
                  {text.admin.reservations.columns.preferredDate}
                </th>
                <th className="px-4 py-3 font-medium text-text">
                  {text.admin.reservations.columns.message}
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-text-light" colSpan={7}>
                    {text.admin.reservations.empty}
                  </td>
                </tr>
              ) : (
                reservations.map((r) => (
                  <tr key={r.id} className="border-t border-beige">
                    <td className="px-4 py-3 align-top text-text-light">
                      {new Date(r.createdAt).toLocaleString('ja-JP')}
                    </td>
                    <td className="px-4 py-3 align-top">{r.name}</td>
                    <td className="px-4 py-3 align-top">
                      <a className="underline underline-offset-4" href={`mailto:${r.email}`}>
                        {r.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 align-top">{r.phone ?? ''}</td>
                    <td className="px-4 py-3 align-top">{r.inquiryType ?? ''}</td>
                    <td className="px-4 py-3 align-top">{r.preferredDate ?? ''}</td>
                    <td className="px-4 py-3 align-top whitespace-pre-wrap">
                      {r.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
