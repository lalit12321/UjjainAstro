import type { BlogPost, Service } from '../types';
import { services } from './services';

/**
 * ============================================================================
 * WHAT WAS WRONG HERE, AND WHAT IS FIXED
 * ============================================================================
 *
 * BUG 1 — THE VISIBLE ONE (fixed below).
 *   `heading: \`Online / Remote ${service.title} Option\``
 *   For the service titled "Online Remote Puja" this rendered as:
 *       "Online / Remote Online Remote Puja Option"
 *   That is a live, visible mail-merge artifact on /blog/online-remote-puja —
 *   the template variable substituted into its own string. It is exactly the
 *   fingerprint Google's helpful-content systems look for.
 *
 * BUG 2 — IDENTICAL TITLES ON ALL 17 POSTS (fixed below).
 *   Every post was titled "{X} Puja in Ujjain: Benefits, Vidhi, Cost, and
 *   Online Booking". Seventeen near-identical titles under one directory reads
 *   as programmatically scaled content, and the pages cannibalise each other.
 *   POST_TITLES now gives each page its own angle, with a safe fallback.
 *
 * BUG 3 — NO DATES, NO AUTHOR (fixed below).
 *   BlogPost had no date fields at all, so there was no freshness signal and
 *   no way to emit Article schema. Competitors show published AND modified
 *   dates plus an author byline. POST_DATES supplies them.
 *
 * ============================================================================
 * WHAT IS *NOT* FIXED HERE — AND CANNOT BE FIXED IN CODE
 * ============================================================================
 *
 * All 17 posts are still generated from one function: `services.map(createBlogPost)`.
 * They run roughly 420–580 words with an identical 8-heading skeleton. The
 * competitors outranking you run 2,200–4,500 words with pricing tiers, muhurat
 * date tables, temple detail, dress code and per-page FAQs.
 *
 * A template cannot produce that. The six priced services need hand-written
 * content. The recommended path (see the audit roadmap) is to move them to
 * root-level /kaal-sarp-dosh-puja-ujjain/ style pages as MDX or CMS entries,
 * and keep this generator only for the long-tail doshes where thin coverage
 * still beats no coverage.
 */

const formatInr = (amount: number): string => `Rs. ${amount.toLocaleString('en-IN')}`;

/**
 * Per-post titles. Each one has a distinct angle instead of the shared
 * "Benefits, Vidhi, Cost, and Online Booking" suffix.
 *
 * Kept under ~60 characters where possible so they do not truncate in search
 * results. Any slug not listed here falls back to the old pattern, so adding
 * a new service never breaks the build.
 */
const POST_TITLES: Record<string, string> = {
  'kaal-sarp-dosh': 'Kaal Sarp Dosh Puja in Ujjain: Cost, Vidhi & Booking',
  'mangal-dosh': 'Mangal Dosh Puja at Mangalnath Ujjain: Cost & Muhurat',
  'navgraha-shanti': 'Navgraha Shanti Puja Ujjain: All 9 Grahas, Cost & Vidhi',
  'pitra-dosh': 'Pitra Dosh Puja in Ujjain: Tarpan, Pind Daan & Cost',
  'shani-dosh': 'Shani Dosh Puja in Ujjain: Sade Sati Remedy & Cost',
  'rahu-ketu-dosh': 'Rahu Ketu Dosh Puja in Ujjain: Shanti Vidhi & Cost',
  'guru-chandal-dosh': 'Guru Chandal Dosh Puja in Ujjain: Remedy, Vidhi & Cost',
  'nadi-dosh': 'Nadi Dosh Nivaran Puja in Ujjain: Marriage Remedy & Cost',
  'grahan-dosh': 'Grahan Dosh Puja in Ujjain: Eclipse Remedy & Cost',
  'chandra-dosh': 'Chandra Dosh Puja in Ujjain: Moon Shanti Vidhi & Cost',
  'surya-dosh': 'Surya Dosh Puja in Ujjain: Sun Shanti Vidhi & Cost',
  'kemdrum-dosh': 'Kemdrum Dosh Puja in Ujjain: Vidhi, Benefits & Cost',
  'vish-yog-dosh': 'Vish Yog Dosh Puja in Ujjain: Shanti Vidhi & Cost',
  'shrapit-dosh': 'Shrapit Dosh Puja in Ujjain: Karmic Remedy & Cost',
  'angarak-dosh': 'Angarak Dosh Puja in Ujjain: Mangal Remedy & Cost',
  'putra-dosh': 'Putra Dosh Puja in Ujjain: Santan Prapti Vidhi & Cost',
  'online-remote-puja': 'Online Remote Puja from Ujjain: Live Video Booking Guide',
};

/**
 * Publish and last-updated dates, ISO format.
 *
 * ⚠️ EDIT THESE TO THE REAL DATES. They currently all read 2026-07-30 because
 * the posts carried no date at all before this change and there was nothing to
 * recover. Two rules that matter:
 *   • Never bump `updated` on a build. Only change it when you actually edit
 *     the content. Google notices when lastmod moves but the text doesn't, and
 *     starts ignoring the signal.
 *   • Stagger the `published` dates realistically. Seventeen posts sharing one
 *     publish date is another scaled-content tell.
 */
const POST_DATES: Record<string, { published: string; updated?: string }> = {
  'kaal-sarp-dosh': { published: '2026-07-30' },
  'mangal-dosh': { published: '2026-07-30' },
  'navgraha-shanti': { published: '2026-07-30' },
  'pitra-dosh': { published: '2026-07-30' },
  'shani-dosh': { published: '2026-07-30' },
  'rahu-ketu-dosh': { published: '2026-07-30' },
  'guru-chandal-dosh': { published: '2026-07-30' },
  'nadi-dosh': { published: '2026-07-30' },
  'grahan-dosh': { published: '2026-07-30' },
  'chandra-dosh': { published: '2026-07-30' },
  'surya-dosh': { published: '2026-07-30' },
  'kemdrum-dosh': { published: '2026-07-30' },
  'vish-yog-dosh': { published: '2026-07-30' },
  'shrapit-dosh': { published: '2026-07-30' },
  'angarak-dosh': { published: '2026-07-30' },
  'putra-dosh': { published: '2026-07-30' },
  'online-remote-puja': { published: '2026-07-30' },
};

const DEFAULT_PUBLISHED = '2026-07-30';

/**
 * BUG 1 FIX — build the remote-participation heading without letting the
 * service title collide with the words already in the heading.
 *
 * "Online Remote Puja" is not a dosh, so it gets its own heading instead of
 * being run through the dosh template.
 */
const remoteSectionHeading = (service: Service): string =>
  service.slug === 'online-remote-puja'
    ? 'How Remote Puja Works, Step by Step'
    : `Online / Remote ${service.title} Option`;

const createBlogPost = (service: Service): BlogPost => {
  const serviceName = service.title.replace(' Puja', '');
  const dates = POST_DATES[service.slug] || { published: DEFAULT_PUBLISHED };

  return {
    id: service.id,
    slug: service.slug,
    serviceSlug: service.slug,
    // BUG 2 FIX — distinct title per post, with a safe fallback.
    title:
      POST_TITLES[service.slug] ||
      `${service.title} in Ujjain: Benefits, Vidhi, Cost, and Online Booking`,
    excerpt: `${service.shortDescription}. Read complete procedure, who should do it, standard cost, and online or offline booking guidance.`,
    // BUG 3 FIX — dates now exist, so Article schema and a visible byline are possible.
    publishedAt: dates.published,
    updatedAt: dates.updated || dates.published,
    author: 'Pandit Ashok Sharma',
    keywords: [
      `${serviceName.toLowerCase()} puja ujjain`,
      `${serviceName.toLowerCase()} puja cost in ujjain`,
      `${serviceName.toLowerCase()} online puja`,
      `remote ${serviceName.toLowerCase()} puja`,
      `${serviceName.toLowerCase()} dosh nivaran`,
      `book ${serviceName.toLowerCase()} puja`,
      `nri ${serviceName.toLowerCase()} puja`,
      `${serviceName.toLowerCase()} puja from abroad`,
      `live video ${serviceName.toLowerCase()} puja`,
    ],
    sections: [
      {
        heading: `What Is ${service.title}?`,
        paragraphs: [
          service.fullDescription,
          `${service.title} is performed with Vedic sankalpa and mantra vidhi by experienced pandits in Ujjain to reduce obstacles and improve overall life stability.`,
        ],
      },
      {
        heading: `Common Signs You May Need ${service.title}`,
        paragraphs: [
          `If you are facing repeated problems connected with this dosh, this puja can be considered after kundli analysis.`,
        ],
        bullets: service.effects,
      },
      {
        heading: `Key Benefits of ${service.title}`,
        paragraphs: [
          `With proper sankalpa and disciplined ritual steps, devotees generally seek the following outcomes.`,
        ],
        bullets: service.benefits,
      },
      {
        heading: `${service.title} Vidhi: Step-by-Step`,
        paragraphs: [
          `The exact sequence may vary by pandit and sankalpa details, but the standard process includes the following steps.`,
        ],
        bullets: service.included,
      },
      {
        // BUG 1 FIX applied here.
        heading: remoteSectionHeading(service),
        paragraphs: [
          `If you cannot travel to Ujjain, this puja can be completed remotely with your name-gotra sankalpa and live video participation.`,
          `You can attend from home, receive puja photos/video, and complete dakshina digitally with transparent communication.`,
        ],
      },
      {
        heading: `${service.title} Cost in Ujjain`,
        paragraphs: [
          `Cost depends on ritual scale, samagri, and duration. Standard package is available for booking.`,
        ],
        bullets: [`Standard Package: ${formatInr(service.price.standard)}`],
      },
      {
        heading: `How to Book This Puja`,
        paragraphs: [
          `Share your birth details and preferred date through the booking form.`,
          `Our team confirms muhurat and whether you want offline temple attendance or online remote puja.`,
        ],
      },
    ],
  };
};

export const blogPosts: BlogPost[] = services.map(createBlogPost);

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};
