import type { BlogPost, Service } from '../types';
import { services } from './services';

const formatInr = (amount: number): string => `Rs. ${amount.toLocaleString('en-IN')}`;

const createBlogPost = (service: Service): BlogPost => {
  const serviceName = service.title.replace(' Puja', '');

  return {
    id: service.id,
    slug: service.slug,
    serviceSlug: service.slug,
    title: `${service.title} in Ujjain: Benefits, Vidhi, Cost, and Online Booking`,
    excerpt: `${service.shortDescription}. Read complete procedure, who should do it, standard cost, and online or offline booking guidance.`,
    keywords: [
      `${serviceName.toLowerCase()} puja ujjain`,
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
        heading: `Online / Remote ${service.title} Option`,
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
        bullets: [
          `Standard Package: ${formatInr(service.price.standard)}`,
        ],
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
