import type { Metadata } from "next";
import "./globals.css";
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import { LanguageProvider } from '../src/context/LanguageContext';
import JsonLd from '../src/components/JsonLd';
import { organizationSchema } from '../src/lib/schema';
import { SITE_URL } from '../src/lib/siteConfig';

/**
 * ⚠️ THE SINGLE MOST DANGEROUS LINE IN THE OLD CODE WAS HERE:
 *
 *   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjainastro.vercel.app';
 *
 * If NEXT_PUBLIC_SITE_URL is missing or misspelled in ANY environment, that
 * fallback made metadataBase resolve to the Vercel domain — and then every
 * canonical tag, every Open Graph URL and every schema @id on the entire site
 * pointed at vercel.app instead of ujjainastro.com. That is very likely how
 * the preview deployment came to outrank the real domain for the brand name.
 *
 * SITE_URL now lives in src/lib/siteConfig.ts with a production fallback, and
 * is the only place any URL is defined.
 */
const ogImage = '/images/optimized/hero-mahakaleshwar-ujjain.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.webmanifest',

  /**
   * TITLE — was 75 characters:
   *   "Ujjain Astro | NRI Online Puja Booking, Kaal Sarp & Mangal Dosh Puja Ujjain"
   * Google truncates around 60, so "Mangal Dosh Puja Ujjain" — a second money
   * keyword — was getting cut off in results entirely.
   *
   * Now 57 characters, money keyword first, price included. Competitors in
   * this niche put price directly in the title (mangleshastrology.com uses
   * "| ₹2,100 से") and it is a live CTR tactic worth keeping.
   *
   * The `template` appends the brand to child pages automatically.
   */
  title: {
    default: "Kaal Sarp & Mangal Dosh Puja in Ujjain — From ₹2,100",
    template: "%s | Ujjain Astro",
  },
  description:
    "Book authentic Kaal Sarp Dosh Puja, Mangal Dosh Puja, Pitra Dosh Puja, Rudrabhishek, and Mahamrityunjay Jaap in Ujjain with Pandit Ashok Sharma. 15+ years, 5000+ pujas. Live video participation for NRI and overseas devotees.",
  verification: {
    google: 'cWvp5NrIyXyqrONyhiyu_KMUup2QiVmDDo5prH6BPC4',
  },
  alternates: {
    canonical: '/',
    // Uncomment once the /hi/ tree actually exists. hreflang pointing at a
    // 404 is worse than no hreflang at all.
    // languages: {
    //   'en-IN': '/',
    //   'hi-IN': '/hi',
    //   'x-default': '/',
    // },
  },
  keywords: [
    "kaal sarp dosh puja ujjain",
    "mangal dosh puja ujjain",
    "pitra dosh puja ujjain",
    "rudrabhishek puja ujjain",
    "mahamrityunjay jaap ujjain",
    "navgraha shanti puja ujjain",
    "guru chandal dosh puja ujjain",
    "angarak dosh puja ujjain",
    "grahan dosh puja ujjain",
    "baglamukhi puja ujjain",
    "online puja booking ujjain",
    "remote puja ujjain",
    "live puja ujjain",
    "pandit booking in ujjain",
    "ujjain astrologer",
    "nri puja booking ujjain",
    "online puja for nri",
    "remote puja for abroad devotees",
    "live video puja for overseas devotees",
    "book puja from abroad",
    "nri kaal sarp dosh puja",
    "nri mangal dosh puja",
  ],
  openGraph: {
    title: "Ujjain Astro | NRI Online & Offline Puja Booking in Ujjain",
    description:
      "Trusted Ujjain pandits for online and offline dosh nivaran pujas with live video participation for devotees in India and abroad.",
    type: "website",
    url: '/',
    siteName: 'Ujjain Astro',
    locale: 'en_IN',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Ujjain Astro - Online and Offline Puja Booking',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ujjain Astro | NRI Online & Offline Puja Booking",
    description:
      "Book Kaal Sarp, Mangal, Pitra, Navgraha and more pujas in Ujjain with live online options for India and abroad.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /**
     * CHANGED: lang="hi" → lang="en".
     *
     * The document declared Hindi while the title, meta description, all 17
     * blog posts and most UI copy are English. That is a conflicting signal on
     * every page of the site.
     *
     * Correct long-term fix is a real /hi/ tree with reciprocal hreflang —
     * see the audit. Until then, English matches the majority of the content.
     * If you later render Hindi via LanguageContext, set this dynamically.
     */
    <html lang="en">
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
        {/*
          Business entity graph — LocalBusiness + Person + WebSite, rendered
          once for the whole site.

          This replaces the partial LocalBusiness that lived in app/page.tsx.
          That one had no streetAddress, no postalCode, no geo, no
          openingHours, no sameAs and no founder — Google largely ignores a
          LocalBusiness with only a locality, because it does not establish a
          real place. It also had no @id, so it could not be referenced by the
          Service and Article schema on other pages.
        */}
        <JsonLd id="schema-organization" data={organizationSchema()} />
      </body>
    </html>
  );
}
