# Silver Lace Weddings

大阪・関西発のロケーション前撮り専門ウェディングムービー制作サービスの Web サイト。

## 技術スタック

| カテゴリ       | 技術                                 | バージョン           |
| -------------- | ------------------------------------ | -------------------- |
| フレームワーク | Next.js                              | 16.0.10 (App Router) |
| 言語           | TypeScript                           | 5.7.2                |
| スタイリング   | Tailwind CSS                         | 4.0.0                |
| フォント       | Cormorant Garamond / Shippori Mincho | next/font            |
| データベース   | Supabase (PostgreSQL)                | 2.88.0               |
| 予約システム   | Cal.com                              | 1.5.3                |
| ホスティング   | Vercel                               | -                    |

## クイックスタート

### 必要な環境

- Node.js 18.17 以上
- npm

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
│   ├── options/[id]/page.tsx     # オプション詳細ページ
│   ├── plans/[id]/page.tsx       # プラン詳細ページ
│   ├── api/reservations/route.ts # 予約 API
│   └── admin/reservations/       # 管理画面
├── components/
│   ├── forms/                    # フォームコンポーネント
│   ├── icons/                    # SVG アイコン (18種類)
│   ├── layout/                   # Header, Footer
│   ├── sections/                 # ページセクション (8種類)
│   ├── seo/                      # SEO 関連
│   ├── ui/                       # 汎用 UI コンポーネント
│   └── works/                    # 作品関連コンポーネント
├── config/
│   ├── site.ts                   # サイト設定（構造データ）
│   └── text.ts                   # テキスト中央管理
├── hooks/                        # カスタムフック
│   ├── useInView.ts
│   └── useCalInit.ts
├── lib/
│   ├── colors.ts                 # カラー定義
│   ├── fonts.ts                  # フォント定義
│   ├── utils.ts                  # ユーティリティ
│   ├── validation.ts             # バリデーション
│   ├── errors.ts                 # エラーハンドリング
│   ├── env.ts                    # 環境変数管理
│   ├── supabase.ts               # Supabase クライアント
│   └── reservations.ts           # 予約ロジック
├── middleware.ts                 # セキュリティ・レート制限
└── types/                        # TypeScript 型定義
```

## 主要機能

### ランディングページ

| セクション | 機能 |
| ---------- | ---- |
| Hero       | YouTube 動画埋め込み、CTA ボタン |
| Works      | 作品ギャラリー（カルーセル/画像ビューアー） |
| Services   | サービス紹介 |
| Plans      | 料金プラン |
| Options    | オプション |
| About      | スタッフ紹介 |
| Booking    | Cal.com 予約カレンダー |
| Contact    | お問い合わせフォーム |

### 詳細ページ

- `/works/[id]` - 作品詳細（スワイプ対応画像ビューアー）
- `/services/[id]` - サービス詳細
- `/staff/[id]` - スタッフ詳細
- `/options/[id]` - オプション詳細
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

## 画像の配置

```
public/images/
├── works/           # 作品画像
│   ├── couple-sea.jpg
│   └── ...
└── staff/           # スタッフ画像
    ├── aki.jpg
    └── hiyori.jpg
```

ファイル名は `src/config/site.ts` のパスと一致させてください。

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

### アイコン追加

1. `src/components/icons/` にコンポーネント作成
2. `src/components/icons/index.ts` でエクスポート

## デプロイ

### Vercel

1. GitHub インポート
2. Framework: Next.js（自動検出）
3. 環境変数設定

### Supabase

`supabase/migrations/001_create_reservations.sql` を SQL Editor で実行

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

1. `public/images/` にファイルが存在するか確認
2. `src/config/site.ts` のパスと一致しているか確認

## ライセンス

All rights reserved. Silver Lace Weddings.
