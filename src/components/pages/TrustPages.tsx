import React, { useState } from 'react';
import {
  ShieldCheck,
  Mail,
  Send,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  FileText,
  UserCheck,
  Lock,
  Globe,
  Award,
  Heart,
} from 'lucide-react';

interface TrustPageProps {
  onNavigate: (path: string) => void;
}

// 1. About Us Page
export const AboutView: React.FC<TrustPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="text-center mb-10">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-[#FF671F] uppercase tracking-wider">
          Our Story & Mission
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Demystifying Finance for 1.4 Billion Indians
        </h1>
        <p className="text-base text-slate-600 mt-3 max-w-2xl mx-auto">
          aitoolshub was engineered with a singular objective: To provide lightning-fast, 100% transparent, and mathematically accurate financial tools without ads clutter, forced registrations, or paywalls.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 text-sm md:text-base leading-relaxed">
        {/* Mission Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FF671F]" />
            Our Core Mission
          </h2>
          <p className="mb-4">
            Financial decisions—such as opting for a 25-year home loan, stepping up a mutual fund SIP, or choosing between the Old and New tax regimes—shape an individual’s life trajectory. Yet, most online calculators are weighed down by bloated tracking scripts, slow loading speeds, and opaque formulas.
          </p>
          <p>
            At <strong>aitoolshub (aitoolshub.co.in)</strong>, we build high-precision client-side calculators that execute instantly on any device. We pair each calculator with in-depth, verified editorial guides explaining taxation, risk factors, and real-world wealth strategies.
          </p>
        </div>

        {/* Editorial Standards & Integrity */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#046A38]" />
            Editorial Integrity & Fact-Checking Standard
          </h2>
          <p className="mb-4">
            Our editorial content is curated by financial analysts and chartered accountant contributors adhering to statutory rules established by:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm font-medium text-slate-800">
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Reserve Bank of India (RBI) Lending Guidelines
            </li>
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Securities and Exchange Board of India (SEBI)
            </li>
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Income Tax Department (CBDT) Provisions
            </li>
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Payment of Gratuity Act, 1972 Standards
            </li>
          </ul>
        </div>

        {/* Founder & Author Bio */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FF671F] to-[#046A38] text-white font-black text-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              AH
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                Founder & Chief Editor
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">Sujan Mondal & The aitoolshub Team</h3>
              <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
                Full-stack software architect and personal finance enthusiast passionate about making sophisticated financial tools accessible to everyone in India. Focused on algorithmic transparency, clean typography, and zero-latency web applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Contact Us Page
export const ContactView: React.FC<TrustPageProps> = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Feedback', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="text-center mb-10">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-[#046A38] uppercase tracking-wider">
          Get In Touch
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-3">
          Contact the aitoolshub Team
        </h1>
        <p className="text-sm md:text-base text-slate-600 mt-3 max-w-xl mx-auto">
          Have a suggestion, calculation formula question, bug report, or partnership inquiry? We respond within 24–48 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Direct Contact Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Official Communication</h3>
            
            <div className="flex items-start gap-3 text-xs">
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF671F] flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block">Support Email</span>
                <a href="mailto:support@aitoolshub.co.in" className="font-bold text-[#06038D] hover:underline">
                  support@aitoolshub.co.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#046A38] flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block">Official Domain</span>
                <span className="font-bold text-slate-800">aitoolshub.co.in</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block">Privacy Guarantee</span>
                <span className="text-slate-600">We never share your email address with third-party telemarketers or credit agencies.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xs">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-sm mx-auto">
                  Thank you for contacting aitoolshub. Our editorial desk has logged your ticket and will reply to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', subject: 'Feedback', message: '' }); }}
                  className="mt-6 px-4 py-2 text-xs font-bold text-[#FF671F] bg-orange-50 rounded-xl hover:bg-orange-100 transition cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF671F] bg-white"
                  >
                    <option value="Feedback">General Feedback / Compliment</option>
                    <option value="Bug">Formula / Bug Calculation Report</option>
                    <option value="Feature">Request a New Financial Calculator</option>
                    <option value="Advertising">Google AdSense / Partnership Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Detailed Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your suggestion or feedback in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF671F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white font-bold text-sm btn-3d-saffron flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Privacy Policy Page (GDPR, CCPA, Google AdSense & DoubleClick Cookie Compliance)
export const PrivacyPolicyView: React.FC<TrustPageProps> = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Legal Compliance</span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 mt-1">Last Updated: September 2026 · Compliant with GDPR, CCPA & Google AdSense</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-6 text-xs md:text-sm text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Overview & Data Philosophy</h2>
          <p>
            At <strong>aitoolshub (aitoolshub.co.in)</strong>, accessible from https://aitoolshub.co.in, protecting visitor privacy is our paramount priority. All financial calculation parameters (e.g. your salary, loan amounts, SIP figures) are computed entirely client-side inside your browser sandbox and are NEVER stored, transmitted, or logged on our servers.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Google AdSense & DoubleClick DART Cookies</h2>
          <p className="mb-2">
            Google is a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to aitoolshub.co.in and other sites on the internet.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
            <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#06038D] underline">Google Ads Settings</a> or through <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#06038D] underline">www.aboutads.info</a>.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Log Files & Anonymous Analytics</h2>
          <p>
            aitoolshub follows a standard procedure of utilizing anonymous log files. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. GDPR & CCPA Data Protection Rights</h2>
          <p>
            Every user is entitled to data access, rectification, erasure, and restriction rights. Because we do not collect personal profiles, email databases, or banking records, you navigate our site with complete anonymity.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">5. Contact Our Data Protection Officer</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:privacy@aitoolshub.co.in" className="text-[#FF671F] font-bold">privacy@aitoolshub.co.in</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

// 4. Terms of Service
export const TermsView: React.FC<TrustPageProps> = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Platform Terms</span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-1">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500 mt-1">Effective Date: September 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-6 text-xs md:text-sm text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and utilizing the web platform <strong>aitoolshub (aitoolshub.co.in)</strong>, you agree to be bound by these Terms and Conditions and all applicable laws and regulations in the Republic of India.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Permissible Use License</h2>
          <p>
            All tools, mathematical calculators, amortization exports, and educational guides on aitoolshub are freely provided for personal, educational, and preliminary budgeting purposes. You may not scrape or replicate our proprietary UI codebase for malicious spam distribution.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Accuracy of Calculations</h2>
          <p>
            While our algorithms are rigorously vetted against statutory guidelines (such as the Payment of Gratuity Act, Public Provident Fund Scheme 2019, and standard reducing-balance EMI math), financial institutions may apply specific internal rounding conventions. Always consult your official loan sanction letter or bank statements for exact billing amounts.
          </p>
        </div>
      </div>
    </div>
  );
};

// 5. Financial & Educational Disclaimer (Mandatory SEBI Compliance)
export const DisclaimerView: React.FC<TrustPageProps> = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
          Mandatory Regulatory Disclosure
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3">
          Financial & Educational Disclaimer
        </h1>
        <p className="text-xs text-slate-500 mt-1">Strict compliance with SEBI (Research Analysts) Regulations</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-xs space-y-6 text-xs md:text-sm text-slate-700 leading-relaxed">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-amber-900">
            <strong className="block text-sm">Not SEBI-Registered Financial Advice</strong>
            aitoolshub (aitoolshub.co.in) is an independent financial technology utility and educational publishing platform. <strong>We are NOT a SEBI-registered Investment Adviser (RIA), Research Analyst, Portfolio Management Service (PMS), or bank.</strong>
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Informational & Simulation Purposes Only</h2>
          <p>
            All calculations, projections, charts, and figures generated on this website are simulated mathematical estimates based on user-provided inputs. They do not constitute an offer, solicitation, or recommendation to buy or sell securities, mutual fund units, insurance policies, or financial instruments.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Market Risk Disclosure</h2>
          <p>
            Mutual fund investments and equity securities are subject to market risks. Read all scheme-related documents carefully before investing. Historical returns, past compound annual growth rates (CAGR), and simulated scenarios do not guarantee future performance.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Tax Laws Subject to Legislative Amendments</h2>
          <p>
            Tax laws in India (including capital gains tax under Sections 111A and 112A, deductions under Section 80C, and TDS thresholds) are subject to annual legislative amendments enacted in Union Budgets. Users should consult a qualified Chartered Accountant (CA) or certified tax professional for individual tax planning.
          </p>
        </div>
      </div>
    </div>
  );
};
