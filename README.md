# Silver Lace Weddings

大阪・関西発のロケーション前撮り専門ウェディングムービー制作サービスの Web サイト。

## 📋 目次

- [技術スタック](#技術スタック)
- [クイックスタート](#クイックスタート)
- [プロジェクト構造](#プロジェクト構造)
- [主要機能](#主要機能)
- [設定ファイル](#設定ファイル)
- [環境変数](#環境変数)
- [画像の配置](#画像の配置)
- [開発ガイド](#開発ガイド)
- [デプロイ](#デプロイ)
- [トラブルシューティング](#トラブルシューティング)

## 🛠 技術スタック

| カテゴリ       | 技術                                 | バージョン           |
| -------------- | ------------------------------------ | -------------------- |
| フレームワーク | Next.js                              | 16.0.10 (App Router) |
| 言語           | TypeScript                           | 5.7.2                |
| スタイリング   | Tailwind CSS                         | 4.0.0                |
| UI ライブラリ  | Radix UI                             | 1.x                  |
| フォント       | Cormorant Garamond / Shippori Mincho | next/font            |
| データベース   | Supabase (PostgreSQL)                | 2.88.0               |
| フォーム       | Netlify Forms                        | -                    |
| 予約システム   | Cal.com                              | 1.5.3                |
| ホスティング   | Netlify / Vercel                     | -                    |

## 🚀 クイックスタート

### 必要な環境

- Node.js 18.17 以上
- npm または yarn

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/KoenigWolf/aki.git
cd aki

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env.local
# .env.local を編集して必要な値を設定

# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:3000 を開く
```

### 利用可能なコマンド

```bash
# 開発サーバー起動（Turbopack使用）
npm run dev

# 本番ビルド（Webpack使用）
npm run build

# 本番サーバー起動
npm start

# Lint実行
npm run lint
```

## 📁 プロジェクト構造

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # ルートレイアウト
│   ├── page.tsx                  # トップページ
│   ├── globals.css               # グローバルスタイル
│   ├── sitemap.ts                # サイトマップ自動生成
│   ├── robots.ts                 # robots.txt自動生成
│   ├── opengraph-image.tsx       # OG画像動的生成
│   ├── twitter-image.tsx         # Twitter画像動的生成
│   ├── contact/                  # お問い合わせページ
│   │   └── page.tsx
│   ├── works/                    # 作品詳細ページ
│   │   └── [id]/
│   │       └── page.tsx
│   ├── services/                 # サービス詳細ページ
│   │   └── [id]/
│   │       └── page.tsx
│   ├── staff/                    # スタッフ詳細ページ
│   │   └── [id]/
│   │       └── page.tsx
│   ├── options/                  # オプション詳細ページ
│   │   └── [id]/
│   │       └── page.tsx
│   ├── plans/                    # プラン詳細ページ
│   │   └── [id]/
│   │       └── page.tsx
│   ├── api/                      # APIルート
│   │   └── reservations/
│   │       └── route.ts
│   └── admin/                    # 管理画面
│       └── reservations/
│           └── page.tsx
├── components/
│   ├── forms/                    # フォームコンポーネント
│   │   └── ContactForm.tsx
│   ├── icons/                    # SVGアイコン
│   ├── layout/                   # レイアウトコンポーネント
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/                 # ページセクション
│   │   ├── HeroSection.tsx
│   │   ├── WorksSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PlansSection.tsx
│   │   ├── OptionsSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── BookingSection.tsx
│   ├── seo/                      # SEO関連
│   │   ├── JsonLd.tsx            # 構造化データ
│   │   └── SocialImage.tsx       # SNS画像生成
│   ├── ui/                       # 汎用UIコンポーネント
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── FadeIn.tsx
│   │   └── ...
│   └── works/                    # 作品関連コンポーネント
│       ├── WorksImageViewer.tsx
│       └── WorksCarousel.tsx
├── config/
│   ├── site.ts                   # サイト設定（構造データ）
│   └── text.ts                   # テキスト中央管理（表示文言）
├── hooks/                        # カスタムフック
│   └── useInView.ts
├── lib/
│   ├── colors.ts                 # カラー定義
│   ├── fonts.ts                  # フォント定義
│   ├── utils.ts                  # ユーティリティ
│   ├── validation.ts             # バリデーション
│   ├── errors.ts                 # エラーハンドリング
│   ├── env.ts                    # 環境変数管理
│   └── reservations.ts           # 予約関連ロジック
└── types/                        # TypeScript型定義
    ├── index.ts
    └── database.ts
```

## ✨ 主要機能

### 1. ランディングページ

- **Hero**: YouTube 動画埋め込み、CTA ボタン
- **Works**: 作品ギャラリー（画像ビューアー付き）
- **Services**: サービス紹介（詳細ページあり）
- **Plans**: 料金プラン（詳細ページあり）
- **Options**: オプション（詳細ページあり）
- **About**: スタッフ紹介（詳細ページあり）
- **Booking**: Cal.com 予約カレンダー
- **Contact**: お問い合わせフォーム

### 2. 詳細ページ

各セクションの項目に詳細ページを実装：

- `/works/[id]` - 作品詳細（画像ビューアー）
- `/services/[id]` - サービス詳細
- `/staff/[id]` - スタッフ詳細
- `/options/[id]` - オプション詳細
- `/plans/[id]` - プラン詳細

### 3. 予約・お問い合わせシステム

- **Cal.com 連携**: オンライン相談予約
- **Netlify Forms**: お問い合わせフォーム
- **Supabase**: 予約データ管理
- **管理画面**: `/admin/reservations?token=ADMIN_TOKEN`

### 4. SEO 対策

- **sitemap.xml**: 自動生成（`/sitemap.xml`）
- **robots.txt**: 自動生成（`/robots.txt`）
- **OG 画像**: 動的生成（`/opengraph-image`）
- **Twitter 画像**: 動的生成（`/twitter-image`）
- **JSON-LD 構造化データ**:
  - LocalBusiness
  - Service
  - WebSite
  - FAQPage
  - BreadcrumbList

### 5. パフォーマンス最適化

- next/font によるフォント最適化
- YouTube 遅延読み込み
- 画像最適化（next/image）
- CSS 最適化（optimizeCss）
- 静的アセットの長期キャッシュ

### 6. アクセシビリティ

- スキップリンク
- ARIA 属性
- キーボードナビゲーション
- prefers-reduced-motion 対応
- セマンティック HTML

## ⚙️ 設定ファイル

### サイト設定 (`src/config/site.ts`)

サービス情報、ナビゲーション、料金プラン、スタッフ情報などの**構造データ**を管理。

```typescript
export const siteConfig = {
  name: text.site.name,
  description: text.site.descriptionShort,
  // ...
};

export const services = [
  {
    id: "location-shooting",
    title: text.content.services.locationShooting.title,
    // ...
  },
];
```

### テキスト中央管理 (`src/config/text.ts`)

**すべての表示文言を 1 箇所で管理**します。UI 文言、aria-label、エラーメッセージ、SEO 文言など。

```typescript
export const text = {
  site: {
    name: 'Silver Lace Weddings',
    descriptionShort: '...',
  },
  nav: {
    labels: { works: 'Works', ... },
    aria: { works: '作品ギャラリーへ移動', ... },
  },
  form: {
    fields: {
      name: {
        label: 'お名前',
        requiredMark: '*',
      },
    },
  },
  // ...
};
```

**ルール**:

- 画面やメール/レスポンスで人が読む文言は基本ここへ
- id / key / ルーティング等の「機械向け文字列」は対象外

### カラー設定 (`src/lib/colors.ts`)

```typescript
export const siteColors = {
  cream: "#fbf9f6", // 背景色
  beige: "#f5f2ec", // セクション背景
  accent: "#7a8ec5", // アクセントカラー
  text: "#3d3d3d", // 本文
  textLight: "#6b6b6b", // 薄い本文
  error: "#ef4444", // エラー
  success: "#dcfce7", // 成功
};
```

### フォント設定 (`src/lib/fonts.ts`)

- **見出し**: Cormorant Garamond（エレガントなセリフ体）
- **本文**: Shippori Mincho（日本語明朝体）

## 🔐 環境変数

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

| 変数                            | 取得場所                                         |
| ------------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase → Project Settings → API → Project URL  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public  |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase → Project Settings → API → service_role |
| `ADMIN_TOKEN`                   | 任意のランダム文字列（長め推奨）                 |

## 🖼️ 画像の配置

### 作品画像

`public/images/works/` に配置:

```
public/images/works/
├── couple-sea.jpg          # メイン作品（ヒーロー用）
├── bride-portrait.jpg
├── couple-playground.jpg
├── couple-sunflower.jpg
└── bouquet.jpg
```

**ファイル名は `src/config/site.ts` の `workImages` と一致させる必要があります。**

### スタッフ画像

`public/images/staff/` に配置:

```
public/images/staff/
├── aki.jpg
└── hiyori.jpg
```

**ファイル名は `src/config/site.ts` の `staffMembers[].imageUrl` と一致させる必要があります。**

### 画像の最適化

- Next.js の `next/image` を使用
- AVIF/WebP 形式を優先
- レスポンシブサイズを自動生成

## 📝 開発ガイド

### 新しいセクションを追加

1. `src/components/sections/` に新しいコンポーネントを作成
2. `src/components/sections/index.ts` でエクスポート
3. `src/app/page.tsx` に追加

### 詳細ページを追加

1. `src/app/[category]/[id]/page.tsx` を作成
2. `src/config/site.ts` に対応するデータを追加
3. `src/config/text.ts` に表示文言を追加
4. 一覧セクションからリンクを追加

例: オプション詳細ページ

```typescript
// src/app/options/[id]/page.tsx
import { notFound } from 'next/navigation';
import { options } from '@/config/site';

export default function OptionDetailPage({ params }: { params: { id: string } }) {
  const option = options.find((o) => o.id === params.id);
  if (!option) notFound();

  return (
    // 詳細ページのコンテンツ
  );
}
```

### テキストを変更

**すべての表示文言は `src/config/text.ts` で管理**します。

```typescript
// src/config/text.ts
export const text = {
  site: {
    name: "Silver Lace Weddings", // ← ここを変更
  },
  // ...
};
```

各コンポーネントでは `text` をインポートして使用:

```typescript
import { text } from "@/config/text";

<h1>{text.site.name}</h1>;
```

### スタイルの変更

- **グローバルスタイル**: `src/app/globals.css`
- **カラー変更**: `src/lib/colors.ts` と `globals.css` の `@theme`
- **フォント変更**: `src/lib/fonts.ts`

### アイコンの追加

1. `src/components/icons/` に新しいアイコンコンポーネントを作成
2. `src/components/icons/index.ts` でエクスポート

```typescript
// src/components/icons/NewIcon.tsx
export function NewIcon({ className }: { className?: string }) {
  return <svg className={className} /* ... */>{/* SVG path */}</svg>;
}
```

### 新しいオプションを追加

1. `src/config/text.ts` の `text.content.options` に追加
2. `src/config/site.ts` の `options` 配列に追加
3. 詳細ページは自動的に `/options/[id]` で利用可能

## 🚢 デプロイ

### Netlify

1. GitHub リポジトリを連携
2. Build command: `npm run build`
3. Publish directory: `.next`
4. 環境変数を設定（`.env.local` の内容）
5. Netlify Forms を有効化（フォーム用）

### Vercel

1. GitHub リポジトリをインポート
2. Framework: Next.js（自動検出）
3. 環境変数を設定
4. Deploy

### Supabase セットアップ

予約管理用の `reservations` テーブルを作成:

1. Supabase プロジェクトを開く
2. SQL Editor を開く
3. `supabase/migrations/001_create_reservations.sql` の内容を実行

## 🐛 トラブルシューティング

### Hydration エラー

**症状**: `Hydration failed because the server rendered HTML didn't match the client`

**原因**: サーバーとクライアントで HTML が一致しない

**解決策**:

- `Date.now()` や `Math.random()` を SSR で使わない
- ブラウザ拡張機能（パスワードマネージャー等）の影響を考慮
- `suppressHydrationWarning` を適切に使用

### 画像が表示されない

**確認事項**:

1. `public/images/` 配下にファイルが存在するか
2. ファイル名が `src/config/site.ts` のパスと一致しているか
3. ファイル名にスペースや特殊文字が含まれていないか

### 環境変数が読み込まれない

**確認事項**:

1. `.env.local` がプロジェクトルートにあるか
2. 変数名が正しいか（`NEXT_PUBLIC_` プレフィックスが必要な場合）
3. サーバーを再起動したか

### ビルドエラー

```bash
# キャッシュをクリア
rm -rf .next
npm run build
```

### TypeScript エラー

```bash
# 型定義を再生成
npm run build
```

## 📄 ライセンス

All rights reserved. Silver Lace Weddings.

---

**質問や問題がある場合は、Issue を作成してください。**
