import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found | Ujjain Astro',
  description: 'The page you are looking for does not exist. Explore puja services and booking options on Ujjain Astro.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dark-950 px-4 py-24">
      <section className="container-custom mx-auto max-w-2xl rounded-2xl border border-dark-700 bg-dark-800/60 p-8 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gold-400">404 Error</p>
        <h1 className="mb-4 text-3xl font-heading font-bold text-dark-50 md:text-4xl">Page Not Found</h1>
        <p className="mb-8 text-dark-300">
          The requested page is unavailable. You can return to the homepage and continue with booking or enquiry.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 font-semibold text-dark-950 transition-all hover:from-gold-400 hover:to-gold-500"
        >
          Go To Homepage
        </Link>
      </section>
    </main>
  );
}
