'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export default function TestimonialsPreview() {
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const setResponsiveCards = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1);
        return;
      }

      if (window.innerWidth < 1200) {
        setCardsPerSlide(2);
        return;
      }

      setCardsPerSlide(3);
    };

    setResponsiveCards();
    window.addEventListener('resize', setResponsiveCards);
    return () => window.removeEventListener('resize', setResponsiveCards);
  }, []);

  const slides = useMemo(() => {
    const chunks: typeof testimonials[] = [];
    for (let i = 0; i < testimonials.length; i += cardsPerSlide) {
      chunks.push(testimonials.slice(i, i + cardsPerSlide));
    }
    return chunks;
  }, [cardsPerSlide]);

  useEffect(() => {
    if (currentSlide > slides.length - 1) {
      setCurrentSlide(0);
    }
  }, [currentSlide, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-dark-900 scroll-mt-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-50 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Success stories from people who found relief through our astrological services
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full shrink-0">
                  <div
                    className="grid gap-6"
                    style={{ gridTemplateColumns: `repeat(${cardsPerSlide}, minmax(0, 1fr))` }}
                  >
                    {slide.map((testimonial) => (
                      <article
                        key={testimonial.id}
                        className="relative bg-dark-800/60 backdrop-blur-sm border border-dark-700/60 rounded-2xl p-6 transition-all duration-300 hover:border-gold-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/10"
                      >
                        <Quote className="absolute right-5 top-5 w-8 h-8 text-gold-500/20" />

                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating ? 'text-gold-500 fill-gold-500' : 'text-dark-600'
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-dark-300 mb-6 italic leading-relaxed line-clamp-4">
                          &quot;{testimonial.message}&quot;
                        </p>

                        <div className="border-t border-dark-700/80 pt-4">
                          <p className="text-dark-50 font-medium">{testimonial.name}</p>
                          <p className="text-dark-300 text-sm">{testimonial.location}</p>
                          <p className="text-gold-500 text-xs mt-1">{testimonial.service}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous testimonials"
                className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-5 h-10 w-10 rounded-full bg-dark-800/90 border border-dark-600 text-dark-200 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mx-auto" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next testimonials"
                className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-5 h-10 w-10 rounded-full bg-dark-800/90 border border-dark-600 text-dark-200 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <ChevronRight className="w-5 h-5 mx-auto" />
              </button>
            </>
          )}
        </div>

        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to testimonial slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  currentSlide === index ? 'w-8 bg-gold-500' : 'w-2.5 bg-dark-600 hover:bg-dark-500'
                }`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/#contact"
            className="inline-flex items-center px-6 py-3 bg-dark-800 text-dark-50 font-semibold rounded-xl border border-dark-600 hover:bg-dark-700 transition-all"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
