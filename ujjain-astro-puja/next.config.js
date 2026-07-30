/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  /**
   * CANONICAL HOST — apex redirects to www, permanently.
   *
   * VERIFIED 30 Jul 2026:
   *   https://ujjainastro.com/     → 307 Temporary Redirect → www
   *   https://www.ujjainastro.com/ → 200 OK
   *
   * A 307 is explicitly TEMPORARY, which tells Google NOT to consolidate
   * ranking signals onto the destination. This makes it permanent (308).
   *
   * ⚠️ ALSO CHECK VERCEL. If that 307 comes from Vercel's own domain settings
   * rather than from Next.js, this block will not override it — the platform
   * redirect runs before your app code. Go to:
   *     Vercel → Project → Settings → Domains → ujjainastro.com
   * It should read "Redirect to www.ujjainastro.com" with 308/Permanent.
   * If it shows 307/Temporary, fix it there too.
   *
   * Note: Next.js `permanent: true` emits 308, not 301. That is correct —
   * 308 is the permanent redirect that preserves the request method, and
   * Google treats it the same as a 301 for ranking purposes.
   */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ujjainastro.com' }],
        destination: 'https://www.ujjainastro.com/:path*',
        permanent: true,
      },

      // ------------------------------------------------------------------
      // BLOG → SERVICE PAGE REDIRECTS (phase 2 of the audit roadmap)
      //
      // Every competitor ranking for these terms uses root-level service URLs
      // (/kaal-sarp-dosh-puja-ujjain/), not /blog/ URLs. Moving these is the
      // structural fix — but ONLY switch each line on AFTER the destination
      // page exists and is published. A 301 to a 404 is worse than no 301.
      // ------------------------------------------------------------------
      // { source: '/blog/mangal-dosh',        destination: '/mangal-dosh-puja-ujjain',        permanent: true },
      // { source: '/blog/kaal-sarp-dosh',     destination: '/kaal-sarp-dosh-puja-ujjain',     permanent: true },
      // { source: '/blog/navgraha-shanti',    destination: '/navgraha-shanti-puja-ujjain',    permanent: true },
      // { source: '/blog/pitra-dosh',         destination: '/pitra-dosh-puja-ujjain',         permanent: true },
      // { source: '/blog/shani-dosh',         destination: '/shani-dosh-puja-ujjain',         permanent: true },
      // { source: '/blog/rahu-ketu-dosh',     destination: '/rahu-ketu-dosh-puja-ujjain',     permanent: true },
      // { source: '/blog/guru-chandal-dosh',  destination: '/guru-chandal-dosh-puja-ujjain',  permanent: true },
      // { source: '/blog/nadi-dosh',          destination: '/nadi-dosh-puja-ujjain',          permanent: true },
      // { source: '/blog/grahan-dosh',        destination: '/grahan-dosh-puja-ujjain',        permanent: true },
      // { source: '/blog/chandra-dosh',       destination: '/chandra-dosh-puja-ujjain',       permanent: true },
      // { source: '/blog/surya-dosh',         destination: '/surya-dosh-puja-ujjain',         permanent: true },
      // { source: '/blog/kemdrum-dosh',       destination: '/kemdrum-dosh-puja-ujjain',       permanent: true },
      // { source: '/blog/vish-yog-dosh',      destination: '/vish-yog-dosh-puja-ujjain',      permanent: true },
      // { source: '/blog/shrapit-dosh',       destination: '/shrapit-dosh-puja-ujjain',       permanent: true },
      // { source: '/blog/angarak-dosh',       destination: '/angarak-dosh-puja-ujjain',       permanent: true },
      // { source: '/blog/putra-dosh',         destination: '/putra-dosh-puja-ujjain',         permanent: true },
      // { source: '/blog/online-remote-puja', destination: '/online-remote-puja',             permanent: true },
    ];
  },
};

module.exports = nextConfig;
