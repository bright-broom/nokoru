import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * シンプルなインメモリレートリミッター
 * 本番環境ではRedisなどの外部ストアを推奨
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// レートリミット設定
const RATE_LIMIT_WINDOW = 60 * 1000; // 1分
const RATE_LIMIT_MAX_REQUESTS = 30; // 1分あたり30リクエスト
const RATE_LIMIT_API_MAX = 10; // APIは1分あたり10リクエスト

function getClientIP(request: NextRequest): string {
  // Netlify/Vercel等のプロキシ経由のIP取得
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  return 'unknown';
}

function isRateLimited(key: string, maxRequests: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= maxRequests) {
    return true;
  }

  entry.count++;
  return false;
}

// 定期的にマップをクリーンアップ（メモリリーク防止）
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, RATE_LIMIT_WINDOW);
}

// ブロックするパス（管理系・内部系）
const BLOCKED_PATHS = [
  '/wp-admin',
  '/wp-login',
  '/.env',
  '/.git',
  '/config',
  '/admin',
  '/phpmyadmin',
  '/xmlrpc.php',
];

// 疑わしいユーザーエージェント
const SUSPICIOUS_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'nessus',
  'openvas',
  'w3af',
  'acunetix',
  'netsparker',
  'burp',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  // 1. 疑わしいユーザーエージェントをブロック
  if (SUSPICIOUS_USER_AGENTS.some((ua) => userAgent.includes(ua))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 2. ブロックパスへのアクセスを拒否
  if (BLOCKED_PATHS.some((path) => pathname.toLowerCase().startsWith(path))) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // 3. APIエンドポイントへのレートリミット
  if (pathname.startsWith('/api/')) {
    const rateLimitKey = `api:${clientIP}`;
    if (isRateLimited(rateLimitKey, RATE_LIMIT_API_MAX)) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }
  }

  // 4. 全体のレートリミット
  const generalRateLimitKey = `general:${clientIP}`;
  if (isRateLimited(generalRateLimitKey, RATE_LIMIT_MAX_REQUESTS)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: { 'Retry-After': '60' },
    });
  }

  // 5. リクエストを通過させる
  const response = NextResponse.next();

  // セキュリティヘッダー追加（next.config.tsと併用）
  response.headers.set('X-Request-Id', crypto.randomUUID());

  return response;
}

export const config = {
  matcher: [
    /*
     * 以下を除くすべてのパスにマッチ:
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化)
     * - favicon.ico, icon.svg, apple-icon等
     * - 画像ファイル
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)',
  ],
};
