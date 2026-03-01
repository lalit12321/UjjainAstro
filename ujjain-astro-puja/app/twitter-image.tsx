import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Ujjain Astro - Puja Booking';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'radial-gradient(circle at top left, #1f2937 0%, #0b1020 60%)',
          color: '#f8fafc',
          padding: '72px',
          gap: 24,
        }}
      >
        <div style={{ fontSize: 40, color: '#f59e0b', fontWeight: 700 }}>Ujjain Astro</div>
        <div style={{ fontSize: 74, lineHeight: 1.06, fontWeight: 800 }}>Book Authentic Puja in Ujjain</div>
        <div style={{ fontSize: 30, color: '#d1d5db' }}>WhatsApp Booking: +91 97539 53401</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
