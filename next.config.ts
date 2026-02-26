import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Content Security Policy
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cal.com https://app.cal.com https://www.youtube.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://cal.com https://app.cal.com https://fonts.googleapis.com;
  img-src 'self' data: blob: https: http:;
  media-src 'self' https://www.youtube.com https://youtube.com;
  font-src 'self' data: https://fonts.gstatic.com;
  frame-src 'self' https://cal.com https://app.cal.com https://www.youtube.com https://youtube.com https://www.google.com;
  connect-src 'self' https://cal.com https://app.cal.com https://*.supabase.co https://www.google-analytics.com https://www.youtube.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  upgrade-insecure-requests;
`.replace(/\n/g, ' ').trim();

// Permissions Policy
const PermissionsPolicy = [
  'camera=()',
  'microphone=()',
  'geolocation=()',
  'interest-cohort=()',
  'payment=()',
  'usb=()',
  'magnetometer=()',
  'gyroscope=()',
  'accelerometer=()',
].join(', ');

const securityHeaders = [
  // XSS Protection (レガシーブラウザ向け)
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // MIME type sniffing 防止
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // クリックジャッキング防止
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Referrer Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  // HSTS (HTTPS強制)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // Permissions Policy
  {
    key: 'Permissions-Policy',
    value: PermissionsPolicy,
  },
  // DNS Prefetch Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // Cross-Origin-Opener-Policy
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  // Cross-Origin-Resource-Policy
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'cross-origin',
  },
];

const nextConfig: NextConfig = {
  // 画像最適化設定
  images: {
    // 外部画像ドメイン許可
    remotePatterns: [
      // YouTube サムネイル
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      // Supabase Storage
      {
        protocol: 'https',
        hostname: '*.supabase.co',
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
    // CSS最適化 (critters が必要)
    optimizeCss: false,
  },

  // Powered by ヘッダー削除 (情報漏洩防止)
  poweredByHeader: false,

  // ヘッダー設定
  async headers() {
    return [
      // 全ページにセキュリティヘッダー適用
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // 静的アセット (1年キャッシュ)
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // JSファイル (1年キャッシュ、ハッシュ付きなので安全)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // APIにCORS設定
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, x-admin-token',
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400',
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

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
