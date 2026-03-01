'use client';

import { useLanguage } from '../../context/LanguageContext';

export default function FloatingWhatsApp() {
  const { t } = useLanguage();

  return (
    <a
      href="https://wa.me/919753953401"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsappLabel')}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center rounded-full bg-green-500 p-3 text-white shadow-lg shadow-green-900/30 animate-bounce hover:bg-green-600 hover:animate-none hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 fill-current"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.54 0 .23 5.3.23 11.82c0 2.08.54 4.1 1.57 5.9L0 24l6.5-1.7a11.8 11.8 0 0 0 5.56 1.42h.01c6.52 0 11.82-5.3 11.82-11.82 0-3.16-1.23-6.13-3.37-8.42Zm-8.46 18.24h-.01a9.8 9.8 0 0 1-4.98-1.36l-.36-.21-3.86 1.01 1.03-3.76-.23-.39a9.78 9.78 0 0 1-1.5-5.19c0-5.41 4.4-9.81 9.82-9.81 2.62 0 5.08 1.02 6.93 2.88a9.72 9.72 0 0 1 2.87 6.93c0 5.41-4.4 9.81-9.81 9.81Zm5.39-7.36c-.29-.14-1.72-.85-1.99-.95-.26-.1-.45-.14-.64.15-.19.29-.73.95-.89 1.15-.16.19-.33.22-.62.07-.29-.14-1.21-.45-2.3-1.43-.85-.75-1.43-1.68-1.6-1.97-.16-.29-.02-.44.12-.58.13-.12.29-.33.43-.49.14-.16.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.13-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-.99.97-.99 2.36 0 1.39 1.01 2.73 1.15 2.92.14.19 1.98 3.03 4.8 4.25.67.29 1.2.46 1.61.59.68.22 1.3.19 1.79.12.55-.08 1.72-.7 1.96-1.38.24-.67.24-1.25.17-1.38-.07-.12-.26-.19-.55-.33Z" />
      </svg>
    </a>
  );
}

