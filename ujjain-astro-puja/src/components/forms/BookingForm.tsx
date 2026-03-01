'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { services } from '../../data/services';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const WHATSAPP_NUMBER = '919753953401';

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    service: '',
    preferredDate: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const getPackagePrice = () => {
    const service = services.find((s) => s.slug === formData.service);
    if (!service) return 0;
    return service.price.standard;
  };

  const selectedService = services.find((s) => s.slug === formData.service);

  const validateStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        return 'Please fill all personal details.';
      }
      return '';
    }

    if (step === 2) {
      if (!formData.dateOfBirth || !formData.timeOfBirth || !formData.placeOfBirth) {
        return 'Please fill all birth details.';
      }
      return '';
    }

    if (step === 3) {
      if (!formData.service || !formData.preferredDate) {
        return 'Please select service and preferred date.';
      }
      return '';
    }

    return '';
  };

  const nextStep = () => {
    const stepError = validateStep();
    if (stepError) {
      setError(stepError);
      return;
    }

    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setError('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedService) {
      setError('Please select a valid service before confirming booking.');
      return;
    }

    const text = [
      'New Puja Booking Request',
      '',
      `Name: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `DOB: ${formData.dateOfBirth}`,
      `TOB: ${formData.timeOfBirth}`,
      `Place of Birth: ${formData.placeOfBirth}`,
      `Service: ${selectedService.title}`,
      'Package: Standard',
      `Preferred Date: ${formData.preferredDate}`,
      `Message: ${formData.message || 'NA'}`,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setError('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {submitted && (
        <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/20 p-4 text-green-300">
          Booking details prepared successfully. Please send the WhatsApp message that opened.
        </div>
      )}

      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all ${
                step >= s ? 'bg-gold-500 text-dark-950' : 'bg-dark-700 text-dark-400'
              }`}
            >
              {step > s ? <Check className="h-4 w-4" /> : s}
            </div>
          ))}
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-dark-700">
          <div
            className="h-full bg-gold-500 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
        <div className="mt-2 hidden justify-between text-sm text-dark-400 sm:flex">
          <span>Personal</span>
          <span>Birth</span>
          <span>Service</span>
          <span>Confirm</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-dark-700 bg-dark-800/50 p-6 backdrop-blur-sm md:p-8">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="mb-4 text-xl font-heading font-semibold text-dark-50">Personal Information</h3>
            <div>
              <label className="mb-2 block text-sm font-medium text-dark-300">
                Full Name <span className="text-gold-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
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
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="mb-4 text-xl font-heading font-semibold text-dark-50">Birth Details</h3>
            <div>
              <label className="mb-2 block text-sm font-medium text-dark-300">
                Date of Birth <span className="text-gold-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-dark-50 transition-all focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-dark-300">
                Time of Birth <span className="text-gold-500">*</span>
              </label>
              <input
                type="time"
                name="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={handleChange}
                className="w-full rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-dark-50 transition-all focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-dark-300">
                Place of Birth <span className="text-gold-500">*</span>
              </label>
              <input
                type="text"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                placeholder="City, State"
                className="w-full rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-dark-50 placeholder-dark-400 transition-all focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="mb-4 text-xl font-heading font-semibold text-dark-50">Select Service</h3>
            <div>
              <label className="mb-2 block text-sm font-medium text-dark-300">
                Select Service <span className="text-gold-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-dark-50 transition-all focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                required
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-dark-300">
                Preferred Date <span className="text-gold-500">*</span>
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-dark-50 transition-all focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-dark-300">Additional Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any special requirements or questions?"
                rows={3}
                className="w-full resize-none rounded-xl border border-dark-600 bg-dark-800 px-4 py-3 text-dark-50 placeholder-dark-400 transition-all focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              ></textarea>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="mb-4 text-xl font-heading font-semibold text-dark-50">Confirm Your Booking</h3>
            <div className="space-y-3 rounded-xl bg-dark-800 p-4">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                <span className="text-dark-400">Name:</span>
                <span className="break-all text-dark-50">{formData.fullName}</span>
              </div>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                <span className="text-dark-400">Email:</span>
                <span className="break-all text-dark-50">{formData.email}</span>
              </div>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                <span className="text-dark-400">Phone:</span>
                <span className="break-all text-dark-50">{formData.phone}</span>
              </div>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                <span className="text-dark-400">Service:</span>
                <span className="break-all text-dark-50">{selectedService?.title}</span>
              </div>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                <span className="text-dark-400">Package:</span>
                <span className="text-dark-50">Standard</span>
              </div>
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                <span className="text-dark-400">Date:</span>
                <span className="text-dark-50">{formData.preferredDate}</span>
              </div>
              <div className="flex flex-col justify-between gap-2 border-t border-dark-600 pt-3 sm:flex-row sm:items-center">
                <span className="font-medium text-dark-400">Total:</span>
                <span className="text-xl font-bold text-gold-500">Rs {getPackagePrice().toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input type="checkbox" id="terms" className="mt-1" required />
              <label htmlFor="terms" className="text-sm text-dark-400">
                I agree to the Terms and Conditions and Privacy Policy
              </label>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center justify-center rounded-xl bg-dark-700 px-6 py-3 font-medium text-dark-50 transition-all hover:bg-dark-600"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 font-semibold text-dark-950 transition-all hover:from-gold-400 hover:to-gold-500 sm:w-auto"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-3 font-semibold text-dark-950 shadow-lg shadow-gold-500/25 transition-all hover:from-gold-400 hover:to-gold-500 sm:w-auto"
            >
              Confirm Booking on WhatsApp
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

