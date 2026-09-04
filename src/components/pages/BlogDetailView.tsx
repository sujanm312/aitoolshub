import React, { useState, useEffect } from 'react';
import { BlogPost, AdSettings } from '../../types';
import { RichContent } from '../blog/RichContent';
import { AdSlot } from '../ui/AdSlot';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Tag,
  BookOpen,
  Calculator,
  ChevronRight,
  TrendingUp,
  Landmark,
  Award,
} from 'lucide-react';

interface BlogDetailViewProps {
  blog: BlogPost;
  allBlogs: BlogPost[];
  adSettings: AdSettings;
  onNavigate: (path: string) => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  blog,
  allBlogs,
  adSettings,
  onNavigate,
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Update document title for SEO
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${blog.title} | aitoolshub Daily Blog`;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute('content', blog.excerpt);
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [blog]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${blog.title} - Read on aitoolshub`);

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  // Find related articles (matching tags or category, excluding current)
  const relatedBlogs = allBlogs
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

  // Map category to relevant calculator
  const getRecommendedCalculator = () => {
    const lowerTags = blog.tags.map((t) => t.toLowerCase());
    if (lowerTags.some((t) => t.includes('sip') || t.includes('mutual fund'))) {
      return {
        name: 'Systematic Investment Plan (SIP) Calculator',
        path: '/calculators/sip-calculator',
        desc: 'Calculate your future corpus with inflation and step-up options.',
        icon: <TrendingUp className="w-5 h-5 text-[#FF671F]" />,
      };
    }
    if (lowerTags.some((t) => t.includes('loan') || t.includes('emi') || t.includes('prepayment'))) {
      return {
        name: 'Home Loan EMI & Amortization Calculator',
        path: '/calculators/emi-calculator',
        desc: 'Simulate extra prepayments and see how many years you can save.',
        icon: <Landmark className="w-5 h-5 text-[#06038D]" />,
      };
    }
    if (lowerTags.some((t) => t.includes('gratuity') || t.includes('labour') || t.includes('salaried'))) {
      return {
        name: 'Statutory Gratuity Payout Calculator',
        path: '/calculators/gratuity-calculator',
        desc: 'Compute your exact 15/26 statutory entitlement under Indian law.',
        icon: <Award className="w-5 h-5 text-[#046A38]" />,
      };
    }
    return {
      name: 'Compound Interest Wealth Calculator',
      path: '/calculators/compound-interest',
      desc: 'Visualize exponential asset compounding over 5 to 30 years.',
      icon: <Calculator className="w-5 h-5 text-[#FF671F]" />,
    };
  };

  const recCalc = getRecommendedCalculator();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Top Banner Ad Unit */}
      <AdSlot
        slotId="blog-detail-top-ad"
        position="top-banner"
        title="Sponsored Financial Analysis"
        enabled={adSettings.topBanner}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-slate-900 transition cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button
          onClick={() => onNavigate('/blog')}
          className="hover:text-slate-900 transition cursor-pointer"
        >
          Daily Blogs
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold truncate max-w-xs">
          {blog.title}
        </span>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => onNavigate('/blog')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-4 transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Articles</span>
      </button>

      {/* Category Badge & Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="px-3 py-1 rounded-full bg-orange-100 text-[#FF671F] text-xs font-black uppercase tracking-wider">
          {blog.category}
        </span>
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Article Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
        {blog.title}
      </h1>

      {/* Excerpt Lead Paragraph */}
      <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mb-6">
        {blog.excerpt}
      </p>

      {/* Author Bar & Social Sharing */}
      <div className="py-4 border-y border-slate-200 mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Author info */}
        <div className="flex items-center gap-3">
          {blog.author.avatar ? (
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-2xs"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-indigo-50 text-[#06038D] font-bold text-sm flex items-center justify-center">
              {blog.author.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>{blog.author.name}</span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>{blog.author.role}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                {blog.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">
            Share:
          </span>
          <button
            onClick={() => handleShare('whatsapp')}
            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition cursor-pointer text-xs font-bold flex items-center gap-1"
            title="Share via WhatsApp"
          >
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer text-xs font-bold"
            title="Share on Twitter"
          >
            <span>X (Twitter)</span>
          </button>
          <button
            onClick={handleCopyLink}
            className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
              copiedLink
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title="Copy Link"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="rounded-3xl overflow-hidden mb-10 shadow-sm border border-slate-200 bg-slate-100">
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full max-h-[460px] object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80';
          }}
        />
      </div>

      {/* Main Article Content Container */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
        <RichContent
          content={blog.content}
          onNavigate={onNavigate}
        />

        {/* Recommended Calculator Callout Box */}
        {recCalc && (
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-orange-50/70 border border-orange-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white p-2 border border-orange-200 shadow-2xs flex items-center justify-center shrink-0">
                {recCalc.icon}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF671F] block">
                  Interactive Companion Tool
                </span>
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  {recCalc.name}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {recCalc.desc}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate(recCalc.path)}
              className="px-4 py-2.5 rounded-xl text-white font-bold text-xs btn-3d-saffron shrink-0 cursor-pointer"
            >
              Open Calculator →
            </button>
          </div>
        )}

        {/* Author Bio Box */}
        <div className="mt-10 pt-8 border-t border-slate-100 flex items-start gap-4">
          {blog.author.avatar ? (
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#06038D] font-bold text-xl flex items-center justify-center shrink-0">
              {blog.author.name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Written by {blog.author.name}
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {blog.author.role} · aitoolshub Editorial Contributor
            </p>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Specializes in Indian financial jurisprudence, tax-efficient portfolio architecture, mutual fund metrics, and statutory employment benefits under the Payment of Gratuity Act and Income Tax provisions.
            </p>
          </div>
        </div>
      </article>

      {/* Mid-Article / In-Article Ad Banner */}
      <AdSlot
        slotId="blog-detail-inarticle"
        position="in-article"
        title="Sponsored Tax & Wealth Planning Resources"
        enabled={adSettings.inlineBelowCalc}
      />

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#FF671F]" />
              <span>More Daily Insights & Guides</span>
            </h3>
            <button
              onClick={() => onNavigate('/blog')}
              className="text-xs font-bold text-[#06038D] hover:underline cursor-pointer"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedBlogs.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate(`/blog/${rel.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition overflow-hidden flex flex-col justify-between"
              >
                <div className="h-32 bg-slate-100 overflow-hidden">
                  <img
                    src={rel.featuredImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#FF671F] uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 group-hover:text-[#06038D] transition line-clamp-2 leading-snug">
                      {rel.title}
                    </h5>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{rel.publishedAt}</span>
                    <span className="text-[#FF671F] font-bold">Read →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
