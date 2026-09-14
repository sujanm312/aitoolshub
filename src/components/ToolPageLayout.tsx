import React, { useState, useEffect } from 'react';
import { CalculatorMeta, AdSettings } from '../types';
import { AdSlot } from './ui/AdSlot';
import { SEOMarkup } from './ui/SEOMarkup';
import { recordCalculatorRun } from '../utils/analytics';
import {
  ChevronDown,
  ArrowRight,
  Share2,
  Check,
  FileText,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

interface ToolPageLayoutProps {
  meta: CalculatorMeta;
  adSettings: AdSettings;
  children: React.ReactNode;
  onNavigate: (path: string) => void;
  relatedTools?: CalculatorMeta[];
}

export const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({
  meta,
  adSettings,
  children,
  onNavigate,
  relatedTools = [],
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    recordCalculatorRun(meta.id);
  }, [meta.id]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10">
      {/* 1. Dynamic JSON-LD SEO Schema Tags */}
      <SEOMarkup meta={meta} />

      {/* Breadcrumb Navigation for SEO */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-xs text-slate-500">
          <li>
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-slate-900 transition flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>Home</span>
            </button>
          </li>
          <li className="text-slate-400">/</li>
          <li className="capitalize">
            <span className="font-semibold text-slate-600">{meta.category || 'Tools'}</span>
          </li>
          <li className="text-slate-400">/</li>
          <li className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">
            {meta.name}
          </li>
        </ol>
      </nav>

      {/* Header with Title & Badges */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-[#FF671F] border border-orange-200">
              {meta.badge || 'Zero API Cost'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#046A38] border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>100% Client-Side Private</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {meta.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-3xl">
            {meta.tagline || meta.description}
          </p>
        </div>

        <button
          onClick={copyPageLink}
          className="self-start md:self-auto px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copiedLink ? 'Link Copied' : 'Share Tool'}</span>
        </button>
      </div>

      {/* 2. First AdSense Unit: Top of Page */}
      <AdSlot
        slotId={`top-${meta.id}`}
        position="top-banner"
        title="Sponsored Advertisement"
        enabled={adSettings?.topBanner ?? true}
      />

      {/* 1. Interactive Tool Card (Above the Fold) */}
      <div className="my-6">{children}</div>

      {/* 3. Step-by-Step Formula / Technical Mechanism */}
      {meta.formulaBreakdown && (
        <section className="my-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 rounded-xl bg-orange-50 text-[#FF671F]">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Mathematical Formula & Technical Mechanism
              </h2>
              <p className="text-xs text-slate-500">
                Deterministic mathematical model and standard computation verified against regulatory norms
              </p>
            </div>
          </div>

          {/* Primary Formula Box */}
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-sm sm:text-base my-4 overflow-x-auto shadow-inner border border-slate-800">
            <code>{meta.primaryFormula || meta.formulaBreakdown.formula}</code>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed my-3">
            {meta.formulaBreakdown.explanation}
          </p>

          {/* Sample Calculation */}
          {meta.formulaBreakdown.sampleCalculation && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
              <span className="font-bold text-slate-900 block mb-2">Step-by-Step Sample Calculation:</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="block text-slate-500 text-[11px] mb-1">1. Given Inputs</strong>
                  {Object.entries(meta.formulaBreakdown.sampleCalculation.given).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-0.5">
                      <span className="font-medium">{k}:</span>
                      <span className="font-mono">{String(v)}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="block text-slate-500 text-[11px] mb-1">2. Mathematical Substitution</strong>
                  <p className="font-mono text-xs">{meta.formulaBreakdown.sampleCalculation.substitutions}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-bold">
                  <strong className="block text-emerald-700 text-[11px] mb-1">3. Computed Final Result</strong>
                  <p className="text-lg font-black text-[#046A38]">{meta.formulaBreakdown.sampleCalculation.result}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 4. Second AdSense Unit: In-Article */}
      <AdSlot
        slotId={`inline-${meta.id}`}
        position="inline-below-calc"
        title="Recommended Tools & Services"
        enabled={adSettings?.inlineBelowCalc ?? true}
      />

      {/* 4. Authoritative Editorial Guide (800–1,000 Words) */}
      {meta.guideContent && (
        <article className="my-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm prose prose-slate max-w-none">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {meta.guideContent.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {meta.guideContent.introduction}
            </p>
          </div>

          <div className="space-y-8">
            {meta.guideContent.sections.map((section, idx) => (
              <section key={idx} className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 text-[#06038D] border-l-4 border-[#FF671F] pl-3">
                  {section.heading}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          {meta.guideContent.summary && (
            <div className="mt-8 p-4 rounded-2xl bg-orange-50 border border-orange-200 text-sm text-slate-800">
              <strong className="block text-[#FF671F] font-bold mb-1">Expert Summary & Strategic Takeaway:</strong>
              {meta.guideContent.summary}
            </div>
          )}
        </article>
      )}

      {/* 5. Interactive FAQ Accordion (Minimum 5 Schema-Backed Questions) */}
      {meta.faqs && meta.faqs.length > 0 && (
        <section className="my-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="p-2 rounded-xl bg-indigo-50 text-[#06038D]">
              <HelpCircle className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Frequently Asked Questions (FAQ)
              </h2>
              <p className="text-xs text-slate-500">
                Verified answers to common queries, legal considerations, and practical usage tips
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {meta.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-slate-50/50"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-800 hover:text-[#06038D] transition cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#FF671F]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Third AdSense Unit: Pre-Footer */}
      <AdSlot
        slotId={`article-${meta.id}`}
        position="in-article"
        title="Featured Partners & Utilities"
        enabled={adSettings?.bottomInArticle ?? true}
      />

      {/* Related Tools Grid */}
      {relatedTools.length > 0 && (
        <section className="my-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FF671F]" />
              <span>Explore More High-Utility Tools</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedTools.slice(0, 6).map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.path)}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition text-left cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#06038D]">{tool.badge || 'Free Tool'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF671F] group-hover:translate-x-1 transition-all" />
                </div>
                <div className="font-black text-slate-900 text-sm group-hover:text-[#FF671F] transition">
                  {tool.name}
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {tool.tagline || tool.description}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
