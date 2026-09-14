import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Clock,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export const FreelanceRateCalculator: React.FC = () => {
  const [targetAnnualTakeHome, setTargetAnnualTakeHome] = useState<number>(1800000); // 18 Lakh
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25); // 25 billable hrs
  const [vacationWeeks, setVacationWeeks] = useState<number>(4); // 4 weeks off
  const [annualExpenses, setAnnualExpenses] = useState<number>(150000); // software, laptop, internet
  const [effectiveTaxRate, setEffectiveTaxRate] = useState<number>(15); // Sec 44ADA ~ 10-15%

  const rates = useMemo(() => {
    // Total working weeks
    const workingWeeks = Math.max(1, 52 - vacationWeeks);
    const totalBillableHoursPerYear = workingWeeks * billableHoursPerWeek;

    // Gross revenue needed before taxes & expenses
    // TakeHome = (Gross - Expenses) * (1 - TaxRate)
    // Gross - Expenses = TakeHome / (1 - TaxRate)
    // Gross = (TakeHome / (1 - TaxRate)) + Expenses
    const requiredGrossIncome =
      targetAnnualTakeHome / (1 - effectiveTaxRate / 100) + annualExpenses;

    const hourlyRateINR = Math.round(requiredGrossIncome / totalBillableHoursPerYear);
    const dayRateINR = hourlyRateINR * 8;
    const monthlyRetainerINR = Math.round(requiredGrossIncome / 12);

    // Equivalent corporate CTC (factoring 25% employer benefits, PF, gratuity, insurance)
    const equivalentCorporateCTC = Math.round(requiredGrossIncome * 1.25);

    // Approximate USD conversion at 85 INR/USD for international clients
    const hourlyRateUSD = Math.round(hourlyRateINR / 85);
    const dayRateUSD = Math.round(dayRateINR / 85);

    return {
      workingWeeks,
      totalBillableHoursPerYear,
      requiredGrossIncome: Math.round(requiredGrossIncome),
      hourlyRateINR,
      dayRateINR,
      monthlyRetainerINR,
      equivalentCorporateCTC,
      hourlyRateUSD,
      dayRateUSD,
    };
  }, [
    targetAnnualTakeHome,
    billableHoursPerWeek,
    vacationWeeks,
    annualExpenses,
    effectiveTaxRate,
  ]);

  const formatINR = (val: number) =>
    '₹' + Math.round(val).toLocaleString('en-IN');

  return (
    <div className="space-y-8">
      {/* Top Results Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Target Hourly Billable Rate
          </div>
          <div className="text-3xl font-black text-[#FF671F] mt-1">
            {formatINR(rates.hourlyRateINR)}
            <span className="text-xs text-slate-400 font-normal"> / hr</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 font-semibold">
            ≈ ${rates.hourlyRateUSD} USD / hr (Global Clients)
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Daily Day-Rate (8 hrs)
          </div>
          <div className="text-3xl font-black text-[#06038D] mt-1">
            {formatINR(rates.dayRateINR)}
            <span className="text-xs text-slate-400 font-normal"> / day</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 font-semibold">
            ≈ ${rates.dayRateUSD} USD / day
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Equivalent Salaried CTC
          </div>
          <div className="text-3xl font-black text-[#046A38] mt-1">
            {formatINR(rates.equivalentCorporateCTC)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Includes PF, health coverage & perks parity
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Income Target & Time Commitments
          </h3>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">
                Desired Annual Net Take-Home (Post-Tax)
              </label>
              <span className="text-sm font-bold text-slate-900">
                {formatINR(targetAnnualTakeHome)}
              </span>
            </div>
            <input
              type="range"
              min={500000}
              max={10000000}
              step={50000}
              value={targetAnnualTakeHome}
              onChange={(e) => setTargetAnnualTakeHome(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF671F]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">
                Weekly Billable Hours (Actual Client Work)
              </label>
              <span className="text-sm font-bold text-slate-900">
                {billableHoursPerWeek} hrs / week
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={45}
              step={1}
              value={billableHoursPerWeek}
              onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#06038D]"
            />
            <span className="text-[11px] text-slate-400">
              Rule of thumb: Freelancers spend 10–15 hrs/week on marketing, admin, and invoicing.
            </span>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">
                Vacation & Sick Weeks Per Year
              </label>
              <span className="text-sm font-bold text-slate-900">
                {vacationWeeks} Weeks Off
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={12}
              step={1}
              value={vacationWeeks}
              onChange={(e) => setVacationWeeks(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#046A38]"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Expenses & Tax Provisioning (Section 44ADA)
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Annual Tech, Hardware & Office Expenses (₹)
            </label>
            <input
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(Number(e.target.value) || 0)}
              className="w-full text-sm font-bold border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#FF671F]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">
                Effective Tax Rate (% under Section 44ADA Presumptive Tax)
              </label>
              <span className="text-sm font-bold text-slate-900">{effectiveTaxRate}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={35}
              step={1}
              value={effectiveTaxRate}
              onChange={(e) => setEffectiveTaxRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF671F]"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900 block font-bold mb-1">
              Section 44ADA Indian Tax Advantage:
            </strong>
            Indian professionals (engineers, designers, writers, consultants) earning up to ₹75 Lakhs gross can declare 50% as taxable profit, dramatically reducing effective income tax without maintaining full books of account.
          </div>
        </div>
      </div>
    </div>
  );
};
