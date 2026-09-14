import React, { useState, useMemo } from 'react';
import {
  Home,
  TrendingDown,
  Percent,
  Calendar,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const HomeLoanPrepaymentCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(4500000); // 45 Lakh
  const [interestRate, setInterestRate] = useState<number>(8.75); // 8.75%
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20); // 20 years

  // Prepayment strategies
  const [prepaymentType, setPrepaymentType] = useState<'extra-emi' | 'lump-sum' | 'monthly-extra'>('extra-emi');
  const [extraEmiPerYear, setExtraEmiPerYear] = useState<number>(1); // 1 extra EMI every year
  const [lumpSumAmount, setLumpSumAmount] = useState<number>(200000); // 2 Lakh lump sum
  const [lumpSumYear, setLumpSumYear] = useState<number>(3); // paid in year 3
  const [monthlyExtra, setMonthlyExtra] = useState<number>(2500); // extra 2,500 every month

  const loanResults = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / (12 * 100);
    const n = loanTenureYears * 12;

    // Standard baseline EMI: [P * r * (1+r)^n] / [(1+r)^n - 1]
    const baseEmi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const totalBasePayment = baseEmi * n;
    const totalBaseInterest = totalBasePayment - P;

    // Simulation with prepayment
    let balance = P;
    let actualMonths = 0;
    let totalPrepaidInterest = 0;
    let totalPrincipalPaid = 0;

    while (balance > 0 && actualMonths < 480) {
      actualMonths++;
      const interestForMonth = balance * r;
      totalPrepaidInterest += interestForMonth;

      let principalComponent = baseEmi - interestForMonth;

      // Add extra payments based on strategy
      let extra = 0;
      if (prepaymentType === 'extra-emi') {
        // extra EMI once a year in month 12, 24, 36...
        if (actualMonths % 12 === 0) {
          extra = baseEmi * extraEmiPerYear;
        }
      } else if (prepaymentType === 'lump-sum') {
        if (actualMonths === lumpSumYear * 12) {
          extra = lumpSumAmount;
        }
      } else if (prepaymentType === 'monthly-extra') {
        extra = monthlyExtra;
      }

      const totalPrincipalReduction = principalComponent + extra;
      if (balance <= totalPrincipalReduction) {
        totalPrincipalPaid += balance;
        balance = 0;
      } else {
        balance -= totalPrincipalReduction;
        totalPrincipalPaid += totalPrincipalReduction;
      }
    }

    const interestSaved = Math.max(0, Math.round(totalBaseInterest - totalPrepaidInterest));
    const tenureReducedMonths = Math.max(0, n - actualMonths);
    const tenureReducedYears = (tenureReducedMonths / 12).toFixed(1);

    return {
      baseEmi,
      totalBaseInterest: Math.round(totalBaseInterest),
      totalPrepaidInterest: Math.round(totalPrepaidInterest),
      interestSaved,
      actualMonths,
      tenureReducedMonths,
      tenureReducedYears,
      newTenureYears: (actualMonths / 12).toFixed(1),
    };
  }, [
    loanAmount,
    interestRate,
    loanTenureYears,
    prepaymentType,
    extraEmiPerYear,
    lumpSumAmount,
    lumpSumYear,
    monthlyExtra,
  ]);

  const formatINR = (val: number) =>
    '₹' + Math.round(val).toLocaleString('en-IN');

  return (
    <div className="space-y-8">
      {/* Top Value Savings Callout */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900/10 via-emerald-800/5 to-teal-900/10 border border-emerald-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#046A38] text-white">
                Prepayment Impact
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Freedom from Home Loan Debt
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Save {formatINR(loanResults.interestSaved)} in Bank Interest!
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              By adopting this prepayment strategy, your home loan ends{' '}
              <strong className="text-emerald-700 font-bold">
                {loanResults.tenureReducedYears} Years earlier
              </strong>{' '}
              (in {loanResults.newTenureYears} years instead of {loanTenureYears} years).
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs text-slate-500 font-semibold uppercase">Regular Monthly EMI</div>
            <div className="text-2xl font-black text-[#06038D]">{formatINR(loanResults.baseEmi)}</div>
          </div>
        </div>
      </div>

      {/* Inputs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Loan Parameters */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Base Home Loan Details
            </h3>

            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span>Principal Loan Amount</span>
                <span className="text-slate-900">{formatINR(loanAmount)}</span>
              </div>
              <input
                type="range"
                min={500000}
                max={20000000}
                step={100000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF671F]"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>₹5 Lakh</span>
                <span>₹1 Crore</span>
                <span>₹2 Crore</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 8.5)}
                  className="w-full text-sm font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Original Tenure (Years)
                </label>
                <input
                  type="number"
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value) || 20)}
                  className="w-full text-sm font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#FF671F]"
                />
              </div>
            </div>
          </div>

          {/* Prepayment Strategy Selection */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#FF671F]" />
              <span>2. Choose Your Prepayment Technique</span>
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPrepaymentType('extra-emi')}
                className={`p-2.5 rounded-xl text-xs font-bold text-center border transition cursor-pointer ${
                  prepaymentType === 'extra-emi'
                    ? 'border-[#FF671F] bg-orange-50 text-[#FF671F] ring-1 ring-[#FF671F]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                1 Extra EMI / Year
              </button>

              <button
                onClick={() => setPrepaymentType('monthly-extra')}
                className={`p-2.5 rounded-xl text-xs font-bold text-center border transition cursor-pointer ${
                  prepaymentType === 'monthly-extra'
                    ? 'border-[#06038D] bg-indigo-50 text-[#06038D] ring-1 ring-[#06038D]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Extra Monthly Pay
              </button>

              <button
                onClick={() => setPrepaymentType('lump-sum')}
                className={`p-2.5 rounded-xl text-xs font-bold text-center border transition cursor-pointer ${
                  prepaymentType === 'lump-sum'
                    ? 'border-[#046A38] bg-emerald-50 text-[#046A38] ring-1 ring-[#046A38]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                One-Time Lump Sum
              </button>
            </div>

            {/* Strategy Specific inputs */}
            {prepaymentType === 'extra-emi' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  How many extra EMIs to pay annually?
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      onClick={() => setExtraEmiPerYear(n)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold border ${
                        extraEmiPerYear === n
                          ? 'bg-[#FF671F] text-white border-[#FF671F]'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {n} EMI ({formatINR(loanResults.baseEmi * n)}/yr)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {prepaymentType === 'monthly-extra' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Extra rupees added to each monthly EMI
                </label>
                <input
                  type="number"
                  step={500}
                  value={monthlyExtra}
                  onChange={(e) => setMonthlyExtra(Number(e.target.value) || 1000)}
                  className="w-full text-sm font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#06038D]"
                />
              </div>
            )}

            {prepaymentType === 'lump-sum' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Lump Sum Amount (₹)
                  </label>
                  <input
                    type="number"
                    step={25000}
                    value={lumpSumAmount}
                    onChange={(e) => setLumpSumAmount(Number(e.target.value) || 100000)}
                    className="w-full text-sm font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#046A38]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Paid in Year
                  </label>
                  <input
                    type="number"
                    value={lumpSumYear}
                    onChange={(e) => setLumpSumYear(Number(e.target.value) || 1)}
                    className="w-full text-sm font-bold border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#046A38]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Form: Comparative Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white flex items-center justify-between">
              <span>Standard vs Prepayment Comparison</span>
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Original Total Interest:</span>
                <span className="font-bold text-slate-300">
                  {formatINR(loanResults.totalBaseInterest)}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Revised Total Interest:</span>
                <span className="font-bold text-emerald-400">
                  {formatINR(loanResults.totalPrepaidInterest)}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Total Interest Saved:</span>
                <span className="font-black text-xl text-emerald-400">
                  {formatINR(loanResults.interestSaved)}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">New Loan Tenure:</span>
                <span className="font-bold text-white">
                  {loanResults.newTenureYears} Years (Saved {loanResults.tenureReducedYears} Yrs)
                </span>
              </div>
            </div>

            {/* Tip Box */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300 block mb-1">RBI Floating Rate Rule:</strong>
              Under Reserve Bank of India (RBI) directives, banks and NBFCs cannot charge any prepayment or foreclosure penalty on floating-rate individual home loans. Every rupee of prepayment directly knocks down your principal!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
