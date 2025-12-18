import { siteColors } from '@/lib/colors';
import { siteConfig, text } from '@/config';

/**
 * OGP/Twitter Card用の共通画像コンポーネント
 * opengraph-image.tsx と twitter-image.tsx で共有
 */
export function SocialImageContent() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${siteColors.cream} 0%, ${siteColors.beige} 50%, #e8e4dc 100%)`,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: `linear-gradient(90deg, ${siteColors.accent} 0%, #9ba8d4 50%, ${siteColors.accent} 100%)`,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
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
              background: `rgba(122, 142, 197, 0.4)`,
            }}
          />
          <span style={{ color: 'rgba(122, 142, 197, 0.6)', fontSize: '24px' }}>✦</span>
          <div
            style={{
              width: '60px',
              height: '1px',
              background: `rgba(122, 142, 197, 0.4)`,
            }}
          />
        </div>

        <h1
          style={{
            fontSize: '72px',
            fontWeight: 300,
            color: siteColors.text,
            letterSpacing: '0.1em',
            margin: 0,
            fontFamily: 'serif',
          }}
        >
          {siteConfig.name}
        </h1>

        <p
          style={{
            fontSize: '28px',
            color: siteColors.textLight,
            marginTop: '24px',
            letterSpacing: '0.15em',
            fontFamily: 'sans-serif',
          }}
        >
          {text.site.subTagline}
        </p>

        <p
          style={{
            fontSize: '22px',
            color: siteColors.text,
            marginTop: '40px',
            textAlign: 'center',
            lineHeight: 1.6,
            maxWidth: '800px',
            fontFamily: 'sans-serif',
          }}
        >
          {siteConfig.tagline}
        </p>

        <p
          style={{
            fontSize: '18px',
            color: siteColors.textLight,
            marginTop: '16px',
            fontFamily: 'sans-serif',
          }}
        >
          {siteConfig.areas}
        </p>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: `linear-gradient(90deg, ${siteColors.accent} 0%, #9ba8d4 50%, ${siteColors.accent} 100%)`,
        }}
      />

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
  );
}

export const socialImageConfig = {
  size: {
    width: 1200,
    height: 630,
  },
  contentType: 'image/png' as const,
};
