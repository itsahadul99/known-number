import { ImageResponse } from 'next/og';

export const alt = 'Known Number — Practice the call before it comes';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#0A4F8A',
          color: '#ffffff',
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, opacity: 0.85 }}>Known Number</div>
        <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.1, marginTop: 24 }}>
          Practice the call before it comes.
        </div>
        <div style={{ fontSize: 34, marginTop: 36, opacity: 0.9 }}>
          Free 5-minute scam rehearsal for families · English · বাংলা
        </div>
      </div>
    ),
    size
  );
}
