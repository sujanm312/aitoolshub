import React, { useState } from 'react';
import {
  Code2,
  Save,
  RotateCcw,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Globe,
  FileCode,
  ShieldCheck,
  Terminal,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { SeoInjectionSettings } from '../../types';

interface SeoCodeManagerProps {
  settings: SeoInjectionSettings;
  onUpdateSettings: (newSettings: SeoInjectionSettings) => void;
}

export const SeoCodeManager: React.FC<SeoCodeManagerProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [activeSection, setActiveSection] = useState<'head' | 'bodyTop' | 'footer'>('head');
  const [formData, setFormData] = useState<SeoInjectionSettings>(settings);
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleSave = () => {
    onUpdateSettings(formData);
    showToast('SEO & Injection Codes successfully deployed to aitoolshub.co.in!');
  };

  const handleReset = () => {
    const defaultData: SeoInjectionSettings = {
      enabled: true,
      headerCode: `<!-- Google tag (gtag.js) / SEO Meta Tag Injection -->
<meta name="robots" content="index, follow" />
<meta name="author" content="aitoolshub Editorial Team" />`,
      bodyTopCode: `<!-- Body Top Injection (e.g. GTM noscript or Announcement) -->
<!-- <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> -->`,
      footerCode: `<!-- Footer / Body Bottom Script Injection (e.g. Analytics, Chatbot) -->
<!-- Global site verification and footer tracking -->`,
    };
    setFormData(defaultData);
    onUpdateSettings(defaultData);
    showToast('Reset to default clean template.');
  };

  const insertTemplate = (snippet: string) => {
    if (activeSection === 'head') {
      setFormData({
        ...formData,
        headerCode: (formData.headerCode ? formData.headerCode + '\n\n' : '') + snippet,
      });
    } else if (activeSection === 'bodyTop') {
      setFormData({
        ...formData,
        bodyTopCode: (formData.bodyTopCode ? formData.bodyTopCode + '\n\n' : '') + snippet,
      });
    } else {
      setFormData({
        ...formData,
        footerCode: (formData.footerCode ? formData.footerCode + '\n\n' : '') + snippet,
      });
    }
    showToast('Template snippet inserted! Click "Save & Deploy" to activate.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Top Title & Master Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF671F] text-xs font-bold uppercase tracking-wider mb-2">
              <Code2 className="w-3.5 h-3.5" />
              SEO & Dynamic Code Injection Engine
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Header, Footer & Body Script Injector
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Inject Google Tag Manager, Google Analytics, AdSense, Meta Pixel, custom meta tags, or tracking pixels directly into aitoolshub.co.in without rebuilding.
            </p>
          </div>

          {/* Master Enable Switch */}
          <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-700">
              Master Injection: {formData.enabled ? 'Enabled' : 'Disabled'}
            </span>
            <button
              type="button"
              onClick={() => {
                const next = !formData.enabled;
                setFormData({ ...formData, enabled: next });
                onUpdateSettings({ ...formData, enabled: next });
                showToast(`Script Injection ${next ? 'Activated' : 'Suspended'}`);
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                formData.enabled ? 'bg-[#046A38]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  formData.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveSection('head')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeSection === 'head'
                ? 'bg-[#0F172A] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-[#FF671F]" />
            <span>Header Injection (&lt;head&gt;)</span>
            <span className="text-[10px] opacity-75 font-mono">
              ({(formData.headerCode.match(/\n/g) || []).length + 1} lines)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('bodyTop')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeSection === 'bodyTop'
                ? 'bg-[#0F172A] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Top of Body (&lt;body&gt; open)</span>
            <span className="text-[10px] opacity-75 font-mono">
              ({(formData.bodyTopCode.match(/\n/g) || []).length + 1} lines)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('footer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeSection === 'footer'
                ? 'bg-[#0F172A] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            <span>Footer / Body Bottom (&lt;/body&gt; close)</span>
            <span className="text-[10px] opacity-75 font-mono">
              ({(formData.footerCode.match(/\n/g) || []).length + 1} lines)
            </span>
          </button>
        </div>

        {/* Quick Insert Preset Snippets */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF671F]" />
            Quick Presets for {activeSection === 'head' ? '<head>' : activeSection === 'bodyTop' ? 'Top of <body>' : 'Footer'}:
          </span>

          {activeSection === 'head' && (
            <>
              <button
                type="button"
                onClick={() =>
                  insertTemplate(`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`)
                }
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#FF671F] border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + Google Analytics 4 (gtag.js)
              </button>

              <button
                type="button"
                onClick={() =>
                  insertTemplate(`<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->`)
                }
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#FF671F] border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + Google Tag Manager (Head)
              </button>

              <button
                type="button"
                onClick={() =>
                  insertTemplate(`<meta name="google-site-verification" content="ENTER_YOUR_VERIFICATION_TOKEN_HERE" />`)
                }
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#FF671F] border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + Search Console Verification Tag
              </button>

              <button
                type="button"
                onClick={() =>
                  insertTemplate(`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "aitoolshub",
  "url": "https://aitoolshub.co.in",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All"
}
</script>`)
                }
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#FF671F] border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + Schema.org Structured Data
              </button>
            </>
          )}

          {activeSection === 'bodyTop' && (
            <>
              <button
                type="button"
                onClick={() =>
                  insertTemplate(`<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`)
                }
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#FF671F] border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + GTM NoScript Fallback
              </button>

              <button
                type="button"
                onClick={() =>
                  insertTemplate(`<div style="background:#ff671f;color:#ffffff;text-align:center;padding:8px 12px;font-size:12px;font-weight:bold;">
  📢 New: Complete FY 2025-26 Tax & Mutual Fund SIP Return Projection Engines Live!
</div>`)
                }
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#FF671F] border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + Top Site Alert Banner
              </button>
            </>
          )}

          {activeSection === 'footer' && (
            <>
              <button
                type="button"
                onClick={() =>
                  insertTemplate(`<!-- Microsoft Clarity Heatmap & Tracking -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
</script>`)
                }
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#FF671F] border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + Microsoft Clarity Analytics
              </button>

              <button
                type="button"
                onClick={() =>
                  insertTemplate(`<!-- Google AdSense Auto Ads / Page-Level Tag -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>`)
                }
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#FF671F] border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + AdSense Auto Ads Script
              </button>

              <button
                type="button"
                onClick={() =>
                  insertTemplate(`<!-- Custom WhatsApp Direct Connect -->
<a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" style="position:fixed;bottom:24px;right:24px;z-index:9999;background:#25D366;color:#ffffff;padding:10px 16px;border-radius:999px;font-weight:bold;font-size:12px;box-shadow:0 4px 12px rgba(0,0,0,0.15);text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
  💬 Chat with Financial Advisor
</a>`)
                }
                className="px-2.5 py-1 bg-white hover:bg-orange-50 hover:text-[#FF671F] border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                + Floating WhatsApp Contact Button
              </button>
            </>
          )}
        </div>

        {/* Code Editor Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>
              Editing:{' '}
              <strong className="text-slate-900 font-mono">
                {activeSection === 'head'
                  ? '<head> ... </head>'
                  : activeSection === 'bodyTop'
                  ? '<body> [Top] ...'
                  : '... </body> [Bottom]'}
              </strong>
            </span>
            <span className="text-[11px] text-slate-400">Pure HTML / Script / CSS / Meta accepted</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-md">
            <div className="bg-[#0B1120] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 text-slate-300">
                  {activeSection === 'head'
                    ? 'header-injection.html'
                    : activeSection === 'bodyTop'
                    ? 'body-top-injection.html'
                    : 'footer-injection.html'}
                </span>
              </span>
              <span className="text-[11px] text-slate-500">Live Injection Engine</span>
            </div>

            <textarea
              rows={14}
              value={
                activeSection === 'head'
                  ? formData.headerCode
                  : activeSection === 'bodyTop'
                  ? formData.bodyTopCode
                  : formData.footerCode
              }
              onChange={(e) => {
                const val = e.target.value;
                if (activeSection === 'head') {
                  setFormData({ ...formData, headerCode: val });
                } else if (activeSection === 'bodyTop') {
                  setFormData({ ...formData, bodyTopCode: val });
                } else {
                  setFormData({ ...formData, footerCode: val });
                }
              }}
              placeholder={`Enter HTML, <script>, <meta>, or <link> tags to inject into ${
                activeSection === 'head' ? '<head>' : activeSection === 'bodyTop' ? 'top of <body>' : 'footer before </body>'
              }...`}
              className="w-full p-4 bg-[#0F172A] text-emerald-400 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#FF671F] resize-y"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-1.5 transition cursor-pointer border border-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Clean Default</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#046A38] hover:bg-[#034E28] active:translate-y-0.5 shadow-[0_3px_0_#02381e] flex items-center gap-2 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Deploy Injections</span>
          </button>
        </div>
      </div>
    </div>
  );
};
