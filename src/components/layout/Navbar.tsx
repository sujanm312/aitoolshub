import React, { useState } from 'react';
import { CALCULATORS_DATA } from '../../data/calculatorGuides';
import {
  Menu,
  X,
  Calculator,
  Shield,
  ChevronDown,
  TrendingUp,
  Landmark,
  Award,
  Zap,
  ShieldCheck,
  PiggyBank,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState<boolean>(false);

  const calculators = Object.values(CALCULATORS_DATA);

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setCalcDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F172A] border-b border-slate-800 text-white shadow-md">
      {/* Top subtle tricolor accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF671F] via-white to-[#046A38]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF671F] to-[#046A38] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition">
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
            <span className="text-xs text-slate-400 font-mono block">
              aitoolshub.co.in
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
          <button
            onClick={() => handleLinkClick('/')}
            className={`hover:text-white transition cursor-pointer ${
              currentPath === '/' ? 'text-orange-400 font-bold' : ''
            }`}
          >
            Home
          </button>

          {/* Calculators Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCalcDropdownOpen(!calcDropdownOpen)}
              className="flex items-center gap-1 hover:text-white transition cursor-pointer py-2"
            >
              <span>Calculators</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${calcDropdownOpen ? 'rotate-180 text-orange-400' : ''}`} />
            </button>

            {calcDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setCalcDropdownOpen(false)}
              >
                {calculators.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleLinkClick(c.path)}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-2.5 transition text-sm font-medium cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF671F]" />
                    <span>{c.shortName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleLinkClick('/blog')}
            className={`hover:text-white transition cursor-pointer flex items-center gap-1.5 ${
              currentPath.startsWith('/blog') ? 'text-orange-400 font-bold' : ''
            }`}
          >
            <span>Daily Blogs</span>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#FF671F] text-white font-bold uppercase tracking-wider">
              New
            </span>
          </button>

          <button
            onClick={() => handleLinkClick('/about')}
            className={`hover:text-white transition cursor-pointer ${
              currentPath === '/about' ? 'text-orange-400 font-bold' : ''
            }`}
          >
            About
          </button>

          <button
            onClick={() => handleLinkClick('/contact')}
            className={`hover:text-white transition cursor-pointer ${
              currentPath === '/contact' ? 'text-orange-400 font-bold' : ''
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => handleLinkClick('/disclaimer')}
            className={`hover:text-white transition cursor-pointer ${
              currentPath === '/disclaimer' ? 'text-orange-400 font-bold' : ''
            }`}
          >
            Disclaimer
          </button>
        </nav>

        {/* Right CTA Action */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('/calculators/sip-calculator')}
            className="px-4 py-2 rounded-xl text-sm font-bold text-white btn-3d-saffron flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Start SIP Plan</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Calculators
          </div>
          <div className="grid grid-cols-1 gap-2">
            {calculators.map((c) => (
              <button
                key={c.id}
                onClick={() => handleLinkClick(c.path)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  currentPath === c.path
                    ? 'bg-[#FF671F] text-white'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <span>{c.shortName}</span>
                <span className="text-[10px] opacity-75 font-normal">{c.badge}</span>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2 text-xs font-semibold">
            <button
              onClick={() => handleLinkClick('/blog')}
              className="text-left px-3 py-2 text-orange-400 font-bold flex items-center justify-between"
            >
              <span>Daily Blogs & Analysis</span>
              <span className="px-1.5 py-0.5 text-[9px] rounded-full bg-[#FF671F] text-white">NEW</span>
            </button>
            <button
              onClick={() => handleLinkClick('/about')}
              className="text-left px-3 py-2 text-slate-300 hover:text-white"
            >
              About aitoolshub
            </button>
            <button
              onClick={() => handleLinkClick('/contact')}
              className="text-left px-3 py-2 text-slate-300 hover:text-white"
            >
              Contact & Feedback
            </button>
            <button
              onClick={() => handleLinkClick('/disclaimer')}
              className="text-left px-3 py-2 text-slate-300 hover:text-white"
            >
              Financial & SEBI Disclaimer
            </button>
            <button
              onClick={() => handleLinkClick('/privacy-policy')}
              className="text-left px-3 py-2 text-slate-300 hover:text-white"
            >
              Privacy & AdSense Policy
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
