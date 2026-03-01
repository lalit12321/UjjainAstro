import Hero from '../src/components/sections/Hero';
import AboutPreview from '../src/components/sections/AboutPreview';
import ServicesOverview from '../src/components/sections/ServicesOverview';
import TestimonialsPreview from '../src/components/sections/TestimonialsPreview';
import FAQ from '../src/components/sections/FAQ';
import ContactSection from '../src/components/sections/ContactSection';
import FloatingWhatsApp from '../src/components/layout/FloatingWhatsApp';
import FloatingCall from '../src/components/layout/FloatingCall';
import { faqs } from '../src/data/faq';

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjainastro.vercel.app';
  const seoSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ujjain Astro',
    url: siteUrl,
    image: `${siteUrl}/images/optimized/hero-mahakaleshwar-ujjain.jpg`,
    telephone: '+91 97539 53401',
    email: 'ujjain.astro.services@gmail.com',
    priceRange: 'INR 2100-3100',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ujjain',
      addressCountry: 'IN',
    },
    areaServed: ['Ujjain', 'India', 'Worldwide'],
    serviceType: [
      'Kaal Sarp Dosh Puja',
      'Mangal Dosh Puja',
      'Pitra Dosh Puja',
      'Navgraha Shanti Puja',
      'Online Puja',
      'Remote Puja',
    ],
    description:
      'Online and offline puja booking in Ujjain with live video participation and temple rituals by certified pandits.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Astrology Puja Services in Ujjain',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kaal Sarp Dosh Puja Ujjain' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mangal Dosh Puja Ujjain' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pitra Dosh Puja Ujjain' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rudrabhishek Puja Ujjain' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mahamrityunjay Jaap Ujjain' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Online Remote Puja Ujjain' } },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.slice(0, 10).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
