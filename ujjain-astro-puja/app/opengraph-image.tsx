import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Ujjain Astro - Online and Offline Puja Booking';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0b1020 0%, #111827 50%, #0f172a 100%)',
          color: '#f8fafc',
          padding: '56px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: '#d4af37',
              color: '#111827',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            Om
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>Ujjain Astro</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 64, lineHeight: 1.08, fontWeight: 800 }}>
            Kaal Sarp Dosh Puja Ujjain
          </div>
          <div style={{ fontSize: 32, color: '#f59e0b', fontWeight: 700 }}>
            Online and Offline Booking Available
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#d1d5db' }}>
          <div>Phone: +91 97539 53401</div>
          <div>Ujjain</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
