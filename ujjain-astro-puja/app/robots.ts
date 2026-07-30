import type { MetadataRoute } from 'next';
import { SITE_URL } from '../src/lib/siteConfig';

/**
 * CHANGED: the sitemap URL now resolves through siteConfig, so it points at
 * the www host that actually returns 200. It previously fell back to
 * 'https://ujjainastro.com' — which 307-redirects away. A sitemap declaration
 * should always point at a URL that responds directly.
 *
 * NOTE what is deliberately NOT here: any Disallow for the vercel.app preview
 * domain. Blocking crawl would prevent Google from ever seeing the noindex
 * header set in middleware.ts, and the preview would stay stuck in the index.
 * Let it be crawled so it can be de-indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
