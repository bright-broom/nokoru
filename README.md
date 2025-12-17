# Silver Lace Weddings

大阪・関西発のロケーション前撮り専門ウェディングムービー制作サービスのWebサイト。

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4 |
| フォント | Cormorant Garamond / Shippori Mincho (next/font) |
| データベース | Supabase (PostgreSQL) |
| ホスティング | Netlify |
| フォーム | Netlify Forms / Cal.com |

## クイックスタート

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Lint
npm run lint
```

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # トップページ
│   ├── globals.css         # グローバルスタイル
│   ├── sitemap.ts          # サイトマップ生成
│   ├── robots.ts           # robots.txt生成
│   ├── opengraph-image.tsx # OG画像自動生成
│   ├── twitter-image.tsx   # Twitter画像自動生成
│   ├── api/                # APIルート
│   └── admin/              # 管理画面
├── components/
│   ├── forms/              # フォームコンポーネント
│   ├── icons/              # アイコン
│   ├── layout/             # Header, Footer
│   ├── sections/           # ページセクション
│   ├── seo/                # SEO関連（JSON-LD）
│   └── ui/                 # 汎用UIコンポーネント
├── config/
│   └── site.ts             # サイト設定（一元管理）
├── hooks/                  # カスタムフック
├── lib/
│   ├── colors.ts           # カラー定義（一元管理）
│   ├── fonts.ts            # フォント定義（一元管理）
│   ├── utils.ts            # ユーティリティ
│   └── validation.ts       # バリデーション
└── types/                  # 型定義
```

## 設定ファイル

### サイト設定 (`src/config/site.ts`)

サービス情報、ナビゲーション、料金プラン、スタッフ情報などを一元管理。

### カラー設定 (`src/lib/colors.ts`)

```typescript
export const siteColors = {
  cream: '#fbf9f6',      // 背景色
  beige: '#f5f2ec',      // セクション背景
  accent: '#7a8ec5',     // アクセントカラー
  text: '#3d3d3d',       // 本文
  textLight: '#6b6b6b',  // 薄い本文
  // ...
};
```

### フォント設定 (`src/lib/fonts.ts`)

- **見出し**: Cormorant Garamond（エレガントなセリフ体）
- **本文**: Shippori Mincho（日本語明朝体）

## 環境変数

`.env.local` に以下を設定:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # 非公開

# 管理画面
ADMIN_TOKEN=your_random_token
```

### 環境変数の取得先

| 変数 | 取得場所 |
|------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → service_role |
| `ADMIN_TOKEN` | 任意のランダム文字列（長め推奨） |

## Supabase セットアップ

予約管理用の `reservations` テーブルを作成:

```bash
# Supabase SQL Editor で実行
supabase/migrations/001_create_reservations.sql
```

## 機能

### 予約システム

- **予約フォーム**: Cal.com 連携
- **お問い合わせ**: Netlify Forms
- **予約一覧API**: `GET /api/reservations?token=ADMIN_TOKEN`
- **管理画面**: `/admin/reservations?token=ADMIN_TOKEN`

### SEO対策

- **sitemap.xml**: 自動生成 (`/sitemap.xml`)
- **robots.txt**: 自動生成 (`/robots.txt`)
- **OG画像**: 動的生成 (`/opengraph-image`)
- **JSON-LD構造化データ**:
  - LocalBusiness
  - Service
  - WebSite
  - FAQPage
  - BreadcrumbList

### パフォーマンス

- next/font によるフォント最適化
- YouTube 遅延読み込み
- 画像最適化 (next/image)
- CSS最適化 (optimizeCss)

### アクセシビリティ

- スキップリンク
- ARIA属性
- キーボードナビゲーション
- prefers-reduced-motion 対応

### UX

- スクロールアニメーション (Intersection Observer)
- ローディングスピナー
- フォームバリデーション
- エラーハンドリング

## デプロイ

### Netlify

1. GitHubリポジトリを連携
2. Build command: `npm run build`
3. Publish directory: `.next`
4. 環境変数を設定

### Vercel

1. GitHubリポジトリをインポート
2. Framework: Next.js（自動検出）
3. 環境変数を設定
4. Deploy

## 開発ガイド

### 新しいセクションを追加

1. `src/components/sections/` に新しいコンポーネントを作成
2. `src/components/sections/index.ts` でエクスポート
3. `src/app/page.tsx` に追加

### スタイルの変更

- グローバルスタイル: `src/app/globals.css`
- カラー変更: `src/lib/colors.ts` と `globals.css` の `@theme`
- フォント変更: `src/lib/fonts.ts`

### アイコンの追加

`src/components/icons/` に新しいアイコンコンポーネントを作成し、`index.ts` でエクスポート。

## ライセンス

All rights reserved. Silver Lace Weddings.
