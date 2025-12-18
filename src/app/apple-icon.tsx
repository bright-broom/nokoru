import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #7a8ec5 0%, #9ba8d4 100%)',
          borderRadius: '40px',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Elegant "S" letter for Silver Lace */}
          <path
            d="M11 11.5C11 9.5 13 8 16 8C19 8 21 9.5 21 11.5C21 13.5 19 14.5 16 15.5C13 16.5 11 17.5 11 19.5C11 21.5 13 23 16 23C19 23 21 21.5 21 19.5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Small decorative dot */}
          <circle cx="23" cy="9" r="2" fill="#d4af37" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
