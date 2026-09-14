import React, { useState, useMemo } from 'react';
import {
  TrendingDown,
  PiggyBank,
  Calendar,
  DollarSign,
  AlertTriangle,
  ArrowDownRight,
  ShieldCheck,
} from 'lucide-react';

export const SwpCalculator: React.FC = () => {
  const [initialCorpus, setInitialCorpus] = useState<number>(5000000); // 50 Lakh
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(30000); // 30k
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(8.5); // 8.5%
  const [durationYears, setDurationYears] = useState<number>(15); // 15 years

  const swpResults = useMemo(() => {
    let balance = initialCorpus;
    const monthlyRate = expectedReturnRate / (12 * 100);
    const totalMonths = durationYears * 12;

    let totalWithdrawn = 0;
    const yearlySchedule: {
      year: number;
      opening: number;
      withdrawn: number;
      returnsEarned: number;
      closing: number;
    }[] = [];

    let isDepleted = false;
    let depletedMonth = 0;

    for (let year = 1; year <= durationYears; year++) {
      const opening = balance;
      let yearlyWithdrawal = 0;
      let yearlyReturns = 0;

      for (let m = 1; m <= 12; m++) {
        if (balance <= 0) {
          if (!isDepleted) {
            isDepleted = true;
            depletedMonth = (year - 1) * 12 + m;
          }
          break;
        }

        // Return earned on current balance
        const interest = balance * monthlyRate;
        yearlyReturns += interest;
        balance += interest;

        // Withdrawal made
        const withdrawal = Math.min(balance, monthlyWithdrawal);
        yearlyWithdrawal += withdrawal;
        totalWithdrawn += withdrawal;
        balance -= withdrawal;
      }

      yearlySchedule.push({
        year,
        opening: Math.round(opening),
        withdrawn: Math.round(yearlyWithdrawal),
        returnsEarned: Math.round(yearlyReturns),
        closing: Math.max(0, Math.round(balance)),
      });
    }

    const finalCorpus = Math.max(0, Math.round(balance));

    return {
      totalWithdrawn: Math.round(totalWithdrawn),
      finalCorpus,
      isDepleted,
      depletedMonth,
      yearlySchedule,
    };
  }, [initialCorpus, monthlyWithdrawal, expectedReturnRate, durationYears]);

  const formatINR = (val: number) =>
    '₹' + Math.round(val).toLocaleString('en-IN');

  return (
    <div className="space-y-8">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Capital Withdrawn
          </div>
          <div className="text-2xl font-black text-[#06038D] mt-1">
            {formatINR(swpResults.totalWithdrawn)}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {durationYears} Years × {formatINR(monthlyWithdrawal)}/mo
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Remaining Portfolio Value
          </div>
          <div className={`text-2xl font-black mt-1 ${swpResults.finalCorpus > 0 ? 'text-[#046A38]' : 'text-red-600'}`}>
            {formatINR(swpResults.finalCorpus)}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {swpResults.finalCorpus > initialCorpus ? 'Capital Appreciated!' : 'Closing Corpus'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Portfolio Health Status
          </div>
          <div className="flex items-center gap-2 mt-1">
            {swpResults.isDepleted ? (
              <span className="text-sm font-bold text-red-600 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                Depletes in Year {Math.ceil(swpResults.depletedMonth / 12)}
              </span>
            ) : (
              <span className="text-sm font-bold text-[#046A38] flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                100% Sustainable SWP
              </span>
            )}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Withdrawal rate:{' '}
            {((monthlyWithdrawal * 12 * 100) / initialCorpus).toFixed(1)}% p.a.
          </div>
        </div>
      </div>

      {/* Input Sliders */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Initial Corpus */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-slate-700">
              Total Initial Mutual Fund Corpus
            </label>
            <span className="font-extrabold text-slate-900 text-base">
              {formatINR(initialCorpus)}
            </span>
          </div>
          <input
            type="range"
            min={500000}
            max={50000000}
            step={100000}
            value={initialCorpus}
            onChange={(e) => setInitialCorpus(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF671F]"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>₹5 Lakh</span>
            <span>₹2.5 Crore</span>
            <span>₹5 Crore</span>
          </div>
        </div>

        {/* Monthly Withdrawal */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-slate-700">
              Monthly Withdrawal Desired
            </label>
            <span className="font-extrabold text-[#06038D] text-base">
              {formatINR(monthlyWithdrawal)} / month
            </span>
          </div>
          <input
            type="range"
            min={5000}
            max={300000}
            step={2500}
            value={monthlyWithdrawal}
            onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#06038D]"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>₹5,000</span>
            <span>₹1.5 Lakh</span>
            <span>₹3 Lakh</span>
          </div>
        </div>

        {/* Expected Annual Return & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700">
                Expected Annual Return Rate (%)
              </label>
              <span className="font-bold text-slate-900">{expectedReturnRate}%</span>
            </div>
            <input
              type="range"
              min={4}
              max={16}
              step={0.5}
              value={expectedReturnRate}
              onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#046A38]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-slate-700">
                Duration (Years)
              </label>
              <span className="font-bold text-slate-900">{durationYears} Years</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={durationYears}
              onChange={(e) => setDurationYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF671F]"
            />
          </div>
        </div>
      </div>

      {/* Yearly Breakdown Schedule */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800">
            Year-by-Year SWP Amortization Schedule
          </h4>
          <span className="text-xs text-slate-500">Compounded Monthly</span>
        </div>
        <div className="overflow-x-auto max-h-80 overflow-y-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 font-bold sticky top-0">
              <tr>
                <th className="p-3">Year</th>
                <th className="p-3">Opening Balance</th>
                <th className="p-3">Withdrawn</th>
                <th className="p-3">Returns Earned</th>
                <th className="p-3">Closing Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {swpResults.yearlySchedule.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-slate-900">Yr {row.year}</td>
                  <td className="p-3">{formatINR(row.opening)}</td>
                  <td className="p-3 text-[#06038D] font-semibold">-{formatINR(row.withdrawn)}</td>
                  <td className="p-3 text-[#046A38] font-semibold">+{formatINR(row.returnsEarned)}</td>
                  <td className="p-3 font-bold text-slate-900">{formatINR(row.closing)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
