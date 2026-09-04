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
} from 'lucide-react';
import { motion } from 'motion/react';
import { AdSettings, BlogPost } from '../../types';

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

  const calculators = Object.values(CALCULATORS_DATA);

  const filteredCalcs = calculators.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getIcon = (id: string) => {
    switch (id) {
      case 'sip-calculator':
        return <TrendingUp className="w-6 h-6 text-[#FF671F]" />;
      case 'emi-calculator':
        return <Landmark className="w-6 h-6 text-[#046A38]" />;
      case 'compound-interest':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'gratuity-calculator':
        return <Award className="w-6 h-6 text-[#06038D]" />;
      case 'ppf-calculator':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'fd-rd-calculator':
        return <PiggyBank className="w-6 h-6 text-orange-600" />;
      default:
        return <TrendingUp className="w-6 h-6 text-[#FF671F]" />;
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/40 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF671F] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF671F] animate-pulse" />
            <span>High-Performance Indian Financial Intelligence · FY 2024–2025</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Calculate Your Wealth with{' '}
            <span className="text-[#FF671F]">Algorithmic</span> Precision.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
            Free, lightning-fast financial calculators for SIPs, Home Loan EMIs, Gratuity, and Sovereign PPF. Grounded in verified Indian financial regulations and statutory rules.
          </p>

          {/* Quick Search Input */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search calculator (e.g. SIP, Home Loan EMI, Gratuity, PPF)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white text-slate-900 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF671F] focus:border-transparent"
            />
          </div>

          {/* Key Metric Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-8 text-xs md:text-sm font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#046A38]" />
              <span>100% Client-Side Speed</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#06038D]" />
              <span>Zero Data Logging</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF671F]" />
              <span>Google AdSense Compliant</span>
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

        {/* 6 Core Calculators Grid */}
        <section id="calculators" className="my-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Core Financial Calculators
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                Select an instrument to view real-time projections, schedules, and in-depth guides
              </p>
            </div>
            <button
              onClick={onOpenSitemap}
              className="text-xs font-bold text-[#06038D] hover:text-[#FF671F] flex items-center gap-1 transition cursor-pointer"
            >
              <span>View SEO Sitemap & SSG Tree</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
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
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {filteredCalcs.map((calc, idx) => {
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
                features: ['Instant Projections', 'SEBI Compliant', 'Visual Charts'],
              };

              return (
                <motion.div
                  key={calc.id}
                  onClick={() => onNavigate(calc.path)}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  whileHover={{
                    y: -8,
                    transition: { type: 'spring', stiffness: 400, damping: 22 },
                  }}
                  whileTap={{ scale: 0.985 }}
                  className={`relative bg-white rounded-3xl p-6 border border-slate-200/90 ${meta.borderHover} hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden`}
                >
                  {/* Top Ambient Glow / Highlight on Hover */}
                  <div
                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500 pointer-events-none`}
                  />

                  {/* Top Category Gradient Accent Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${meta.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div>
                    {/* Header Row: Icon & Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-13 h-13 rounded-2xl ${meta.iconBg} ${meta.iconHoverBg} flex items-center justify-center transition-all duration-300 shadow-xs group-hover:rotate-6 group-hover:scale-110`}
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
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#06038D] transition-colors leading-snug">
                      {calc.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {calc.description}
                    </p>

                    {/* Capability Feature Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {meta.features.map((feat) => (
                        <span
                          key={feat}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-100 group-hover:border-slate-200 transition-colors"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action / CTA Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div
                      className={`inline-flex items-center gap-1.5 text-sm font-bold text-[#FF671F] px-3.5 py-1.5 rounded-xl bg-orange-50/60 ${meta.btnHover} transition-all duration-300 shadow-2xs`}
                    >
                      <span>Launch Calculator</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>

                    <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Guide Included
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {filteredCalcs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500 text-sm">No calculators match "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs font-bold text-[#FF671F] hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>

        {/* Daily Financial Blogs & Analysis Section */}
        {blogs && blogs.length > 0 && (
          <section className="my-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF671F] mb-2 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Daily Intelligence Desk</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Daily Market & Tax <span className="text-[#06038D]">Blogs</span>
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Timely insights on mutual fund SIPs, Budget 2024 taxation, home loan prepayment strategies, and gratuity laws.
                </p>
              </div>

              <button
                onClick={() => onNavigate('/blog')}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#FF671F] hover:text-[#e05312] transition self-start sm:self-auto cursor-pointer"
              >
                <span>Explore All Daily Blogs ({blogs.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.slice(0, 3).map((post) => (
                <motion.article
                  key={post.id}
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                  whileHover={{
                    y: -6,
                    transition: { type: 'spring', stiffness: 350, damping: 22 },
                  }}
                  whileTap={{ scale: 0.985 }}
                  className="group cursor-pointer bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.publishedAt}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#06038D] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-medium"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-600 text-xs truncate max-w-[130px]">
                        {post.author.name}
                      </span>
                      <span className="font-bold text-[#FF671F] flex items-center gap-1 group-hover:translate-x-1.5 transition-transform text-sm">
                        Read Article →
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* Trust & Architecture Pillars */}
        <section className="my-16 bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Platform Architecture
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Engineered for Zero Latency & Complete Privacy
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Why thousands of Indian salaried professionals and investors rely on aitoolshub daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF671F] flex items-center justify-center font-bold mb-3">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Local Browser Computation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculations execute in 0 milliseconds inside your browser. No server lag, no waiting for database calls, and works seamlessly on 3G, 4G, or 5G connections.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#046A38] flex items-center justify-center font-bold mb-3">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Complete Privacy Safeguard</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We never ask for your mobile number or email before showing results. Your salary and loan data never leave your personal device.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#06038D] flex items-center justify-center font-bold mb-3">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Tax-Aware Insights</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every calculation is accompanied by updated taxation rules (LTCG ₹1.25 Lakh exemption, STCG 20%, Section 10(10) gratuity caps, and 80C deductions).
              </p>
            </div>
          </div>
        </section>

        {/* Bottom In-Article AdSlot */}
        <AdSlot
          slotId="home-bottom-ad"
          position="in-article"
          title="Featured Financial Guides & Investment Opportunities"
          enabled={adSettings.bottomInArticle}
        />
      </div>
    </div>
  );
};
