'use client';

import { Phone } from 'lucide-react';

export default function FloatingCall() {
  return (
    <a
      href="tel:+919753953401"
      aria-label="Call now"
      className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-dark-950 font-semibold shadow-lg shadow-gold-900/30 hover:bg-gold-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
    >
      <Phone className="h-5 w-5" />
      <span>Call Now</span>
    </a>
  );
}

