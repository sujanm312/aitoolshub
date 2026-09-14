import React, { useState, useId } from 'react';
import {
  IndianRupee,
  Building,
  Home,
  FileCheck,
  ShieldCheck,
  Calculator,
  Percent,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
} from 'lucide-react';

export const HraExemptionCalculator: React.FC = () => {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [basicSalary, setBasicSalary] = useState<number>(600000);
  const [dearnessAllowance, setDearnessAllowance] = useState<number>(0);
  const [hraReceived, setHraReceived] = useState<number>(240000);
  const [rentPaid, setRentPaid] = useState<number>(216000);
  const [isMetro, setIsMetro] = useState<boolean>(true); // Delhi, Mumbai, Kolkata, Chennai
  const [taxSlab, setTaxSlab] = useState<number>(20); // 10%, 20%, 30%

  // Normalization to annual figures for IT Act Section 10(13A)
  const multiplier = period === 'monthly' ? 12 : 1;
  const annualBasic = (basicSalary + dearnessAllowance) * multiplier;
  const annualHraReceived = hraReceived * multiplier;
  const annualRentPaid = rentPaid * multiplier;

  // Rule 2A Conditions
  // 1. Actual HRA received
  const condition1 = annualHraReceived;

  // 2. Rent paid minus 10% of Salary (Basic + DA)
  const tenPercentSalary = 0.1 * annualBasic;
  const condition2 = Math.max(0, annualRentPaid - tenPercentSalary);

  // 3. 50% of salary for Metro (Delhi, Mumbai, Kolkata, Chennai) or 40% for Non-Metro
  const metroPercentage = isMetro ? 0.5 : 0.4;
  const condition3 = metroPercentage * annualBasic;

  // Exempt amount is the LEAST of the three
  const exemptHra = Math.min(condition1, condition2, condition3);
  const taxableHra = Math.max(0, annualHraReceived - exemptHra);
  const taxSaved = (exemptHra * taxSlab) / 100;

  // Formats
  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.round(val));

  const basicId = useId();
  const daId = useId();
  const hraId = useId();
  const rentId = useId();

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF671F]">
            Section 10(13A) · Rule 2A Verified
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            HRA Exemption & Tax Savings Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compute House Rent Allowance exemption under Old Tax Regime to optimize salary tax deductions.
          </p>
        </div>

        {/* Monthly / Annual Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              period === 'monthly'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Monthly Values
          </button>
          <button
            onClick={() => setPeriod('yearly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              period === 'yearly'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Annual / Yearly
          </button>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Input Parameters */}
        <div className="lg:col-span-6 space-y-4">
          {/* Basic Salary */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={basicId} className="text-xs font-bold text-slate-700">
                {period === 'monthly' ? 'Monthly' : 'Annual'} Basic Salary
              </label>
              <span className="text-xs font-mono font-bold text-[#06038D]">
                {formatINR(basicSalary)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
                ₹
              </span>
              <input
                id={basicId}
                type="number"
                value={basicSalary}
                onChange={(e) => setBasicSalary(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#FF671F] font-semibold text-slate-900 text-sm"
              />
            </div>
          </div>

          {/* Dearness Allowance (Optional) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={daId} className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <span>Dearness Allowance (DA forming part of retirement)</span>
              </label>
              <span className="text-xs font-mono font-semibold text-slate-600">
                {formatINR(dearnessAllowance)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
                ₹
              </span>
              <input
                id={daId}
                type="number"
                value={dearnessAllowance}
                onChange={(e) => setDearnessAllowance(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#FF671F] font-semibold text-slate-900 text-sm"
                placeholder="0 if not applicable"
              />
            </div>
          </div>

          {/* HRA Received */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={hraId} className="text-xs font-bold text-slate-700">
                {period === 'monthly' ? 'Monthly' : 'Annual'} HRA Received from Employer
              </label>
              <span className="text-xs font-mono font-bold text-[#FF671F]">
                {formatINR(hraReceived)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
                ₹
              </span>
              <input
                id={hraId}
                type="number"
                value={hraReceived}
                onChange={(e) => setHraReceived(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#FF671F] font-semibold text-slate-900 text-sm"
              />
            </div>
          </div>

          {/* Rent Paid */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={rentId} className="text-xs font-bold text-slate-700">
                {period === 'monthly' ? 'Monthly' : 'Annual'} Total Rent Paid
              </label>
              <span className="text-xs font-mono font-bold text-[#046A38]">
                {formatINR(rentPaid)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
                ₹
              </span>
              <input
                id={rentId}
                type="number"
                value={rentPaid}
                onChange={(e) => setRentPaid(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#FF671F] font-semibold text-slate-900 text-sm"
              />
            </div>
          </div>

          {/* City Classification & Tax Bracket */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                City of Accommodation
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsMetro(true)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                    isMetro
                      ? 'border-[#06038D] bg-indigo-50/70 text-[#06038D]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div>Metro (50%)</div>
                  <div className="text-[10px] text-slate-500 font-normal">Delhi/Mum/Kol/Chn</div>
                </button>
                <button
                  onClick={() => setIsMetro(false)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                    !isMetro
                      ? 'border-[#06038D] bg-indigo-50/70 text-[#06038D]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div>Non-Metro (40%)</div>
                  <div className="text-[10px] text-slate-500 font-normal">All other cities</div>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Marginal Income Tax Slab
              </label>
              <select
                value={taxSlab}
                onChange={(e) => setTaxSlab(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs text-slate-800"
              >
                <option value={5}>5% Slab</option>
                <option value={10}>10% Slab</option>
                <option value={15}>15% Slab</option>
                <option value={20}>20% Slab (Average)</option>
                <option value={30}>30% Slab (Highest)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results & Legal Calculation Breakdown */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                Total Exempt HRA (Tax-Free)
              </span>
              <div className="text-2xl font-black text-[#046A38] mt-1">
                {formatINR(exemptHra)}
              </div>
              <span className="text-[10px] text-emerald-700 mt-0.5 block">
                Deducted from gross salary under Sec 10(13A)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                Taxable HRA
              </span>
              <div className="text-2xl font-black text-amber-900 mt-1">
                {formatINR(taxableHra)}
              </div>
              <span className="text-[10px] text-amber-700 mt-0.5 block">
                Added to taxable income under salary head
              </span>
            </div>
          </div>

          {/* Rule 2A 3-Condition Audit Table */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span>Rule 2A Three-Point Test (Least is Exempt)</span>
              <CheckCircle2 className="w-4 h-4 text-[#046A38]" />
            </h3>

            <div className="space-y-2 text-xs">
              <div
                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  condition1 === exemptHra
                    ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-950'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span>1. Actual HRA Received from Employer:</span>
                <span className="font-mono">{formatINR(condition1)}</span>
              </div>

              <div
                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  condition2 === exemptHra
                    ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-950'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span>2. Rent Paid minus 10% of Basic Salary:</span>
                <span className="font-mono">{formatINR(condition2)}</span>
              </div>

              <div
                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  condition3 === exemptHra
                    ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-950'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span>3. {isMetro ? '50%' : '40%'} of Basic Salary ({isMetro ? 'Metro' : 'Non-Metro'}):</span>
                <span className="font-mono">{formatINR(condition3)}</span>
              </div>
            </div>
          </div>

          {/* Estimated Net Tax Saved Banner */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-indigo-900 block">
                Estimated Net Tax Saved ({taxSlab}% Bracket):
              </span>
              <div className="text-xl font-black text-[#06038D]">
                {formatINR(taxSaved)} / year
              </div>
            </div>
            <div className="text-right text-[11px] text-indigo-700">
              Applicable in <strong>Old Tax Regime</strong>.<br />
              New Regime does not allow HRA.
            </div>
          </div>

          {/* Compliance Notice */}
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <strong>Landlord PAN Mandatory:</strong> If your annual rent paid exceeds <strong>₹1,00,000</strong> (₹8,333/month), submitting your landlord's PAN to your payroll department on <strong>Form 12BB</strong> is legally mandatory under CBDT circulars.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
