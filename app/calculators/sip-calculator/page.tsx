'use client';

import React, { useState, useMemo, useId } from 'react';
import {
  TrendingUp,
  Sparkles,
  Flame,
  HelpCircle,
  ChevronDown,
  Info,
  ShieldCheck,
  Award,
  ArrowRight,
  PieChart as PieChartIcon,
  Calculator,
} from 'lucide-react';

export default function SipCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [expectedRate, setExpectedRate] = useState<number>(12);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [enableStepUp, setEnableStepUp] = useState<boolean>(false);
  const [stepUpRate, setStepUpRate] = useState<number>(10);
  const [enableInflation, setEnableInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const monthlyInputId = useId();
  const rateInputId = useId();
  const tenureInputId = useId();
  const stepUpInputId = useId();
  const inflationInputId = useId();

  // Mathematical Calculation Engine
  const result = useMemo(() => {
    const P = Math.max(0, monthlyInvestment);
    const r = Math.max(0.01, expectedRate);
    const years = Math.max(1, tenureYears);
    const i = r / (12 * 100);

    let totalInvested = 0;
    let maturityValue = 0;
    const yearlyBreakdown: { year: number; invested: number; value: number }[] = [];

    if (!enableStepUp || stepUpRate <= 0) {
      const n = years * 12;
      totalInvested = P * n;
      maturityValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);

      for (let y = 1; y <= years; y++) {
        const curN = y * 12;
        const curInvested = P * curN;
        const curVal = P * ((Math.pow(1 + i, curN) - 1) / i) * (1 + i);
        yearlyBreakdown.push({
          year: y,
          invested: Math.round(curInvested),
          value: Math.round(curVal),
        });
      }
    } else {
      let currentMonthly = P;
      let runningBalance = 0;
      let runningInvested = 0;

      for (let y = 1; y <= years; y++) {
        for (let m = 1; m <= 12; m++) {
          runningInvested += currentMonthly;
          runningBalance = (runningBalance + currentMonthly) * (1 + i);
        }
        yearlyBreakdown.push({
          year: y,
          invested: Math.round(runningInvested),
          value: Math.round(runningBalance),
        });
        currentMonthly = currentMonthly * (1 + stepUpRate / 100);
      }
      totalInvested = runningInvested;
      maturityValue = runningBalance;
    }

    const estReturns = Math.max(0, maturityValue - totalInvested);

    let inflationAdjustedValue: number | undefined;
    if (enableInflation && inflationRate > 0) {
      inflationAdjustedValue = maturityValue / Math.pow(1 + inflationRate / 100, years);
    }

    return {
      investedAmount: Math.round(totalInvested),
      estReturns: Math.round(estReturns),
      totalValue: Math.round(maturityValue),
      inflationAdjustedValue: inflationAdjustedValue ? Math.round(inflationAdjustedValue) : undefined,
      yearlyBreakdown,
    };
  }, [monthlyInvestment, expectedRate, tenureYears, enableStepUp, stepUpRate, enableInflation, inflationRate]);

  // Indian Number Formatting
  const formatINR = (val: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatCompact = (val: number): string => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return formatINR(val);
  };

  const numberToIndianWords = (num: number): string => {
    if (num <= 0) return 'Zero Rupees';
    const crores = Math.floor(num / 10000000);
    const remCrores = num % 10000000;
    const lakhs = Math.floor(remCrores / 100000);
    const remLakhs = remCrores % 100000;
    const thousands = Math.floor(remLakhs / 1000);

    const parts: string[] = [];
    if (crores > 0) parts.push(`${crores} Crore`);
    if (lakhs > 0) parts.push(`${lakhs} Lakh`);
    if (thousands > 0 && crores === 0) parts.push(`${thousands} Thousand`);
    return parts.length > 0 ? parts.join(' ') + ' Rupees' : formatINR(num);
  };

  // Donut Chart Math
  const total = result.totalValue || 1;
  const investedPercent = Math.min(100, Math.max(0, (result.investedAmount / total) * 100));
  const returnsPercent = 100 - investedPercent;
  const strokeDashoffsetReturns = 100 - returnsPercent;

  const faqs = [
    {
      q: 'What is a Systematic Investment Plan (SIP) and how does it work?',
      a: 'A Systematic Investment Plan (SIP) is a disciplined method offered by mutual funds in India where an investor deposits a fixed amount of capital at regular intervals (usually monthly) into an equity, debt, or hybrid fund scheme. Instead of attempting to time volatile market peaks and troughs, SIP leverages Rupee Cost Averaging—purchasing more mutual fund units when Net Asset Values (NAVs) decline and fewer units when prices surge, systematically optimizing your weighted purchase price.',
    },
    {
      q: 'Which is better for Indian retail investors: SIP or Lumpsum?',
      a: 'SIP is statistically superior for retail investors looking to mitigate timing risk and navigate market volatility smoothly. It inculcates disciplined monthly saving habits from your cash salary. A Lumpsum investment yields higher returns only if entered during severe market undervaluation or corrections, but exposes the investor to high drawdown risk if entered at cyclical market all-time highs.',
    },
    {
      q: 'How are Equity Mutual Fund SIP returns taxed under Indian Income Tax law?',
      a: 'Under the revised Budget 2024 tax framework: Long-Term Capital Gains (LTCG) on equity mutual funds held for more than 12 months are taxed at 12.5% on profits exceeding ₹1.25 Lakh per financial year (previously ₹1 Lakh at 10%). Short-Term Capital Gains (STCG) on units sold within 12 months are taxed at 20% flat. Importantly for SIPs, each monthly installment is treated as an independent investment tranche with its own 12-month capital gain holding clock.',
    },
    {
      q: 'What is a Step-Up SIP (Top-Up SIP) and why is it recommended?',
      a: 'A Step-Up SIP automatically increments your monthly installment by a predetermined percentage (e.g., 10% or ₹1,000) every calendar year. As your annual salary, business revenue, and disposable income increase, stepping up your SIP expands your terminal wealth exponentially. For instance, stepping up a ₹10,000 monthly SIP by 10% annually over 20 years creates more than double the terminal maturity corpus of a flat SIP.',
    },
    {
      q: 'Can I pause, alter, or cancel my SIP without paying financial penalties?',
      a: 'Yes. Unlike bank Fixed Deposits or Recurring Deposits that charge premature breaking penalties, mutual fund SIPs offer full liquidity and flexibility. You can pause your SIP mandate for up to 3–6 months or cancel it entirely through your AMC or discount broker (Groww, Zerodha Coin, Kuvera) at zero penalty charges. You may also redeem accumulated units whenever desired, subject to applicable fund exit loads (typically 1% within 365 days).',
    },
  ];

  // Structured Data Schema for Google AdSense & Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'aitoolshub SIP Calculator India',
        operatingSystem: 'All',
        applicationCategory: 'FinanceApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description:
          'Precision Indian Systematic Investment Plan (SIP) calculator with step-up top-up compounding, inflation adjustments, and visual wealth growth charts.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://aitoolshub.co.in/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Calculators',
            item: 'https://aitoolshub.co.in/calculators/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'SIP Calculator',
            item: 'https://aitoolshub.co.in/calculators/sip-calculator/',
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <a href="/" className="hover:text-slate-900 transition">Home</a>
          <span>/</span>
          <span className="text-slate-400">Calculators</span>
          <span>/</span>
          <span className="text-[#FF671F] font-bold">SIP Calculator</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF671F] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Mutual Funds & Wealth Compounding
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            SIP Calculator (Systematic Investment Plan)
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Calculate your estimated wealth accumulation, mutual fund maturity returns, and purchasing power parity with annual Step-Up top-ups and inflation controls.
          </p>
        </div>

        {/* TOP AD BANNER PLACEHOLDER */}
        <div className="mb-8 p-4 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-center shadow-xs">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
            Google AdSense Responsive Unit (Top Header)
          </div>
          <div className="h-20 sm:h-24 bg-slate-50 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium">
            &lt;!-- AdSense Unit: Desktop/Mobile Responsive Leaderboard (728x90 / 320x100) --&gt;
          </div>
        </div>

        {/* INTERACTIVE CALCULATOR CARD */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
          {/* Saffron & Green Accent Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-[#FF671F] via-[#FF9933] to-[#046A38]" />

          <div className="p-6 sm:p-8">
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-[#FF671F]" />
                Investment Presets:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => { setMonthlyInvestment(5000); setTenureYears(10); setExpectedRate(12); }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-[#FF671F] font-bold text-xs text-slate-700 transition border border-slate-200 cursor-pointer"
                >
                  ₹5k / 10y
                </button>
                <button
                  type="button"
                  onClick={() => { setMonthlyInvestment(10000); setTenureYears(15); setExpectedRate(12); setEnableStepUp(true); setStepUpRate(10); }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-[#FF671F] font-bold text-xs text-slate-700 transition border border-slate-200 cursor-pointer"
                >
                  ₹10k Step-Up
                </button>
                <button
                  type="button"
                  onClick={() => { setMonthlyInvestment(25000); setTenureYears(20); setExpectedRate(13); }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-[#FF671F] font-bold text-xs text-slate-700 transition border border-slate-200 cursor-pointer"
                >
                  ₹25k / 20y
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form Inputs & Range Sliders */}
              <div className="lg:col-span-6 space-y-6">
                {/* Input 1: Monthly Investment */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <label htmlFor={monthlyInputId} className="text-sm font-bold text-slate-700">
                      Monthly Investment Amount (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">₹</span>
                      <input
                        id={monthlyInputId}
                        type="number"
                        min="500"
                        max="2000000"
                        step="500"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(Math.max(0, Number(e.target.value)))}
                        className="w-36 pl-7 pr-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-sm"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="150000"
                    step="500"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
                    <span>₹500</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-orange-50 text-[#FF671F] font-bold border border-orange-100">
                      {numberToIndianWords(monthlyInvestment)}
                    </span>
                    <span>₹1.5 Lakh</span>
                  </div>
                </div>

                {/* Input 2: Expected CAGR Return Rate */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <label htmlFor={rateInputId} className="text-sm font-bold text-slate-700">
                      Expected Annual Return Rate (CAGR)
                    </label>
                    <div className="relative">
                      <input
                        id={rateInputId}
                        type="number"
                        min="1"
                        max="35"
                        step="0.1"
                        value={expectedRate}
                        onChange={(e) => setExpectedRate(Math.max(0.1, Number(e.target.value)))}
                        className="w-24 pr-6 pl-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-sm"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="0.5"
                    value={expectedRate}
                    onChange={(e) => setExpectedRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>5% (Debt Fund)</span>
                    <span className="text-[#046A38] font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      12% - 15% (Nifty 50)
                    </span>
                    <span>25% (Small Cap)</span>
                  </div>
                </div>

                {/* Input 3: Tenure in Years */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <label htmlFor={tenureInputId} className="text-sm font-bold text-slate-700">
                      Investment Horizon (Years)
                    </label>
                    <div className="relative">
                      <input
                        id={tenureInputId}
                        type="number"
                        min="1"
                        max="40"
                        value={tenureYears}
                        onChange={(e) => setTenureYears(Math.max(1, Math.min(40, Number(e.target.value))))}
                        className="w-24 pr-8 pl-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-sm"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">Yrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="35"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>1 Year</span>
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {tenureYears * 12} Monthly Installments
                    </span>
                    <span>35 Years</span>
                  </div>
                </div>

                {/* Toggles: Step-Up & Inflation */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
                  {/* Step-Up Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-[#FF671F]">
                          <TrendingUp className="w-3.5 h-3.5" />
                        </span>
                        Annual Step-Up SIP (Top-Up)
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">Increase SIP amount yearly as your income expands</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnableStepUp(!enableStepUp)}
                      className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        enableStepUp ? 'bg-[#046A38]' : 'bg-slate-300'
                      }`}
                      aria-label="Toggle Step-Up SIP"
                    >
                      <div
                        className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                          enableStepUp ? 'translate-x-5.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {enableStepUp && (
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <label htmlFor={stepUpInputId} className="text-xs font-bold text-slate-700">
                        Annual Increase Rate:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          id={stepUpInputId}
                          type="number"
                          min="1"
                          max="50"
                          value={stepUpRate}
                          onChange={(e) => setStepUpRate(Number(e.target.value))}
                          className="w-20 px-2.5 py-1.5 text-right text-xs font-black border border-slate-300 rounded-xl bg-white shadow-xs focus:ring-2 focus:ring-[#046A38] outline-none"
                        />
                        <span className="text-xs font-bold text-slate-600">% per year</span>
                      </div>
                    </div>
                  )}

                  {/* Inflation Toggle */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                          <Flame className="w-3.5 h-3.5" />
                        </span>
                        Adjust for Inflation (Real Value)
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">Calculate real purchasing power at maturity</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnableInflation(!enableInflation)}
                      className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                        enableInflation ? 'bg-[#FF671F]' : 'bg-slate-300'
                      }`}
                      aria-label="Toggle Inflation Adjustment"
                    >
                      <div
                        className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                          enableInflation ? 'translate-x-5.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {enableInflation && (
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <label htmlFor={inflationInputId} className="text-xs font-bold text-slate-700">
                        Assumed Annual CPI Inflation:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          id={inflationInputId}
                          type="number"
                          min="1"
                          max="15"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(Number(e.target.value))}
                          className="w-20 px-2.5 py-1.5 text-right text-xs font-black border border-slate-300 rounded-xl bg-white shadow-xs focus:ring-2 focus:ring-[#FF671F] outline-none"
                        />
                        <span className="text-xs font-bold text-slate-600">% per year</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Output Metrics & Visual SVG Donut Chart */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 relative overflow-hidden">
                    <div className="h-1.5 bg-[#06038D] absolute top-0 left-0 right-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Invested Capital
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-[#06038D] mt-2">
                      {formatINR(result.investedAmount)}
                    </div>
                    <span className="text-xs text-slate-400 mt-1 block font-medium">
                      {formatCompact(result.investedAmount)} total
                    </span>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-emerald-200 relative overflow-hidden">
                    <div className="h-1.5 bg-[#046A38] absolute top-0 left-0 right-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#046A38]">
                      Wealth Gain (Est.)
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-[#046A38] mt-2">
                      {formatINR(result.estReturns)}
                    </div>
                    <span className="text-xs text-[#046A38] mt-1 block font-bold">
                      +{((result.estReturns / (result.investedAmount || 1)) * 100).toFixed(0)}% Profit
                    </span>
                  </div>
                </div>

                {/* Expected Maturity Corpus Card */}
                <div className="bg-gradient-to-br from-[#0B0F19] via-[#111C38] to-[#06038D] text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-indigo-950/50 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-300">
                      Expected Maturity Corpus
                    </span>
                    {result.totalValue >= 10000000 && (
                      <span className="px-3 py-1 rounded-full bg-[#FF671F] text-white text-xs font-black flex items-center gap-1.5 shadow-md">
                        <Sparkles className="w-3.5 h-3.5" />
                        Crorepati Milestone!
                      </span>
                    )}
                  </div>

                  <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mt-2">
                    {formatINR(result.totalValue)}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 mt-2 flex flex-wrap items-center gap-1.5">
                    <span>In words:</span>
                    <span className="font-bold text-orange-200 bg-orange-950/60 px-2.5 py-0.5 rounded-md border border-orange-800/40">
                      {numberToIndianWords(result.totalValue)}
                    </span>
                  </div>

                  {result.inflationAdjustedValue && (
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-300">Purchasing Power Today ({inflationRate}% Inflation):</span>
                      <span className="font-bold text-amber-300 bg-amber-950/50 px-2.5 py-1 rounded-lg border border-amber-800/30">
                        {formatINR(result.inflationAdjustedValue)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Donut Chart Visual */}
                <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <PieChartIcon className="w-3.5 h-3.5 text-[#06038D]" />
                      Corpus Distribution
                    </span>
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Compound Ratio
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    {/* SVG Donut */}
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        {/* Background Ring */}
                        <path
                          className="text-slate-200"
                          strokeWidth="3.8"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Invested Slice */}
                        <path
                          className="text-[#06038D] transition-all duration-500 ease-out"
                          strokeDasharray={`${investedPercent}, 100`}
                          strokeWidth="3.8"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Returns Slice */}
                        <path
                          className="text-[#046A38] transition-all duration-500 ease-out"
                          strokeDasharray={`${returnsPercent}, 100`}
                          strokeDashoffset={-investedPercent}
                          strokeWidth="3.8"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Total Value</span>
                        <span className="text-sm font-black text-slate-900">{formatCompact(result.totalValue)}</span>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-3 text-xs w-full sm:w-auto">
                      <div className="flex items-center justify-between gap-4 p-2 rounded-xl bg-white border border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-[#06038D]" />
                          <span className="font-semibold text-slate-700">Invested Capital:</span>
                        </div>
                        <span className="font-black text-slate-900">{investedPercent.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 p-2 rounded-xl bg-white border border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-[#046A38]" />
                          <span className="font-semibold text-slate-700">Estimated Gains:</span>
                        </div>
                        <span className="font-black text-[#046A38]">{returnsPercent.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tactile Action Button */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Calculations strictly follow compound interest standards used by AMFI and Indian asset management companies.
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white btn-3d-saffron flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Print or Save Summary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* MID-CONTENT AD BANNER PLACEHOLDER */}
        <div className="mb-12 p-4 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-center shadow-xs">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
            Google AdSense Responsive Unit (Mid-Content In-Article)
          </div>
          <div className="h-24 bg-slate-50 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium">
            &lt;!-- AdSense Unit: Desktop/Mobile Responsive In-Article Native Banner --&gt;
          </div>
        </div>

        {/* MATHEMATICAL FORMULA BREAKDOWN & WORKED EXAMPLE */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#06038D] flex items-center justify-center font-bold">
              ∑
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Mathematical Formula Breakdown & Worked Numerical Example
            </h2>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            The future maturity value of a regular Systematic Investment Plan (SIP) where payments occur at the beginning of each monthly period is computed using the future value of an annuity due formula:
          </p>

          <div className="bg-slate-900 text-slate-100 p-5 sm:p-6 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto mb-6 border border-slate-800">
            <div className="text-orange-400 font-bold mb-2"># Standard Compound SIP Formula:</div>
            <div className="text-base sm:text-lg text-emerald-400 font-black mb-3">
              M = P × [((1 + i)^n - 1) / i] × (1 + i)
            </div>
            <div className="space-y-1 text-slate-300">
              <div><strong className="text-white">M</strong> = Final Maturity Corpus at horizon</div>
              <div><strong className="text-white">P</strong> = Monthly investment contribution (Periodic installment)</div>
              <div><strong className="text-white">i</strong> = Periodic monthly compounding rate = r / (12 × 100)</div>
              <div><strong className="text-white">n</strong> = Total number of monthly installments = Tenure (Years) × 12</div>
              <div><strong className="text-white">r</strong> = Expected nominal annual return rate (%)</div>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl">
            <h3 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-700" />
              Worked Example: ₹10,000 / Month at 12% Annual CAGR for 10 Years
            </h3>
            <ul className="text-xs text-amber-900/90 space-y-1.5 font-mono">
              <li>1. Monthly Installment (P) = ₹10,000</li>
              <li>2. Monthly Interest Rate (i) = 12 / (12 × 100) = 0.01 per month</li>
              <li>3. Total Installments (n) = 10 × 12 = 120 months</li>
              <li>4. Compounding factor: (1 + 0.01)^120 ≈ 3.30038689</li>
              <li>5. Annuity numerator: 3.30038689 - 1 = 2.30038689</li>
              <li>6. Divided by i: 2.30038689 / 0.01 = 230.038689</li>
              <li>7. Multiply by (1 + i): 230.038689 × 1.01 = 232.339076</li>
              <li>8. Multiply by P: ₹10,000 × 232.339076 = <strong>₹23,23,391 (Maturity Value)</strong></li>
              <li>Total Capital Invested: ₹10,000 × 120 = <strong>₹12,00,000</strong></li>
              <li>Estimated Wealth Gain: ₹23,23,391 - ₹12,00,000 = <strong>₹11,23,391 (+93.6% gain)</strong></li>
            </ul>
          </div>
        </div>

        {/* 700+ WORDS IN-DEPTH EDITORIAL GUIDE */}
        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm prose prose-slate max-w-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#046A38] text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Comprehensive Investor Editorial Guide
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 not-prose mb-6">
            The Complete Guide to Systematic Investment Plans (SIP) in India: Math, Mechanics & Wealth Acceleration
          </h2>

          <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              In the modern landscape of personal finance in India, the Systematic Investment Plan (SIP) has established itself as the bedrock of retail wealth creation. Managed under the rigorous regulatory purview of the Securities and Exchange Board of India (SEBI) and promoted collectively by the Association of Mutual Funds in India (AMFI), SIPs empower salaried professionals, self-employed business owners, and young earners to convert incremental monthly cash surpluses into substantial generational wealth.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 not-prose mt-8 mb-3">
              1. The Power of Rupee Cost Averaging vs. Market Timing
            </h3>
            <p>
              One of the most profound psychological and mathematical advantages of a mutual fund SIP is <strong>Rupee Cost Averaging</strong>. The emotional pitfall that causes most individual retail traders to incur losses is attempting to time macroeconomic market fluctuations—buying excessively when stock markets are trading near euphoric peaks, and panicking during bear market corrections.
            </p>
            <p>
              Under an automated SIP mandate, your predetermined installment purchases units across all market environments. When the Nifty 50 or BSE Sensex experiences a sharp drawdown, your monthly ₹10,000 allocation automatically secures a higher quantum of mutual fund units at depressed Net Asset Values (NAVs). Conversely, when markets rally to new record valuations, fewer units are accumulated. Over a complete multi-year economic cycle (7 to 15 years), this operational mechanism consistently drives down your aggregate cost per unit, amplifying your compounding velocity upon market recovery.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 not-prose mt-8 mb-3">
              2. Compounding Velocity and the 8th Wonder of the World
            </h3>
            <p>
              Albert Einstein famously remarked that compound interest is the eighth wonder of the world: <em>he who understands it, earns it; he who doesn’t, pays it</em>. In a standard SIP, the returns generated in Year 1 begin generating their own standalone returns in Year 2, Year 3, and throughout subsequent decades. 
            </p>
            <p>
              During the initial 5-year phase of an investment, the visual difference between your cumulative capital deployed and the total fund value appears modest. However, past Year 10, the curve bends dramatically upward as the compounding engine hits its critical inflection threshold. By Year 15 or Year 20, the proportion of investment returns drastically surpasses your lifetime principal out-of-pocket contributions, often accounting for 70% to 85% of your final accumulated corpus.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 not-prose mt-8 mb-3">
              3. The Multiplier Effect: Why You Must Use a Step-Up SIP
            </h3>
            <p>
              A conventional flat SIP keeps the contribution identical for decades. However, human earnings are not static—in India, average corporate salary increments range between 7% and 12% annually. A <strong>Step-Up SIP</strong> (frequently termed a Top-Up SIP) harmonizes your investment commitment with your ascending income trajectory.
            </p>
            <p>
              Consider this striking real-world comparison over a 20-year horizon at a conservative 12% annual CAGR:
            </p>
            <ul>
              <li><strong>Flat SIP of ₹10,000/month:</strong> Total invested = ₹24 Lakhs. Final maturity corpus ≈ <strong>₹99.91 Lakhs</strong>.</li>
              <li><strong>10% Annual Step-Up SIP starting at ₹10,000:</strong> Total invested = ₹68.7 Lakhs. Final maturity corpus ≈ <strong>₹2.03 Crores</strong>!</li>
            </ul>
            <p>
              By simply redirecting a minor fraction of your annual compensation bonus or promotion raise into your monthly SIP mandate, your terminal wealth more than doubles, shaving years off your targeted financial independence retirement age.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 not-prose mt-8 mb-3">
              4. Understanding Inflation and Real Purchasing Power
            </h3>
            <p>
              A critical oversight made by many long-term financial planners is focusing solely on nominal figures rather than inflation-adjusted real purchasing power. Over a 20-year window, a nominal corpus of ₹1 Crore will not buy what ₹1 Crore buys today. Assuming a baseline Consumer Price Index (CPI) inflation rate of 6% per annum in India, the purchasing power of money roughly halves every 12 years (Rule of 72).
            </p>
            <p>
              Our calculator uniquely provides an <strong>Inflation-Adjusted Real Value</strong> toggle. If your 20-year nominal SIP accumulates ₹1.5 Crores at 6% sustained inflation, its real purchasing power in today's money equals approximately ₹46.7 Lakhs. Accounting for inflation ensures you do not inadvertently underfund your post-retirement livelihood or children's overseas higher education goals.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 not-prose mt-8 mb-3">
              5. Taxation of Mutual Fund SIPs in India (Budget 2024 Amendments)
            </h3>
            <p>
              Every Indian investor must understand the tax liability incurred when redeeming mutual fund units. Under the statutory amendments enacted in the Union Budget of July 2024:
            </p>
            <ul>
              <li>
                <strong>Long-Term Capital Gains (LTCG) on Equity Mutual Funds:</strong> Applicable when equity units are held for longer than 12 months. Gains exceeding <strong>₹1.25 Lakh per financial year</strong> are taxed at <strong>12.5%</strong> (without indexation benefit). The first ₹1.25 Lakh of profit remains entirely tax-exempt.
              </li>
              <li>
                <strong>Short-Term Capital Gains (STCG) on Equity Mutual Funds:</strong> Applicable on units redeemed within 12 months of allotment, taxed at a flat rate of <strong>20%</strong>.
              </li>
              <li>
                <strong>First-In, First-Out (FIFO) Rule for SIPs:</strong> Crucially, each monthly installment is treated as an independent investment. For instance, an installment paid in January 2024 becomes eligible for the lower LTCG rate in January 2025, whereas the installment paid in December 2024 remains classified under STCG until December 2025.
              </li>
            </ul>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 not-prose mt-8 mb-3">
              6. Actionable Blueprint: How to Construct Your SIP Portfolio
            </h3>
            <p>
              To optimize risk-adjusted returns, experienced wealth managers recommend an age-appropriate asset allocation strategy:
            </p>
            <ol>
              <li><strong>Core Allocation (50–60%):</strong> Allocate into large-cap index funds (Nifty 50 or Nifty Next 50) or well-established flexi-cap funds. These provide stability and capture India's GDP growth story.</li>
              <li><strong>Growth Allocation (25–30%):</strong> Deploy capital into mid-cap and quality small-cap mutual funds to capture high-beta outperformance over 7+ year holding durations.</li>
              <li><strong>Stability & Emergency Allocation (10–15%):</strong> Maintain a portion in short-term debt funds, banking & PSU debt funds, or sovereign gold bonds (SGB) to hedge against sudden equity volatility.</li>
            </ol>
            <p>
              Remember: Wealth accumulation through SIP is not a get-rich-quick scheme. It is an exercise in stoic financial discipline, emotional patience, and systematic execution. Use the aitoolshub SIP calculator regularly to review your portfolio, calibrate your step-up targets, and stay firmly on course toward lasting financial sovereignty.
            </p>
          </div>
        </article>

        {/* COLLAPSIBLE FAQ ACCORDION SECTION */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF671F] flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Frequently Asked Questions (FAQs)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                High-intent queries on SIP investments, compounding, taxes, and liquidity
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#FF671F]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 py-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM AD BANNER PLACEHOLDER */}
        <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-slate-200 text-center shadow-xs">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
            Google AdSense Responsive Unit (Bottom Matched Content)
          </div>
          <div className="h-24 bg-slate-50 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium">
            &lt;!-- AdSense Unit: Desktop/Mobile Responsive Multiplex / Matched Content --&gt;
          </div>
        </div>
      </div>
    </>
  );
}
