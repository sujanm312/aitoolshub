import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
import { HomeView } from './components/pages/HomeView';
import {
  AboutView,
  ContactView,
  PrivacyPolicyView,
  TermsView,
  DisclaimerView,
} from './components/pages/TrustPages';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { CalculatorLayout } from './components/calculators/CalculatorLayout';
import { SipCalculator } from './components/calculators/SipCalculator';
import { EmiCalculator } from './components/calculators/EmiCalculator';
import { CompoundInterestCalculator } from './components/calculators/CompoundInterestCalculator';
import { GratuityCalculator } from './components/calculators/GratuityCalculator';
import { PpfCalculator } from './components/calculators/PpfCalculator';
import { FdRdCalculator } from './components/calculators/FdRdCalculator';
import { SitemapModal } from './components/ui/SitemapModal';
import { BlogListView } from './components/pages/BlogListView';
import { BlogDetailView } from './components/pages/BlogDetailView';
import { SeoInjector, DEFAULT_SEO_SETTINGS } from './components/seo/SeoInjector';
import { CALCULATORS_DATA } from './data/calculatorGuides';
import { DEFAULT_BLOG_POSTS } from './data/blogPosts';
import { AdSettings, BlogPost, SeoInjectionSettings } from './types';

const DEFAULT_AD_SETTINGS: AdSettings = {
  topBanner: true,
  inlineBelowCalc: true,
  sidebarAd: false,
  bottomInArticle: true,
  testMode: true,
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/'
      ? window.location.pathname
      : '/';
  });

  const [adSettings, setAdSettings] = useState<AdSettings>(() => {
    try {
      const saved = localStorage.getItem('aitoolshub_ad_settings');
      return saved ? JSON.parse(saved) : DEFAULT_AD_SETTINGS;
    } catch {
      return DEFAULT_AD_SETTINGS;
    }
  });

  const [customGuides, setCustomGuides] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('aitoolshub_custom_guides');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('aitoolshub_blog_posts');
      if (!saved) return DEFAULT_BLOG_POSTS;
      const parsed: BlogPost[] = JSON.parse(saved);
      const defaultMap = new Map(DEFAULT_BLOG_POSTS.map((b) => [b.id, b]));
      const customPosts = parsed.filter((p) => !defaultMap.has(p.id));
      return [...DEFAULT_BLOG_POSTS, ...customPosts];
    } catch {
      return DEFAULT_BLOG_POSTS;
    }
  });

  const [seoSettings, setSeoSettings] = useState<SeoInjectionSettings>(() => {
    try {
      const saved = localStorage.getItem('aitoolshub_seo_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SEO_SETTINGS;
    } catch {
      return DEFAULT_SEO_SETTINGS;
    }
  });

  const [sitemapModalOpen, setSitemapModalOpen] = useState<boolean>(false);

  // Listen to browser popstate (back / forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      const elem = document.getElementById(elementId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      setCurrentPath('/');
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAdSettings = (newSettings: AdSettings) => {
    setAdSettings(newSettings);
    try {
      localStorage.setItem('aitoolshub_ad_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateGuide = (calcId: string, content: string) => {
    const updated = { ...customGuides, [calcId]: content };
    setCustomGuides(updated);
    try {
      localStorage.setItem('aitoolshub_custom_guides', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetGuide = (calcId: string) => {
    const updated = { ...customGuides };
    delete updated[calcId];
    setCustomGuides(updated);
    try {
      localStorage.setItem('aitoolshub_custom_guides', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateBlog = (newBlog: BlogPost) => {
    const updated = [newBlog, ...blogs];
    setBlogs(updated);
    try {
      localStorage.setItem('aitoolshub_blog_posts', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateBlog = (updatedBlog: BlogPost) => {
    const updated = blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b));
    setBlogs(updated);
    try {
      localStorage.setItem('aitoolshub_blog_posts', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteBlog = (blogId: string) => {
    const updated = blogs.filter((b) => b.id !== blogId);
    setBlogs(updated);
    try {
      localStorage.setItem('aitoolshub_blog_posts', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetBlogs = () => {
    setBlogs(DEFAULT_BLOG_POSTS);
    try {
      localStorage.removeItem('aitoolshub_blog_posts');
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateSeoSettings = (newSettings: SeoInjectionSettings) => {
    setSeoSettings(newSettings);
    try {
      localStorage.setItem('aitoolshub_seo_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.error(e);
    }
  };

  // Route resolver
  const renderCurrentView = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomeView
          adSettings={adSettings}
          blogs={blogs}
          onNavigate={handleNavigate}
          onOpenSitemap={() => setSitemapModalOpen(true)}
        />
      );
    }

    if (currentPath === '/blog' || currentPath === '/blogs') {
      return (
        <BlogListView
          blogs={blogs}
          adSettings={adSettings}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').replace(/\/$/, '');
      const foundBlog = blogs.find(
        (b) => b.slug === slug || b.id === slug || (b.aliases && b.aliases.includes(slug))
      );
      if (foundBlog) {
        return (
          <BlogDetailView
            blog={foundBlog}
            allBlogs={blogs}
            adSettings={adSettings}
            onNavigate={handleNavigate}
          />
        );
      }
    }

    if (currentPath === '/about') {
      return <AboutView onNavigate={handleNavigate} />;
    }

    if (currentPath === '/contact') {
      return <ContactView onNavigate={handleNavigate} />;
    }

    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicyView onNavigate={handleNavigate} />;
    }

    if (currentPath === '/terms-of-service') {
      return <TermsView onNavigate={handleNavigate} />;
    }

    if (currentPath === '/disclaimer') {
      return <DisclaimerView onNavigate={handleNavigate} />;
    }

    if (currentPath.startsWith('/admin')) {
      return (
        <AdminDashboard
          adSettings={adSettings}
          onUpdateAdSettings={handleUpdateAdSettings}
          customGuides={customGuides}
          onUpdateGuide={handleUpdateGuide}
          onResetGuide={handleResetGuide}
          blogs={blogs}
          onCreateBlog={handleCreateBlog}
          onUpdateBlog={handleUpdateBlog}
          onDeleteBlog={handleDeleteBlog}
          onResetBlogs={handleResetBlogs}
          seoSettings={seoSettings}
          onUpdateSeoSettings={handleUpdateSeoSettings}
          onNavigate={handleNavigate}
        />
      );
    }

    // Calculators
    if (currentPath === '/calculators/sip-calculator') {
      return (
        <CalculatorLayout
          meta={CALCULATORS_DATA['sip-calculator']}
          adSettings={adSettings}
          customGuideContent={customGuides['sip-calculator']}
          onNavigate={handleNavigate}
        >
          <SipCalculator />
        </CalculatorLayout>
      );
    }

    if (currentPath === '/calculators/emi-calculator') {
      return (
        <CalculatorLayout
          meta={CALCULATORS_DATA['emi-calculator']}
          adSettings={adSettings}
          customGuideContent={customGuides['emi-calculator']}
          onNavigate={handleNavigate}
        >
          <EmiCalculator />
        </CalculatorLayout>
      );
    }

    if (currentPath === '/calculators/compound-interest') {
      return (
        <CalculatorLayout
          meta={CALCULATORS_DATA['compound-interest']}
          adSettings={adSettings}
          customGuideContent={customGuides['compound-interest']}
          onNavigate={handleNavigate}
        >
          <CompoundInterestCalculator />
        </CalculatorLayout>
      );
    }

    if (currentPath === '/calculators/gratuity-calculator') {
      return (
        <CalculatorLayout
          meta={CALCULATORS_DATA['gratuity-calculator']}
          adSettings={adSettings}
          customGuideContent={customGuides['gratuity-calculator']}
          onNavigate={handleNavigate}
        >
          <GratuityCalculator />
        </CalculatorLayout>
      );
    }

    if (currentPath === '/calculators/ppf-calculator') {
      return (
        <CalculatorLayout
          meta={CALCULATORS_DATA['ppf-calculator']}
          adSettings={adSettings}
          customGuideContent={customGuides['ppf-calculator']}
          onNavigate={handleNavigate}
        >
          <PpfCalculator />
        </CalculatorLayout>
      );
    }

    if (currentPath === '/calculators/fd-rd-calculator') {
      return (
        <CalculatorLayout
          meta={CALCULATORS_DATA['fd-rd-calculator']}
          adSettings={adSettings}
          customGuideContent={customGuides['fd-rd-calculator']}
          onNavigate={handleNavigate}
        >
          <FdRdCalculator />
        </CalculatorLayout>
      );
    }

    // Fallback: 404 or redirect to Home
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-black text-slate-900">Page Not Found</h2>
        <p className="text-slate-500 text-sm mt-2">The financial tool or page you requested does not exist.</p>
        <button
          onClick={() => handleNavigate('/')}
          className="mt-6 px-6 py-2.5 rounded-xl text-white font-bold text-xs btn-3d-saffron cursor-pointer"
        >
          Return to All Calculators
        </button>
      </div>
    );
  };

  const isAdmin = currentPath.startsWith('/admin');

  return (
    <div className={`min-h-screen flex flex-col ${isAdmin ? 'bg-slate-100' : 'bg-[#F8FAFC]'} text-slate-900 selection:bg-orange-100 selection:text-orange-900`}>
      {/* Dynamic SEO Code Injector (Head, Body Top, Footer) */}
      <SeoInjector settings={seoSettings} />

      {/* Navigation Bar - Excluded on Admin Panel */}
      {!isAdmin && <Navbar currentPath={currentPath} onNavigate={handleNavigate} />}

      {/* Main Routed Content */}
      <main className={`flex-1 ${isAdmin ? 'p-0 m-0' : 'pb-16 md:pb-0'}`}>
        {renderCurrentView()}
      </main>

      {/* Comprehensive Footer - Excluded on Admin Panel */}
      {!isAdmin && (
        <Footer
          onNavigate={handleNavigate}
          onOpenSitemap={() => setSitemapModalOpen(true)}
        />
      )}

      {/* Mobile Sticky Bottom Nav - Excluded on Admin Panel */}
      {!isAdmin && <BottomNav currentPath={currentPath} onNavigate={handleNavigate} />}

      {/* Next.js SSG / Sitemap Modal */}
      <SitemapModal
        isOpen={sitemapModalOpen}
        onClose={() => setSitemapModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
