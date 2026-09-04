import React, { useState, useId } from 'react';
import { calculateFdRd } from '../../utils/calculations';
import { formatINR, formatINRCompact, numberToIndianWords } from '../../utils/formatters';
import { DonutChart } from '../ui/DonutChart';
import { PiggyBank, UserCheck, Percent, HelpCircle } from 'lucide-react';

export const FdRdCalculator: React.FC = () => {
  const [mode, setMode] = useState<'fd' | 'rd'>('fd');
  const [amount, setAmount] = useState<number>(1000000); // 10 Lakhs for FD, or 10,000 for RD
  const [rate, setRate] = useState<number>(7.25);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState<boolean>(false);
  const [estimateTDS, setEstimateTDS] = useState<boolean>(false);

  const amountInputId = useId();
  const rateInputId = useId();
  const tenureInputId = useId();

  const handleModeChange = (newMode: 'fd' | 'rd') => {
    setMode(newMode);
    if (newMode === 'rd' && amount > 100000) {
      setAmount(10000);
    } else if (newMode === 'fd' && amount < 50000) {
      setAmount(500000);
    }
  };

  const totalMonths = tenureYears * 12;
  const result = calculateFdRd(mode, amount, rate, totalMonths, isSeniorCitizen, estimateTDS);

  const chartData = [
    {
      label: mode === 'fd' ? 'Principal Deposit' : 'Cumulative RD Deposits',
      value: result.totalDeposit,
      color: '#06038D', // Ashoka Navy
      formattedValue: formatINR(result.totalDeposit),
    },
    {
      label: 'Interest Earned',
      value: result.totalInterest,
      color: '#046A38', // India Green
      formattedValue: formatINR(result.totalInterest),
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-100/70 p-5 md:p-8">
      {/* Top Header & Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF671F]" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {mode === 'fd' ? 'Fixed Deposit (FD) Calculator' : 'Recurring Deposit (RD) Calculator'}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Quarterly compounding bank returns, Senior Citizen rates & Section 194A TDS forecast
          </p>
        </div>

        {/* FD vs RD Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => handleModeChange('fd')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              mode === 'fd' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <PiggyBank className="w-3.5 h-3.5 text-[#FF671F]" />
            Fixed Deposit (FD)
          </button>
          <button
            onClick={() => handleModeChange('rd')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              mode === 'rd' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Percent className="w-3.5 h-3.5 text-[#046A38]" />
            Recurring Deposit (RD)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Amount */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={amountInputId} className="text-sm font-bold text-slate-700">
                {mode === 'fd' ? 'Total Investment Amount (P)' : 'Monthly Installment (P)'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">₹</span>
                <input
                  id={amountInputId}
                  type="number"
                  min={mode === 'fd' ? 10000 : 500}
                  max={mode === 'fd' ? 50000000 : 500000}
                  step={mode === 'fd' ? 10000 : 500}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  className="w-36 pl-7 pr-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-sm"
                />
              </div>
            </div>
            <input
              type="range"
              min={mode === 'fd' ? 10000 : 500}
              max={mode === 'fd' ? 5000000 : 100000}
              step={mode === 'fd' ? 10000 : 500}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5">
              <span>{mode === 'fd' ? '₹10,000' : '₹500'}</span>
              <span className="text-[#FF671F] font-semibold">{numberToIndianWords(amount)}</span>
              <span>{mode === 'fd' ? '₹50 Lakh' : '₹1 Lakh'}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={rateInputId} className="text-sm font-bold text-slate-700">
                Annual Interest Rate
              </label>
              <div className="relative">
                <input
                  id={rateInputId}
                  type="number"
                  min="2"
                  max="15"
                  step="0.05"
                  value={rate}
                  onChange={(e) => setRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-24 pr-6 pl-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-sm"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">%</span>
              </div>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
              <span>3% (Savings)</span>
              <span className="text-emerald-700 font-semibold">6.5% - 7.5% (Typical Bank FD)</span>
              <span>10% (NBFC/SFB)</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={tenureInputId} className="text-sm font-bold text-slate-700">
                Tenure Duration
              </label>
              <div className="relative">
                <input
                  id={tenureInputId}
                  type="number"
                  min="1"
                  max="10"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Math.max(1, Math.min(10, Number(e.target.value))))}
                  className="w-24 pr-8 pl-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-sm"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
              <span>1 Year (12 Mos)</span>
              <span className="font-semibold text-slate-700">{totalMonths} Months Total</span>
              <span>10 Years (120 Mos)</span>
            </div>
          </div>

          {/* Toggles: Senior Citizen & TDS */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#FF671F]" />
                  Senior Citizen (+0.50% Extra Rate)
                </span>
                <p className="text-[11px] text-slate-500">For Indian residents aged 60 years and above</p>
              </div>
              <button
                type="button"
                onClick={() => setIsSeniorCitizen(!isSeniorCitizen)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  isSeniorCitizen ? 'bg-[#046A38]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isSeniorCitizen ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-blue-600" />
                  Estimate 10% TDS (Section 194A)
                </span>
                <p className="text-[11px] text-slate-500">
                  Deducted if annual interest exceeds {isSeniorCitizen ? '₹50,000' : '₹40,000'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEstimateTDS(!estimateTDS)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  estimateTDS ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    estimateTDS ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="bg-gradient-to-br from-[#06038D] to-[#0F172A] text-white p-5 rounded-2xl shadow-xl shadow-slate-900/15 mb-6 relative overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
              Total Maturity Proceeds
            </span>
            <div className="text-3xl md:text-4xl font-black tracking-tight text-white mt-1">
              {formatINR(result.maturityAmount)}
            </div>
            <div className="text-xs text-slate-200 mt-1">
              In words: <span className="font-semibold text-amber-200">{numberToIndianWords(result.maturityAmount)}</span>
            </div>

            {estimateTDS && result.tdsDeductionEstimate > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-300">Estimated 10% TDS Deducted:</span>
                <span className="font-bold text-rose-300">-{formatINR(result.tdsDeductionEstimate)}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {mode === 'fd' ? 'Principal Invested' : 'Total RD Deposits'}
              </span>
              <div className="text-lg md:text-xl font-extrabold text-[#06038D] mt-1">
                {formatINR(result.totalDeposit)}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block font-mono">
                {mode === 'rd' ? `${totalMonths} installments` : 'Lump Sum'}
              </span>
            </div>

            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Total Interest Accrued
              </span>
              <div className="text-lg md:text-xl font-extrabold text-[#046A38] mt-1">
                {formatINR(result.totalInterest)}
              </div>
              <span className="text-[11px] text-emerald-700 mt-0.5 block font-bold">
                {isSeniorCitizen ? `${(rate + 0.5).toFixed(2)}% (Senior Rate)` : `${rate.toFixed(2)}% Rate`}
              </span>
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-200/80">
            <DonutChart
              data={chartData}
              centerLabel="Maturity"
              centerValue={formatINRCompact(result.maturityAmount)}
              size={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
