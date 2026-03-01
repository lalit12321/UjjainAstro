'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Check, Landmark, Globe, Video } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { heroImage } from '../../data/serviceImages';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden scroll-mt-24 md:min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
        <Image
          src={heroImage}
          alt="Mahakaleshwar temple spiritual puja banner"
          fill
          priority
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom pb-24 pt-24 text-center md:pt-32 lg:pt-36">
        <div className="max-w-4xl mx-auto">
          {/* Trust badges */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:flex-nowrap md:overflow-x-auto md:justify-start lg:justify-center no-scrollbar">
            <div className="shrink-0 flex items-center space-x-2 rounded-full border border-dark-700 bg-dark-800/50 px-3 py-2">
              <Star className="w-4 h-4 text-gold-500" />
              <span className="text-dark-300 text-xs sm:text-sm">{t('badgeClients')}</span>
            </div>
            <div className="shrink-0 flex items-center space-x-2 rounded-full border border-dark-700 bg-dark-800/50 px-3 py-2">
              <Check className="w-4 h-4 text-gold-500" />
              <span className="text-dark-300 text-xs sm:text-sm">{t('badgeCertified')}</span>
            </div>
            <div className="shrink-0 flex items-center space-x-2 rounded-full border border-dark-700 bg-dark-800/50 px-3 py-2">
              <Landmark className="w-4 h-4 text-gold-500" />
              <span className="text-dark-300 text-xs sm:text-sm">{t('badgeUjjain')}</span>
            </div>
            <div className="shrink-0 flex items-center space-x-2 rounded-full border border-dark-700 bg-dark-800/50 px-3 py-2">
              <Globe className="w-4 h-4 text-gold-500" />
              <span className="text-dark-300 text-xs sm:text-sm">{t('badgeNri')}</span>
            </div>
            <div className="shrink-0 flex items-center space-x-2 rounded-full border border-dark-700 bg-dark-800/50 px-3 py-2">
              <Video className="w-4 h-4 text-gold-500" />
              <span className="text-dark-300 text-xs sm:text-sm">Remote / Online Puja</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-5 break-words px-1 text-3xl font-heading font-bold leading-tight text-dark-50 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
            {t('heroTitleLine1')}
            <br />
            <span className="text-gradient">{t('heroTitleHighlight')}</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-2xl px-1 text-base text-dark-300 sm:text-lg md:text-xl">
            {t('heroSub')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#contact"
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-4 font-semibold text-dark-950 shadow-lg shadow-gold-500/25 transition-all hover:from-gold-400 hover:to-gold-500 sm:w-auto"
            >
              {t('bookPujaNow')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/#services"
              className="inline-flex w-full items-center justify-center rounded-xl border border-dark-600 bg-dark-800 px-8 py-4 font-semibold text-dark-50 transition-all hover:bg-dark-700 sm:w-auto"
            >
              {t('viewPackages')}
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-3 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-gold-500">15+</div>
              <div className="text-dark-400 text-sm mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-gold-500">5000+</div>
              <div className="text-dark-400 text-sm mt-1">Poojas Performed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-gold-500">98%</div>
              <div className="text-dark-400 text-sm mt-1">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce md:block">
        <div className="w-6 h-10 border-2 border-dark-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gold-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
