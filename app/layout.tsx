interface Metadata {
  metadataBase?: URL;
  title?: string | { default: string; template: string };
  description?: string;
  keywords?: string[];
  authors?: { name: string; url?: string }[];
  creator?: string;
  publisher?: string;
  openGraph?: Record<string, any>;
  twitter?: Record<string, any>;
  robots?: Record<string, any>;
}

import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://aitoolshub.co.in'),
  title: {
    default: 'aitoolshub | Indian Financial Calculators & Wealth Planning Tools',
    template: '%s | aitoolshub.co.in',
  },
  description:
    'Free high-precision financial calculators for Indian investors: SIP, Home Loan EMI, PPF, Gratuity, Compound Interest, and FD/RD with mathematical formulas and expert guides.',
  keywords: [
    'SIP Calculator',
    'EMI Calculator',
    'Gratuity Calculator',
    'PPF Calculator',
    'Compound Interest Calculator',
    'FD RD Calculator',
    'Income Tax 80C',
    'Mutual Funds India',
    'Financial Planning',
  ],
  authors: [{ name: 'aitoolshub Research Team', url: 'https://aitoolshub.co.in/about' }],
  creator: 'aitoolshub',
  publisher: 'aitoolshub Media India',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aitoolshub.co.in',
    siteName: 'aitoolshub',
    title: 'aitoolshub | Financial Calculators & Wealth Planning',
    description:
      'Empowering Indian households with lightning-fast, verified financial calculators and deep analytical guides.',
    images: [
      {
        url: 'https://aitoolshub.co.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'aitoolshub Financial Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'aitoolshub | Financial Calculators & Wealth Planning',
    description: 'Precision calculators for SIP, EMI, PPF, Gratuity & FD/RD in India.',
    images: ['https://aitoolshub.co.in/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* AdSense Verification Tag Placeholder */}
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased font-sans flex flex-col selection:bg-orange-100 selection:text-orange-900">
        {/* Indian Tricolor Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FF671F] via-white to-[#046A38] sticky top-0 z-50 shadow-xs" />

        {/* Global Navigation Header */}
        <header className="sticky top-1.5 z-40 w-full bg-[#0F172A] border-b border-slate-800 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF671F] to-[#046A38] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center font-black text-xs text-white">
                  AH
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-orange-300 transition">
                    aitoolshub
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#FF671F]" />
                </div>
                <span className="text-[11px] text-slate-400 font-mono block">
                  aitoolshub.co.in
                </span>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
              <a href="/" className="hover:text-white transition">Home</a>
              <a href="/calculators/sip-calculator/" className="hover:text-white text-orange-400 transition">SIP Calculator</a>
              <a href="/calculators/emi-calculator/" className="hover:text-white transition">EMI Calculator</a>
              <a href="/calculators/compound-interest/" className="hover:text-white transition">Compound Interest</a>
              <a href="/calculators/gratuity-calculator/" className="hover:text-white transition">Gratuity</a>
              <a href="/calculators/ppf-calculator/" className="hover:text-white transition">PPF</a>
              <a href="/calculators/fd-rd-calculator/" className="hover:text-white transition">FD / RD</a>
              <a href="/about/" className="hover:text-white transition">About</a>
              <a href="/contact/" className="hover:text-white transition">Contact</a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="/calculators/sip-calculator/"
                className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-bold text-white btn-3d-saffron items-center gap-1.5 shadow-md"
              >
                Plan Investment
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Global Footer */}
        <footer className="bg-[#0F172A] text-slate-400 border-t border-slate-800 text-sm mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl text-white tracking-tight">aitoolshub</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF671F] text-white">INDIA</span>
                </div>
                <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                  High-performance financial utilities engineered for Indian retail investors, salaried professionals, and wealth creators. Formulas strictly audited against RBI, SEBI, and CBDT frameworks.
                </p>
                <div className="text-xs text-slate-500 font-mono">
                  Domain: aitoolshub.co.in | Support: support@aitoolshub.co.in
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Calculators</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="/calculators/sip-calculator/" className="hover:text-white transition">SIP Calculator</a></li>
                  <li><a href="/calculators/emi-calculator/" className="hover:text-white transition">Loan EMI Calculator</a></li>
                  <li><a href="/calculators/compound-interest/" className="hover:text-white transition">Compound Interest</a></li>
                  <li><a href="/calculators/gratuity-calculator/" className="hover:text-white transition">Gratuity Calculator</a></li>
                  <li><a href="/calculators/ppf-calculator/" className="hover:text-white transition">PPF Calculator</a></li>
                  <li><a href="/calculators/fd-rd-calculator/" className="hover:text-white transition">FD & RD Calculator</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Trust & Legal</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="/about/" className="hover:text-white transition">About aitoolshub</a></li>
                  <li><a href="/contact/" className="hover:text-white transition">Contact & Support</a></li>
                  <li><a href="/privacy-policy/" className="hover:text-white transition">Privacy & AdSense Policy</a></li>
                  <li><a href="/terms-of-service/" className="hover:text-white transition">Terms of Service</a></li>
                  <li><a href="/disclaimer/" className="hover:text-white transition">SEBI Disclaimer</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
              <p>© {new Date().getFullYear()} aitoolshub (aitoolshub.co.in). All rights reserved. Mathematical calculations provided strictly for illustrative purposes.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
