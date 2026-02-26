# NOKORU

大阪・関西発のロケーション前撮り専門ウェディングムービー制作サービスの Web サイト。

## 技術スタック

| カテゴリ       | 技術                                 | バージョン           |
| -------------- | ------------------------------------ | -------------------- |
| フレームワーク | Next.js                              | 16.0.10 (App Router) |
| 言語           | TypeScript                           | 5.7.2                |
| スタイリング   | Tailwind CSS                         | 4.0.0                |
| フォント       | Cormorant Garamond / Shippori Mincho | next/font            |
| データベース   | Supabase (PostgreSQL)                | 2.88.0               |
| ストレージ     | Supabase Storage                     | -                    |
| 予約システム   | Cal.com                              | 1.5.3                |
| ホスティング   | Vercel                               | -                    |

## クイックスタート

### 必要な環境

- Node.js 18.17 以上
- npm

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/KoenigWolf/nokoru.git
cd nokoru

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env.local
# .env.local を編集して必要な値を設定

# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:3000 を開く
```

### コマンド

| コマンド        | 説明                       |
| --------------- | -------------------------- |
| `npm run dev`   | 開発サーバー起動（Turbopack） |
| `npm run build` | 本番ビルド（Webpack）      |
| `npm start`     | 本番サーバー起動           |
| `npm run lint`  | ESLint 実行                |

## プロジェクト構造

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # ルートレイアウト
│   ├── page.tsx                  # トップページ
│   ├── globals.css               # グローバルスタイル
│   ├── sitemap.ts                # サイトマップ自動生成
│   ├── robots.ts                 # robots.txt 自動生成
│   ├── opengraph-image.tsx       # OG 画像動的生成
│   ├── twitter-image.tsx         # Twitter 画像動的生成
│   ├── contact/page.tsx          # お問い合わせページ
│   ├── works/[id]/page.tsx       # 作品詳細ページ
│   ├── services/[id]/page.tsx    # サービス詳細ページ
│   ├── staff/[id]/page.tsx       # スタッフ詳細ページ
│   ├── plans/[id]/page.tsx       # プラン詳細ページ
│   ├── api/reservations/route.ts # 予約 API
│   └── admin/reservations/       # 管理画面
├── components/
│   ├── forms/                    # フォームコンポーネント
│   ├── icons/                    # SVG アイコン (18種類)
│   ├── layout/                   # Header, Footer
│   ├── sections/                 # ページセクション (7種類)
│   ├── seo/                      # SEO 関連
│   ├── ui/                       # 汎用 UI コンポーネント
│   └── works/                    # 作品関連コンポーネント
├── config/
│   ├── site.ts                   # サイト設定（構造データ）
│   └── text.ts                   # テキスト中央管理
├── hooks/                        # カスタムフック
│   ├── useInView.ts
│   ├── useCalInit.ts
│   └── useScrollBackground.ts
├── lib/
│   ├── colors.ts                 # カラー定義
│   ├── constants.ts              # 定数（アニメーション等）
│   ├── fonts.ts                  # フォント定義
│   ├── utils.ts                  # ユーティリティ
│   ├── storage.ts                # Supabase Storage ユーティリティ
│   ├── validation.ts             # バリデーション
│   ├── errors.ts                 # エラーハンドリング
│   ├── env.ts                    # 環境変数管理
│   ├── supabase.ts               # Supabase クライアント
│   └── reservations.ts           # 予約ロジック
├── middleware.ts                 # セキュリティ・レート制限
└── types/                        # TypeScript 型定義

scripts/
└── migrate-images.ts             # 画像移行スクリプト
```

## 主要機能

### ランディングページ

| セクション | 機能 |
| ---------- | ---- |
| Hero       | YouTube 動画埋め込み、CTA ボタン |
| Works      | 作品ギャラリー（カルーセル/画像ビューアー） |
| Services   | サービス紹介 |
| Plans      | 料金プラン |
| About      | スタッフ紹介 |
| Booking    | Cal.com 予約カレンダー |
| Contact    | お問い合わせフォーム |

### 詳細ページ

- `/works/[id]` - 作品詳細（スワイプ対応画像ビューアー）
- `/services/[id]` - サービス詳細
- `/staff/[id]` - スタッフ詳細
- `/plans/[id]` - プラン詳細

### 予約・お問い合わせ

- **Cal.com**: オンライン相談予約
- **Supabase**: 予約データ管理
- **管理画面**: `/admin/reservations?token=ADMIN_TOKEN`

### SEO

- sitemap.xml / robots.txt 自動生成
- OG / Twitter 画像動的生成
- JSON-LD 構造化データ（LocalBusiness, Service, WebSite, FAQPage, BreadcrumbList）

### セキュリティ

| 対策 | 内容 |
| ---- | ---- |
| CSP  | Content Security Policy ヘッダー |
| XSS  | X-XSS-Protection, 入力サニタイズ |
| HSTS | Strict-Transport-Security |
| レート制限 | API: 10req/分, 全体: 30req/分 |
| 入力検証 | メール・電話・長さ制限 |
| ブロック | 不正パス・疑わしい UA の自動拒否 |

## 環境変数

`.env.local` に設定:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# 管理画面
ADMIN_TOKEN=your_random_token
```

| 変数 | 取得場所 |
| ---- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → service_role |
| `ADMIN_TOKEN` | 任意のランダム文字列 |

## 画像管理（Supabase Storage）

画像は **Supabase Storage** で管理されています。

### ストレージ構成

```
media/ (バケット)
├── works/           # 作品画像
│   ├── couple-cliff.jpg
│   ├── couple-sea-smile.jpg
│   └── ...
└── staff/           # スタッフ画像
    ├── aki.jpg
    └── hiyori.jpg
```

### 画像の追加・変更

1. **Supabase ダッシュボード** → Storage → `media` バケット
2. 適切なフォルダ（`works/` または `staff/`）にアップロード
3. `src/config/site.ts` でファイル名を参照

### 画像 URL の取得

```typescript
import { getWorkImageUrl, getStaffImageUrl } from '@/lib/storage';

// 作品画像
const workUrl = getWorkImageUrl('couple-cliff.jpg');
// → https://xxx.supabase.co/storage/v1/object/public/media/works/couple-cliff.jpg

// スタッフ画像
const staffUrl = getStaffImageUrl('aki.jpg');
// → https://xxx.supabase.co/storage/v1/object/public/media/staff/aki.jpg
```

### 画像移行スクリプト

ローカルの `public/images/` から Supabase Storage に移行する場合:

```bash
# 環境変数を読み込んで実行
source .env.local && export NEXT_PUBLIC_SUPABASE_URL SUPABASE_SERVICE_ROLE_KEY
npx tsx scripts/migrate-images.ts
```

#### オプション

| オプション | 説明 |
| ---------- | ---- |
| `--dry-run` | 実際にはアップロードせず、対象ファイルを確認 |
| `--skip-existing` | 既存ファイルをスキップ |
| `--concurrency=N` | 同時アップロード数（デフォルト: 5） |
| `--dir=NAME` | 特定のディレクトリのみ移行（works, staff, videos） |

```bash
# 例: ドライランで対象確認
npx tsx scripts/migrate-images.ts --dry-run

# 例: 既存スキップ + 3並列
npx tsx scripts/migrate-images.ts --skip-existing --concurrency=3

# 例: works のみ移行
npx tsx scripts/migrate-images.ts --dir=works
```

## 開発ガイド

### テキスト変更

すべての表示文言は `src/config/text.ts` で管理:

```typescript
import { text } from "@/config/text";

<h1>{text.site.name}</h1>
```

### スタイル変更

- **グローバル**: `src/app/globals.css`
- **カラー**: `src/lib/colors.ts`
- **フォント**: `src/lib/fonts.ts`
- **定数**: `src/lib/constants.ts`

### アイコン追加

1. `src/components/icons/` にコンポーネント作成
2. `src/components/icons/index.ts` でエクスポート

### UI コンポーネント

再利用可能な UI コンポーネントは `src/components/ui/` にあります:

| コンポーネント | 説明 |
| -------------- | ---- |
| `FadeIn` | アニメーション付きフェードイン |
| `IconBox` | アイコン表示ボックス |
| `SectionCTA` | セクション CTA ボタン |
| `AnimatedLine` | ホバー時に伸びる線 |
| `NavLink` | ナビゲーションリンク |
| `SocialButton` | SNS リンクボタン |

## デプロイ

### Vercel

1. GitHub インポート
2. Framework: Next.js（自動検出）
3. 環境変数設定（上記参照）

### Supabase

1. `supabase/migrations/001_create_reservations.sql` を SQL Editor で実行
2. Storage → New bucket → `media` を作成（Public）
3. 画像をアップロード

## トラブルシューティング

### ビルドエラー

```bash
rm -rf .next && npm run build
```

### 環境変数が読み込まれない

1. `.env.local` がルートにあるか確認
2. `NEXT_PUBLIC_` プレフィックスを確認
3. サーバー再起動

### 画像が表示されない

1. Supabase Storage の `media` バケットが Public か確認
2. `NEXT_PUBLIC_SUPABASE_URL` が正しく設定されているか確認
3. ファイル名が `src/config/site.ts` と一致しているか確認
4. Vercel の環境変数に `NEXT_PUBLIC_SUPABASE_URL` が設定されているか確認

### Supabase Storage への接続エラー

1. Supabase ダッシュボードでプロジェクトがアクティブか確認
2. API キーが有効か確認
3. CORS 設定を確認

## ライセンス

All rights reserved. NOKORU.
