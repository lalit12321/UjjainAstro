 
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { services } from '../../data/services';
import { serviceImageBySlug } from '../../data/serviceImages';
import Card from '../ui/Card';

export default function ServicesOverview() {
  const featuredServices = services.slice(0, 6);

  return (
    <section id="services" className="py-16 md:py-24 bg-dark-900 scroll-mt-24">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Our Services</h2>
          <p className="section-subtitle mx-auto">
            Expert astrological puja services in Ujjain with both offline temple rituals and online remote participation
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <Card key={service.id} hover className="group flex flex-col h-full overflow-hidden">
              <div className={`relative mb-5 h-36 rounded-xl border border-dark-700/60 bg-gradient-to-br ${index % 3 === 0 ? 'from-gold-500/25 via-amber-500/20 to-dark-900' : index % 3 === 1 ? 'from-orange-500/25 via-gold-500/20 to-dark-900' : 'from-yellow-500/25 via-gold-500/20 to-dark-900'} overflow-hidden`}>
                {serviceImageBySlug[service.slug] ? (
                  <Image
                    src={serviceImageBySlug[service.slug]}
                    alt={service.title}
                    fill
                    className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute left-4 bottom-3 text-4xl">{service.icon}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/75 via-dark-950/25 to-transparent" />
                <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-gold-400/30 blur-2xl transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-heading font-semibold text-dark-50 mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-dark-400 mb-6 grow">
                {service.shortDescription}
              </p>

              {/* Price */}
              <div className="mb-4">
                <span className="text-dark-300 text-sm">Starting from </span>
                <span className="text-gold-500 font-semibold">₹{service.price.standard.toLocaleString()}</span>
              </div>

              {/* CTA */}
              <Link 
                href={`/blog/${service.slug}`}
                className="inline-flex items-center justify-center w-full py-3 bg-dark-700 text-dark-50 font-medium rounded-xl hover:bg-dark-600 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                Read Puja Details
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Card>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-dark-800 text-gold-400 font-semibold rounded-xl border border-dark-600 hover:bg-dark-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            View All Services
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
