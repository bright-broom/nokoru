import { ImageResponse } from 'next/og';
import { text } from '@/config/text';

export const runtime = 'edge';

export const alt = text.seo.socialImageAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fbf9f6 0%, #f5f2ec 50%, #e8e4dc 100%)',
          position: 'relative',
        }}
      >
        {/* 装飾パターン - 上部 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #7a8ec5 0%, #9ba8d4 50%, #7a8ec5 100%)',
          }}
        />

        {/* メインコンテンツ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          {/* 装飾ライン */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '1px',
                background: 'rgba(122, 142, 197, 0.4)',
              }}
            />
            <span style={{ color: 'rgba(122, 142, 197, 0.6)', fontSize: '24px' }}>✦</span>
            <div
              style={{
                width: '60px',
                height: '1px',
                background: 'rgba(122, 142, 197, 0.4)',
              }}
            />
          </div>

          {/* ロゴ/サイト名 */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 300,
              color: '#3d3d3d',
              letterSpacing: '0.1em',
              margin: 0,
              fontFamily: 'serif',
            }}
          >
            Silver Lace Weddings
          </h1>

          {/* サブタイトル */}
          <p
            style={{
              fontSize: '28px',
              color: '#6b6b6b',
              marginTop: '24px',
              letterSpacing: '0.15em',
              fontFamily: 'sans-serif',
            }}
          >
            Location Wedding Film
          </p>

          {/* 説明文 */}
          <p
            style={{
              fontSize: '22px',
              color: '#3d3d3d',
              marginTop: '40px',
              textAlign: 'center',
              lineHeight: 1.6,
              maxWidth: '800px',
              fontFamily: 'sans-serif',
            }}
          >
            ロケーション前撮りを、美しい映像に。
          </p>

          {/* エリア情報 */}
          <p
            style={{
              fontSize: '18px',
              color: '#6b6b6b',
              marginTop: '16px',
              fontFamily: 'sans-serif',
            }}
          >
            大阪・兵庫・京都・奈良・滋賀を中心に、全国出張対応
          </p>
        </div>

        {/* 装飾パターン - 下部 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #7a8ec5 0%, #9ba8d4 50%, #7a8ec5 100%)',
          }}
        />

        {/* コーナー装飾 */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            width: '40px',
            height: '40px',
            borderTop: '2px solid rgba(122, 142, 197, 0.3)',
            borderLeft: '2px solid rgba(122, 142, 197, 0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '40px',
            height: '40px',
            borderTop: '2px solid rgba(122, 142, 197, 0.3)',
            borderRight: '2px solid rgba(122, 142, 197, 0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            width: '40px',
            height: '40px',
            borderBottom: '2px solid rgba(122, 142, 197, 0.3)',
            borderLeft: '2px solid rgba(122, 142, 197, 0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            width: '40px',
            height: '40px',
            borderBottom: '2px solid rgba(122, 142, 197, 0.3)',
            borderRight: '2px solid rgba(122, 142, 197, 0.3)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
