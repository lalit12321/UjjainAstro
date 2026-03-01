'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'hi' | 'en';

const dictionary = {
  hi: {
    navHome: 'होम',
    navAbout: 'हमारे बारे में',
    navBlog: 'ब्लॉग',
    navTestimonials: 'अनुभव',
    navContact: 'संपर्क',
    navServices: 'सेवाएं',
    bookNow: 'अभी बुक करें',
    bookPujaNow: 'पूजा बुक करें',
    astrologyServices: 'ज्योतिष सेवाएं',
    badgeClients: '500+ संतुष्ट भक्त',
    badgeCertified: 'प्रमाणित ज्योतिषी',
    badgeUjjain: 'उज्जैन आधारित',
    badgeNri: 'NRI और Abroad फ्रेंडली',
    heroTitleLine1: 'काल सर्प दोष पूजा उज्जैन',
    heroTitleHighlight: 'विशेषज्ञ अनुष्ठान, संपूर्ण राहत',
    heroSub:
      'प्रमाणित पंडितों द्वारा महाकालेश्वर मंदिर पूजा। उज्जैन में ऑफलाइन बुक करें या भारत और विदेश से लाइव जुड़ें।',
    viewPackages: 'पैकेज देखें',
    whatsappText: 'WhatsApp NRI सहायता',
    whatsappLabel: 'NRI और Abroad बुकिंग के लिए WhatsApp पर चैट करें',
  },
  en: {
    navHome: 'Home',
    navAbout: 'About',
    navBlog: 'Blog',
    navTestimonials: 'Testimonials',
    navContact: 'Contact',
    navServices: 'Services',
    bookNow: 'Book Now',
    bookPujaNow: 'Book Pooja Now',
    astrologyServices: 'Astrology Services',
    badgeClients: '500+ Happy Clients',
    badgeCertified: 'Certified Astrologers',
    badgeUjjain: 'Ujjain Based',
    badgeNri: 'NRI and Abroad Friendly',
    heroTitleLine1: 'Kaal Sarp Dosh Puja Ujjain',
    heroTitleHighlight: 'Expert Rituals, Complete Relief',
    heroSub:
      'Authentic Mahakaleshwar temple puja by certified priests. Book offline in Ujjain or join live from India and abroad.',
    viewPackages: 'View Packages',
    whatsappText: 'WhatsApp NRI Help',
    whatsappLabel: 'Chat on WhatsApp for NRI and abroad booking',
  },
} as const;

type TranslationKey = keyof (typeof dictionary)['hi'];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('hi');

  useEffect(() => {
    const stored = window.localStorage.getItem('preferred_language');
    if (stored === 'hi' || stored === 'en') {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('preferred_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      t: (key: TranslationKey) => dictionary[language][key],
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
