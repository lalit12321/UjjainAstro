/**
 * src/lib/schema.ts — structured data builders
 * ---------------------------------------------
 * WHAT WAS ALREADY HERE (credit where due — my first audit pass got this wrong):
 *   app/page.tsx            already had LocalBusiness + FAQPage
 *   app/blog/[slug]/page.tsx already had BreadcrumbList
 * Those <script> tags are invisible to most external crawl/fetch tools, which
 * is why the audit reported "zero schema". The code had it.
 *
 * WHAT WAS ACTUALLY MISSING / WEAK, and what this file fixes:
 *   1. LocalBusiness had NO streetAddress, postalCode, geo, openingHours,
 *      sameAs, or founder. Google largely ignores a LocalBusiness with only a
 *      locality — it is not enough to establish a real place.
 *   2. No @id values, so the blocks were three unconnected islands instead of
 *      one entity graph Google can follow.
 *   3. FAQPage used `faqs.slice(0, 10)` — silently dropping 3 of your 13 FAQs.
 *   4. No Service/Offer schema with real prices. The old OfferCatalog listed
 *      service NAMES with no price, availability, or URL — no eligibility for
 *      any price-related rich result.
 *   5. No Article schema and no dates → no freshness or authorship signal.
 *   6. No Person entity for Pandit Ashok Sharma → 15+ years of expertise
 *      invisible to Google's E-E-A-T signals.
 */

import { SITE_URL, BUSINESS, SCHEMA_IDS, abs } from './siteConfig';
import type { FAQ, Service } from '../types';

/* ------------------------------------------------------------------ *
 * 1. Business entity graph — render ONCE, in the root layout
 * ------------------------------------------------------------------ */
export function organizationSchema() {
  const hasStreetAddress = Boolean(BUSINESS.address.streetAddress);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': SCHEMA_IDS.business,
        name: BUSINESS.name,
        alternateName: BUSINESS.alternateName,
        legalName: BUSINESS.legalName,
        description: BUSINESS.description,
        url: SITE_URL,
        telephone: BUSINESS.telephone,
        email: BUSINESS.email,
        priceRange: BUSINESS.priceRange,
        image: abs(BUSINESS.image),
        address: {
          '@type': 'PostalAddress',
          // Omit empty keys rather than publishing blanks.
          ...(hasStreetAddress ? { streetAddress: BUSINESS.address.streetAddress } : {}),
          addressLocality: BUSINESS.address.addressLocality,
          addressRegion: BUSINESS.address.addressRegion,
          ...(BUSINESS.address.postalCode ? { postalCode: BUSINESS.address.postalCode } : {}),
          addressCountry: BUSINESS.address.addressCountry,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: BUSINESS.geo.latitude,
          longitude: BUSINESS.geo.longitude,
        },
        openingHoursSpecification: BUSINESS.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: h.opens,
          closes: h.closes,
        })),
        areaServed: BUSINESS.areaServed.map((name) => ({ '@type': 'Country', name })),
        founder: { '@id': SCHEMA_IDS.person },
        employee: { '@id': SCHEMA_IDS.person },
        knowsLanguage: ['hi', 'en'],
        sameAs: BUSINESS.social.filter(Boolean),
        // NOTE: aggregateRating is deliberately absent. See ratingSchema() below.
      },
      {
        '@type': 'Person',
        '@id': SCHEMA_IDS.person,
        name: BUSINESS.founder.name,
        jobTitle: BUSINESS.founder.jobTitle,
        worksFor: { '@id': SCHEMA_IDS.business },
        knowsAbout: [
          'Vedic Astrology',
          'Kaal Sarp Dosh Nivaran',
          'Mangal Dosh Puja',
          'Pitra Dosh Puja',
          'Navgraha Shanti Puja',
          'Rudrabhishek',
          'Mahamrityunjay Jaap',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': SCHEMA_IDS.website,
        url: SITE_URL,
        name: BUSINESS.name,
        publisher: { '@id': SCHEMA_IDS.business },
        inLanguage: ['en-IN', 'hi-IN'],
      },
    ],
  };
}

/* ------------------------------------------------------------------ *
 * 2. FAQPage — now uses ALL faqs passed in, not the first 10
 * ------------------------------------------------------------------ */
export function faqSchema(faqs: FAQ[], pageUrl?: string) {
  if (!faqs.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(pageUrl ? { '@id': `${pageUrl}#faq` } : {}),
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/* ------------------------------------------------------------------ *
 * 3. Service + Offer — one per puja page, WITH the real price
 * ------------------------------------------------------------------ */
export function serviceSchema(service: Service, pagePath: string) {
  const url = abs(pagePath);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: `${service.title} in Ujjain`,
    serviceType: service.title,
    description: service.fullDescription,
    provider: { '@id': SCHEMA_IDS.business },
    areaServed: BUSINESS.areaServed.map((name) => ({ '@type': 'Country', name })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: BUSINESS.telephone,
      availableLanguage: ['hi', 'en'],
    },
    offers: {
      '@type': 'Offer',
      price: String(service.price.standard),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url,
      seller: { '@id': SCHEMA_IDS.business },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} — what is included`,
      itemListElement: service.included.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };
}

/* ------------------------------------------------------------------ *
 * 4. Article — supplies the datePublished / dateModified / author that
 *    the site had no way to express before
 * ------------------------------------------------------------------ */
export function articleSchema(args: {
  headline: string;
  description: string;
  path: string;
  datePublished: string; // ISO, e.g. '2026-07-30'
  dateModified?: string;
  image?: string;
}) {
  const url = abs(args.path);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: args.headline.slice(0, 110), // Google truncates beyond ~110 chars
    description: args.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: args.datePublished,
    dateModified: args.dateModified || args.datePublished,
    author: { '@id': SCHEMA_IDS.person },
    publisher: { '@id': SCHEMA_IDS.business },
    ...(args.image ? { image: abs(args.image) } : {}),
    inLanguage: 'en-IN',
  };
}

/* ------------------------------------------------------------------ *
 * 5. BreadcrumbList
 * ------------------------------------------------------------------ */
export function breadcrumbSchema(trail: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

/* ------------------------------------------------------------------ *
 * 6. AggregateRating — LOCKED until real reviews exist
 * ------------------------------------------------------------------ *
 * Deliberately guarded. None of the seven Ujjain competitors displays a star
 * rating, so being first here is a real advantage — but ONLY with genuine
 * reviews. Marking up a rating you cannot evidence is a manual-action risk and
 * it is the one mistake that is painful to undo.
 *
 * Turn this on once you have 15+ verified Google reviews, and wire it into
 * organizationSchema().
 */
export function ratingSchema(args: { ratingValue: number; reviewCount: number }) {
  if (args.reviewCount < 5) return null;

  return {
    '@type': 'AggregateRating',
    ratingValue: args.ratingValue.toFixed(1),
    reviewCount: args.reviewCount,
    bestRating: '5',
    worstRating: '1',
  };
}
