 
'use client';

import { useState } from 'react';
import { faqs } from '../../data/faq';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-dark-900 scroll-mt-24">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          <p className="section-subtitle mx-auto">
            Find answers to common questions about our services
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id}
              className="border-b border-dark-700 last:border-0"
            >
              <button
                type="button"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${faq.id}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-4 flex items-center justify-between text-left"
              >
                <span className="text-dark-50 font-medium pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gold-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-dark-400 shrink-0" />
                )}
              </button>
              <div 
                id={`faq-answer-${faq.id}`}
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-72 pb-4' : 'max-h-0'
                )}
              >
                <p className="text-dark-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-dark-300 mb-4">Still have questions?</p>
          <a 
            href="/#contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 font-semibold rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
