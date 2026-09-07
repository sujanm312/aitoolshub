import React, { useState, useEffect, useRef } from 'react';
import { AdSettings, CalculatorId, BlogPost, SeoInjectionSettings } from '../../types';
import { CALCULATORS_DATA } from '../../data/calculatorGuides';
import { BlogManager } from '../admin/BlogManager';
import { SeoCodeManager } from '../admin/SeoCodeManager';
import { getRealAnalytics, resetRealAnalytics, RealAnalyticsData } from '../../utils/analytics';
import {
  Lock,
  LayoutDashboard,
  Calculator,
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
  Mail,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
  ShieldCheck,
  DollarSign,
  Menu,
  X,
  Clock,
  Code2,
  Database,
  Activity,
} from 'lucide-react';

export const AUTHORIZED_ADMIN_EMAIL = 'designer.sujanmondal@gmail.com';

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
  seoSettings: SeoInjectionSettings;
  onUpdateSeoSettings: (newSettings: SeoInjectionSettings) => void;
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
  seoSettings,
  onUpdateSeoSettings,
  onNavigate,
}) => {
  // Authentication & OTP State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('aitoolshub_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [authStep, setAuthStep] = useState<'email' | 'otp'>('email');
  const [emailInput, setEmailInput] = useState<string>(AUTHORIZED_ADMIN_EMAIL);
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [authSuccess, setAuthSuccess] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  // Sidebar & Layout State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    'metrics' | 'calculators' | 'blogs' | 'editor' | 'seo' | 'ads' | 'security'
  >('metrics');
  const [selectedCalcForEdit, setSelectedCalcForEdit] = useState<CalculatorId>('sip-calculator');
  const [currentTime, setCurrentTime] = useState<string>('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authStep === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [authStep, countdown]);

  // Focus first OTP field on entering OTP step
  useEffect(() => {
    if (authStep === 'otp') {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    }
  }, [authStep]);

  // Real Analytics State (100% genuine data, zero dummy data)
  const [analytics, setAnalytics] = useState<RealAnalyticsData>(() => getRealAnalytics());

  // Keep analytics synchronized when navigating to metrics tab
  useEffect(() => {
    if (activeTab === 'metrics') {
      setAnalytics(getRealAnalytics());
    }
  }, [activeTab]);

  const handleRefreshAnalytics = () => {
    setAnalytics(getRealAnalytics());
  };

  const handleResetAnalytics = () => {
    if (window.confirm('Reset all recorded calculation telemetry counters to 0?')) {
      const fresh = resetRealAnalytics();
      setAnalytics(fresh);
    }
  };

  // Real platform metrics dynamically computed from live state
  const totalCalculatorsCount = (Object.keys(CALCULATORS_DATA) as CalculatorId[]).length;
  const customGuidesCount = Object.keys(customGuides).length;
  const featuredBlogsCount = blogs.filter((b) => b.isFeatured).length;
  const totalBlogWords = blogs.reduce((sum, b) => {
    return sum + (b.content ? b.content.split(/\s+/).filter(Boolean).length : 0);
  }, 0);
  const activeAdSlotsCount = [
    adSettings.topBanner,
    adSettings.inlineBelowCalc,
    adSettings.bottomInArticle,
  ].filter(Boolean).length;

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

  // STEP 1: Send OTP handler (Strict Production)
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    const trimmed = emailInput.trim().toLowerCase();

    // Strict Authorization Verification
    if (trimmed !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setAuthError('Access Denied: Unauthorized Administrator');
      return;
    }

    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch OTP verification email.');
      }

      setAuthStep('otp');
      setCountdown(60);
      setCanResend(false);
      setOtpDigits(['', '', '', '', '', '']);
      setAuthSuccess(`6-digit OTP dispatched to ${trimmed}. Please check your inbox.`);
    } catch (err: any) {
      setAuthError(err.message || 'Unable to connect to OTP dispatch service.');
    } finally {
      setAuthLoading(false);
    }
  };

  // STEP 2: Digit Input Handler
  const handleOtpDigitChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, '');
    if (clean.length <= 1) {
      const newDigits = [...otpDigits];
      newDigits[index] = clean;
      setOtpDigits(newDigits);

      if (clean && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newDigits.every((d) => d !== '') && index === 5) {
        verifyOtp(newDigits.join(''));
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim().replace(/\D/g, '');
    if (pasted.length >= 6) {
      const digits = pasted.slice(0, 6).split('');
      setOtpDigits(digits);
      inputRefs.current[5]?.focus();
      verifyOtp(digits.join(''));
    }
  };

  // STEP 3: Verify OTP Submission (Strict Production)
  const verifyOtp = async (code: string) => {
    if (code.length !== 6) {
      setAuthError('Please enter all 6 digits.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim().toLowerCase(), otp: code }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Invalid verification code. Please try again.');
      }

      setIsAuthenticated(true);
      try {
        localStorage.setItem('aitoolshub_admin_authenticated', 'true');
      } catch (err) {
        console.error(err);
      }
      setAuthSuccess('Authentication verified successfully.');
    } catch (err: any) {
      setAuthError(err.message || 'Verification failed. Please check the code in your email.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthStep('email');
    setOtpDigits(['', '', '', '', '', '']);
    setAuthSuccess('');
    setAuthError('');
    try {
      localStorage.removeItem('aitoolshub_admin_authenticated');
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================================
  // RENDER: LOGIN VIEW (2-STEP EMAIL OTP FLOW)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#111C38] to-[#0A0D18] flex flex-col justify-center items-center px-4 py-12 relative font-sans">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF671F]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="w-full max-w-md mb-6 text-center">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF671F] via-orange-500 to-[#046A38] p-0.5 shadow-lg group-hover:scale-105 transition">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center font-black text-sm text-white">
                AH
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-white">aitoolshub</span>
                <span className="w-2 h-2 rounded-full bg-[#FF671F]" />
              </div>
              <span className="text-xs text-slate-400 font-mono">aitoolshub.co.in</span>
            </div>
          </button>
        </div>

        {/* Card Container */}
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-2xl relative z-10 overflow-hidden">
          {/* Indian Tricolor Accent Line on Top */}
          <div className="h-2 w-full bg-gradient-to-r from-[#FF671F] via-[#FF9933] to-[#046A38] absolute top-0 left-0 right-0" />

          <div className="pt-2 text-center">
            <div className="w-13 h-13 rounded-2xl bg-orange-50 text-[#FF671F] border border-orange-200 mx-auto flex items-center justify-center mb-3 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Authentication</h1>
            <p className="text-xs text-slate-500 mt-1">Passwordless 2-Factor Email OTP Perimeter</p>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="mt-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Success Message */}
          {authSuccess && (
            <div className="mt-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#046A38] text-xs font-semibold flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* STEP 1: EMAIL ENTRY */}
          {authStep === 'email' ? (
            <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Authorized Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="designer.sujanmondal@gmail.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF671F] focus:bg-white transition"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Authorized identity: <strong className="text-slate-700">{AUTHORIZED_ADMIN_EMAIL}</strong>
                </p>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white bg-[#FF671F] hover:bg-[#E05510] active:translate-y-0.5 shadow-[0_4px_0_#b45309] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {authLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Validating & Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: 6-DIGIT SPLIT OTP ENTRY */
            <div className="mt-6 space-y-5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setAuthStep('email');
                    setAuthError('');
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Change Email</span>
                </button>
                <span className="text-xs font-mono font-semibold text-slate-500 truncate max-w-[190px]">
                  {emailInput}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 text-center">
                  Enter 6-Digit Verification Code
                </label>

                {/* 6-Box Split Input */}
                <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={handleOtpPaste}
                      className="w-11 sm:w-12 h-13 text-center text-xl font-black text-slate-900 bg-slate-50 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-[#FF671F] focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition shadow-xs"
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => verifyOtp(otpDigits.join(''))}
                disabled={authLoading || otpDigits.some((d) => d === '')}
                className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm bg-[#046A38] hover:bg-[#034E28] active:translate-y-0.5 shadow-[0_4px_0_#02381e] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {authLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authenticate Session</span>
                  </>
                )}
              </button>

              {/* Countdown & Resend Button */}
              <div className="text-center pt-1">
                {canResend ? (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    className="text-xs font-bold text-[#FF671F] hover:underline flex items-center gap-1.5 mx-auto cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resend One-Time Password</span>
                  </button>
                ) : (
                  <p className="text-xs text-slate-400 font-mono">
                    Resend code in <strong className="text-slate-700">{countdown}s</strong>
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              aitoolshub.co.in &bull; Signed HMAC Edge Session Protection
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
          >
            &larr; Return to Public aitoolshub Platform
          </button>
        </div>
      </div>
    );
  }

  // ====================================================
  // RENDER: AUTHENTICATED REDESIGNED SIDEBAR DASHBOARD
  // ====================================================
  const navTabs: { id: typeof activeTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'metrics', label: 'Dashboard / Overview', icon: LayoutDashboard, badge: 'Live' },
    { id: 'calculators', label: 'Calculators & Tools', icon: Calculator, badge: '6 Tools' },
    { id: 'blogs', label: 'Daily Financial Blogs', icon: BookOpen, badge: `${blogs.length}` },
    { id: 'editor', label: 'Editorial & Guides', icon: FileText },
    { id: 'seo', label: 'SEO & Code Injection', icon: Code2, badge: 'Head/Body' },
    { id: 'ads', label: 'AdSense Units', icon: DollarSign },
    { id: 'security', label: 'Security & Profile', icon: ShieldCheck, badge: 'Active' },
  ];

  const wordCount = editorText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="w-full min-h-screen bg-slate-100 flex text-slate-900 font-sans relative">
      {/* Mobile Drawer Trigger Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-2xl cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-orange-400" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Overlay Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 1. COLLAPSIBLE SIDEBAR MENU */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-[#0F172A] border-r border-slate-800 text-slate-300 flex flex-col justify-between transition-all duration-300 shadow-2xl ${
          isSidebarCollapsed ? 'w-20' : 'w-68'
        } ${mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand & Toggle Header */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/40">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF671F] via-orange-500 to-[#046A38] p-0.5 flex-shrink-0 shadow-md">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center font-black text-xs text-white">
                  AH
                </div>
              </div>
              {!isSidebarCollapsed && (
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-base text-white">aitoolshub</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF671F]" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-orange-400 font-bold block">
                    Admin Console
                  </span>
                </div>
              )}
            </div>

            {/* Collapse Button (Desktop) */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white items-center justify-center transition cursor-pointer"
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Nav Tab Items */}
          <div className="p-3 space-y-1 mt-2">
            {!isSidebarCollapsed && (
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Navigation
              </div>
            )}

            {navTabs.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all relative cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500/20 to-orange-500/5 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                  title={item.label}
                >
                  {/* Saffron Active Line Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#FF671F] rounded-r-full shadow-[0_0_8px_#FF671F]" />
                  )}

                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      isActive ? 'text-[#FF671F]' : 'text-slate-400'
                    }`}
                  />

                  {!isSidebarCollapsed && (
                    <div className="flex-1 flex items-center justify-between text-left truncate">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-bold ${
                            isActive
                              ? 'bg-[#FF671F] text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom User Profile & Logout */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          {!isSidebarCollapsed ? (
            <div className="space-y-3">
              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/20 flex-shrink-0">
                  SM
                </div>
                <div className="overflow-hidden flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                    <p className="text-xs font-bold text-white truncate">Administrator</p>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate font-mono">{AUTHORIZED_ADMIN_EMAIL}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onNavigate('/')}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                  <span>Live Site</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-[0_2px_0_#991b1b] flex items-center justify-center gap-1 transition cursor-pointer active:translate-y-0.5"
                  title="Logout Session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => onNavigate('/')}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-orange-400 flex items-center justify-center cursor-pointer"
                title="View Live Site"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md cursor-pointer"
                title="End Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT AREA */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 min-h-screen ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-68'
        }`}
      >
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight capitalize">
              {activeTab === 'metrics'
                ? 'Overview & Metrics'
                : activeTab === 'calculators'
                ? 'Financial Calculators Manager'
                : activeTab === 'blogs'
                ? 'Daily Financial Blogs CMS'
                : activeTab === 'editor'
                ? 'Editorial & Guides CMS'
                : activeTab === 'seo'
                ? 'SEO & Dynamic Code Injection'
                : activeTab === 'ads'
                ? 'Google AdSense Placements'
                : 'Security & Profile'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Live IST Server Clock */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-mono text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span>{currentTime || 'IST Live Time'}</span>
            </div>

            {/* Quick Live Preview */}
            <button
              onClick={() => onNavigate('/')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">View Live Site</span>
            </button>
          </div>
        </header>

        {/* Main Routed Content Area */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* TAB 1: REAL TELEMETRY & SYSTEM OVERVIEW (NO DUMMY DATA) */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {/* Header with real-time controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900 tracking-tight">Platform Telemetry & Live Status</h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Tracking
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real client-side calculation telemetry, certified engines, and active content systems (Zero dummy data)
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handleRefreshAnalytics}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    title="Refresh live telemetry counts"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync Counts</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAnalytics}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-500 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    title="Reset recorded telemetry runs to zero"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Counts</span>
                  </button>
                </div>
              </div>

              {/* 4 Genuine Real-Time Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric 1: Real Total Calculations Recorded */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Runs Logged</span>
                    <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF671F] flex items-center justify-center">
                      <Calculator className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {analytics.totalRuns.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1">
                    {analytics.totalRuns > 0 ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Live calculations tracked
                      </span>
                    ) : (
                      <span>0 logged &bull; Awaiting user calculations</span>
                    )}
                  </p>
                </div>

                {/* Metric 2: Financial Calculators Count */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Calculators</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {totalCalculatorsCount} Tools
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    {customGuidesCount > 0 ? `${customGuidesCount} custom guides override` : '100% verified algorithms online'}
                  </p>
                </div>

                {/* Metric 3: Published Blog Articles */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Published Blogs</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#046A38] flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {blogs.length} Articles
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    {featuredBlogsCount} featured &bull; {totalBlogWords.toLocaleString('en-IN')} total words
                  </p>
                </div>

                {/* Metric 4: AdSense Units */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Ad Placements</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {activeAdSlotsCount} / 3 Active
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    {adSettings.testMode ? 'Test wireframe containers' : 'Live AdSense script active'}
                  </p>
                </div>
              </div>

              {/* Real Calculator Telemetry Table */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Financial Calculator Telemetry
                    </h3>
                    <p className="text-xs text-slate-500">
                      Execution telemetry recorded per tool from user interactions
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {totalCalculatorsCount} engines verified
                  </span>
                </div>

                {analytics.totalRuns === 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>Zero dummy data policy active:</strong> No client calculations have been recorded yet in this environment. Use any calculator from the live site to watch execution logs update here in real-time.
                    </span>
                  </div>
                )}

                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                  {(Object.keys(CALCULATORS_DATA) as CalculatorId[]).map((calcId, idx) => {
                    const tool = CALCULATORS_DATA[calcId];
                    const count = analytics.toolRuns[calcId] || 0;
                    const isCustomized = !!customGuides[calcId];
                    return (
                      <div key={calcId} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 gap-3 transition">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-white font-mono text-xs font-bold text-slate-600 flex items-center justify-center border border-slate-200 shadow-2xs">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-900">{tool.name}</span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-100/70 text-[#FF671F]">
                                {tool.badge}
                              </span>
                              {isCustomized && (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-700">
                                  Custom Guide
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono">{tool.path}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <div className="text-left sm:text-right">
                            <span className="text-xs font-black text-slate-900 font-mono block">
                              {count.toLocaleString('en-IN')} runs
                            </span>
                            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 sm:justify-end">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Operational
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCalcForEdit(calcId);
                                setActiveTab('editor');
                              }}
                              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                              title="Edit Guide"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onNavigate(tool.path)}
                              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                              title="Open Calculator"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real Content & Infrastructure Health Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Real Blog Distribution */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-slate-900">Blog Content Distribution</h4>
                    <span className="text-xs font-mono text-slate-400">{blogs.length} articles</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                      <span className="font-medium text-slate-700">Investing & Mutual Funds</span>
                      <span className="font-bold text-slate-900 font-mono">
                        {blogs.filter((b) => b.category === 'Investing').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                      <span className="font-medium text-slate-700">Tax Planning & Exemptions</span>
                      <span className="font-bold text-slate-900 font-mono">
                        {blogs.filter((b) => b.category === 'Tax Planning').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                      <span className="font-medium text-slate-700">Loans & Mortgages</span>
                      <span className="font-bold text-slate-900 font-mono">
                        {blogs.filter((b) => b.category === 'Loans & Mortgages').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                      <span className="font-medium text-slate-700">Retirement & Sovereign Schemes</span>
                      <span className="font-bold text-slate-900 font-mono">
                        {blogs.filter((b) => b.category === 'Retirement' || b.category === 'Savings').length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Real SEO Injections Status */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-slate-900">SEO & Code Injections Perimeter</h4>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      seoSettings.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {seoSettings.enabled ? 'Engine Active' : 'Disabled'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                      <span className="font-medium text-slate-700">&lt;head&gt; SEO & Tracking Scripts</span>
                      <span className="font-mono text-slate-900 font-bold">
                        {seoSettings.headerCode.trim().length > 0 ? `${seoSettings.headerCode.trim().length} chars` : 'Empty'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                      <span className="font-medium text-slate-700">&lt;body&gt; Top Injections (GTM)</span>
                      <span className="font-mono text-slate-900 font-bold">
                        {seoSettings.bodyTopCode.trim().length > 0 ? `${seoSettings.bodyTopCode.trim().length} chars` : 'Empty'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                      <span className="font-medium text-slate-700">Footer Scripts (Analytics/Chat)</span>
                      <span className="font-mono text-slate-900 font-bold">
                        {seoSettings.footerCode.trim().length > 0 ? `${seoSettings.footerCode.trim().length} chars` : 'Empty'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                      <span className="font-medium text-slate-700">Editorial Guides Custom Overrides</span>
                      <span className="font-mono text-slate-900 font-bold">
                        {customGuidesCount} / {totalCalculatorsCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CALCULATORS DIRECTORY */}
          {activeTab === 'calculators' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Active Financial Tools (6)</h3>
                  <p className="text-xs text-slate-500">Live tools deployed on Cloudflare Pages static export</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(Object.keys(CALCULATORS_DATA) as CalculatorId[]).map((calcId) => {
                  const item = CALCULATORS_DATA[calcId];
                  return (
                    <div key={calcId} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-orange-300 transition space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                          {item.badge}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <h4 className="text-sm font-black text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{item.tagline}</p>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCalcForEdit(calcId);
                            setActiveTab('editor');
                          }}
                          className="flex-1 py-1.5 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Guide</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigate(item.path)}
                          className="py-1.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center justify-center cursor-pointer"
                          title="Open Calculator"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: DAILY FINANCIAL BLOGS CMS */}
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

          {/* TAB 4: EDITORIAL & GUIDES CMS */}
          {activeTab === 'editor' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Comprehensive SEO Editorial Guide Editor</h3>
                  <p className="text-xs text-slate-500">
                    Live word counter &bull; <strong className="text-slate-900">{wordCount} words</strong> (Optimal SEO target: 600 - 800 words)
                  </p>
                </div>

                <select
                  value={selectedCalcForEdit}
                  onChange={(e) => handleSelectCalcForEdit(e.target.value as CalculatorId)}
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF671F] cursor-pointer"
                >
                  {(Object.keys(CALCULATORS_DATA) as CalculatorId[]).map((id) => (
                    <option key={id} value={id}>
                      {CALCULATORS_DATA[id].shortName}
                    </option>
                  ))}
                </select>
              </div>

              {saveToast && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Editorial guide saved and published instantly!</span>
                </div>
              )}

              <div className="space-y-3">
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  rows={14}
                  className="w-full p-4 rounded-2xl border border-slate-300 font-mono text-xs leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-slate-50"
                  placeholder="Write the comprehensive editorial guide in Markdown..."
                />

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleResetEditor}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset to Default Guide
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveEditor}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#046A38] hover:bg-[#034E28] flex items-center gap-1.5 transition cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save & Publish Guide
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SEO & CODE INJECTION ENGINE */}
          {activeTab === 'seo' && (
            <SeoCodeManager
              settings={seoSettings}
              onUpdateSettings={onUpdateSeoSettings}
            />
          )}

          {/* TAB 6: ADSENSE UNITS */}
          {activeTab === 'ads' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
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

              <div className="divide-y divide-slate-100">
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
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        adSettings.topBanner ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
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
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        adSettings.inlineBelowCalc ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 3: Bottom in-article unit */}
                <div className="py-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Bottom Editorial In-Article Unit</h4>
                    <p className="text-xs text-slate-500">Positioned between guide and FAQ section</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onUpdateAdSettings({ ...adSettings, bottomInArticle: !adSettings.bottomInArticle })}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                      adSettings.bottomInArticle ? 'bg-[#FF671F]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        adSettings.bottomInArticle ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY & PROFILE */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Security & Active Admin Session</h3>
                <p className="text-xs text-slate-500 mt-0.5">Cryptographic session parameters and master administrator identity</p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Authorized Superadmin</span>
                    <span className="text-sm font-black text-slate-900 font-mono">{AUTHORIZED_ADMIN_EMAIL}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-auto flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Master Perimeter
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Authentication Protocol</span>
                    <span className="text-sm font-black text-slate-900">2-Factor Cryptographic HMAC-SHA256 Email OTP</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">5-Minute OTP Expiry &bull; 60s Resend Delay</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Production Email Service</span>
                    <span className="text-xs font-mono text-slate-700">Resend API / SMTP Gateway Configuration</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">Set RESEND_API_KEY in environment</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Session Hardening</span>
                    <span className="text-xs font-mono text-slate-700">HttpOnly; SameSite=Strict; Secure; Max-Age=86400</span>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> High Security
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
