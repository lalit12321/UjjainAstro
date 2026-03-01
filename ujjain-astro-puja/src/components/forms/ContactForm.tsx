'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

const WHATSAPP_NUMBER = '919753953401';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = [
      'New Enquiry',
      '',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Message: ${formData.message}`,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-dark-700 bg-dark-800/50 p-6 backdrop-blur-sm md:p-8">
      <h3 className="mb-6 text-xl font-heading font-semibold text-dark-50">
        Send us an Enquiry
      </h3>

      {submitted && (
        <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/20 p-4">
          <p className="text-center font-medium text-green-400">
            Enquiry details prepared. Please send the WhatsApp message that opened.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-dark-300">
            Full Name <span className="text-gold-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-dark-50 placeholder-dark-400 transition-all focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark-300">
            Email Address <span className="text-gold-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-dark-50 placeholder-dark-400 transition-all focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark-300">
            Phone Number <span className="text-gold-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 97539 53401"
            className="w-full rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-dark-50 placeholder-dark-400 transition-all focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark-300">
            Message <span className="text-gold-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            rows={4}
            className="w-full resize-none rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-dark-50 placeholder-dark-400 transition-all focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 py-4 font-semibold text-dark-950 shadow-lg shadow-gold-500/25 transition-all hover:from-gold-400 hover:to-gold-500"
        >
          Send Enquiry on WhatsApp
        </button>
      </form>
    </div>
  );
}

