import React, { useState } from 'react';
import { CalculatorMeta, AdSettings } from '../../types';
import { AdSlot } from '../ui/AdSlot';
import { SEOMarkup } from '../ui/SEOMarkup';
import {
  BookOpen,
  HelpCircle,
  Calculator as CalcIcon,
  ChevronDown,
  ArrowRight,
  Share2,
  Check,
  FileText,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react';
import { CALCULATORS_DATA } from '../../data/calculatorGuides';

interface CalculatorLayoutProps {
  meta: CalculatorMeta;
  adSettings: AdSettings;
  customGuideContent?: string; // from Admin editor override if customized
  children: React.ReactNode;
  onNavigate: (path: string) => void;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  meta,
  adSettings,
  customGuideContent,
  children,
  onNavigate,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const otherCalculators = Object.values(CALCULATORS_DATA).filter((c) => c.id !== meta.id);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      {/* Dynamic SEO JSON-LD Tags */}
      <SEOMarkup meta={meta} />

      {/* Breadcrumb Navigation for SEO */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-4">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-slate-900 transition font-medium cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-slate-400">Calculators</span>
        <span>/</span>
        <span className="font-semibold text-[#06038D]">{meta.shortName}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-orange-100 text-[#FF671F]">
              {meta.badge}
            </span>
            <span className="text-xs text-slate-400 font-medium">Verified Calculation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {meta.name}
          </h1>
          <p className="text-base md:text-lg text-slate-600 mt-1 max-w-3xl">
            {meta.tagline}
          </p>
        </div>

        {/* Share Button */}
        <button
          onClick={copyPageLink}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition shadow-2xs cursor-pointer"
        >
          {copiedLink ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Share Tool</span>
            </>
          )}
        </button>
      </div>

      {/* 1. Top Banner AdSense Slot */}
      <AdSlot
        slotId={`top-${meta.id}`}
        position="top-banner"
        title="Sponsored Financial Solutions"
        enabled={adSettings.topBanner}
      />

      {/* 2. Top Interactive Calculator Card */}
      <section className="mb-10">
        {children}
      </section>

      {/* 3. Inline Below Calculator AdSense Slot */}
      <AdSlot
        slotId={`inline-${meta.id}`}
        position="inline-below-calc"
        title="Recommended Investment & Banking Offers"
        enabled={adSettings.inlineBelowCalc}
      />

      {/* 4. Comprehensive Editorial Guide Section (600–800 words) */}
      <section className="my-10 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
          <BookOpen className="w-5 h-5 text-[#FF671F]" />
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            {meta.guideContent.title}
          </h2>
        </div>

        {/* Author / Editorial Badge for AdSense Trust Signals */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-6 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
          <div className="w-7 h-7 rounded-full bg-[#06038D] text-white font-bold flex items-center justify-center text-[10px]">
            AH
          </div>
          <div>
            <span className="font-semibold text-slate-800">aitoolshub Editorial Finance Desk</span>
            <span className="mx-2 text-slate-300">|</span>
            <span>Fact-Checked & Reviewed for FY 2024–2025</span>
          </div>
        </div>

        {customGuideContent ? (
          <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {customGuideContent}
          </div>
        ) : (
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <p className="text-base text-slate-800 font-medium leading-relaxed bg-slate-50/60 p-4 rounded-xl border-l-4 border-[#FF671F]">
              {meta.guideContent.introduction}
            </p>

            {meta.guideContent.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {sec.heading}
                </h3>
                <p>{sec.content}</p>
                {sec.bulletPoints && (
                  <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                    {sec.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="text-xs md:text-sm">{bp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Tax Implications Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 my-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#06038D]" />
                {meta.guideContent.taxImplications.title}
              </h3>
              <div className="space-y-2">
                {meta.guideContent.taxImplications.rules.map((rule, rIdx) => (
                  <div key={rIdx} className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs">
                    <span className="font-bold text-[#06038D] block">{rule.regime}</span>
                    <span className="text-slate-600 mt-0.5 block">{rule.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons Bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#046A38] mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#046A38]" /> Key Benefits & Advantages
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {meta.guideContent.prosAndCons.pros.map((pro, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-[#046A38] font-bold">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600" /> Risks & Limitations
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {meta.guideContent.prosAndCons.cons.map((con, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Common Pitfalls Box */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-700" /> Common Mistakes to Avoid
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-900 list-disc list-inside">
                {meta.guideContent.commonMistakes.map((mistake, mIdx) => (
                  <li key={mIdx}>{mistake}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* 6. In-Article / Bottom AdSense Placement */}
      <AdSlot
        slotId={`article-${meta.id}`}
        position="in-article"
        title="Personal Finance & Wealth Advisory Partners"
        enabled={adSettings.bottomInArticle}
      />

      {/* 7. Interactive High-Intent FAQ Accordion (5+ FAQs) */}
      <section className="my-10 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-[#06038D]" />
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions ({meta.shortName})
          </h2>
        </div>
        <p className="text-xs md:text-sm text-slate-600 mb-6">
          High-intent answers to critical questions Indian investors and borrowers ask every day.
        </p>

        <div className="space-y-3">
          {meta.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 bg-white"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm md:text-base hover:bg-slate-50 transition cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs flex items-center justify-center font-mono flex-shrink-0">
                      Q{index + 1}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-[#FF671F]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 md:p-5 pt-0 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Related Financial Tools Grid */}
      <section className="my-12">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CalcIcon className="w-4 h-4 text-[#FF671F]" />
          Explore Other Financial Calculators
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {otherCalculators.slice(0, 3).map((calc) => (
            <div
              key={calc.id}
              onClick={() => onNavigate(calc.path)}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md">
                  {calc.badge}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF671F] group-hover:translate-x-1 transition" />
              </div>
              <h4 className="text-base font-bold text-slate-900 group-hover:text-[#06038D] transition">
                {calc.shortName}
              </h4>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                {calc.tagline}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
