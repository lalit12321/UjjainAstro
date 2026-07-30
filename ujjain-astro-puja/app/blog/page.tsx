import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Card from '../../src/components/ui/Card';
import { blogPosts } from '../../src/data/blog';
import { serviceImageBySlug } from '../../src/data/serviceImages';
import JsonLd from '../../src/components/JsonLd';
import { breadcrumbSchema } from '../../src/lib/schema';

const ogImage = '/images/optimized/hero-mahakaleshwar-ujjain.jpg';

export const metadata: Metadata = {
  // Brand suffix dropped — the root layout's title.template appends
  // " | Ujjain Astro" automatically, so keeping it here would double it.
  title: 'Puja Guides for NRI & Abroad Devotees',
  description:
    'Read detailed guides for Kaal Sarp Dosh Puja, Mangal Dosh Puja, Navgraha Shanti, and all puja services in Ujjain with online, remote, and NRI-friendly booking options.',
  alternates: {
    canonical: '/blog',
  },
  keywords: [
    'nri puja booking ujjain',
    'online puja for nri devotees',
    'remote puja from abroad',
    'live video puja ujjain',
    'kaal sarp dosh puja for nri',
    'mangal dosh puja online booking',
  ],
  openGraph: {
    title: 'Puja Blog for NRI & Abroad Devotees | Ujjain Astro',
    description:
      'Read detailed guides for Kaal Sarp Dosh Puja, Mangal Dosh Puja, Navgraha Shanti, and all puja services in Ujjain.',
    url: '/blog',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Ujjain Astro Blog Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Puja Blog for NRI & Abroad Devotees | Ujjain Astro',
    description:
      'Detailed puja guides with process, benefits, and booking details for devotees in India and abroad.',
    images: [ogImage],
  },
};

export default function BlogPage() {
  // REMOVED: `const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjainastro.vercel.app'`
  // This was the fourth copy of that vercel.app fallback. URLs now come from
  // src/lib/siteConfig.ts, which falls back to the real production host.
  const cardBackgrounds = [
    'from-amber-500/30 via-gold-500/20 to-dark-900',
    'from-orange-500/30 via-gold-500/20 to-dark-900',
    'from-yellow-500/25 via-gold-500/20 to-dark-900',
    'from-emerald-500/25 via-gold-500/20 to-dark-900',
  ];

  return (
    <main className="py-24 bg-dark-950 min-h-screen">
      <JsonLd
        id="schema-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', path: '' },
          { name: 'Blog', path: 'blog' },
        ])}
      />
      <div className="container-custom">
        <div className="text-center mb-14">
          <h1 className="section-title mb-4">All Puja Blog Guides</h1>
          <p className="section-subtitle mx-auto">
            Detailed articles for every puja service with process, benefits, pricing, and booking guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={post.id} hover className="group flex flex-col h-full overflow-hidden">
              <div className={`relative mb-5 h-40 rounded-xl border border-dark-700/60 bg-gradient-to-br ${cardBackgrounds[index % cardBackgrounds.length]} overflow-hidden`}>
                {serviceImageBySlug[post.serviceSlug] && (
                  <Image
                    src={serviceImageBySlug[post.serviceSlug]}
                    alt={post.title}
                    fill
                    className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/75 via-dark-950/20 to-transparent" />
                <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-gold-400/30 blur-2xl transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute left-4 bottom-4 text-dark-50/90 text-sm font-semibold tracking-wide">
                  Puja Guide
                </div>
              </div>
              <h2 className="text-xl font-heading font-semibold text-dark-50 mb-3">{post.title}</h2>
              <p className="text-dark-400 mb-6 grow">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center justify-center w-full py-3 bg-dark-700 text-dark-50 font-medium rounded-xl hover:bg-dark-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                Read Full Guide
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
