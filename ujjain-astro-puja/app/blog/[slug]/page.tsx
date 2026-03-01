import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, getBlogPostBySlug } from '../../../src/data/blog';
import { serviceImageBySlug } from '../../../src/data/serviceImages';

type BlogDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogDetailPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Blog Not Found | Ujjain Astro',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const image = serviceImageBySlug[post.serviceSlug] || '/images/optimized/hero-mahakaleshwar-ujjain.jpg';

  return {
    title: `${post.title} | Ujjain Astro`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Ujjain Astro`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'article',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Ujjain Astro`,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = getBlogPostBySlug(params.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjainastro.vercel.app';

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="py-24 bg-dark-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="container-custom max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-gold-400 hover:text-gold-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <header className="mb-10">
          {serviceImageBySlug[post.serviceSlug] && (
            <div className="relative mb-6 h-64 md:h-80 w-full overflow-hidden rounded-2xl border border-dark-700/60">
              <Image
                src={serviceImageBySlug[post.serviceSlug]}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 to-transparent" />
            </div>
          )}
          <h1 className="section-title mb-4">{post.title}</h1>
          <p className="text-dark-300 text-lg">{post.excerpt}</p>
        </header>

        <div className="space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading} className="bg-dark-800/50 border border-dark-700/60 rounded-2xl p-6">
              <h2 className="text-2xl font-heading font-semibold text-dark-50 mb-4">{section.heading}</h2>

              <div className="space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-dark-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="text-dark-300 flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 p-6 bg-dark-800 border border-dark-700 rounded-2xl text-center">
          <h3 className="text-2xl font-heading font-semibold text-dark-50 mb-3">
            Ready to Book {post.title.replace(' in Ujjain: Benefits, Vidhi, Cost, and Online Booking', '')}?
          </h3>
          <p className="text-dark-300 mb-6">
            Choose online remote participation or offline temple attendance in Ujjain.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-semibold rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all"
          >
            Book This Puja
          </Link>
        </div>
      </article>
    </main>
  );
}

