import React, { useState, useMemo } from 'react';
import {
  CheckCircle,
  HelpCircle,
  TrendingDown,
  Info,
  ShieldCheck,
  Building,
  HeartPulse,
  Home,
  Sparkles,
  ArrowRight,
  Receipt,
  Scale,
} from 'lucide-react';

export const OldVsNewTaxCalculator: React.FC = () => {
  // Income Inputs
  const [grossSalary, setGrossSalary] = useState<number>(1200000);
  const [otherIncome, setOtherIncome] = useState<number>(0);

  // Old Regime Deductions
  const [sec80C, setSec80C] = useState<number>(150000); // Max 1.5 Lakh
  const [sec80D, setSec80D] = useState<number>(25000); // Health insurance self/family
  const [sec80DParents, setSec80DParents] = useState<number>(25000); // Parents health insurance
  const [hraExemption, setHraExemption] = useState<number>(120000); // House Rent Allowance exempt
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(0); // Sec 24(b) max 2L
  const [sec80CCD, setSec80CCD] = useState<number>(50000); // NPS additional 50k
  const [otherDeductions, setOtherDeductions] = useState<number>(0); // 80E, 80G, 80TTA, etc.

  // Tax Calculation Engine for FY 2024-25 / 2025-26 (Budget Provisions)
  const taxResults = useMemo(() => {
    const totalIncome = grossSalary + otherIncome;

    // --- NEW REGIME CALCULATION ---
    // Standard Deduction: ₹75,000 (Budget update for salaried)
    const newStdDeduction = 75000;
    const newTaxableIncome = Math.max(0, totalIncome - newStdDeduction);

    // New Regime Slabs (Post-Budget update)
    // 0 to 3,00,000: Nil
    // 3,00,001 to 7,00,000: 5%
    // 7,00,001 to 10,00,000: 10%
    // 10,00,001 to 12,00,000: 15%
    // 12,00,001 to 15,00,000: 20%
    // Above 15,00,000: 30%
    let newRegimeTax = 0;
    const newSlabBreakdown: { slab: string; rate: string; tax: number }[] = [];

    if (newTaxableIncome > 300000) {
      const slab1 = Math.min(newTaxableIncome - 300000, 400000);
      const tax1 = slab1 * 0.05;
      newRegimeTax += tax1;
      newSlabBreakdown.push({ slab: '₹3L - ₹7L', rate: '5%', tax: tax1 });
    }
    if (newTaxableIncome > 700000) {
      const slab2 = Math.min(newTaxableIncome - 700000, 300000);
      const tax2 = slab2 * 0.10;
      newRegimeTax += tax2;
      newSlabBreakdown.push({ slab: '₹7L - ₹10L', rate: '10%', tax: tax2 });
    }
    if (newTaxableIncome > 1000000) {
      const slab3 = Math.min(newTaxableIncome - 1000000, 200000);
      const tax3 = slab3 * 0.15;
      newRegimeTax += tax3;
      newSlabBreakdown.push({ slab: '₹10L - ₹12L', rate: '15%', tax: tax3 });
    }
    if (newTaxableIncome > 1200000) {
      const slab4 = Math.min(newTaxableIncome - 1200000, 300000);
      const tax4 = slab4 * 0.20;
      newRegimeTax += tax4;
      newSlabBreakdown.push({ slab: '₹12L - ₹15L', rate: '20%', tax: tax4 });
    }
    if (newTaxableIncome > 1500000) {
      const slab5 = (newTaxableIncome - 1500000) * 0.30;
      newRegimeTax += slab5;
      newSlabBreakdown.push({ slab: 'Above ₹15L', rate: '30%', tax: slab5 });
    }

    // Section 87A Rebate under New Regime: Taxable income up to ₹7,00,000 pays NIL tax
    let newRebate87A = 0;
    if (newTaxableIncome <= 700000) {
      newRebate87A = newRegimeTax;
      newRegimeTax = 0;
    }

    // Health & Education Cess: 4%
    const newCess = Math.round(newRegimeTax * 0.04);
    const newTotalTax = Math.round(newRegimeTax + newCess);

    // --- OLD REGIME CALCULATION ---
    // Standard Deduction: ₹50,000 for salaried
    const oldStdDeduction = 50000;
    const capped80C = Math.min(sec80C, 150000);
    const capped80D = Math.min(sec80D, 25000) + Math.min(sec80DParents, 50000);
    const cappedHomeLoan = Math.min(homeLoanInterest, 200000);
    const cappedNPS = Math.min(sec80CCD, 50000);

    const oldTotalDeductions =
      oldStdDeduction +
      capped80C +
      capped80D +
      hraExemption +
      cappedHomeLoan +
      cappedNPS +
      otherDeductions;

    const oldTaxableIncome = Math.max(0, totalIncome - oldTotalDeductions);

    // Old Regime Slabs (General Individual < 60 yrs)
    // 0 to 2,50,000: Nil
    // 2,50,001 to 5,00,000: 5%
    // 5,00,001 to 10,00,000: 20%
    // Above 10,00,000: 30%
    let oldRegimeTax = 0;
    const oldSlabBreakdown: { slab: string; rate: string; tax: number }[] = [];

    if (oldTaxableIncome > 250000) {
      const slab1 = Math.min(oldTaxableIncome - 250000, 250000);
      const tax1 = slab1 * 0.05;
      oldRegimeTax += tax1;
      oldSlabBreakdown.push({ slab: '₹2.5L - ₹5L', rate: '5%', tax: tax1 });
    }
    if (oldTaxableIncome > 500000) {
      const slab2 = Math.min(oldTaxableIncome - 500000, 500000);
      const tax2 = slab2 * 0.20;
      oldRegimeTax += tax2;
      oldSlabBreakdown.push({ slab: '₹5L - ₹10L', rate: '20%', tax: tax2 });
    }
    if (oldTaxableIncome > 1000000) {
      const slab3 = (oldTaxableIncome - 1000000) * 0.30;
      oldRegimeTax += slab3;
      oldSlabBreakdown.push({ slab: 'Above ₹10L', rate: '30%', tax: slab3 });
    }

    // Section 87A Rebate under Old Regime: Taxable income up to ₹5,00,000 pays NIL tax (max ₹12,500)
    let oldRebate87A = 0;
    if (oldTaxableIncome <= 500000) {
      oldRebate87A = Math.min(oldRegimeTax, 12500);
      oldRegimeTax = Math.max(0, oldRegimeTax - oldRebate87A);
    }

    const oldCess = Math.round(oldRegimeTax * 0.04);
    const oldTotalTax = Math.round(oldRegimeTax + oldCess);

    const difference = oldTotalTax - newTotalTax;
    const betterRegime = difference > 0 ? 'New Regime' : difference < 0 ? 'Old Regime' : 'Equal';
    const absoluteSavings = Math.abs(difference);

    return {
      totalIncome,
      newRegime: {
        stdDeduction: newStdDeduction,
        taxableIncome: newTaxableIncome,
        taxBeforeCess: newRegimeTax,
        rebate87A: newRebate87A,
        cess: newCess,
        totalTax: newTotalTax,
        slabs: newSlabBreakdown,
      },
      oldRegime: {
        stdDeduction: oldStdDeduction,
        totalDeductions: oldTotalDeductions,
        taxableIncome: oldTaxableIncome,
        taxBeforeCess: oldRegimeTax,
        rebate87A: oldRebate87A,
        cess: oldCess,
        totalTax: oldTotalTax,
        slabs: oldSlabBreakdown,
      },
      betterRegime,
      absoluteSavings,
    };
  }, [
    grossSalary,
    otherIncome,
    sec80C,
    sec80D,
    sec80DParents,
    hraExemption,
    homeLoanInterest,
    sec80CCD,
    otherDeductions,
  ]);

  const formatINR = (val: number) =>
    '₹' + Math.round(val).toLocaleString('en-IN');

  return (
    <div className="space-y-8">
      {/* Top Winner Recommendation Card */}
      <div
        className={`p-6 rounded-2xl border ${
          taxResults.betterRegime === 'New Regime'
            ? 'bg-gradient-to-r from-emerald-900/10 via-emerald-800/5 to-teal-900/10 border-emerald-500/30'
            : taxResults.betterRegime === 'Old Regime'
            ? 'bg-gradient-to-r from-blue-900/10 via-indigo-800/5 to-slate-900/10 border-blue-500/30'
            : 'bg-slate-800/30 border-slate-700'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#046A38] text-white">
                Best Choice
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Updated for FY 2024-25 & 2025-26 Budget Slabs
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {taxResults.betterRegime === 'Equal'
                ? 'Both Regimes Result in Identical Tax'
                : `${taxResults.betterRegime} Saves You ${formatINR(taxResults.absoluteSavings)}`}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              {taxResults.betterRegime === 'New Regime'
                ? 'Under the revised New Tax Regime, higher standard deduction of ₹75,000 and lower slab rates yield lower overall tax liability.'
                : 'Your high Chapter VI-A deductions, HRA exemption, and home loan interest make the Old Tax Regime more beneficial.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">New Regime Tax</div>
              <div className="text-xl font-bold text-slate-900">
                {formatINR(taxResults.newRegime.totalTax)}
              </div>
            </div>
            <div className="text-slate-300 font-light text-2xl">vs</div>
            <div className="text-left">
              <div className="text-xs text-slate-500 font-medium">Old Regime Tax</div>
              <div className="text-xl font-bold text-slate-900">
                {formatINR(taxResults.oldRegime.totalTax)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#FF671F]" />
              <span>1. Annual Gross Income Details</span>
            </h3>

            {/* Gross Salary Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Gross Annual Salary (CTC excluding non-taxable perks)
                </label>
                <div className="flex items-center border border-slate-300 rounded-lg px-3 py-1 bg-slate-50">
                  <span className="text-xs text-slate-500 mr-1 font-bold">₹</span>
                  <input
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
                    className="w-32 text-right text-sm font-bold text-slate-900 bg-transparent focus:outline-none"
                    step={10000}
                    min={0}
                  />
                </div>
              </div>
              <input
                type="range"
                min={300000}
                max={5000000}
                step={25000}
                value={grossSalary}
                onChange={(e) => setGrossSalary(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF671F]"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>₹3 Lakh</span>
                <span>₹25 Lakh</span>
                <span>₹50 Lakh</span>
              </div>
            </div>

            {/* Other Income */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Income from Other Sources (Interest, FD, Freelance, Dividend)
                </label>
                <div className="flex items-center border border-slate-300 rounded-lg px-3 py-1 bg-slate-50">
                  <span className="text-xs text-slate-500 mr-1 font-bold">₹</span>
                  <input
                    type="number"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(Number(e.target.value) || 0)}
                    className="w-28 text-right text-sm font-bold text-slate-900 bg-transparent focus:outline-none"
                    step={5000}
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Deductions for Old Regime */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#06038D]" />
                <span>2. Deductions (Claimable Under Old Regime Only)</span>
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-[#06038D] font-bold">
                Total: {formatINR(taxResults.oldRegime.totalDeductions)}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Note: The New Tax Regime eliminates these exemptions in exchange for lower tax slab rates and a higher ₹75,000 standard deduction.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Section 80C */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Section 80C (EPF, PPF, ELSS, LIC)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Max ₹1.5L</span>
                </div>
                <input
                  type="number"
                  value={sec80C}
                  onChange={(e) => setSec80C(Number(e.target.value) || 0)}
                  className="w-full text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FF671F]"
                  max={150000}
                  min={0}
                />
              </div>

              {/* HRA Exemption */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    HRA Exemption (House Rent)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Under Sec 10(13A)</span>
                </div>
                <input
                  type="number"
                  value={hraExemption}
                  onChange={(e) => setHraExemption(Number(e.target.value) || 0)}
                  className="w-full text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FF671F]"
                  min={0}
                />
              </div>

              {/* Section 80D Self */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Section 80D (Health Insurance - Self/Family)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Max ₹25k</span>
                </div>
                <input
                  type="number"
                  value={sec80D}
                  onChange={(e) => setSec80D(Number(e.target.value) || 0)}
                  className="w-full text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FF671F]"
                  max={25000}
                  min={0}
                />
              </div>

              {/* Section 80D Parents */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Section 80D (Parents Mediclaim)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Max ₹50k Senior</span>
                </div>
                <input
                  type="number"
                  value={sec80DParents}
                  onChange={(e) => setSec80DParents(Number(e.target.value) || 0)}
                  className="w-full text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FF671F]"
                  max={50000}
                  min={0}
                />
              </div>

              {/* Home Loan Interest Sec 24b */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Home Loan Interest (Sec 24b)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Max ₹2 Lakh</span>
                </div>
                <input
                  type="number"
                  value={homeLoanInterest}
                  onChange={(e) => setHomeLoanInterest(Number(e.target.value) || 0)}
                  className="w-full text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FF671F]"
                  max={200000}
                  min={0}
                />
              </div>

              {/* NPS 80CCD(1B) */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    NPS Voluntary (Sec 80CCD 1B)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Max ₹50k</span>
                </div>
                <input
                  type="number"
                  value={sec80CCD}
                  onChange={(e) => setSec80CCD(Number(e.target.value) || 0)}
                  className="w-full text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#FF671F]"
                  max={50000}
                  min={0}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Summary Table */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Side-by-Side Breakdown</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                AY 2025-26
              </span>
            </h3>

            <div className="space-y-4 text-sm">
              {/* Gross Total */}
              <div className="flex justify-between py-2 border-b border-slate-800 text-slate-300">
                <span>Total Gross Income</span>
                <span className="font-bold text-white">{formatINR(taxResults.totalIncome)}</span>
              </div>

              {/* Standard Deduction */}
              <div className="flex justify-between py-2 border-b border-slate-800">
                <div>
                  <div className="text-slate-300">Standard Deduction</div>
                  <div className="text-[11px] text-slate-400">Salaried threshold</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-semibold">
                    New: {formatINR(taxResults.newRegime.stdDeduction)}
                  </div>
                  <div className="text-slate-400 text-xs">
                    Old: {formatINR(taxResults.oldRegime.stdDeduction)}
                  </div>
                </div>
              </div>

              {/* Total Deductions */}
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-300">Total Deductions Claimed</span>
                <div className="text-right">
                  <div className="text-emerald-400 font-semibold">
                    New: {formatINR(taxResults.newRegime.stdDeduction)}
                  </div>
                  <div className="text-blue-400 font-semibold">
                    Old: {formatINR(taxResults.oldRegime.totalDeductions)}
                  </div>
                </div>
              </div>

              {/* Net Taxable Income */}
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-300">Net Taxable Income</span>
                <div className="text-right">
                  <div className="text-white font-bold">
                    New: {formatINR(taxResults.newRegime.taxableIncome)}
                  </div>
                  <div className="text-slate-300 font-medium text-xs">
                    Old: {formatINR(taxResults.oldRegime.taxableIncome)}
                  </div>
                </div>
              </div>

              {/* 87A Rebate */}
              {(taxResults.newRegime.rebate87A > 0 || taxResults.oldRegime.rebate87A > 0) && (
                <div className="flex justify-between py-2 border-b border-slate-800 text-emerald-400">
                  <span>Section 87A Tax Rebate</span>
                  <div className="text-right">
                    <div>New: -{formatINR(taxResults.newRegime.rebate87A)}</div>
                    {taxResults.oldRegime.rebate87A > 0 && (
                      <div className="text-xs">Old: -{formatINR(taxResults.oldRegime.rebate87A)}</div>
                    )}
                  </div>
                </div>
              )}

              {/* 4% Cess */}
              <div className="flex justify-between py-2 border-b border-slate-800 text-slate-400 text-xs">
                <span>Health & Education Cess (4%)</span>
                <div className="text-right">
                  <div>New: {formatINR(taxResults.newRegime.cess)}</div>
                  <div>Old: {formatINR(taxResults.oldRegime.cess)}</div>
                </div>
              </div>

              {/* FINAL NET TAX PAYABLE */}
              <div className="pt-2">
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                  Total Tax Payable (Net Liability)
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`p-3.5 rounded-xl border ${
                      taxResults.betterRegime === 'New Regime'
                        ? 'bg-emerald-950/60 border-emerald-500'
                        : 'bg-slate-800/60 border-slate-700'
                    }`}
                  >
                    <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <span>NEW REGIME</span>
                      {taxResults.betterRegime === 'New Regime' && (
                        <CheckCircle className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="text-2xl font-black text-white mt-1">
                      {formatINR(taxResults.newRegime.totalTax)}
                    </div>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border ${
                      taxResults.betterRegime === 'Old Regime'
                        ? 'bg-blue-950/60 border-blue-500'
                        : 'bg-slate-800/60 border-slate-700'
                    }`}
                  >
                    <div className="text-xs text-blue-400 font-bold flex items-center gap-1">
                      <span>OLD REGIME</span>
                      {taxResults.betterRegime === 'Old Regime' && (
                        <CheckCircle className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="text-2xl font-black text-white mt-1">
                      {formatINR(taxResults.oldRegime.totalTax)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakeven Deduction Indicator */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
              <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Quick Breakeven Rule of Thumb</span>
              </div>
              For gross salaries between ₹12L–₹15L, you typically need over{' '}
              <strong className="text-amber-300">₹3.75 Lakhs to ₹4.25 Lakhs</strong> in total eligible
              deductions (HRA + 80C + 80D + Home Loan) for the Old Regime to outperform the New Regime.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
