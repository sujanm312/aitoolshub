import React, { useState, useId } from 'react';
import { calculateSIP } from '../../utils/calculations';
import { formatINR, formatINRCompact, numberToIndianWords } from '../../utils/formatters';
import { DonutChart } from '../ui/DonutChart';
import { GrowthBarChart } from '../ui/GrowthBarChart';
import { Sparkles, Sliders, TrendingUp, HelpCircle, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

export const SipCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [expectedRate, setExpectedRate] = useState<number>(12);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [enableStepUp, setEnableStepUp] = useState<boolean>(false);
  const [stepUpRate, setStepUpRate] = useState<number>(10);
  const [enableInflation, setEnableInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(6);

  const monthlyInputId = useId();
  const rateInputId = useId();
  const tenureInputId = useId();
  const stepUpInputId = useId();
  const inflationInputId = useId();

  const result = calculateSIP(
    monthlyInvestment,
    expectedRate,
    tenureYears,
    enableStepUp ? stepUpRate : 0,
    enableInflation ? inflationRate : 0
  );

  const chartData = [
    {
      label: 'Invested Capital',
      value: result.investedAmount,
      color: '#06038D', // Ashoka Navy
      formattedValue: formatINR(result.investedAmount),
    },
    {
      label: 'Wealth Gain (Returns)',
      value: result.estReturns,
      color: '#046A38', // India Emerald Green
      formattedValue: formatINR(result.estReturns),
    },
  ];

  // Check if Crorepati reached
  const isCrorepati = result.totalValue >= 10000000;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF671F', '#046A38', '#06038D', '#FFD700'],
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-100/70 p-5 md:p-8">
      {/* Top Header & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF671F]" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              SIP Investment Calculator
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Real-time monthly compounding with Step-Up & Inflation models
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] mr-1 hidden sm:inline">Presets:</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setMonthlyInvestment(5000); setTenureYears(10); setExpectedRate(12); }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 font-bold text-slate-700 transition-colors border border-slate-200/60 hover:border-orange-200 cursor-pointer"
          >
            ₹5k / 10y
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setMonthlyInvestment(10000); setTenureYears(15); setExpectedRate(12); setEnableStepUp(true); setStepUpRate(10); }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 font-bold text-slate-700 transition-colors border border-slate-200/60 hover:border-orange-200 cursor-pointer"
          >
            ₹10k Step-Up
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setMonthlyInvestment(25000); setTenureYears(20); setExpectedRate(13); }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 font-bold text-slate-700 transition-colors border border-slate-200/60 hover:border-orange-200 cursor-pointer"
          >
            ₹25k / 20y
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Column: Interactive Inputs and Sliders */}
        <div className="lg:col-span-6 space-y-6">
          {/* Input 1: Monthly Investment */}
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-orange-300 focus-within:border-[#FF671F] focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={monthlyInputId} className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                Monthly Investment (P)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">₹</span>
                <input
                  id={monthlyInputId}
                  type="number"
                  min="500"
                  max="1000000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Math.max(0, Number(e.target.value)))}
                  className="w-36 pl-7 pr-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-sm shadow-2xs"
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
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF671F]"
            />
            <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
              <span>₹500</span>
              <span className="px-2.5 py-0.5 rounded-md bg-orange-50 text-[#FF671F] font-bold border border-orange-100 text-xs">
                {numberToIndianWords(monthlyInvestment)}
              </span>
              <span>₹1.5 Lakh</span>
            </div>
          </motion.div>

          {/* Input 2: Expected Annual Return Rate */}
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-orange-300 focus-within:border-[#FF671F] focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={rateInputId} className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                Expected Annual Return Rate (CAGR)
              </label>
              <div className="relative">
                <input
                  id={rateInputId}
                  type="number"
                  min="1"
                  max="30"
                  step="0.1"
                  value={expectedRate}
                  onChange={(e) => setExpectedRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-24 pr-6 pl-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-sm shadow-2xs"
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
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF671F]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>5% (Debt)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                12% - 15% (Typical Nifty 50 Equity)
              </span>
              <span>25% (Small Cap)</span>
            </div>
          </motion.div>

          {/* Input 3: Investment Tenure */}
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-orange-300 focus-within:border-[#FF671F] focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={tenureInputId} className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                Time Horizon
              </label>
              <div className="relative">
                <input
                  id={tenureInputId}
                  type="number"
                  min="1"
                  max="40"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Math.max(1, Math.min(40, Number(e.target.value))))}
                  className="w-24 pr-8 pl-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF671F] text-sm shadow-2xs"
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
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF671F]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>1 Year</span>
              <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {tenureYears * 12} Monthly Installments
              </span>
              <span>35 Years</span>
            </div>
          </motion.div>

          {/* Advanced Toggles: Step-Up and Inflation */}
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="p-5 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white to-slate-50/70 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-[#FF671F]">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </span>
                  Annual Step-Up SIP (Top-Up)
                </span>
                <p className="text-xs text-slate-500 mt-0.5">Increase SIP amount every year as your income grows</p>
              </div>
              <button
                type="button"
                onClick={() => setEnableStepUp(!enableStepUp)}
                className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                  enableStepUp ? 'bg-[#046A38]' : 'bg-slate-300'
                }`}
              >
                <motion.div
                  layout
                  className={`bg-white w-4.5 h-4.5 rounded-full shadow-md ${
                    enableStepUp ? 'ml-auto' : 'mr-auto'
                  }`}
                />
              </button>
            </div>

            {enableStepUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-3 border-t border-slate-200/80 flex items-center justify-between"
              >
                <label htmlFor={stepUpInputId} className="text-xs font-bold text-slate-700">Annual Increase Rate:</label>
                <div className="flex items-center gap-2">
                  <input
                    id={stepUpInputId}
                    type="number"
                    min="1"
                    max="50"
                    value={stepUpRate}
                    onChange={(e) => setStepUpRate(Number(e.target.value))}
                    className="w-20 px-2.5 py-1.5 text-right text-xs font-black border border-slate-300 rounded-xl bg-white shadow-2xs focus:ring-2 focus:ring-[#046A38] outline-none"
                  />
                  <span className="text-xs font-bold text-slate-600">% per year</span>
                </div>
              </motion.div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-200/80">
              <div>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                    <Flame className="w-3.5 h-3.5" />
                  </span>
                  Adjust for Inflation (Real Value)
                </span>
                <p className="text-xs text-slate-500 mt-0.5">Computes purchasing power parity at maturity</p>
              </div>
              <button
                type="button"
                onClick={() => setEnableInflation(!enableInflation)}
                className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                  enableInflation ? 'bg-[#FF671F]' : 'bg-slate-300'
                }`}
              >
                <motion.div
                  layout
                  className={`bg-white w-4.5 h-4.5 rounded-full shadow-md ${
                    enableInflation ? 'ml-auto' : 'mr-auto'
                  }`}
                />
              </button>
            </div>

            {enableInflation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-3 border-t border-slate-200/80 flex items-center justify-between"
              >
                <label htmlFor={inflationInputId} className="text-xs font-bold text-slate-700">Assumed Annual CPI Inflation:</label>
                <div className="flex items-center gap-2">
                  <input
                    id={inflationInputId}
                    type="number"
                    min="1"
                    max="15"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-20 px-2.5 py-1.5 text-right text-xs font-black border border-slate-300 rounded-xl bg-white shadow-2xs focus:ring-2 focus:ring-[#FF671F] outline-none"
                  />
                  <span className="text-xs font-bold text-slate-600">% per year</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right Column: Key Numerical Output & Interactive Donut Chart */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden"
            >
              <div className="h-1.5 bg-gradient-to-r from-[#06038D] to-indigo-500 absolute top-0 left-0 right-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Invested Capital
              </span>
              <motion.div
                key={result.investedAmount}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className="text-xl sm:text-2xl font-black text-[#06038D] mt-2"
              >
                {formatINR(result.investedAmount)}
              </motion.div>
              <span className="text-xs text-slate-400 mt-1 block font-medium">
                {formatINRCompact(result.investedAmount)} total
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="bg-white p-5 rounded-2xl border border-emerald-200/90 shadow-2xs relative overflow-hidden"
            >
              <div className="h-1.5 bg-gradient-to-r from-[#046A38] to-emerald-400 absolute top-0 left-0 right-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Wealth Gain (Est.)
              </span>
              <motion.div
                key={result.estReturns}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className="text-xl sm:text-2xl font-black text-[#046A38] mt-2"
              >
                {formatINR(result.estReturns)}
              </motion.div>
              <span className="text-xs text-emerald-700 mt-1 block font-bold">
                +{((result.estReturns / (result.investedAmount || 1)) * 100).toFixed(0)}% Growth
              </span>
            </motion.div>
          </div>

          {/* Grand Maturity Card with Tricolor Highlight */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-gradient-to-br from-[#0B0F19] via-[#111C38] to-[#06038D] text-white p-6 sm:p-7 rounded-3xl shadow-xl shadow-slate-950/20 mb-6 relative overflow-hidden border border-indigo-900/40 group"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF671F]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#046A38]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-300">
                Expected Maturity Corpus
              </span>
              {isCrorepati && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerConfetti}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-orange-500/20 hover:brightness-110 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
                  Crorepati Milestone!
                </motion.button>
              )}
            </div>

            <motion.div
              key={result.totalValue}
              initial={{ opacity: 0.7, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mt-2 relative z-10"
            >
              {formatINR(result.totalValue)}
            </motion.div>
            <div className="text-xs sm:text-sm text-slate-300 mt-2 relative z-10 flex flex-wrap items-center gap-1.5">
              <span>In words:</span>
              <span className="font-semibold text-orange-200 bg-orange-950/60 px-2.5 py-0.5 rounded-md border border-orange-800/40">
                {numberToIndianWords(result.totalValue)}
              </span>
            </div>

            {result.inflationAdjustedValue && (
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm relative z-10">
                <span className="text-slate-300">Purchasing Power Today ({inflationRate}% Inflation):</span>
                <span className="font-bold text-amber-300 bg-amber-950/50 px-2.5 py-1 rounded-lg border border-amber-800/30">
                  {formatINR(result.inflationAdjustedValue)}
                </span>
              </div>
            )}
          </motion.div>

          {/* Donut Chart */}
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="bg-slate-50/70 rounded-3xl p-5 border border-slate-200/80 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Corpus Distribution
              </span>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                Compound Ratio
              </span>
            </div>
            <DonutChart
              data={chartData}
              centerLabel="Maturity Value"
              centerValue={formatINRCompact(result.totalValue)}
              size={210}
            />
          </motion.div>
        </div>
      </div>

      {/* Trajectory Bar Chart */}
      <motion.div
        whileHover={{ y: -2, transition: { duration: 0.15 } }}
        className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/40 p-5 rounded-3xl border border-slate-200/70 shadow-2xs"
      >
        <GrowthBarChart
          data={result.yearlyBreakdown}
          investedLabel="Cumulative Invested"
          returnsLabel="Accumulated Returns"
        />
      </motion.div>
    </div>
  );
};
