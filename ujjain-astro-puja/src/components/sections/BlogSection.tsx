import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import { blogPosts } from '../../data/blog';
import { serviceImageBySlug } from '../../data/serviceImages';

export default function BlogSection() {
  const cardBackgrounds = [
    'from-amber-500/30 via-gold-500/20 to-dark-900',
    'from-orange-500/30 via-gold-500/20 to-dark-900',
    'from-yellow-500/25 via-gold-500/20 to-dark-900',
    'from-emerald-500/25 via-gold-500/20 to-dark-900',
  ];

  return (
    <section id="blog" className="py-16 md:py-24 bg-dark-950 scroll-mt-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Puja Blog Guides</h2>
          <p className="section-subtitle mx-auto">
            Detailed guide for every puja service including benefits, vidhi, cost, and online remote booking
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
              <h3 className="text-xl font-heading font-semibold text-dark-50 mb-3">
                {post.title}
              </h3>
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

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-dark-800 text-gold-400 font-semibold rounded-xl border border-dark-600 hover:bg-dark-700 transition-all"
          >
            View All Blog Guides
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
