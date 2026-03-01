'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '../forms/ContactForm';
import BookingForm from '../forms/BookingForm';

export default function ContactSection() {
  const [activeForm, setActiveForm] = useState<'enquiry' | 'booking'>('enquiry');

  return (
    <section id="contact" className="scroll-mt-24 bg-dark-950 py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-heading font-bold text-dark-50 md:text-4xl">
              Get in Touch
            </h2>
            <p className="mb-8 text-dark-300">
              Have questions? We&apos;re here to help. Reach out to us through any of the
              following channels or fill out the form.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10">
                  <Phone className="h-5 w-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-medium text-dark-50">Phone</h3>
                  <a href="tel:+919753953401" className="text-dark-300 transition-colors hover:text-gold-400">
                    +91 97539 53401
                  </a>
                  <p className="text-sm text-dark-300">Mon - Sat, 9am - 8pm</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10">
                  <MessageCircle className="h-5 w-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-medium text-dark-50">WhatsApp</h3>
                  <a href="https://wa.me/919753953401" className="text-dark-300 transition-colors hover:text-gold-400">
                    +91 97539 53401
                  </a>
                  <p className="text-sm text-dark-300">Quick responses on WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10">
                  <Mail className="h-5 w-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-medium text-dark-50">Email</h3>
                  <a href="mailto:ujjain.astro.services@gmail.com" className="text-dark-300 transition-colors hover:text-gold-400">
                    ujjain.astro.services@gmail.com
                  </a>
                  <p className="text-sm text-dark-300">We&apos;ll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10">
                  <MapPin className="h-5 w-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-medium text-dark-50">Location</h3>
                  <p className="text-dark-300">Ujjain</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10">
                  <Clock className="h-5 w-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-medium text-dark-50">Puja Timings</h3>
                  <p className="text-dark-300">
                    Morning: 6:00 AM - 12:00 PM
                    <br />
                    Evening: 4:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setActiveForm('enquiry')}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  activeForm === 'enquiry'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950'
                    : 'border border-dark-600 bg-dark-800 text-dark-200 hover:border-gold-500/50'
                }`}
              >
                Enquiry Form
              </button>
              <button
                type="button"
                onClick={() => setActiveForm('booking')}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  activeForm === 'booking'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950'
                    : 'border border-dark-600 bg-dark-800 text-dark-200 hover:border-gold-500/50'
                }`}
              >
                Booking Form
              </button>
            </div>

            {activeForm === 'enquiry' ? <ContactForm /> : <BookingForm />}
          </div>
        </div>
      </div>
    </section>
  );
}

