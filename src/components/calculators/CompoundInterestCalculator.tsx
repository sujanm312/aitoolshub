import React, { useState, useId } from 'react';
import { calculateCompoundInterest } from '../../utils/calculations';
import { formatINR, formatINRCompact, numberToIndianWords } from '../../utils/formatters';
import { DonutChart } from '../ui/DonutChart';
import { GrowthBarChart } from '../ui/GrowthBarChart';
import { Zap, Clock, TrendingUp } from 'lucide-react';

export const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(500000);
  const [rate, setRate] = useState<number>(10);
  const [tenureYears, setTenureYears] = useState<number>(10);
  const [frequency, setFrequency] = useState<1 | 2 | 4 | 12 | 365>(4); // Quarterly default
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);

  const principalInputId = useId();
  const rateInputId = useId();
  const tenureInputId = useId();

  const result = calculateCompoundInterest(
    principal,
    rate,
    tenureYears,
    frequency,
    monthlyContribution
  );

  const chartData = [
    {
      label: 'Initial Principal',
      value: result.principalAmount,
      color: '#06038D', // Ashoka Navy
      formattedValue: formatINR(result.principalAmount),
    },
    {
      label: 'Compound Interest',
      value: result.totalInterest,
      color: '#046A38', // India Green
      formattedValue: formatINR(result.totalInterest),
    },
  ];

  // Rule of 72 doubling estimate
  const doublingYears = rate > 0 ? (72 / rate).toFixed(1) : '∞';

  const formattedYearly = result.yearlyBreakdown.map((row) => ({
    year: row.year,
    invested: principal,
    returns: row.balance - principal,
    total: row.balance,
  }));

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-100/70 p-5 md:p-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF671F]" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Compound Interest Estimator
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Multi-frequency compounding analysis with Rule of 72 doubling forecast
          </p>
        </div>

        {/* Rule of 72 Badge */}
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-xl text-xs font-bold text-orange-800">
          <Zap className="w-3.5 h-3.5 text-[#FF671F]" />
          <span>Rule of 72: Doubles every {doublingYears} years</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Initial Principal */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={principalInputId} className="text-sm font-bold text-slate-700">
                Principal Amount (P)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">₹</span>
                <input
                  id={principalInputId}
                  type="number"
                  min="1000"
                  max="10000000"
                  step="5000"
                  value={principal}
                  onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
                  className="w-36 pl-7 pr-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min="10000"
              max="5000000"
              step="10000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
              <span>₹10,000</span>
              <span className="text-[#FF671F] font-semibold">{numberToIndianWords(principal)}</span>
              <span>₹50 Lakh</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={rateInputId} className="text-sm font-bold text-slate-700">
                Annual Interest Rate (r)
              </label>
              <div className="relative">
                <input
                  id={rateInputId}
                  type="number"
                  min="1"
                  max="30"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-24 pr-6 pl-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-sm"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">%</span>
              </div>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              step="0.25"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
              <span>2%</span>
              <span className="font-semibold text-slate-700">{rate}% per annum</span>
              <span>25%</span>
            </div>
          </div>

          {/* Compounding Frequency Selector */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <label className="text-sm font-bold text-slate-700 block mb-2">
              Compounding Frequency (n)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {[
                { label: 'Annually', val: 1 },
                { label: 'Half-Yearly', val: 2 },
                { label: 'Quarterly', val: 4 },
                { label: 'Monthly', val: 12 },
                { label: 'Daily', val: 365 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setFrequency(item.val as 1 | 2 | 4 | 12 | 365)}
                  className={`py-2 px-1.5 text-[11px] font-bold rounded-xl border transition cursor-pointer text-center ${
                    frequency === item.val
                      ? 'bg-[#06038D] text-white border-[#06038D] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tenure */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={tenureInputId} className="text-sm font-bold text-slate-700">
                Investment Duration
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
            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
              <span>1 Year</span>
              <span className="font-semibold text-slate-700">{tenureYears} Years</span>
              <span>35 Years</span>
            </div>
          </div>
        </div>

        {/* Right Output & Donut */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="bg-gradient-to-br from-[#06038D] via-[#0F172A] to-[#046A38] text-white p-5 rounded-2xl shadow-xl shadow-slate-900/15 mb-6 relative overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
              Total Accrued Amount (Maturity)
            </span>
            <div className="text-3xl md:text-4xl font-black tracking-tight text-white mt-1">
              {formatINR(result.totalMaturityAmount)}
            </div>
            <div className="text-xs text-slate-200 mt-1">
              In words: <span className="font-semibold text-amber-200">{numberToIndianWords(result.totalMaturityAmount)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Initial Deposit</span>
              <div className="text-lg md:text-xl font-extrabold text-[#06038D] mt-1">
                {formatINR(result.principalAmount)}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">100% Principal</span>
            </div>

            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Total Interest Earned</span>
              <div className="text-lg md:text-xl font-extrabold text-[#046A38] mt-1">
                {formatINR(result.totalInterest)}
              </div>
              <span className="text-[11px] text-emerald-700 mt-0.5 block font-bold">
                +{( (result.totalInterest / (result.principalAmount || 1)) * 100 ).toFixed(1)}% Multiplier
              </span>
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-200/80">
            <DonutChart
              data={chartData}
              centerLabel="Maturity Value"
              centerValue={formatINRCompact(result.totalMaturityAmount)}
              size={200}
            />
          </div>
        </div>
      </div>

      {/* Trajectory */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <GrowthBarChart
          data={formattedYearly}
          investedLabel="Starting Principal"
          returnsLabel="Compounded Growth"
        />
      </div>
    </div>
  );
};
