import type { MetadataRoute } from 'next';
import { blogPosts } from '../src/data/blog';
import { SITE_URL } from '../src/lib/siteConfig';

/**
 * CHANGES:
 *  1. URLs now resolve through siteConfig → the www host, matching canonical.
 *  2. lastModified uses each post's real publishedAt/updatedAt instead of
 *     `new Date()`. Stamping "now" on every URL on every build is worse than
 *     no date at all — Google notices when lastmod moves but the content
 *     doesn't, and starts ignoring the signal entirely.
 *  3. changeFrequency lowered from 'weekly' to 'monthly' for posts. Claiming
 *     weekly updates you don't make is the same credibility problem.
 *  4. Priority now reflects commercial value: the six priced money pages get
 *     0.9, the rest 0.7.
 */

// The six services with published "starting from" prices are the primary
// money pages — they get the highest priority.
const PRIORITY_SLUGS = new Set([
  'kaal-sarp-dosh',
  'mangal-dosh',
  'navgraha-shanti',
  'pitra-dosh',
  'shani-dosh',
  'rahu-ketu-dosh',
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Uncomment as each page ships. All of these currently 404, and the nav
    // only offers in-page anchors (/#about, /#contact) instead of real routes:
    // { url: `${SITE_URL}/about`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // { url: `${SITE_URL}/puja`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: PRIORITY_SLUGS.has(post.slug) ? 0.9 : 0.7,
  }));

  return [...staticPages, ...blogPages];
}
