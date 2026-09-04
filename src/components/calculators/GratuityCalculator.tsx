import React, { useState, useId } from 'react';
import { calculateGratuity } from '../../utils/calculations';
import { formatINR, formatINRCompact, numberToIndianWords } from '../../utils/formatters';
import { DonutChart } from '../ui/DonutChart';
import { Award, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const GratuityCalculator: React.FC = () => {
  const [basicSalary, setBasicSalary] = useState<number>(75000);
  const [tenureYears, setTenureYears] = useState<number>(8);
  const [tenureMonths, setTenureMonths] = useState<number>(4);
  const [isCovered, setIsCovered] = useState<boolean>(true);

  const salaryInputId = useId();
  const yearsInputId = useId();
  const monthsInputId = useId();

  const result = calculateGratuity(basicSalary, tenureYears, tenureMonths, isCovered);

  const chartData = [
    {
      label: 'Tax-Free Gratuity (Section 10(10))',
      value: result.taxExemptAmount,
      color: '#046A38', // India Green
      formattedValue: formatINR(result.taxExemptAmount),
    },
    ...(result.taxableAmount > 0
      ? [
          {
            label: 'Taxable Gratuity (> ₹20L)',
            value: result.taxableAmount,
            color: '#FF671F', // Saffron
            formattedValue: formatINR(result.taxableAmount),
          },
        ]
      : []),
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-100/70 p-5 md:p-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#046A38]" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Indian Gratuity Calculator
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Payment of Gratuity Act 1972 statutory rules & ₹20 Lakh tax-free limit
          </p>
        </div>

        {/* Act Coverage Selector */}
        <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200/90 text-xs sm:text-sm relative">
          <button
            onClick={() => setIsCovered(true)}
            className={`relative z-10 px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
              isCovered ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {isCovered && (
              <motion.div
                layoutId="gratuityActTab"
                className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200/80"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              />
            )}
            <span className="relative z-10">Covered Under Act (15/26)</span>
          </button>
          <button
            onClick={() => setIsCovered(false)}
            className={`relative z-10 px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
              !isCovered ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {!isCovered && (
              <motion.div
                layoutId="gratuityActTab"
                className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200/80"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              />
            )}
            <span className="relative z-10">Not Covered (15/30)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Basic Salary + DA */}
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={salaryInputId} className="text-sm font-bold text-slate-700">
                Monthly Last Drawn (Basic + DA)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">₹</span>
                <input
                  id={salaryInputId}
                  type="number"
                  min="5000"
                  max="2000000"
                  step="5000"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(Math.max(0, Number(e.target.value)))}
                  className="w-36 pl-7 pr-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#046A38] text-sm shadow-2xs"
                />
              </div>
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={basicSalary}
              onChange={(e) => setBasicSalary(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#046A38]"
            />
            <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
              <span>₹10,000</span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100 text-xs">
                {numberToIndianWords(basicSalary)}
              </span>
              <span>₹5 Lakh</span>
            </div>
          </motion.div>

          {/* Service Years */}
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <label htmlFor={yearsInputId} className="text-sm font-bold text-slate-700">
                Completed Years of Service
              </label>
              <div className="relative">
                <input
                  id={yearsInputId}
                  type="number"
                  min="0"
                  max="45"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Math.max(0, Math.min(45, Number(e.target.value))))}
                  className="w-24 pr-8 pl-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#046A38] text-sm shadow-2xs"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">Yrs</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#046A38]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>1 Year</span>
              <span className="font-semibold text-slate-700">{tenureYears} Years</span>
              <span>40 Years</span>
            </div>
          </motion.div>

          {/* Additional Months */}
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="bg-gradient-to-br from-white to-slate-50/50 p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <label htmlFor={monthsInputId} className="text-sm font-bold text-slate-700">
                  Additional Months (over full years)
                </label>
                <p className="text-xs text-slate-400">
                  {isCovered ? '≥ 6 months round UP to an additional year' : 'Fractional months ignored'}
                </p>
              </div>
              <div className="relative">
                <input
                  id={monthsInputId}
                  type="number"
                  min="0"
                  max="11"
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Math.max(0, Math.min(11, Number(e.target.value))))}
                  className="w-24 pr-8 pl-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#046A38] text-sm shadow-2xs"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">Mos</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="11"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#046A38]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>0 Months</span>
              <span className="text-slate-600 font-semibold">
                {isCovered && tenureMonths >= 6 ? '≥ 6 mos (Rounds up to next year!)' : `${tenureMonths} Months`}
              </span>
              <span>11 Months</span>
            </div>
          </motion.div>

          {/* Statutory Eligibility Status Alert */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border text-sm flex items-start gap-3.5 shadow-xs transition-colors ${
              result.isEligible
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                : 'bg-amber-50/90 border-amber-200 text-amber-900'
            }`}
          >
            {result.isEligible ? (
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 text-[#046A38]">
                <CheckCircle className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}
            <div>
              <span className="font-bold text-base block">
                {result.isEligible
                  ? 'Eligible for Statutory Gratuity'
                  : '5-Year Continuous Service Requirement'}
              </span>
              <p className="mt-1 text-xs sm:text-sm leading-relaxed">
                {result.isEligible
                  ? `You meet the mandatory continuous service criteria. Effective service counted: ${result.yearsCounted} years.`
                  : 'Under the Payment of Gratuity Act, an employee must complete at least 5 years of continuous service with the employer to become entitled to gratuity (except in cases of demise or permanent disability).'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          {/* Hero Result Banner */}
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-gradient-to-br from-[#051E13] via-[#046A38] to-[#06038D] text-white p-6 sm:p-7 rounded-3xl shadow-xl shadow-emerald-950/20 mb-6 relative overflow-hidden group border border-emerald-600/30"
          >
            {/* Ambient Lighting Orbs */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#06038D]/40 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-300" />
                Total Gratuity Payable
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 font-bold border border-white/10">
                {isCovered ? '15/26 Working Days' : '15/30 Full Days'}
              </span>
            </div>

            <motion.div
              key={result.gratuityAmount}
              initial={{ opacity: 0.7, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mt-2 relative z-10"
            >
              {formatINR(result.gratuityAmount)}
            </motion.div>

            <div className="text-xs sm:text-sm text-slate-200 mt-2 relative z-10 flex flex-wrap items-center gap-1.5">
              <span>In words:</span>
              <span className="font-semibold text-emerald-200 bg-emerald-900/60 px-2.5 py-0.5 rounded-md border border-emerald-700/40">
                {numberToIndianWords(result.gratuityAmount)}
              </span>
            </div>
          </motion.div>

          {/* Breakdown Stat Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-2xs relative overflow-hidden"
            >
              <div className="h-1.5 bg-gradient-to-r from-[#046A38] to-teal-500 absolute top-0 left-0 right-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#046A38]" />
                Tax-Exempt Portion
              </span>
              <motion.div
                key={result.taxExemptAmount}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className="text-xl sm:text-2xl font-black text-[#046A38] mt-2"
              >
                {formatINR(result.taxExemptAmount)}
              </motion.div>
              <span className="text-xs text-emerald-700 font-medium mt-1 block">
                Exempt under Sec 10(10) (Max ₹20L)
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs relative overflow-hidden"
            >
              <div className="h-1.5 bg-gradient-to-r from-slate-400 to-slate-600 absolute top-0 left-0 right-0" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Taxable Gratuity
              </span>
              <motion.div
                key={result.taxableAmount}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className="text-xl sm:text-2xl font-black text-slate-900 mt-2"
              >
                {formatINR(result.taxableAmount)}
              </motion.div>
              <span className="text-xs text-slate-500 mt-1 block font-medium">
                {result.taxableAmount > 0 ? 'Taxed as per slab' : 'Nil (100% Tax-Free)'}
              </span>
            </motion.div>
          </div>

          {/* Donut Chart Card */}
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="bg-slate-50/70 rounded-3xl p-5 border border-slate-200/80 shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Distribution Breakdown
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                Section 10(10) Compliance
              </span>
            </div>
            <DonutChart
              data={chartData}
              centerLabel="Gratuity"
              centerValue={formatINRCompact(result.gratuityAmount)}
              size={210}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
