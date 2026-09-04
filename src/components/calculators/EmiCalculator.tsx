import React, { useState, useId } from 'react';
import { calculateEMI } from '../../utils/calculations';
import { formatINR, formatINRCompact, numberToIndianWords } from '../../utils/formatters';
import { DonutChart } from '../ui/DonutChart';
import { Home, Car, User, Table, FileSpreadsheet, Printer } from 'lucide-react';

export const EmiCalculator: React.FC = () => {
  const [loanType, setLoanType] = useState<'home' | 'car' | 'personal'>('home');
  const [loanAmount, setLoanAmount] = useState<number>(4000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [viewScheduleMode, setViewScheduleMode] = useState<'yearly' | 'monthly'>('yearly');
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);

  const amountInputId = useId();
  const rateInputId = useId();
  const tenureInputId = useId();

  const handleLoanTypeSelect = (type: 'home' | 'car' | 'personal') => {
    setLoanType(type);
    if (type === 'home') {
      setLoanAmount(4000000);
      setInterestRate(8.5);
      setTenureYears(20);
    } else if (type === 'car') {
      setLoanAmount(1000000);
      setInterestRate(9.2);
      setTenureYears(5);
    } else {
      setLoanAmount(500000);
      setInterestRate(12.5);
      setTenureYears(3);
    }
  };

  const result = calculateEMI(loanAmount, interestRate, tenureYears, 'years');

  const chartData = [
    {
      label: 'Principal Loan',
      value: result.principalAmount,
      color: '#06038D', // Ashoka Navy
      formattedValue: formatINR(result.principalAmount),
    },
    {
      label: 'Total Interest Burden',
      value: result.totalInterest,
      color: '#FF671F', // Vibrant Saffron
      formattedValue: formatINR(result.totalInterest),
    },
  ];

  const scheduleToDisplay = viewScheduleMode === 'yearly' ? result.yearlyAmortization : result.amortizationSchedule;
  const displayedRows = showFullSchedule ? scheduleToDisplay : scheduleToDisplay.slice(0, 8);

  const printSchedule = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-100/70 p-5 md:p-8">
      {/* Top Header & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#046A38]" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Loan EMI & Amortization Calculator
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Accurate monthly reducing balance calculation with amortization table
          </p>
        </div>

        {/* Loan Type Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => handleLoanTypeSelect('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              loanType === 'home'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#FF671F]" />
            Home Loan
          </button>
          <button
            onClick={() => handleLoanTypeSelect('car')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              loanType === 'car'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-blue-600" />
            Car Loan
          </button>
          <button
            onClick={() => handleLoanTypeSelect('personal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              loanType === 'personal'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5 text-purple-600" />
            Personal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Column: Input Sliders */}
        <div className="lg:col-span-6 space-y-6">
          {/* Input 1: Loan Amount */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={amountInputId} className="text-sm font-bold text-slate-700">
                Loan Amount Borrowed (P)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">₹</span>
                <input
                  id={amountInputId}
                  type="number"
                  min="50000"
                  max="50000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                  className="w-40 pl-7 pr-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#046A38] text-sm"
                />
              </div>
            </div>

            <input
              type="range"
              min="100000"
              max="20000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5">
              <span>₹1 Lakh</span>
              <span className="text-[#046A38] font-semibold">{numberToIndianWords(loanAmount)}</span>
              <span>₹2 Crore</span>
            </div>
          </div>

          {/* Input 2: Annual Interest Rate */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={rateInputId} className="text-sm font-bold text-slate-700">
                Annual Interest Rate (Reducing)
              </label>
              <div className="relative">
                <input
                  id={rateInputId}
                  type="number"
                  min="3"
                  max="25"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-24 pr-6 pl-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#046A38] text-sm"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">%</span>
              </div>
            </div>

            <input
              type="range"
              min="6.5"
              max="18"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
              <span>6.5% (Prime Home Loan)</span>
              <span>10.5% (Car Loan)</span>
              <span>18% (Personal)</span>
            </div>
          </div>

          {/* Input 3: Tenure */}
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={tenureInputId} className="text-sm font-bold text-slate-700">
                Loan Tenure
              </label>
              <div className="relative">
                <input
                  id={tenureInputId}
                  type="number"
                  min="1"
                  max="35"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Math.max(1, Math.min(35, Number(e.target.value))))}
                  className="w-24 pr-8 pl-3 py-1.5 text-right font-black text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#046A38] text-sm"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">Yrs</span>
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="30"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
              <span>1 Year (12 EMIs)</span>
              <span className="font-semibold text-slate-700">{tenureYears * 12} Months Total</span>
              <span>30 Years (360 EMIs)</span>
            </div>
          </div>

          {/* Quick Tip Banner */}
          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 text-xs text-emerald-900 flex items-start gap-2.5">
            <span className="text-lg">💡</span>
            <div>
              <span className="font-bold">Smart Prepayment Tip:</span>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Paying an extra 5% principal every quarter can shave off up to 4.5 years from your 20-year home loan and save over ₹6 Lakhs in interest!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Key Outputs & Donut Chart */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          {/* Monthly EMI Highlight Card */}
          <div className="bg-gradient-to-br from-[#0F172A] to-[#06038D] text-white p-5 rounded-2xl shadow-xl shadow-slate-900/15 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#138808]/15 rounded-full blur-2xl" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Monthly Loan Installment (EMI)
            </span>
            <div className="text-3xl md:text-4xl font-black tracking-tight text-white mt-1">
              {formatINR(result.monthlyEmi)}
              <span className="text-sm font-normal text-slate-300"> / month</span>
            </div>
            <div className="text-xs text-slate-300 mt-1">
              In words: <span className="font-semibold text-emerald-200">{numberToIndianWords(result.monthlyEmi)}</span>
            </div>
          </div>

          {/* Breakdown Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Interest Payable</span>
              <div className="text-lg md:text-xl font-extrabold text-[#FF671F] mt-1">
                {formatINR(result.totalInterest)}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                {((result.totalInterest / (result.principalAmount || 1)) * 100).toFixed(1)}% of Principal
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Repayment</span>
              <div className="text-lg md:text-xl font-extrabold text-slate-900 mt-1">
                {formatINR(result.totalPayment)}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Principal + Interest
              </span>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-slate-50/60 rounded-2xl p-4 border border-slate-200/80">
            <DonutChart
              data={chartData}
              centerLabel="Total Repayment"
              centerValue={formatINRCompact(result.totalPayment)}
              size={200}
            />
          </div>
        </div>
      </div>

      {/* Amortization Schedule Section */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-[#06038D]" />
            <h3 className="text-base font-bold text-slate-900">
              Loan Amortization Schedule
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode */}
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setViewScheduleMode('yearly')}
                className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                  viewScheduleMode === 'yearly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                Yearly View
              </button>
              <button
                onClick={() => setViewScheduleMode('monthly')}
                className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                  viewScheduleMode === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                Monthly View
              </button>
            </div>

            <button
              onClick={printSchedule}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1 transition cursor-pointer"
              title="Print Schedule"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">{viewScheduleMode === 'yearly' ? 'Year' : 'Month'}</th>
                <th className="py-3 px-4">Opening Balance</th>
                <th className="py-3 px-4">EMI</th>
                <th className="py-3 px-4 text-[#06038D]">Principal</th>
                <th className="py-3 px-4 text-[#FF671F]">Interest</th>
                <th className="py-3 px-4">Closing Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {displayedRows.map((row) => (
                <tr key={row.period} className="hover:bg-slate-50/80 transition">
                  <td className="py-2.5 px-4 font-sans font-bold text-slate-900">
                    {viewScheduleMode === 'yearly' ? `Year ${row.period}` : `M${row.period}`}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">{formatINR(row.openingBalance)}</td>
                  <td className="py-2.5 px-4 text-slate-800 font-semibold">{formatINR(row.emi)}</td>
                  <td className="py-2.5 px-4 text-[#06038D] font-bold">{formatINR(row.principal)}</td>
                  <td className="py-2.5 px-4 text-[#FF671F] font-bold">{formatINR(row.interest)}</td>
                  <td className="py-2.5 px-4 text-slate-900 font-bold">{formatINR(row.closingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {scheduleToDisplay.length > 8 && (
          <div className="text-center mt-3">
            <button
              onClick={() => setShowFullSchedule(!showFullSchedule)}
              className="text-xs font-bold text-[#FF671F] hover:underline cursor-pointer"
            >
              {showFullSchedule
                ? 'Collapse Table View'
                : `View All ${scheduleToDisplay.length} Rows of Schedule →`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
