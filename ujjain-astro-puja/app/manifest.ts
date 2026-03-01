import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ujjain Astro - Online and Offline Puja Booking',
    short_name: 'Ujjain Astro',
    description:
      'Book authentic Kaal Sarp, Mangal Dosh, and other puja services in Ujjain with online and remote options.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b1020',
    theme_color: '#d4af37',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
