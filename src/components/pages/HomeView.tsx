import React, { useState } from 'react';
import { CALCULATORS_DATA } from '../../data/calculatorGuides';
import { AdSlot } from '../ui/AdSlot';
import {
  TrendingUp,
  Landmark,
  Zap,
  Award,
  ShieldCheck,
  PiggyBank,
  ArrowRight,
  Sparkles,
  Gauge,
  Lock,
  Search,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  Scale,
  TrendingDown,
  Home,
  Briefcase,
  FileText,
  Layers,
  QrCode,
  Fuel,
  Wrench,
  Image as ImageIcon,
  Youtube,
  Sliders,
  Grid,
} from 'lucide-react';
import { motion } from 'motion/react';
import { AdSettings, BlogPost, ToolCategory } from '../../types';

interface HomeViewProps {
  adSettings: AdSettings;
  blogs?: BlogPost[];
  onNavigate: (path: string) => void;
  onOpenSitemap: () => void;
}

const CALC_METADATA: Record<
  string,
  {
    accentColor: string;
    gradient: string;
    borderHover: string;
    iconBg: string;
    iconHoverBg: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    btnHover: string;
    features: string[];
  }
> = {
  'sip-calculator': {
    accentColor: '#FF671F',
    gradient: 'from-[#FF671F] via-orange-400 to-amber-500',
    borderHover: 'hover:border-orange-300 hover:shadow-orange-500/10',
    iconBg: 'bg-orange-50 text-[#FF671F] border border-orange-100',
    iconHoverBg: 'group-hover:bg-[#FF671F] group-hover:text-white group-hover:border-[#FF671F]',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-700',
    badgeBorder: 'border-orange-200/80',
    btnHover: 'group-hover:bg-[#FF671F] group-hover:text-white group-hover:shadow-orange-500/25',
    features: ['Step-Up SIP', 'CAGR Yield', 'Crorepati Goal'],
  },
  'old-vs-new-tax': {
    accentColor: '#046A38',
    gradient: 'from-[#046A38] via-emerald-500 to-teal-600',
    borderHover: 'hover:border-emerald-300 hover:shadow-emerald-500/10',
    iconBg: 'bg-emerald-50 text-[#046A38] border border-emerald-100',
    iconHoverBg: 'group-hover:bg-[#046A38] group-hover:text-white group-hover:border-[#046A38]',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-200/80',
    btnHover: 'group-hover:bg-[#046A38] group-hover:text-white',
    features: ['Budget 2025/26', '₹75k Std Deduction', 'Sec 87A Zero Tax'],
  },
  'swp-calculator': {
    accentColor: '#06038D',
    gradient: 'from-[#06038D] via-blue-600 to-indigo-600',
    borderHover: 'hover:border-blue-300 hover:shadow-blue-500/10',
    iconBg: 'bg-blue-50 text-[#06038D] border border-blue-100',
    iconHoverBg: 'group-hover:bg-[#06038D] group-hover:text-white group-hover:border-[#06038D]',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    badgeBorder: 'border-blue-200/80',
    btnHover: 'group-hover:bg-[#06038D] group-hover:text-white',
    features: ['Retirement Cashflow', '4% Rule Model', 'Amortization Table'],
  },
  'home-loan-prepayment': {
    accentColor: '#D97706',
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    borderHover: 'hover:border-amber-300 hover:shadow-amber-500/10',
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    iconHoverBg: 'group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    badgeBorder: 'border-amber-200/80',
    btnHover: 'group-hover:bg-amber-500 group-hover:text-white',
    features: ['1 Extra EMI Strategy', 'Save ₹15L+ Interest', 'Debt-Free Timeline'],
  },
  'freelance-rate-calculator': {
    accentColor: '#7C3AED',
    gradient: 'from-purple-600 via-violet-500 to-indigo-500',
    borderHover: 'hover:border-purple-300 hover:shadow-purple-500/10',
    iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
    iconHoverBg: 'group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    badgeBorder: 'border-purple-200/80',
    btnHover: 'group-hover:bg-purple-600 group-hover:text-white',
    features: ['Sec 44ADA Factored', 'INR & USD Rates', 'Corporate CTC Parity'],
  },
  'gst-invoice-generator': {
    accentColor: '#059669',
    gradient: 'from-emerald-600 via-teal-500 to-green-500',
    borderHover: 'hover:border-emerald-300 hover:shadow-emerald-500/10',
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    iconHoverBg: 'group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-200/80',
    btnHover: 'group-hover:bg-emerald-600 group-hover:text-white',
    features: ['Vector PDF Download', 'CGST + SGST + IGST', 'HSN/SAC Compliant'],
  },
  'bio-caption-generator': {
    accentColor: '#8B5CF6',
    gradient: 'from-violet-600 via-fuchsia-500 to-pink-500',
    borderHover: 'hover:border-violet-300 hover:shadow-violet-500/10',
    iconBg: 'bg-violet-50 text-violet-600 border border-violet-100',
    iconHoverBg: 'group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600',
    badgeBg: 'bg-violet-50',
    badgeText: 'text-violet-700',
    badgeBorder: 'border-violet-200/80',
    btnHover: 'group-hover:bg-violet-600 group-hover:text-white',
    features: ['Instagram & LinkedIn', 'Viral Hooks & CTR', 'Optional Gemini AI'],
  },
  'youtube-title-tag-generator': {
    accentColor: '#EF4444',
    gradient: 'from-red-600 via-rose-500 to-orange-500',
    borderHover: 'hover:border-red-300 hover:shadow-red-500/10',
    iconBg: 'bg-red-50 text-red-600 border border-red-100',
    iconHoverBg: 'group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600',
    badgeBg: 'bg-red-50',
    badgeText: 'text-red-700',
    badgeBorder: 'border-red-200/80',
    btnHover: 'group-hover:bg-red-600 group-hover:text-white',
    features: ['Algorithm Ranked', 'Curiosity Gap Titles', '1-Click Tag Copy'],
  },
  'image-resizer': {
    accentColor: '#FF671F',
    gradient: 'from-[#FF671F] via-amber-500 to-orange-400',
    borderHover: 'hover:border-orange-300 hover:shadow-orange-500/10',
    iconBg: 'bg-orange-50 text-[#FF671F] border border-orange-100',
    iconHoverBg: 'group-hover:bg-[#FF671F] group-hover:text-white group-hover:border-[#FF671F]',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-700',
    badgeBorder: 'border-orange-200/80',
    btnHover: 'group-hover:bg-[#FF671F] group-hover:text-white',
    features: ['UPSC / SSC Presets', '20KB–50KB Target', '100% Client-Side'],
  },
  'pdf-tools': {
    accentColor: '#4F46E5',
    gradient: 'from-indigo-600 via-blue-500 to-cyan-500',
    borderHover: 'hover:border-indigo-300 hover:shadow-indigo-500/10',
    iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    iconHoverBg: 'group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-700',
    badgeBorder: 'border-indigo-200/80',
    btnHover: 'group-hover:bg-indigo-600 group-hover:text-white',
    features: ['Merge & Split', 'Images to PDF', 'Zero Cloud Upload'],
  },
  'qr-code-suite': {
    accentColor: '#0891B2',
    gradient: 'from-cyan-600 via-teal-500 to-emerald-500',
    borderHover: 'hover:border-cyan-300 hover:shadow-cyan-500/10',
    iconBg: 'bg-cyan-50 text-cyan-600 border border-cyan-100',
    iconHoverBg: 'group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600',
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-700',
    badgeBorder: 'border-cyan-200/80',
    btnHover: 'group-hover:bg-cyan-600 group-hover:text-white',
    features: ['UPI Payment QR', 'WiFi Connect', 'Vector Print PNG'],
  },
  'age-calculator': {
    accentColor: '#0D9488',
    gradient: 'from-teal-600 via-emerald-500 to-green-500',
    borderHover: 'hover:border-teal-300 hover:shadow-teal-500/10',
    iconBg: 'bg-teal-50 text-teal-600 border border-teal-100',
    iconHoverBg: 'group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700',
    badgeBorder: 'border-teal-200/80',
    btnHover: 'group-hover:bg-teal-600 group-hover:text-white',
    features: ['Years/Months/Days', 'Day of Birth', 'Birthday Countdown'],
  },
  'word-counter': {
    accentColor: '#475569',
    gradient: 'from-slate-700 via-slate-600 to-zinc-500',
    borderHover: 'hover:border-slate-300 hover:shadow-slate-500/10',
    iconBg: 'bg-slate-100 text-slate-700 border border-slate-200',
    iconHoverBg: 'group-hover:bg-slate-700 group-hover:text-white group-hover:border-slate-700',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
    badgeBorder: 'border-slate-200',
    btnHover: 'group-hover:bg-slate-700 group-hover:text-white',
    features: ['Reading Time', 'Keyword Density', 'Case Converter'],
  },
  'fuel-trip-calculator': {
    accentColor: '#EA580C',
    gradient: 'from-orange-600 via-amber-500 to-yellow-500',
    borderHover: 'hover:border-orange-300 hover:shadow-orange-500/10',
    iconBg: 'bg-orange-50 text-orange-600 border border-orange-100',
    iconHoverBg: 'group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-700',
    badgeBorder: 'border-orange-200/80',
    btnHover: 'group-hover:bg-orange-600 group-hover:text-white',
    features: ['Expense Split', 'Cost Per Kilometer', 'Round-Trip Toggle'],
  },
  'password-generator': {
    accentColor: '#E11D48',
    gradient: 'from-rose-600 via-red-500 to-orange-500',
    borderHover: 'hover:border-rose-300 hover:shadow-rose-500/10',
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
    iconHoverBg: 'group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    badgeBorder: 'border-rose-200/80',
    btnHover: 'group-hover:bg-rose-600 group-hover:text-white',
    features: ['118-Bit Entropy', 'WebCrypto API', 'No Server Transmission'],
  },
  'emi-calculator': {
    accentColor: '#046A38',
    gradient: 'from-[#046A38] via-emerald-500 to-teal-500',
    borderHover: 'hover:border-emerald-300 hover:shadow-emerald-500/10',
    iconBg: 'bg-emerald-50 text-[#046A38] border border-emerald-100',
    iconHoverBg: 'group-hover:bg-[#046A38] group-hover:text-white group-hover:border-[#046A38]',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-200/80',
    btnHover: 'group-hover:bg-[#046A38] group-hover:text-white group-hover:shadow-emerald-500/25',
    features: ['Amortization Schedule', 'Prepayment Saver', 'Reducing Balance'],
  },
  'compound-interest': {
    accentColor: '#D97706',
    gradient: 'from-amber-500 via-yellow-500 to-orange-400',
    borderHover: 'hover:border-amber-300 hover:shadow-amber-500/10',
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    iconHoverBg: 'group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    badgeBorder: 'border-amber-200/80',
    btnHover: 'group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-amber-500/25',
    features: ['Multi-Frequency', 'Rule of 72 Matrix', 'Exponential Curve'],
  },
  'gratuity-calculator': {
    accentColor: '#06038D',
    gradient: 'from-[#06038D] via-blue-600 to-indigo-600',
    borderHover: 'hover:border-blue-300 hover:shadow-blue-500/10',
    iconBg: 'bg-blue-50 text-[#06038D] border border-blue-100',
    iconHoverBg: 'group-hover:bg-[#06038D] group-hover:text-white group-hover:border-[#06038D]',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    badgeBorder: 'border-blue-200/80',
    btnHover: 'group-hover:bg-[#06038D] group-hover:text-white group-hover:shadow-blue-500/25',
    features: ['1972 Act (15/26)', '₹20L Tax Exemption', 'Service Rounding'],
  },
  'ppf-calculator': {
    accentColor: '#0D9488',
    gradient: 'from-teal-600 via-emerald-500 to-cyan-500',
    borderHover: 'hover:border-teal-300 hover:shadow-teal-500/10',
    iconBg: 'bg-teal-50 text-teal-700 border border-teal-100',
    iconHoverBg: 'group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700',
    badgeBorder: 'border-teal-200/80',
    btnHover: 'group-hover:bg-teal-600 group-hover:text-white group-hover:shadow-teal-500/25',
    features: ['7.1% Sovereign', 'E-E-E Tax Exemption', '15-Yr Schedule'],
  },
  'fd-rd-calculator': {
    accentColor: '#E11D48',
    gradient: 'from-rose-500 via-rose-400 to-orange-400',
    borderHover: 'hover:border-rose-300 hover:shadow-rose-500/10',
    iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
    iconHoverBg: 'group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    badgeBorder: 'border-rose-200/80',
    btnHover: 'group-hover:bg-rose-600 group-hover:text-white group-hover:shadow-rose-500/25',
    features: ['Quarterly Compounding', 'Senior Citizen +0.5%', 'FD vs RD Matrix'],
  },
};

export const HomeView: React.FC<HomeViewProps> = ({
  adSettings,
  blogs = [],
  onNavigate,
  onOpenSitemap,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const calculators = Object.values(CALCULATORS_DATA);

  const filteredCalcs = calculators.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' ||
      c.category === selectedCategory ||
      (selectedCategory === 'finance' && !c.category) ||
      (selectedCategory === 'media-tools' && c.category === 'utilities') ||
      (selectedCategory === 'text-tools' && c.id === 'word-counter') ||
      (selectedCategory === 'productivity' && c.category === 'daily');

    return matchesSearch && matchesCategory;
  });

  const getIcon = (id: string) => {
    const iconClass = 'w-6 h-6 text-current group-hover:text-white transition-colors duration-300';
    switch (id) {
      case 'passport-photo-maker':
        return <Grid className={iconClass} />;
      case 'hra-exemption':
        return <Home className={iconClass} />;
      case 'speech-to-text-and-back':
        return <Sparkles className={iconClass} />;
      case 'sip-calculator':
        return <TrendingUp className={iconClass} />;
      case 'old-vs-new-tax':
        return <Scale className={iconClass} />;
      case 'swp-calculator':
        return <TrendingDown className={iconClass} />;
      case 'home-loan-prepayment':
        return <Home className={iconClass} />;
      case 'freelance-rate-calculator':
        return <Briefcase className={iconClass} />;
      case 'gst-invoice-generator':
        return <FileText className={iconClass} />;
      case 'bio-caption-generator':
        return <Sparkles className={iconClass} />;
      case 'youtube-title-tag-generator':
        return <Youtube className={iconClass} />;
      case 'image-resizer':
        return <ImageIcon className={iconClass} />;
      case 'pdf-tools':
        return <Layers className={iconClass} />;
      case 'qr-code-suite':
        return <QrCode className={iconClass} />;
      case 'age-calculator':
        return <Calendar className={iconClass} />;
      case 'word-counter':
        return <FileText className={iconClass} />;
      case 'fuel-trip-calculator':
        return <Fuel className={iconClass} />;
      case 'password-generator':
        return <Lock className={iconClass} />;
      case 'emi-calculator':
        return <Landmark className={iconClass} />;
      case 'compound-interest':
        return <Zap className={iconClass} />;
      case 'gratuity-calculator':
        return <Award className={iconClass} />;
      case 'ppf-calculator':
        return <ShieldCheck className={iconClass} />;
      case 'fd-rd-calculator':
        return <PiggyBank className={iconClass} />;
      default:
        return <TrendingUp className={iconClass} />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Tools', count: calculators.length },
    { id: 'finance', label: 'Money & Tax', count: calculators.filter((c) => c.category === 'finance' || !c.category).length },
    { id: 'media-tools', label: 'Media & Photos', count: calculators.filter((c) => c.category === 'media-tools' || c.category === 'utilities').length },
    { id: 'text-tools', label: 'Text & Speech', count: calculators.filter((c) => c.category === 'text-tools' || c.id === 'word-counter').length },
    { id: 'dev-tools', label: 'Dev Tools', count: calculators.filter((c) => c.category === 'dev-tools').length },
    { id: 'productivity', label: 'Productivity', count: calculators.filter((c) => c.category === 'productivity' || c.category === 'daily').length },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/40 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF671F] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF671F] animate-pulse" />
            <span>High-Utility Indian Financial & Productivity Intelligence · 100% Free</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Comprehensive Suite for{' '}
            <span className="text-[#FF671F]">Finance, AI & Daily Utilities</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4 leading-relaxed">
            Free, zero-cost, client-side tools: Old vs New Tax Regime (Budget 2025/26), UPSC/SSC Image Resizer, Step-Up SIP, SWP, PDF Suite, and GST Invoicing.
          </p>

          {/* Quick Search Input */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tool (e.g. Tax Regime, Image Resizer, SWP, GST Invoice, QR)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white text-slate-900 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF671F] focus:border-transparent"
            />
          </div>

          {/* Key Metric Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-8 text-xs md:text-sm font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#046A38]" />
              <span>Zero Server Compute · Instant Speed</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#06038D]" />
              <span>100% Client-Side Privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF671F]" />
              <span>Verified Indian Statutory Standards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {/* Top Banner AdSlot */}
        <AdSlot
          slotId="home-top-banner"
          position="top-banner"
          title="Top Rated Financial Platforms & Demat Accounts"
          enabled={adSettings.topBanner}
        />

        {/* Core Tools Section */}
        <section id="calculators" className="my-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                All Utilities & Calculators
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                Browse our complete suite of client-side tools organized by category
              </p>
            </div>
            <button
              onClick={onOpenSitemap}
              className="text-xs font-bold text-[#06038D] hover:text-[#FF671F] flex items-center gap-1 transition cursor-pointer self-start md:self-auto"
            >
              <span>View SEO Sitemap & SSG Tree</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id
                      ? 'bg-slate-800 text-orange-400'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.04,
                },
              },
            }}
          >
            {filteredCalcs.map((calc) => {
              const meta = CALC_METADATA[calc.id] || {
                accentColor: '#FF671F',
                gradient: 'from-[#FF671F] to-amber-500',
                borderHover: 'hover:border-orange-300 hover:shadow-orange-500/10',
                iconBg: 'bg-orange-50 text-[#FF671F] border border-orange-100',
                iconHoverBg: 'group-hover:bg-[#FF671F] group-hover:text-white group-hover:border-[#FF671F]',
                badgeBg: 'bg-orange-50',
                badgeText: 'text-orange-700',
                badgeBorder: 'border-orange-200/80',
                btnHover: 'group-hover:bg-[#FF671F] group-hover:text-white',
                features: ['Instant Projections', '100% Free', 'Interactive UI'],
              };

              return (
                <motion.div
                  key={calc.id}
                  onClick={() => onNavigate(calc.path)}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  whileHover={{
                    y: -6,
                    transition: { type: 'spring', stiffness: 400, damping: 22 },
                  }}
                  whileTap={{ scale: 0.985 }}
                  className={`relative bg-white rounded-3xl p-6 border border-slate-200/90 ${meta.borderHover} hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden`}
                >
                  {/* Top Category Gradient Accent Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${meta.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div>
                    {/* Header Row: Icon & Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl ${meta.iconBg} ${meta.iconHoverBg} flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:rotate-6 group-hover:scale-105`}
                      >
                        {getIcon(calc.id)}
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${meta.badgeBg} ${meta.badgeText} border ${meta.badgeBorder} shadow-2xs transition-colors`}
                        >
                          {calc.badge}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#06038D] transition-colors leading-snug">
                      {calc.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {calc.description}
                    </p>

                    {/* Capability Feature Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {meta.features.map((feat) => (
                        <span
                          key={feat}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-50 text-slate-600 text-[11px] font-semibold border border-slate-100 group-hover:border-slate-200 transition-colors"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Zero API Cost</span>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-all duration-200 ${meta.btnHover}`}
                    >
                      <span>Open Tool</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Featured Editorial Article Highlights */}
        {blogs && blogs.length > 0 && (
          <section className="my-14 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-[#FF671F] text-xs font-bold">
                    Editorial Desk
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Updated Daily</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Financial Insights & AI Industry Analysis
                </h2>
              </div>
              <button
                onClick={() => onNavigate('/blog')}
                className="text-xs font-bold text-[#FF671F] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Read All Blogs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.slice(0, 2).map((post) => (
                <div
                  key={post.id}
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                  className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.publishedDate}</span>
                      <span>·</span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime} min read</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF671F] transition leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {post.metaDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#06038D] group-hover:text-[#FF671F]">
                    <span>Read Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
