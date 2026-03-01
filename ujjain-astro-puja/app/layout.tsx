import type { Metadata } from "next";
import "./globals.css";
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import { LanguageProvider } from '../src/context/LanguageContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ujjainastro.vercel.app';
const ogImage = '/images/optimized/hero-mahakaleshwar-ujjain.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: '/manifest.webmanifest',
  title: "Ujjain Astro | NRI Online Puja Booking, Kaal Sarp & Mangal Dosh Puja Ujjain",
  description:
    "Book authentic Kaal Sarp Dosh Puja, Mangal Dosh Puja, Pitra Dosh Puja, Rudrabhishek, and Mahamrityunjay Jaap in Ujjain. NRI-friendly online puja, remote puja, live video puja, and offline temple puja available for devotees in India and abroad.",
  verification: {
  google: 'cWvp5NrIyXyqrONyhiyu_KMUup2QiVmDDo5prH6BPC4',
},
  alternates: {
    canonical: '/',
  },
  keywords: [
    "kaal sarp dosh puja ujjain",
    "mangal dosh puja ujjain",
    "pitra dosh puja ujjain",
    "rudrabhishek puja ujjain",
    "mahamrityunjay jaap ujjain",
    "navgraha shanti puja ujjain",
    "guru chandal dosh puja ujjain",
    "angarak dosh puja ujjain",
    "grahan dosh puja ujjain",
    "baglamukhi puja ujjain",
    "online puja booking ujjain",
    "remote puja ujjain",
    "live puja ujjain",
    "pandit booking in ujjain",
    "ujjain astrologer",
    "nri puja booking ujjain",
    "online puja for nri",
    "remote puja for abroad devotees",
    "live video puja for overseas devotees",
    "book puja from abroad",
    "nri kaal sarp dosh puja",
    "nri mangal dosh puja",
  ],
  openGraph: {
    title: "Ujjain Astro | NRI Online & Offline Puja Booking in Ujjain",
    description:
      "Trusted Ujjain pandits for online and offline dosh nivaran pujas with live video participation for devotees in India and abroad.",
    type: "website",
    url: '/',
    siteName: 'Ujjain Astro',
    locale: 'en_IN',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Ujjain Astro - Online and Offline Puja Booking',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ujjain Astro | NRI Online & Offline Puja Booking",
    description:
      "Book Kaal Sarp, Mangal, Pitra, Navgraha and more pujas in Ujjain with live online options for India and abroad.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
