import React from 'react';
import { CALCULATORS_DATA } from '../../data/calculatorGuides';
import { ShieldCheck, Heart, ExternalLink, Mail, Globe, MapPin, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenSitemap: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSitemap }) => {
  const calculators = Object.values(CALCULATORS_DATA);

  return (
    <footer className="w-full bg-[#0F172A] text-slate-400 text-sm border-t border-slate-800 relative">
      {/* Top tricolor ribbon accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF671F] via-white to-[#046A38]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
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
              India's premier high-performance financial intelligence suite. Providing 100% transparent, client-side financial calculators, amortization tables, and comprehensive tax guides.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs sm:text-sm pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-500" />
                New Delhi · Bengaluru, India
              </span>
              <span>·</span>
              <a
                href="mailto:support@aitoolshub.co.in"
                className="hover:text-white transition flex items-center gap-1"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                support@aitoolshub.co.in
              </a>
            </div>
          </div>

          {/* Col 2: Calculators */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Financial Calculators
            </h4>
            <ul className="space-y-2.5">
              {calculators.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onNavigate(c.path)}
                    className="hover:text-white transition text-left cursor-pointer flex items-center gap-2 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF671F]" />
                    <span>{c.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Trust & Compliance */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Resources & Trust
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/blog')}
                  className="hover:text-white transition cursor-pointer text-orange-400 font-bold flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF671F]" />
                  <span>Daily Financial Blogs & Analysis</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition cursor-pointer"
                >
                  About Us & Editorial Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Contact & Support Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy-policy')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Privacy Policy (GDPR / CCPA)
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
              <li>
                <button
                  onClick={() => onNavigate('/disclaimer')}
                  className="hover:text-white transition cursor-pointer text-amber-400/90 font-semibold"
                >
                  Financial & SEBI Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSitemap}
                  className="hover:text-white transition cursor-pointer text-blue-400"
                >
                  Interactive Sitemap Tree
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition cursor-pointer text-emerald-400 flex items-center gap-1.5 font-medium"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>XML Sitemap (sitemap.xml)</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/admin')}
                  className="hover:text-white transition cursor-pointer text-slate-400 flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Admin Console</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer Banner (Mandatory SEBI Compliance) */}
        <div className="py-6 border-b border-slate-800/80 text-xs sm:text-sm leading-relaxed text-slate-400">
          <strong className="text-slate-300 block mb-1">
            STATUTORY FINANCIAL DISCLAIMER:
          </strong>
          aitoolshub (aitoolshub.co.in) is not a SEBI-registered Investment Adviser (RIA), Portfolio Manager, or broker. All calculations, compounding projections, and tax interpretations are generated for educational and preliminary budgeting simulation purposes only. Mutual fund investments are subject to market risks. Please consult a qualified Chartered Accountant (CA) or certified financial planner before making irreversible monetary commitments.
        </div>

        {/* Copyright & Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs sm:text-sm">
          <div>
            © {new Date().getFullYear()} aitoolshub (aitoolshub.co.in). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Investors
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
