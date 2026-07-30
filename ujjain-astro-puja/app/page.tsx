import Hero from '../src/components/sections/Hero';
import AboutPreview from '../src/components/sections/AboutPreview';
import ServicesOverview from '../src/components/sections/ServicesOverview';
import TestimonialsPreview from '../src/components/sections/TestimonialsPreview';
import FAQ from '../src/components/sections/FAQ';
import ContactSection from '../src/components/sections/ContactSection';
import FloatingWhatsApp from '../src/components/layout/FloatingWhatsApp';
import FloatingCall from '../src/components/layout/FloatingCall';
import JsonLd from '../src/components/JsonLd';
import { faqs } from '../src/data/faq';
import { services } from '../src/data/services';
import { faqSchema, breadcrumbSchema, serviceSchema } from '../src/lib/schema';

/**
 * WHAT CHANGED HERE
 *
 * 1. The hardcoded `siteUrl` fallback to 'https://ujjainastro.vercel.app' is
 *    gone. Every URL now resolves through src/lib/siteConfig.ts.
 *
 * 2. The inline LocalBusiness block has MOVED to app/layout.tsx (via
 *    organizationSchema()), where it renders once for the whole site with a
 *    stable @id that other pages can reference. The old version was also
 *    missing streetAddress, postalCode, geo, openingHours, sameAs and founder
 *    — Google largely ignores a LocalBusiness that only names a city.
 *
 * 3. FAQPage no longer uses `faqs.slice(0, 10)`. That silently dropped 3 of
 *    your 13 questions — including two of the strongest NRI ones ("Is this
 *    service suitable for NRI devotees?" and "Do you support local time slots
 *    for devotees abroad?"). All 13 are marked up now.
 *
 * 4. Added real Service + Offer schema for the six priced services. The old
 *    hasOfferCatalog listed service NAMES with no price, no availability and
 *    no URL, which is not eligible for any price-related rich result.
 *
 * 5. Added BreadcrumbList.
 */

// The six services with published "starting from" prices, in the order they
// appear on the homepage.
const PRICED_SERVICE_SLUGS = [
  'kaal-sarp-dosh',
  'mangal-dosh',
  'navgraha-shanti',
  'pitra-dosh',
  'shani-dosh',
  'rahu-ketu-dosh',
];

export default function Home() {
  const pricedServices = services.filter((s) => PRICED_SERVICE_SLUGS.includes(s.slug));

  return (
    <main>
      {/* All 13 FAQs, not the first 10 */}
      <JsonLd id="schema-faq" data={faqSchema(faqs)} />

      <JsonLd id="schema-breadcrumb" data={breadcrumbSchema([{ name: 'Home', path: '' }])} />

      {/*
        One Service + Offer block per priced puja, each carrying the real
        ₹ figure, availability and a canonical URL. These reference the
        LocalBusiness in layout.tsx by @id rather than repeating it.

        NOTE: the URLs currently point at the /blog/ paths because that is
        where these pages live today. When you build the root-level service
        pages (/kaal-sarp-dosh-puja-ujjain/) and switch on the redirects in
        next.config.js, change the second argument here to match.
      */}
      {pricedServices.map((service) => (
        <JsonLd
          key={service.slug}
          id={`schema-service-${service.slug}`}
          data={serviceSchema(service, `blog/${service.slug}`)}
        />
      ))}

      <Hero />
      <AboutPreview />
      <ServicesOverview />
      <TestimonialsPreview />
      <FAQ />
      <ContactSection />
      <FloatingCall />
      <FloatingWhatsApp />
    </main>
  );
}
