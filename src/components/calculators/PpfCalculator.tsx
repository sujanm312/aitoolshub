import React, { useState, useId } from 'react';
import { calculatePPF } from '../../utils/calculations';
import { formatINR, formatINRCompact, numberToIndianWords } from '../../utils/formatters';
import { DonutChart } from '../ui/DonutChart';
import { GrowthBarChart } from '../ui/GrowthBarChart';
import { ShieldCheck, Calendar, Lock } from 'lucide-react';

export const PpfCalculator: React.FC = () => {
  const [annualDeposit, setAnnualDeposit] = useState<number>(150000);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const interestRate = 7.1; // Official Indian Gov PPF rate

  const depositInputId = useId();

  const result = calculatePPF(annualDeposit, tenureYears, interestRate);

  const chartData = [
    {
      label: 'Total Deposits (Sec 80C)',
      value: result.totalInvested,
      color: '#06038D', // Ashoka Navy
      formattedValue: formatINR(result.totalInvested),
    },
    {
      label: 'Tax-Free Interest (EEE)',
      value: result.totalInterest,
      color: '#046A38', // India Green
      formattedValue: formatINR(result.totalInterest),
    },
  ];

  const formattedYearly = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    invested: row.invested,
    returns: row.balance - row.invested,
    total: row.balance,
  }));

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-100/70 p-5 md:p-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#06038D]" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Public Provident Fund (PPF) Calculator
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Sovereign guarantee, 7.1% interest rate, and Exemplary Triple Tax Exemption (EEE)
          </p>
        </div>

        {/* EEE Badge */}
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-[#046A38]" />
          <span>100% Tax-Free (EEE Status)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Annual Deposit */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={depositInputId} className="text-sm font-bold text-slate-700">
                Annual Deposit Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">₹</span>
                <input
                  id={depositInputId}
                  type="number"
                  min="500"
                  max="150000"
                  step="1000"
                  value={annualDeposit}
                  onChange={(e) => setAnnualDeposit(Math.min(150000, Math.max(0, Number(e.target.value))))}
                  className="w-36 pl-7 pr-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06038D] text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min="500"
              max="150000"
              step="500"
              value={annualDeposit}
              onChange={(e) => setAnnualDeposit(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5">
              <span>₹500 (Min)</span>
              <span className="text-[#06038D] font-semibold">{numberToIndianWords(annualDeposit)}</span>
              <span>₹1.5 Lakh (Max Statutory Cap)</span>
            </div>
          </div>

          {/* Tenure Blocks */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <label className="text-sm font-bold text-slate-700 block mb-2">
              PPF Tenure & 5-Year Extension Blocks
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '15 Years', years: 15, sub: 'Standard' },
                { label: '20 Years', years: 20, sub: '+1 Block' },
                { label: '25 Years', years: 25, sub: '+2 Blocks' },
                { label: '30 Years', years: 30, sub: '+3 Blocks' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setTenureYears(item.years)}
                  className={`py-2 px-2 rounded-xl border text-center transition cursor-pointer ${
                    tenureYears === item.years
                      ? 'bg-[#06038D] text-white border-[#06038D] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] opacity-75">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Fixed Government Rate Notice */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Govt. Notified Interest Rate</span>
                <span className="text-[11px] text-slate-500">Ministry of Finance declared quarterly</span>
              </div>
            </div>
            <span className="text-base font-black text-[#046A38] bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
              7.10% p.a.
            </span>
          </div>

          {/* 5th of the Month Pro Tip */}
          <div className="p-4 rounded-2xl border border-orange-200 bg-orange-50/70 text-xs text-orange-900 flex items-start gap-2.5">
            <span className="text-lg">🗓️</span>
            <div>
              <span className="font-bold">Golden PPF Rule:</span>
              <p className="text-[11px] text-orange-800 mt-0.5">
                Always deposit between the 1st and 5th of each month (or April 1–5 for lump-sum) to earn interest for that full month!
              </p>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="bg-gradient-to-br from-[#06038D] via-[#0F172A] to-[#046A38] text-white p-5 rounded-2xl shadow-xl shadow-slate-900/15 mb-6 relative overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Total Maturity Value (Tax Free)
            </span>
            <div className="text-3xl md:text-4xl font-black tracking-tight text-white mt-1">
              {formatINR(result.maturityValue)}
            </div>
            <div className="text-xs text-slate-200 mt-1">
              In words: <span className="font-semibold text-emerald-200">{numberToIndianWords(result.maturityValue)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Capital Deposited</span>
              <div className="text-lg md:text-xl font-extrabold text-[#06038D] mt-1">
                {formatINR(result.totalInvested)}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">Eligible for 80C</span>
            </div>

            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Total Tax-Free Interest</span>
              <div className="text-lg md:text-xl font-extrabold text-[#046A38] mt-1">
                {formatINR(result.totalInterest)}
              </div>
              <span className="text-[11px] text-emerald-700 mt-0.5 block font-bold">
                +{((result.totalInterest / (result.totalInvested || 1)) * 100).toFixed(0)}% Growth
              </span>
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-200/80">
            <DonutChart
              data={chartData}
              centerLabel="Maturity"
              centerValue={formatINRCompact(result.maturityValue)}
              size={200}
            />
          </div>
        </div>
      </div>

      {/* Trajectory */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <GrowthBarChart
          data={formattedYearly}
          investedLabel="Total PPF Deposits"
          returnsLabel="Accumulated Tax-Free Interest"
        />
      </div>
    </div>
  );
};
