import { ImageResponse } from 'next/og';

// Google requires favicons to be a multiple of 48px for search results.
export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A4F8A',
          color: '#fff',
          fontSize: 130,
          fontWeight: 800,
          borderRadius: 36,
        }}
      >
        K
      </div>
    ),
    size
  );
}
