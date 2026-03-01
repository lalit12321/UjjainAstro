import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { services } from '../../data/services';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: services.slice(0, 8).map((service) => ({
      name: service.title,
      href: `/blog/${service.slug}`,
    })),
    quickLinks: [
      { name: 'About', href: '/#about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Testimonials', href: '/#testimonials' },
      { name: 'Contact', href: '/#contact' },
      { name: 'Book Now', href: '/#contact' },
    ],
  };

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Go to homepage" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                <span className="text-dark-950 font-heading font-bold text-2xl">ॐ</span>
              </div>
              <div>
                <span className="text-dark-50 font-heading font-bold text-xl">Ujjain<span className="text-gold-500">Astro</span></span>
                <p className="text-dark-300 text-sm">Astrology Services</p>
              </div>
            </Link>
            <p className="text-dark-300 mb-6">Expert astrological puja services in Ujjain. Authentic Vedic rituals performed by certified priests.</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="p-2 bg-dark-800 rounded-lg text-dark-300 hover:text-gold-400"><Facebook className="w-5 h-5" /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram profile" className="p-2 bg-dark-800 rounded-lg text-dark-300 hover:text-gold-400"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel" className="p-2 bg-dark-800 rounded-lg text-dark-300 hover:text-gold-400"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-dark-50 font-heading font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-4 md:columns-2 md:gap-8">
              {footerLinks.services.map((link) => (
                <li key={link.name} className="break-inside-avoid mb-4">
                  <Link href={link.href} className="text-dark-300 hover:text-gold-400">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-dark-50 font-heading font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}><Link href={link.href} className="text-dark-300 hover:text-gold-400">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-dark-50 font-heading font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-500 mt-0.5" />
                <span className="text-dark-300">Ujjain</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-500" />
                <a href="tel:+919753953401" className="text-dark-300 hover:text-gold-400">+91 97539 53401</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-500" />
                <a href="mailto:ujjain.astro.services@gmail.com" className="text-dark-300 hover:text-gold-400">ujjain.astro.services@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-800 mt-12 pt-8 text-center">
          <p className="text-dark-300">(c) {currentYear} Ujjain Astrology Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}



