import { Suspense } from 'react';
import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GrainOverlay from '@/components/GrainOverlay';
import CustomCursor from '@/components/CustomCursor';
import WhatsAppWidget from '@/components/WhatsAppWidget';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  // Replace with the real domain once deployed
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Sarkin Agogo Watches — The King of Timepieces',
    template: '%s | Sarkin Agogo Watches',
  },
  description:
    'Luxury watches and premium timepieces trusted by watch lovers nationwide. Abuja | Kano.',
  openGraph: {
    title: 'Sarkin Agogo Watches — The King of Timepieces',
    description:
      'Luxury watches and premium timepieces trusted by watch lovers nationwide. Abuja | Kano.',
    siteName: 'Sarkin Agogo Watches',
    locale: 'en_NG',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#0a0908',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <GrainOverlay />
        <CustomCursor />
      <Suspense
  fallback={
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-20 bg-gradient-to-b from-obsidian/80 to-transparent md:h-32"
    />
  }
>
  <Navbar />
</Suspense>

        <main id="main" className="min-h-screen">
          {children}
        </main>

        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}