/**
 * middleware.ts — THE MOST IMPORTANT FILE IN THIS CHANGESET
 * ----------------------------------------------------------
 * PROBLEM (verified in Google, 30 Jul 2026):
 *   https://ujjain-astro.vercel.app/ serves a full, crawlable copy of the site
 *   with `index, follow`. Google has indexed THAT copy. Searching
 *   `"Ujjain Astro" NRI puja booking` returns the vercel.app homepage at #1 and
 *   vercel.app/blog/surya-dosh at #2 — ujjainastro.com appears nowhere.
 *   `site:ujjainastro.com` returns zero pages.
 *
 * FIX:
 *   Send `X-Robots-Tag: noindex, nofollow` on every response NOT served from
 *   the production domain. Covers *.vercel.app, every branch preview
 *   (ujjain-astro-git-*.vercel.app), and per-deployment URLs.
 *
 * WHY A HEADER AND NOT robots.txt:
 *   robots.txt says "don't crawl". A page Google cannot crawl but has links to
 *   can STILL appear in results as a bare URL. To remove a page you must let
 *   Google crawl it and read a noindex directive. So do NOT add a Disallow for
 *   the preview domain — that would actively prevent this fix from working.
 *
 * AFTER DEPLOYING:
 *   1. Vercel → Settings → Deployment Protection → enable for Preview.
 *   2. Search Console → Removals → temporary removal for the prefix
 *      https://ujjain-astro.vercel.app/
 *   Expect 1–3 weeks for the index to flip over to the real domain.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Only these hosts may be indexed. Everything else gets noindex. */
const PRODUCTION_HOSTS = ['www.ujjainastro.com', 'ujjainastro.com'];

export function middleware(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0];
  const response = NextResponse.next();

  if (!PRODUCTION_HOSTS.includes(host)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }

  return response;
}

export const config = {
  // Page requests only — skip static assets and image optimisation so we
  // don't burn edge invocations on files that don't need the header.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf|txt|xml)$).*)',
  ],
};
