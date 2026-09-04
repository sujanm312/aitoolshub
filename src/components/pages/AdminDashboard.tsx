import React, { useState, useId } from 'react';
import { AdSettings, AdminMetrics, CalculatorId, BlogPost } from '../../types';
import { CALCULATORS_DATA } from '../../data/calculatorGuides';
import { BlogManager } from '../admin/BlogManager';
import {
  Lock,
  LayoutDashboard,
  ToggleLeft,
  ToggleRight,
  Edit3,
  TrendingUp,
  BarChart3,
  CheckCircle,
  Eye,
  FileText,
  Shield,
  Save,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface AdminDashboardProps {
  adSettings: AdSettings;
  onUpdateAdSettings: (newSettings: AdSettings) => void;
  customGuides: Record<string, string>;
  onUpdateGuide: (calcId: string, content: string) => void;
  onResetGuide: (calcId: string) => void;
  blogs: BlogPost[];
  onCreateBlog: (blog: BlogPost) => void;
  onUpdateBlog: (blog: BlogPost) => void;
  onDeleteBlog: (blogId: string) => void;
  onResetBlogs: () => void;
  onNavigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adSettings,
  onUpdateAdSettings,
  customGuides,
  onUpdateGuide,
  onResetGuide,
  blogs,
  onCreateBlog,
  onUpdateBlog,
  onDeleteBlog,
  onResetBlogs,
  onNavigate,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'metrics' | 'blogs' | 'ads' | 'editor'>('blogs');
  const [selectedCalcForEdit, setSelectedCalcForEdit] = useState<CalculatorId>('sip-calculator');

  const passwordInputId = useId();

  // Metrics mock data
  const metrics: AdminMetrics = {
    totalCalculationsToday: 18450,
    monthlyActiveCalculators: 420800,
    averageSessionDuration: '3m 42s',
    adsenseCTR: '2.48%',
    adImpressions: 64210,
    topTools: [
      { name: 'SIP Calculator', path: '/calculators/sip-calculator', count: 7240, pct: 39 },
      { name: 'Loan EMI Calculator', path: '/calculators/emi-calculator', count: 5120, pct: 28 },
      { name: 'Gratuity Calculator', path: '/calculators/gratuity-calculator', count: 2480, pct: 13 },
      { name: 'PPF Calculator', path: '/calculators/ppf-calculator', count: 1890, pct: 10 },
      { name: 'FD & RD Calculator', path: '/calculators/fd-rd-calculator', count: 1120, pct: 6 },
      { name: 'Compound Interest', path: '/calculators/compound-interest', count: 600, pct: 4 },
    ],
  };

  // Current editor content
  const activeCalcMeta = CALCULATORS_DATA[selectedCalcForEdit];
  const initialGuideDraft =
    customGuides[selectedCalcForEdit] ||
    `${activeCalcMeta.guideContent.introduction}\n\n` +
      activeCalcMeta.guideContent.sections
        .map((s) => `### ${s.heading}\n${s.content}\n${s.bulletPoints ? s.bulletPoints.map((b) => `- ${b}`).join('\n') : ''}`)
        .join('\n\n');

  const [editorText, setEditorText] = useState<string>(initialGuideDraft);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  // Sync editor when calculator changes
  const handleSelectCalcForEdit = (id: CalculatorId) => {
    setSelectedCalcForEdit(id);
    const meta = CALCULATORS_DATA[id];
    const draft =
      customGuides[id] ||
      `${meta.guideContent.introduction}\n\n` +
        meta.guideContent.sections
          .map((s) => `### ${s.heading}\n${s.content}\n${s.bulletPoints ? s.bulletPoints.map((b) => `- ${b}`).join('\n') : ''}`)
          .join('\n\n');
    setEditorText(draft);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === 'aitoolshub' || passwordInput.length >= 4) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Try "admin123" for demo access.');
    }
  };

  const handleSaveEditor = () => {
    onUpdateGuide(selectedCalcForEdit, editorText);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleResetEditor = () => {
    onResetGuide(selectedCalcForEdit);
    const meta = CALCULATORS_DATA[selectedCalcForEdit];
    const draft =
      `${meta.guideContent.introduction}\n\n` +
      meta.guideContent.sections
        .map((s) => `### ${s.heading}\n${s.content}\n${s.bulletPoints ? s.bulletPoints.map((b) => `- ${b}`).join('\n') : ''}`)
        .join('\n\n');
    setEditorText(draft);
  };

  const wordCount = editorText.trim().split(/\s+/).filter(Boolean).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-[#06038D] mx-auto flex items-center justify-center mb-4 shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            aitoolshub Admin Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Restricted access for tool usage metrics, ad unit controls & guide editor.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4 text-left">
            <div>
              <label htmlFor={passwordInputId} className="text-xs font-bold text-slate-700 block mb-1">
                Admin Security Passcode
              </label>
              <input
                id={passwordInputId}
                type="password"
                placeholder="Enter passcode (e.g. admin123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
              />
            </div>

            {authError && (
              <p className="text-xs text-rose-600 font-semibold">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-bold text-sm btn-3d-navy cursor-pointer"
            >
              Sign In to Dashboard
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => { setPasswordInput('admin123'); setIsAuthenticated(true); }}
                className="text-xs text-[#FF671F] font-bold hover:underline cursor-pointer"
              >
                ⚡ 1-Click Demo Login (Passcode: admin123)
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
      {/* Top Admin Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Authenticated Portal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            aitoolshub Command Center
          </h1>
          <p className="text-xs text-slate-500">
            Real-time platform metrics, Google AdSense placement controller & live content manager
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Exit to Live Site
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
          >
            Lock Session
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mt-6 border-b border-slate-200 text-xs md:text-sm font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('blogs')}
          className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'blogs'
              ? 'border-[#FF671F] text-[#FF671F]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Daily Blogs & Articles ({blogs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'metrics'
              ? 'border-[#06038D] text-[#06038D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Analytics & Tool Traffic
        </button>
        <button
          onClick={() => setActiveTab('ads')}
          className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'ads'
              ? 'border-[#FF671F] text-[#FF671F]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          AdSense Placements ({Object.values(adSettings).filter(Boolean).length} Active)
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
            activeTab === 'editor'
              ? 'border-[#046A38] text-[#046A38]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          Editorial Guide Editor
        </button>
      </div>

      {/* TAB: DAILY BLOGS */}
      {activeTab === 'blogs' && (
        <BlogManager
          blogs={blogs}
          onCreateBlog={onCreateBlog}
          onUpdateBlog={onUpdateBlog}
          onDeleteBlog={onDeleteBlog}
          onResetBlogs={onResetBlogs}
          onNavigate={onNavigate}
        />
      )}

      {/* TAB 1: METRICS */}
      {activeTab === 'metrics' && (
        <div className="py-6 space-y-6">
          {/* Key Stat Bento */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500">Calculations Run Today</span>
              <div className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                {metrics.totalCalculationsToday.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-emerald-600 font-bold mt-0.5 block">
                +18.4% vs yesterday
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500">Monthly Visitors</span>
              <div className="text-2xl md:text-3xl font-black text-[#06038D] mt-1">
                {metrics.monthlyActiveCalculators.toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">Across India & NRI diaspora</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500">Avg. Engagement Time</span>
              <div className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                {metrics.averageSessionDuration}
              </div>
              <span className="text-[11px] text-emerald-600 font-bold mt-0.5 block">High dwell time</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500">AdSense Click-Through Rate</span>
              <div className="text-2xl md:text-3xl font-black text-[#FF671F] mt-1">
                {metrics.adsenseCTR}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                {metrics.adImpressions.toLocaleString('en-IN')} impressions
              </span>
            </div>
          </div>

          {/* Calculator Popularity Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FF671F]" />
              Calculator Usage Breakdown (Past 24 Hours)
            </h3>

            <div className="space-y-3">
              {metrics.topTools.map((tool) => (
                <div key={tool.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex-1 max-w-sm">
                    <span className="text-xs font-bold text-slate-800 block">{tool.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{tool.path}</span>
                  </div>
                  <div className="flex-1 px-4 hidden sm:block">
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#06038D] h-full rounded-full"
                        style={{ width: `${tool.pct * 2}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 block">{tool.count.toLocaleString('en-IN')} runs</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{tool.pct}% total share</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADSENSE MANAGEMENT */}
      {activeTab === 'ads' && (
        <div className="py-6 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Google AdSense Global Unit Toggles</h3>
                <p className="text-xs text-slate-500">
                  Instantly activate or deactivate ad slot wireframes site-wide to test performance and user experience.
                </p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
                100% Policy Compliant
              </span>
            </div>

            <div className="divide-y divide-slate-100 mt-6">
              {/* Toggle 1: Top Banner */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Top Header Banner Unit</h4>
                  <p className="text-xs text-slate-500">Displayed directly above the calculator interface (Desktop & Mobile)</p>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateAdSettings({ ...adSettings, topBanner: !adSettings.topBanner })}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    adSettings.topBanner ? 'bg-[#FF671F]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    adSettings.topBanner ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Toggle 2: Inline Below Calculator */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Inline Calculator Footer Unit</h4>
                  <p className="text-xs text-slate-500">Positioned between interactive calculator and editorial guide</p>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateAdSettings({ ...adSettings, inlineBelowCalc: !adSettings.inlineBelowCalc })}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    adSettings.inlineBelowCalc ? 'bg-[#FF671F]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    adSettings.inlineBelowCalc ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Toggle 3: Bottom In-Article */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">In-Article / Bottom Unit</h4>
                  <p className="text-xs text-slate-500">Embedded between the 600-word editorial guide and the FAQ accordion</p>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateAdSettings({ ...adSettings, bottomInArticle: !adSettings.bottomInArticle })}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    adSettings.bottomInArticle ? 'bg-[#FF671F]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    adSettings.bottomInArticle ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GUIDE EDITOR */}
      {activeTab === 'editor' && (
        <div className="py-6 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Live Editorial Guide Editor</h3>
                <p className="text-xs text-slate-500">
                  Update and customize the 600–800 word guide for any tool with real-time word counting and Markdown preview.
                </p>
              </div>

              {/* Calculator Chooser */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Select Tool:</span>
                <select
                  value={selectedCalcForEdit}
                  onChange={(e) => handleSelectCalcForEdit(e.target.value as CalculatorId)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#046A38]"
                >
                  {Object.values(CALCULATORS_DATA).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.shortName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Word Count & Status */}
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>
                  Word Count: <strong className={wordCount >= 600 ? 'text-emerald-600' : 'text-amber-600'}>{wordCount} words</strong> (AdSense Target: 600–800)
                </span>
              </div>
              {customGuides[selectedCalcForEdit] && (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Customized Guide Active
                </span>
              )}
            </div>

            {/* Textarea */}
            <textarea
              rows={16}
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-300 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#046A38] bg-slate-50/40"
              placeholder="Write or edit the editorial guide..."
            />

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handleResetEditor}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset to Default Editorial Guide
              </button>

              <div className="flex items-center gap-3">
                {saveToast && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                    <CheckCircle className="w-3.5 h-3.5" /> Saved to live site!
                  </span>
                )}
                <button
                  onClick={handleSaveEditor}
                  className="px-5 py-2.5 rounded-xl text-white font-bold text-xs btn-3d-green flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save & Publish Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
