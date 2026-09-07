import React, { useState } from 'react';
import { CALCULATORS_DATA } from '../../data/calculatorGuides';
import { DEFAULT_BLOG_POSTS } from '../../data/blogPosts';
import { X, Check, Copy, Globe, Terminal, FileCode, Server } from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'routes' | 'config' | 'robots'>('routes');

  if (!isOpen) return null;

  const routes = [
    { url: 'https://aitoolshub.co.in/', priority: '1.0', changefreq: 'weekly', title: 'Home - aitoolshub', path: '/' },
    { url: 'https://aitoolshub.co.in/blog', priority: '0.9', changefreq: 'daily', title: 'Daily Financial Blogs & Analysis', path: '/blog' },
    ...DEFAULT_BLOG_POSTS.map((b) => ({
      url: `https://aitoolshub.co.in/blog/${b.slug}`,
      priority: '0.85',
      changefreq: 'weekly',
      title: b.title,
      path: `/blog/${b.slug}`,
    })),
    ...Object.values(CALCULATORS_DATA).map((c) => ({
      url: `https://aitoolshub.co.in${c.path}`,
      priority: '0.9',
      changefreq: 'monthly',
      title: c.name,
      path: c.path,
    })),
    { url: 'https://aitoolshub.co.in/about', priority: '0.6', changefreq: 'monthly', title: 'About Us', path: '/about' },
    { url: 'https://aitoolshub.co.in/contact', priority: '0.6', changefreq: 'monthly', title: 'Contact Us', path: '/contact' },
    { url: 'https://aitoolshub.co.in/privacy-policy', priority: '0.5', changefreq: 'yearly', title: 'Privacy Policy', path: '/privacy-policy' },
    { url: 'https://aitoolshub.co.in/terms-of-service', priority: '0.5', changefreq: 'yearly', title: 'Terms of Service', path: '/terms-of-service' },
    { url: 'https://aitoolshub.co.in/disclaimer', priority: '0.5', changefreq: 'yearly', title: 'Financial Disclaimer', path: '/disclaimer' },
  ];

  const nextSitemapConfig = `/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://aitoolshub.co.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.8,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : 0.9,
      lastmod: new Date().toISOString(),
    }
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Mediapartners-Google', allow: '/' }, // AdSense crawler
    ],
  },
};`;

  const robotsTxt = `# robots.txt for https://aitoolshub.co.in
User-agent: *
Allow: /

# Google AdSense Crawler
User-agent: Mediapartners-Google
Allow: /

# Google AdSense AdsBot
User-agent: AdsBot-Google
Allow: /

Sitemap: https://aitoolshub.co.in/sitemap.xml`;

  const copyConfig = () => {
    const textToCopy = activeTab === 'config' ? nextSitemapConfig : robotsTxt;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#06038D]" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                SEO Sitemap & Next.js SSG Architecture
              </h3>
              <p className="text-xs text-slate-500">
                Zero-cost static generation tree for Vercel & Cloudflare Pages
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 px-5 pt-3 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('routes')}
            className={`pb-2.5 transition cursor-pointer border-b-2 ${
              activeTab === 'routes'
                ? 'border-[#FF671F] text-[#FF671F]'
                : 'border-transparent text-slate-500'
            }`}
          >
            Static Routes ({routes.length})
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-2.5 transition cursor-pointer border-b-2 ${
              activeTab === 'config'
                ? 'border-[#06038D] text-[#06038D]'
                : 'border-transparent text-slate-500'
            }`}
          >
            next-sitemap.config.js
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`pb-2.5 transition cursor-pointer border-b-2 ${
              activeTab === 'robots'
                ? 'border-[#046A38] text-[#046A38]'
                : 'border-transparent text-slate-500'
            }`}
          >
            robots.txt
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 text-xs">
          {activeTab === 'routes' && (
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
                <span>URL / Destination</span>
                <span>Priority</span>
              </div>
              {routes.map((r, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50/60 transition group border border-slate-100"
                >
                  <div className="flex-1">
                    <span className="font-bold text-slate-800 group-hover:text-[#FF671F] block">
                      {r.title}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{r.url}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-mono text-[10px] font-bold text-slate-600">
                      {r.priority}
                    </span>
                    {r.path && (
                      <button
                        onClick={() => {
                          onNavigate(r.path!);
                          onClose();
                        }}
                        className="text-[10px] text-[#06038D] font-bold hover:underline cursor-pointer"
                      >
                        Visit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'config' && (
            <div className="relative">
              <pre className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed overflow-x-auto">
                {nextSitemapConfig}
              </pre>
              <button
                onClick={copyConfig}
                className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}

          {activeTab === 'robots' && (
            <div className="relative">
              <pre className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed overflow-x-auto">
                {robotsTxt}
              </pre>
              <button
                onClick={copyConfig}
                className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 hidden sm:inline">
            Compliant with Google Search Console & AdSense Bot crawlers.
          </span>
          <div className="flex items-center gap-2">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Open /sitemap.xml</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
