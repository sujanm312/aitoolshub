'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  CheckCircle,
  Eye,
  FileText,
  Save,
  RotateCcw,
  Sparkles,
  BookOpen,
  DollarSign,
  ShieldCheck,
  Calculator,
  Lock,
  ExternalLink,
  Users,
  Activity,
  Globe,
  Clock,
  Laptop,
} from 'lucide-react';
import { AdminTab } from '../../../components/admin/Sidebar';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('metrics');
  const [selectedCalc, setSelectedCalc] = useState<string>('sip-calculator');

  // Ad Settings State
  const [adSettings, setAdSettings] = useState({
    topBanner: true,
    inArticle: true,
    bottomMatched: true,
    stickyFooter: false,
    sidebarAd: true,
  });

  // Calculators Active Status
  const [toolStatus, setToolStatus] = useState<Record<string, boolean>>({
    'sip-calculator': true,
    'emi-calculator': true,
    'compound-interest': true,
    'gratuity-calculator': true,
    'ppf-calculator': true,
    'fd-rd-calculator': true,
  });

  const [guideText, setGuideText] = useState<string>(
    `# SIP Calculator (Systematic Investment Plan) Comprehensive Guide\n\nA Systematic Investment Plan (SIP) allows Indian retail investors to deposit disciplined monthly installments into SEBI-regulated mutual fund schemes...\n\n### 1. Mathematical Compounding\n- Formula: M = P * [((1 + i)^n - 1) / i] * (1 + i)\n- Leverages Rupee Cost Averaging across volatile Nifty/Sensex swings.`
  );
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const metrics = {
    totalCalculationsToday: 18450,
    monthlyActiveCalculators: 420800,
    averageSessionDuration: '3m 42s',
    adsenseCTR: '2.48%',
    adImpressions: 64210,
    topTools: [
      { name: 'SIP Calculator', count: 7240, pct: 39 },
      { name: 'Loan EMI Calculator', count: 5120, pct: 28 },
      { name: 'Gratuity Calculator', count: 2480, pct: 13 },
      { name: 'PPF Calculator', count: 1890, pct: 10 },
      { name: 'FD & RD Calculator', count: 1120, pct: 6 },
      { name: 'Compound Interest', count: 600, pct: 4 },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Overview Top Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#046A38] text-xs font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Cloudflare Edge Perimeter
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Administrator Command Center
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as <strong className="text-slate-800">designer.sujanmondal@gmail.com</strong> (aitoolshub.co.in)
          </p>
        </div>

        {/* Quick Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          {(
            [
              { id: 'metrics', label: 'Overview' },
              { id: 'calculators', label: 'Tools (6)' },
              { id: 'editor', label: 'Guides CMS' },
              { id: 'ads', label: 'AdSense' },
              { id: 'security', label: 'Security' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === t.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: OVERVIEW METRICS & CTR */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Calculations Today
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#06038D] mt-2">
                {metrics.totalCalculationsToday.toLocaleString('en-IN')}
              </div>
              <span className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +14.2% vs yesterday
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Monthly Active Runs
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#046A38] mt-2">
                {metrics.monthlyActiveCalculators.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-slate-500 mt-1 block font-medium">Unique Indian visitors</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Average Session
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                {metrics.averageSessionDuration}
              </div>
              <span className="text-xs text-slate-500 mt-1 block font-medium">High user engagement</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                AdSense CTR
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#FF671F] mt-2">
                {metrics.adsenseCTR}
              </div>
              <span className="text-xs text-slate-500 mt-1 block font-medium">
                {metrics.adImpressions.toLocaleString()} ad impressions
              </span>
            </div>
          </div>

          {/* Top Tools Distribution */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#FF671F]" />
              Tool Usage Breakdown
            </h3>

            <div className="space-y-4">
              {metrics.topTools.map((tool, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>{tool.name}</span>
                    <span>
                      {tool.count.toLocaleString()} runs ({tool.pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF671F] to-[#046A38] rounded-full"
                      style={{ width: `${tool.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CALCULATORS & TOOLS MANAGEMENT */}
      {activeTab === 'calculators' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Financial Calculators</h3>
            <p className="text-xs text-slate-500 mt-0.5">Toggle live status and inspect endpoints on aitoolshub.co.in</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'sip-calculator', name: 'SIP Calculator', path: '/calculators/sip-calculator/' },
              { id: 'emi-calculator', name: 'Loan EMI Calculator', path: '/calculators/emi-calculator/' },
              { id: 'compound-interest', name: 'Compound Interest', path: '/calculators/compound-interest/' },
              { id: 'gratuity-calculator', name: 'Gratuity Calculator', path: '/calculators/gratuity-calculator/' },
              { id: 'ppf-calculator', name: 'PPF Calculator', path: '/calculators/ppf-calculator/' },
              { id: 'fd-rd-calculator', name: 'FD & RD Calculator', path: '/calculators/fd-rd-calculator/' },
            ].map((calc) => {
              const active = toolStatus[calc.id];
              return (
                <div
                  key={calc.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{calc.name}</h4>
                    <span className="text-xs text-slate-500 font-mono">{calc.path}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setToolStatus({ ...toolStatus, [calc.id]: !active });
                        showToast(`${calc.name} status updated.`);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition ${
                        active
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {active ? '● Live' : '○ Paused'}
                    </button>
                    <a
                      href={calc.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: EDITORIAL & GUIDES CMS */}
      {activeTab === 'editor' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Editorial & In-Depth Guide CMS
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Edit the 600-800 word guides and FAQs for SEO ranking
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedCalc}
                onChange={(e) => setSelectedCalc(e.target.value)}
                className="px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-800 outline-none focus:ring-2 focus:ring-[#FF671F]"
              >
                <option value="sip-calculator">SIP Calculator Guide</option>
                <option value="emi-calculator">EMI Calculator Guide</option>
                <option value="compound-interest">Compound Interest Guide</option>
                <option value="gratuity-calculator">Gratuity Guide</option>
                <option value="ppf-calculator">PPF Guide</option>
                <option value="fd-rd-calculator">FD/RD Guide</option>
              </select>

              <button
                type="button"
                onClick={() => showToast('Editorial guide saved and published!')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#FF671F] hover:bg-[#E05510] flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Guide</span>
              </button>
            </div>
          </div>

          <textarea
            rows={12}
            value={guideText}
            onChange={(e) => setGuideText(e.target.value)}
            className="w-full p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF671F] leading-relaxed"
          />
        </div>
      )}

      {/* TAB 4: ADSENSE UNIT CONTROLS */}
      {activeTab === 'ads' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Google AdSense Placement Controllers
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Toggle responsive banner positions across desktop and mobile screens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'topBanner', label: 'Top Header Leaderboard (728x90 / 320x100)' },
              { id: 'inArticle', label: 'In-Article Native Unit (Below Calculations)' },
              { id: 'bottomMatched', label: 'Bottom Matched Content / Multiplex' },
              { id: 'sidebarAd', label: 'Sidebar Sticky Ad Slot (Desktop)' },
            ].map((slot) => {
              const enabled = adSettings[slot.id as keyof typeof adSettings];
              return (
                <div
                  key={slot.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-800">{slot.label}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAdSettings({ ...adSettings, [slot.id]: !enabled });
                      showToast(`${slot.label} toggled ${!enabled ? 'ON' : 'OFF'}`);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition ${
                      enabled ? 'bg-[#046A38] text-white shadow-xs' : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    {enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: SECURITY & PROFILE */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Security & Active Admin Session</h3>
            <p className="text-xs text-slate-500 mt-0.5">Cryptographic session parameters and master administrator identity</p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Authorized Email</span>
                <span className="text-sm font-black text-slate-900 font-mono">designer.sujanmondal@gmail.com</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-auto">
                ● Master Superadmin
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Authentication Protocol</span>
                <span className="text-sm font-black text-slate-900">HMAC-SHA256 Signed One-Time Password</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">5-Minute OTP Expiry</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Cookie Security Flags</span>
                <span className="text-xs font-mono text-slate-700">HttpOnly; SameSite=Strict; Secure; Max-Age=86400</span>
              </div>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> High Security
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
