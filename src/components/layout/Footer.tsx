import React from 'react';
import { ShieldCheck, Heart, Mail, Globe, MapPin, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenSitemap: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSitemap }) => {
  return (
    <footer className="w-full bg-[#0F172A] text-slate-400 text-sm border-t border-slate-800 relative">
      {/* Top tricolor ribbon accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF671F] via-white to-[#046A38]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF671F] to-[#046A38] p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center font-black text-sm text-white">
                  AH
                </div>
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">
                aitoolshub<span className="text-[#FF671F]">.co.in</span>
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              India's comprehensive high-performance utility & financial intelligence platform. 100% free, client-side private utilities, verified tax calculators, and editorial guides.
            </p>

            <div className="flex flex-col gap-2 text-slate-400 text-xs sm:text-sm pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-500" />
                New Delhi · Bengaluru, India
              </span>
              <a
                href="mailto:support@aitoolshub.co.in"
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                support@aitoolshub.co.in
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => onNavigate('/admin')}
                className="hover:text-white transition text-xs text-slate-500 flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Console</span>
              </button>
              <span>·</span>
              <button
                onClick={onOpenSitemap}
                className="hover:text-white transition text-xs text-blue-400 cursor-pointer"
              >
                Sitemap Inspector
              </button>
            </div>
          </div>

          {/* Col 1: Money & Tax */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF671F]" />
              <span>Money & Tax</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/finance/old-vs-new-tax')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Income Tax (Old vs New)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/calculators/sip-calculator')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  SIP Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/finance/swp-calculator')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  SWP Pension Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/finance/home-loan-prepayment')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Home Loan Prepayment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/finance/freelance-rate-calculator')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Freelance Tax & Rate
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/finance/gst-invoice-generator')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  GST Invoice Maker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/calculators/emi-calculator')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Loan EMI Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Quick Utilities */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#046A38]" />
              <span>Quick Utilities</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/utilities/image-resizer')}
                  className="hover:text-white transition text-left cursor-pointer text-orange-400 font-semibold"
                >
                  Govt Photo & Sign Resizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/utilities/pdf-tools')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  PDF Merge & Split
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/utilities/qr-code-suite')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  UPI & QR Code Maker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/ai-tools/bio-caption-generator')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Social Bio & Captions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/ai-tools/youtube-title-tag-generator')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  YouTube Title & Tags
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/daily/word-counter')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Word Counter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/daily/password-generator')}
                  className="hover:text-white transition text-left cursor-pointer"
                >
                  Password Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Information */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#06038D]" />
              <span>Company & Info</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/blog')}
                  className="hover:text-white transition cursor-pointer text-slate-300 font-semibold"
                >
                  Blog & Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms-of-service')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer Banner (Mandatory SEBI Compliance) */}
        <div className="py-6 border-b border-slate-800/80 text-xs leading-relaxed text-slate-400">
          <strong className="text-slate-300 block mb-1">
            STATUTORY FINANCIAL DISCLAIMER:
          </strong>
          aitoolshub (aitoolshub.co.in) is not a SEBI-registered Investment Adviser (RIA), Portfolio Manager, or broker. All calculations, compounding projections, and tax interpretations are generated for educational and preliminary budgeting simulation purposes only. Mutual fund investments are subject to market risks. Please consult a qualified Chartered Accountant (CA) or certified financial planner before making irreversible monetary commitments.
        </div>

        {/* Copyright & Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div>
            © {new Date().getFullYear()} aitoolshub (aitoolshub.co.in). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Creators & Investors
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
