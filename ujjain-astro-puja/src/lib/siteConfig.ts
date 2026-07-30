/**
 * src/lib/siteConfig.ts — SINGLE SOURCE OF TRUTH FOR URLS AND NAP
 * ----------------------------------------------------------------
 * WHY THIS FILE EXISTS
 *
 * The site URL was previously hardcoded as a fallback in four separate places,
 * with THREE DIFFERENT VALUES:
 *
 *   app/layout.tsx          → 'https://ujjainastro.vercel.app'   ← the bug
 *   app/page.tsx            → 'https://ujjainastro.vercel.app'   ← the bug
 *   app/blog/[slug]/page.tsx→ 'https://ujjainastro.vercel.app'   ← the bug
 *   app/robots.ts           → 'https://ujjainastro.com'
 *   app/sitemap.ts          → 'https://ujjainastro.com'
 *
 * If NEXT_PUBLIC_SITE_URL is ever missing or misspelled in an environment,
 * metadataBase silently falls back to the Vercel domain — and then EVERY
 * canonical tag, Open Graph URL and schema @id on the site points at
 * vercel.app. That is very likely how the preview deployment ended up
 * outranking the real domain for the brand name.
 *
 * Now there is one value, one fallback, and it is the live production host.
 *
 * VERIFIED 30 Jul 2026:
 *   https://ujjainastro.com/      → 307 → https://www.ujjainastro.com/
 *   https://www.ujjainastro.com/  → 200 OK
 * So www is the canonical host. Everything below uses it.
 */

const FALLBACK_SITE_URL = 'https://www.ujjainastro.com';

/** Absolute site origin, no trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, '');

/** Build an absolute URL from a path. Never hardcode the domain anywhere else. */
export const abs = (path = ''): string => `${SITE_URL}/${path.replace(/^\//, '')}`;

/**
 * Name / Address / Phone. This must match your Google Business Profile
 * character for character. NAP inconsistency is the single most common
 * reason local rankings stall.
 */
export const BUSINESS = {
  name: 'Ujjain Astro',
  alternateName: 'उज्जैन एस्ट्रो ज्योतिष सेवाएं',
  legalName: 'Ujjain Astrology Services',
  description:
    'Authentic Kaal Sarp Dosh, Mangal Dosh, Pitra Dosh and Navgraha Shanti puja performed at Ujjain by Pandit Ashok Sharma. Online and remote puja with live video participation available for devotees in India and abroad.',
  telephone: '+919753953401',
  telephoneDisplay: '+91 97539 53401',
  email: 'ujjain.astro.services@gmail.com',
  priceRange: '₹₹',
  image: '/images/optimized/hero-mahakaleshwar-ujjain.jpg',

  address: {
    // ⚠️ TODO — HIGHEST-IMPACT REMAINING ITEM.
    // The site currently publishes only the word "Ujjain". With no street
    // address you are not eligible for the Google local pack at all, and
    // LocalBusiness schema without streetAddress is largely ignored.
    // Competitors publish e.g. "SH-242, Agar-Ujjain Rd, Sandipani Nagar".
    // Fill this in, then create the Google Business Profile with the SAME text.
    streetAddress: '',            // ← e.g. 'Near Mahakaleshwar Temple, Jaisinghpura'
    addressLocality: 'Ujjain',
    addressRegion: 'Madhya Pradesh',
    postalCode: '',               // ← e.g. '456001'
    addressCountry: 'IN',
  },

  // ⚠️ TODO — right-click your exact location in Google Maps and copy the
  // lat/long. Values below are the centre of Ujjain, a placeholder only.
  geo: { latitude: 23.1765, longitude: 75.7885 },

  // Matches the hours displayed on the site: 6 AM–12 PM and 4 PM–9 PM daily.
  hours: [
    { opens: '06:00', closes: '12:00' },
    { opens: '16:00', closes: '21:00' },
  ],

  founder: {
    name: 'Pandit Ashok Sharma',
    jobTitle: 'Chief Astrologer & Vedic Priest',
    yearsExperience: 15,
  },

  // ⚠️ TODO — paste the real URLs behind the Facebook / Instagram / YouTube
  // icons in the footer, and add the Google Business Profile URL once created.
  // Empty strings are filtered out before rendering, so partial is fine.
  social: [
    '', // Facebook
    '', // Instagram
    '', // YouTube
    '', // Google Business Profile
  ],

  areaServed: [
    'India',
    'United States',
    'United Kingdom',
    'United Arab Emirates',
    'Australia',
    'Canada',
    'Singapore',
  ],
} as const;

/** Stable schema @id values so blocks can reference each other instead of duplicating. */
export const SCHEMA_IDS = {
  business: `${SITE_URL}/#business`,
  person: `${SITE_URL}/#pandit-ashok-sharma`,
  website: `${SITE_URL}/#website`,
} as const;
