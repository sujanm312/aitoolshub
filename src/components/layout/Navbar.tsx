import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  Sparkles,
  Wrench,
  Calendar,
  ShieldCheck,
  Zap,
  ArrowRight,
  Calculator,
} from 'lucide-react';
import { CALCULATORS_DATA } from '../../data/calculatorGuides';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<boolean>(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string>('finance');

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  };

  const navCategories = [
    {
      id: 'finance',
      title: 'Money & Tax',
      subtitle: 'Tax, loans & savings',
      icon: TrendingUp,
      color: '#FF671F',
      items: [
        { name: 'Income Tax Calculator', path: '/finance/old-vs-new-tax', badge: 'New' },
        { name: 'HRA Exemption Calculator', path: '/finance/hra-exemption', badge: 'Rule 2A' },
        { name: 'Lumpsum Calculator', path: '/finance/lumpsum-calculator', badge: 'CAGR' },
        { name: 'SIP Calculator', path: '/calculators/sip-calculator', badge: 'Popular' },
        { name: 'SWP Pension Calculator', path: '/finance/swp-calculator' },
        { name: 'Home Loan Prepayment', path: '/finance/home-loan-prepayment' },
        { name: 'Freelancer Tax (44ADA)', path: '/finance/freelance-rate-calculator' },
        { name: 'GST Invoice Maker', path: '/finance/gst-invoice-generator', badge: 'PDF' },
        { name: 'Loan EMI Calculator', path: '/calculators/emi-calculator' },
        { name: 'Gratuity Calculator', path: '/calculators/gratuity-calculator' },
      ],
    },
    {
      id: 'ai-tools',
      title: 'Social Media',
      subtitle: 'Captions & video tags',
      icon: Sparkles,
      color: '#06038D',
      items: [
        { name: 'Bio & Caption Generator', path: '/ai-tools/bio-caption-generator', badge: 'AI' },
        { name: 'YouTube Title & Tags', path: '/ai-tools/youtube-title-tag-generator', badge: 'SEO' },
      ],
    },
    {
      id: 'utilities',
      title: 'File Utilities',
      subtitle: 'Photos, PDFs & QR',
      icon: Wrench,
      color: '#046A38',
      items: [
        { name: 'Passport Photo Maker (A4)', path: '/media-tools/passport-photo-maker', badge: '35x45mm' },
        { name: 'Image Converter (WebP)', path: '/media-tools/image-to-webp-png', badge: 'Lossless' },
        { name: 'Govt Photo Resizer', path: '/utilities/image-resizer', badge: '20-50 KB' },
        { name: 'PDF Merge & Split', path: '/utilities/pdf-tools', badge: 'Fast' },
        { name: 'UPI & QR Code Maker', path: '/utilities/qr-code-suite', badge: 'Free' },
      ],
    },
    {
      id: 'daily',
      title: 'Everyday Tools',
      subtitle: 'Quick calculators',
      icon: Calendar,
      color: '#E11D48',
      items: [
        { name: 'Speech-to-Text & Reader', path: '/text-tools/speech-to-text-and-back', badge: 'Audio' },
        { name: 'Case Converter', path: '/text-tools/case-converter' },
        { name: 'Pomodoro Focus Timer', path: '/productivity/pomodoro-timer', badge: 'Deep Work' },
        { name: 'Water Intake Calculator', path: '/productivity/water-intake-calculator' },
        { name: 'Age Calculator', path: '/daily/age-calculator' },
        { name: 'Word Counter', path: '/daily/word-counter' },
        { name: 'Fuel Cost Calculator', path: '/daily/fuel-trip-calculator' },
        { name: 'Password Generator', path: '/daily/password-generator', badge: 'Safe' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F172A] border-b border-slate-800 text-white shadow-lg">
      {/* Indian Tricolor subtle accent stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF671F] via-white to-[#046A38]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
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
            <span className="text-[10px] text-slate-400 font-mono block">
              aitoolshub.co.in
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-300">
          <button
            onClick={() => handleLinkClick('/')}
            className={`hover:text-white transition cursor-pointer ${
              currentPath === '/' ? 'text-[#FF671F] font-bold' : ''
            }`}
          >
            Home
          </button>

          {/* Mega Menu Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className="flex items-center gap-1.5 hover:text-white transition cursor-pointer py-5"
            >
              <span>All Tools</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  megaMenuOpen ? 'rotate-180 text-[#FF671F]' : ''
                }`}
              />
            </button>

            {megaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[880px] bg-[#0F172A] border border-slate-700/80 rounded-2xl p-6 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="grid grid-cols-4 gap-6">
                  {navCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div key={cat.id} className="space-y-3">
                        <div className="border-b border-slate-800 pb-2">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                            <Icon className="w-4 h-4" style={{ color: cat.color }} />
                            <span>{cat.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {cat.subtitle}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {cat.items.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleLinkClick(item.path)}
                              className="w-full text-left p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white text-xs font-medium transition flex items-center justify-between group cursor-pointer"
                            >
                              <span className="truncate group-hover:text-orange-300">
                                {item.name}
                              </span>
                              {item.badge && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-orange-400 border border-slate-700 shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleLinkClick('/finance/old-vs-new-tax')}
            className={`hover:text-white transition cursor-pointer flex items-center gap-1.5 ${
              currentPath === '/finance/old-vs-new-tax' ? 'text-[#FF671F] font-bold' : ''
            }`}
          >
            <span>Income Tax</span>
            <span className="px-1.5 py-0.2 text-[9px] rounded-full bg-emerald-700 text-white font-bold">
              New
            </span>
          </button>

          <button
            onClick={() => handleLinkClick('/utilities/image-resizer')}
            className={`hover:text-white transition cursor-pointer ${
              currentPath === '/utilities/image-resizer' ? 'text-[#FF671F] font-bold' : ''
            }`}
          >
            Photo Resizer
          </button>

          <button
            onClick={() => handleLinkClick('/blog')}
            className={`hover:text-white transition cursor-pointer flex items-center gap-1.5 ${
              currentPath.startsWith('/blog') ? 'text-[#FF671F] font-bold' : ''
            }`}
          >
            <span>Blog</span>
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('/calculators/sip-calculator')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white btn-3d-saffron flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>SIP Calculator</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          {/* Quick Category Buttons */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveMobileCategory(cat.id)}
                className={`p-2 rounded-xl text-xs font-bold text-left border transition ${
                  activeMobileCategory === cat.id
                    ? 'border-[#FF671F] bg-orange-500/10 text-white'
                    : 'border-slate-800 text-slate-400 bg-slate-950/40'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Active Category Items */}
          <div className="space-y-1.5">
            {navCategories
              .find((c) => c.id === activeMobileCategory)
              ?.items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLinkClick(item.path)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                    currentPath === item.path
                      ? 'bg-[#FF671F] text-white'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-orange-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
          </div>

          {/* Secondary Links */}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2 text-xs font-semibold">
            <button
              onClick={() => handleLinkClick('/blog')}
              className="text-left px-3 py-2 text-slate-200 font-bold flex items-center justify-between"
            >
              <span>Blog & Guides</span>
              <span className="px-1.5 py-0.5 text-[9px] rounded-full bg-[#FF671F] text-white">NEW</span>
            </button>
            <button
              onClick={() => handleLinkClick('/about')}
              className="text-left px-3 py-2 text-slate-300 hover:text-white"
            >
              About Us
            </button>
            <button
              onClick={() => handleLinkClick('/contact')}
              className="text-left px-3 py-2 text-slate-300 hover:text-white"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleLinkClick('/privacy-policy')}
              className="text-left px-3 py-2 text-slate-300 hover:text-white"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
