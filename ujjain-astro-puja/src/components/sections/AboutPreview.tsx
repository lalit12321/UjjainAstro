import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function AboutPreview() {
  const features = [
    '15+ Years of Vedic Astrology Experience',
    'Certified and Temple-Authorized Priests',
    '5000+ Successful Poojas Performed',
    'Authentic Traditional Rituals',
    'Personalized Attention to Each Client',
    'Live Streaming Available for NRIs',
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-dark-950 scroll-mt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gold-500/20 to-dark-800 border border-dark-700">
              <Image
                src="/images/icons/assets/about.png"
                alt="Chief astrologer portrait"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-dark-950/10 to-transparent" />
              <div className="absolute left-6 bottom-6">
                <p className="text-dark-50 font-medium">Pandit Ashok Sharma</p>
                <p className="text-gold-400 text-sm">Chief Astrologer</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-500/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold-500/10 rounded-full blur-xl" />
          </div>

          <div>
            <h2 className="section-title mb-4">About Your Astrologer</h2>
            <p className="text-dark-400 mb-6">
              With over 15 years of experience in Vedic astrology and traditional Hindu rituals,
              we have helped thousands of clients overcome astrological challenges and find
              peace and prosperity in their lives.
            </p>
            <p className="text-dark-400 mb-8">
              All pujas are performed at the sacred Mahakaleshwar Temple complex in Ujjain,
              following authentic Vedic traditions with pure intentions and proper rituals.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-gold-500 shrink-0" />
                  <span className="text-dark-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/#contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-semibold rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all"
            >
              Know More About Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
