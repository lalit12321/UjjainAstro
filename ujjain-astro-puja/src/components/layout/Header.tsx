 'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Phone } from 'lucide-react';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../context/LanguageContext';
import { services } from '../../data/services';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('navHome'), href: '/#home' },
    { name: t('navAbout'), href: '/#about' },
    { name: t('navBlog'), href: '/blog' },
    { name: t('navTestimonials'), href: '/#testimonials' },
    { name: t('navContact'), href: '/#contact' },
  ];

  const serviceLinks = services.map((service) => ({
    name: service.title,
    href: `/blog/${service.slug}`,
  }));

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-950/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link href="/" aria-label="Go to homepage" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                <span className="text-dark-950 font-heading font-bold text-xl">ॐ</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-dark-50 font-heading font-bold text-xl">Ujjain<span className="text-gold-500">Astro</span></span>
                <p className="text-dark-300 text-xs">{t('astrologyServices')}</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="text-dark-300 hover:text-gold-400 font-medium transition-colors">{item.name}</Link>
              ))}
              
              <div className="relative group" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                <button
                  type="button"
                  aria-label="Open services menu"
                  className="flex items-center space-x-1 text-dark-300 hover:text-gold-400 font-medium"
                >
                  <span>{t('navServices')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`absolute top-full left-0 mt-2 w-64 max-h-80 overflow-y-auto bg-dark-800 rounded-xl shadow-xl border border-dark-700 transition-all ${isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  {serviceLinks.map((service) => (
                    <Link key={service.name} href={service.href} className="block px-4 py-3 text-dark-300 hover:text-gold-400 hover:bg-dark-700/50">{service.name}</Link>
                  ))}
                </div>
              </div>

              <LanguageSwitcher />
              <Link href="/#contact" className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-semibold rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all">{t('bookNow')}</Link>
            </nav>

            <div className="flex items-center space-x-3">
              <div className="lg:hidden">
                <LanguageSwitcher />
              </div>
              <a href="tel:+919753953401" className="hidden 2xl:flex items-center space-x-2 text-dark-300 hover:text-gold-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">+91 97539 53401</span>
              </a>
              <button
                type="button"
                aria-label="Open mobile menu"
                className="lg:hidden p-2 text-dark-300 hover:text-gold-400"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navigation={navigation} services={serviceLinks} />
    </>
  );
}


