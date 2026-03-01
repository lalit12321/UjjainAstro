 
'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { X, Phone, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
  services: { name: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, navigation, services }: MobileMenuProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-dark-900 border-l border-dark-700">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-dark-700">
            <Link href="/" aria-label="Go to homepage" className="flex items-center space-x-3" onClick={onClose}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                <span className="text-dark-950 font-heading font-bold text-xl">ॐ</span>
              </div>
              <span className="text-dark-50 font-heading font-bold text-lg">Ujjain<span className="text-gold-500">Astro</span></span>
            </Link>
            <button type="button" aria-label="Close mobile menu" onClick={onClose} className="p-2 text-dark-300 hover:text-gold-400"><X className="w-6 h-6" /></button>
          </div>

          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} onClick={onClose} className="block py-2 text-dark-300 hover:text-gold-400 font-medium">{item.name}</Link>
                </li>
              ))}
              <li className="pt-4">
                <p className="text-dark-300 text-sm font-medium uppercase tracking-wider mb-3">{t('navServices')}</p>
                <ul className="space-y-3">
                  {services.map((service) => (
                    <li key={service.name}>
                      <Link href={service.href} onClick={onClose} className="flex items-center justify-between py-2 text-dark-300 hover:text-gold-400">
                        <span>{service.name}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>

          <div className="p-6 border-t border-dark-700 space-y-4">
            <a href="tel:+919753953401" className="flex items-center space-x-3 text-dark-300 hover:text-gold-400">
              <Phone className="w-5 h-5" />
              <span>+91 97539 53401</span>
            </a>
            <Link href="/#contact" onClick={onClose} className="block w-full py-3 text-center bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-semibold rounded-xl">{t('bookPujaNow')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


