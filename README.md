# Silver Lace Weddings（Next.js / Vercel / Supabase）

## ローカル起動

```bash
npm install
npm run dev
```

## Vercelデプロイ手順

1. Vercelで **New Project** → GitHubの `KoenigWolf/aki` をImport
2. Framework は **Next.js**（自動検出）
3. **Environment Variables** を設定（下記）
4. Deploy

## 必要な環境変数（Vercel / Local 共通）

### Supabase

- `NEXT_PUBLIC_SUPABASE_URL`
  - Supabase Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Supabase Project Settings → API → anon public
- `SUPABASE_SERVICE_ROLE_KEY`
  - Supabase Project Settings → API → service_role（**絶対に公開しない**）

### 管理画面（予約一覧）

- `ADMIN_TOKEN`
  - 任意のランダム文字列（長め推奨）

## Supabaseセットアップ（必須）

`reservations` テーブルを作成します。

- Supabase → SQL Editor で `supabase/migrations/001_create_reservations.sql` を実行

## 予約フォームの動き

- フォーム送信: `POST /api/reservations`
- 予約一覧API: `GET /api/reservations?token=...`（`ADMIN_TOKEN` が必要）
- 管理画面: `/admin/reservations?token=...`（`ADMIN_TOKEN` が必要）

例:

`https://YOUR_DOMAIN/admin/reservations?token=YOUR_ADMIN_TOKEN`


