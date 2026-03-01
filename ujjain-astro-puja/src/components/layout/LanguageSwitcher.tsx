'use client';

import { useLanguage } from '../../context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-lg border border-dark-700 bg-dark-900/80 p-1">
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
          language === 'hi' ? 'bg-gold-500 text-dark-950' : 'text-dark-300 hover:text-gold-400'
        }`}
        aria-label="Switch to Hindi"
      >
        हिं
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
          language === 'en' ? 'bg-gold-500 text-dark-950' : 'text-dark-300 hover:text-gold-400'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
