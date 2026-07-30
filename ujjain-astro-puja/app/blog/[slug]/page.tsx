import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, getBlogPostBySlug } from '../../../src/data/blog';
import { getServiceBySlug } from '../../../src/data/services';
import { serviceImageBySlug } from '../../../src/data/serviceImages';
import JsonLd from '../../../src/components/JsonLd';
import { articleSchema, breadcrumbSchema, serviceSchema } from '../../../src/lib/schema';
import { BUSINESS } from '../../../src/lib/siteConfig';

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
    // `title` is now a plain string — the root layout's title.template appends
    // " | Ujjain Astro" automatically, so hardcoding it here would double it.
    title: post.title,
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
      // ADDED — article dates for Open Graph, matching the Article schema.
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
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

/** Format an ISO date for display, e.g. '2026-07-30' → '30 July 2026'. */
const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // The service behind this post, for Service + Offer schema with the real price.
  const service = getServiceBySlug(post.serviceSlug);
  const postImage = serviceImageBySlug[post.serviceSlug];

  return (
    <main className="py-24 bg-dark-950 min-h-screen">
      {/*
        SCHEMA — previously this page emitted BreadcrumbList only, and built
        its URLs from a hardcoded fallback to the vercel.app domain. Now:
          • Breadcrumb uses the real canonical host via siteConfig
          • Article supplies datePublished / dateModified / author, which the
            site had no way to express before
          • Service + Offer carries the actual ₹ price, availability and URL
      */}
      <JsonLd
        id="schema-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', path: '' },
          { name: 'Blog', path: 'blog' },
          { name: post.title, path: `blog/${post.slug}` },
        ])}
      />
      <JsonLd
        id="schema-article"
        data={articleSchema({
          headline: post.title,
          description: post.excerpt,
          path: `blog/${post.slug}`,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          image: postImage,
        })}
      />
      {service && (
        <JsonLd
          id="schema-service"
          data={serviceSchema(service, `blog/${post.slug}`)}
        />
      )}

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

          {/*
            ADDED — visible author byline and dates.

            None of the 17 posts carried a date or an author before. For a site
            asking strangers to pay for religious rituals, missing authorship is
            an E-E-A-T problem as much as a freshness one — Pandit Ashok Sharma's
            15+ years is your credibility asset and it was invisible to Google.
            Competitors show published AND modified dates plus a named author.
          */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-dark-400">
            <span>
              By <span className="text-gold-400">{post.author}</span>, {BUSINESS.founder.jobTitle}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time>
            {post.updatedAt !== post.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={post.updatedAt}>Updated {formatDate(post.updatedAt)}</time>
              </>
            )}
          </div>
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
          {/*
            FIXED — this previously did:
              post.title.replace(' in Ujjain: Benefits, Vidhi, Cost, and Online Booking', '')
            a brittle string match against the old shared title suffix. Now that
            each post has its own title, that replace() would no longer match and
            the CTA would print the entire long headline. Using the service title
            is both correct and shorter.
          */}
          <h3 className="text-2xl font-heading font-semibold text-dark-50 mb-3">
            Ready to Book {service?.title ?? post.title}?
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

