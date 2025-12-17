import { notFound } from 'next/navigation';
import Link from 'next/link';
import { listReservations } from '@/lib/reservations';

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
          <h1 className="font-display text-2xl tracking-wide">予約リクエスト一覧</h1>
          <Link
            href="/"
            className="text-sm text-text-light underline underline-offset-4 hover:text-text"
          >
            サイトへ戻る
          </Link>
        </div>

        <p className="mt-2 text-sm text-text-light">
          合計: <span className="text-text">{reservations.length}</span> 件
        </p>

        <div className="mt-6 overflow-x-auto rounded-lg bg-white">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-beige/40 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-text">受信日時</th>
                <th className="px-4 py-3 font-medium text-text">お名前</th>
                <th className="px-4 py-3 font-medium text-text">メール</th>
                <th className="px-4 py-3 font-medium text-text">電話</th>
                <th className="px-4 py-3 font-medium text-text">種別</th>
                <th className="px-4 py-3 font-medium text-text">希望日</th>
                <th className="px-4 py-3 font-medium text-text">メッセージ</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-text-light" colSpan={7}>
                    まだ予約リクエストはありません。
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

