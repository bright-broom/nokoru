import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 画像最適化設定
  images: {
    // 外部画像ドメイン許可 (YouTube サムネイル)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    // モダンフォーマット優先
    formats: ['image/avif', 'image/webp'],
    // デバイスサイズ
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // 画像サイズ
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 実験的機能
  experimental: {
    // CSS最適化
    optimizeCss: true,
  },

  // ヘッダー設定 (キャッシュ戦略)
  async headers() {
    return [
      {
        // 静的アセット (1年キャッシュ)
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // JSファイル (1年キャッシュ、ハッシュ付きなので安全)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // セキュリティヘッダー
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // リダイレクト (将来用)
  async redirects() {
    return [];
  },
};

export default nextConfig;
