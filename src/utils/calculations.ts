import { AmortizationRow } from '../types';

export interface SipResult {
  investedAmount: number;
  estReturns: number;
  totalValue: number;
  inflationAdjustedValue?: number;
  yearlyBreakdown: {
    year: number;
    invested: number;
    returns: number;
    total: number;
  }[];
}

export function calculateSIP(
  monthlyInvestment: number,
  expectedReturnRate: number,
  tenureYears: number,
  stepUpRate = 0,
  inflationRate = 0
): SipResult {
  let totalInvested = 0;
  let totalValue = 0;
  const monthlyRate = expectedReturnRate / 100 / 12;
  const yearlyBreakdown: { year: number; invested: number; returns: number; total: number }[] = [];

  let currentMonthlyInvestment = monthlyInvestment;

  for (let year = 1; year <= tenureYears; year++) {
    for (let m = 1; m <= 12; m++) {
      totalInvested += currentMonthlyInvestment;
      totalValue = (totalValue + currentMonthlyInvestment) * (1 + monthlyRate);
    }
    yearlyBreakdown.push({
      year,
      invested: Math.round(totalInvested),
      returns: Math.round(Math.max(0, totalValue - totalInvested)),
      total: Math.round(totalValue),
    });

    if (stepUpRate > 0) {
      currentMonthlyInvestment += (currentMonthlyInvestment * stepUpRate) / 100;
    }
  }

  const estReturns = Math.max(0, totalValue - totalInvested);

  // Inflation adjusted real purchasing power
  let inflationAdjustedValue: number | undefined;
  if (inflationRate > 0) {
    inflationAdjustedValue = totalValue / Math.pow(1 + inflationRate / 100, tenureYears);
  }

  return {
    investedAmount: Math.round(totalInvested),
    estReturns: Math.round(estReturns),
    totalValue: Math.round(totalValue),
    inflationAdjustedValue: inflationAdjustedValue ? Math.round(inflationAdjustedValue) : undefined,
    yearlyBreakdown,
  };
}

export interface EmiResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  principalAmount: number;
  amortizationSchedule: AmortizationRow[];
  yearlyAmortization: AmortizationRow[];
}

export function calculateEMI(
  principal: number,
  annualInterestRate: number,
  tenureYears: number,
  tenureType: 'years' | 'months' = 'years'
): EmiResult {
  const totalMonths = tenureType === 'years' ? tenureYears * 12 : tenureYears;
  const monthlyRate = annualInterestRate / 12 / 100;

  let monthlyEmi = 0;
  if (monthlyRate === 0) {
    monthlyEmi = principal / totalMonths;
  } else {
    monthlyEmi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = totalPayment - principal;

  // Build schedules
  let balance = principal;
  const schedule: AmortizationRow[] = [];
  const yearlyMap = new Map<number, { principal: number; interest: number; emi: number; closing: number }>();

  for (let m = 1; m <= totalMonths; m++) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = monthlyEmi - interestForMonth;
    const opening = balance;
    balance = Math.max(0, balance - principalForMonth);

    schedule.push({
      period: m,
      openingBalance: Math.round(opening),
      emi: Math.round(monthlyEmi),
      principal: Math.round(principalForMonth),
      interest: Math.round(interestForMonth),
      closingBalance: Math.round(balance),
    });

    const currentYear = Math.ceil(m / 12);
    const existing = yearlyMap.get(currentYear) || { principal: 0, interest: 0, emi: 0, closing: 0 };
    yearlyMap.set(currentYear, {
      principal: existing.principal + principalForMonth,
      interest: existing.interest + interestForMonth,
      emi: existing.emi + monthlyEmi,
      closing: balance,
    });
  }

  const yearlyAmortization: AmortizationRow[] = [];
  let prevYearClosing = principal;
  yearlyMap.forEach((val, year) => {
    yearlyAmortization.push({
      period: year,
      openingBalance: Math.round(prevYearClosing),
      emi: Math.round(val.emi),
      principal: Math.round(val.principal),
      interest: Math.round(val.interest),
      closingBalance: Math.round(val.closing),
    });
    prevYearClosing = val.closing;
  });

  return {
    monthlyEmi: Math.round(monthlyEmi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    principalAmount: principal,
    amortizationSchedule: schedule,
    yearlyAmortization,
  };
}

export interface CompoundInterestResult {
  principalAmount: number;
  totalInterest: number;
  totalMaturityAmount: number;
  yearlyBreakdown: { year: number; balance: number; interestEarned: number }[];
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  tenureYears: number,
  frequency: 1 | 2 | 4 | 12 | 365 = 1,
  monthlyContribution = 0
): CompoundInterestResult {
  let balance = principal;
  const yearlyBreakdown: { year: number; balance: number; interestEarned: number }[] = [];
  let totalInterest = 0;

  for (let year = 1; year <= tenureYears; year++) {
    const yearStart = balance;
    if (frequency === 12 && monthlyContribution > 0) {
      for (let m = 0; m < 12; m++) {
        balance += monthlyContribution;
        const interest = balance * (annualRate / 100 / 12);
        balance += interest;
        totalInterest += interest;
      }
    } else {
      // Standard formula
      const periodicRate = annualRate / 100 / frequency;
      const periodsPerYear = frequency;
      balance = balance * Math.pow(1 + periodicRate, periodsPerYear);
      totalInterest = balance - principal;
    }

    yearlyBreakdown.push({
      year,
      balance: Math.round(balance),
      interestEarned: Math.round(balance - yearStart),
    });
  }

  return {
    principalAmount: principal,
    totalInterest: Math.round(totalInterest),
    totalMaturityAmount: Math.round(balance),
    yearlyBreakdown,
  };
}

export interface GratuityResult {
  gratuityAmount: number;
  taxExemptAmount: number;
  taxableAmount: number;
  isEligible: boolean;
  yearsCounted: number;
}

export function calculateGratuity(
  basicSalaryPlusDa: number,
  tenureYears: number,
  tenureMonths = 0,
  isCoveredUnderAct = true
): GratuityResult {
  // Rounded tenure: >= 6 months rounded to next year if covered under Act
  let yearsCounted = tenureYears;
  if (isCoveredUnderAct && tenureMonths >= 6) {
    yearsCounted += 1;
  }

  const isEligible = yearsCounted >= 5;

  let calculatedGratuity = 0;
  if (isCoveredUnderAct) {
    // Formula: 15 * (Basic + DA) * Tenure / 26
    calculatedGratuity = (15 * basicSalaryPlusDa * yearsCounted) / 26;
  } else {
    // Formula: 15 * (Basic + DA) * Tenure / 30
    calculatedGratuity = (15 * basicSalaryPlusDa * yearsCounted) / 30;
  }

  calculatedGratuity = Math.round(calculatedGratuity);

  // Government max tax-free exemption limit: 20 Lakhs
  const MAX_TAX_EXEMPT_LIMIT = 2000000;
  const taxExemptAmount = Math.min(calculatedGratuity, MAX_TAX_EXEMPT_LIMIT);
  const taxableAmount = Math.max(0, calculatedGratuity - MAX_TAX_EXEMPT_LIMIT);

  return {
    gratuityAmount: calculatedGratuity,
    taxExemptAmount,
    taxableAmount,
    isEligible,
    yearsCounted,
  };
}

export interface PpfResult {
  totalInvested: number;
  totalInterest: number;
  maturityValue: number;
  yearlyBreakdown: { year: number; invested: number; interest: number; balance: number }[];
}

export function calculatePPF(
  annualDeposit: number,
  tenureYears = 15, // standard 15 or 20, 25 with 5-year extensions
  interestRate = 7.1 // Current Indian Gov rate
): PpfResult {
  const cappedDeposit = Math.min(annualDeposit, 150000); // 1.5 Lakh max per FY
  let totalInvested = 0;
  let balance = 0;
  const yearlyBreakdown: { year: number; invested: number; interest: number; balance: number }[] = [];

  for (let year = 1; year <= tenureYears; year++) {
    totalInvested += cappedDeposit;
    balance += cappedDeposit;
    const interest = (balance * interestRate) / 100;
    balance += interest;

    yearlyBreakdown.push({
      year,
      invested: Math.round(totalInvested),
      interest: Math.round(interest),
      balance: Math.round(balance),
    });
  }

  return {
    totalInvested: Math.round(totalInvested),
    totalInterest: Math.round(balance - totalInvested),
    maturityValue: Math.round(balance),
    yearlyBreakdown,
  };
}

export interface FdRdResult {
  mode: 'fd' | 'rd';
  totalDeposit: number;
  totalInterest: number;
  maturityAmount: number;
  tdsDeductionEstimate: number;
}

export function calculateFdRd(
  mode: 'fd' | 'rd',
  amount: number, // Principal for FD or Monthly deposit for RD
  annualRate: number,
  tenureMonths: number,
  isSeniorCitizen = false,
  estimateTDS = false
): FdRdResult {
  const effectiveRate = isSeniorCitizen ? annualRate + 0.5 : annualRate;
  let totalDeposit = 0;
  let maturityAmount = 0;

  if (mode === 'fd') {
    // Quarterly compounding: A = P * (1 + r/400)^(4 * t_years)
    totalDeposit = amount;
    const quarters = tenureMonths / 3;
    const quarterlyRate = effectiveRate / 400;
    maturityAmount = amount * Math.pow(1 + quarterlyRate, quarters);
  } else {
    // RD: Standard Indian Bank formula quarterly compounded
    totalDeposit = amount * tenureMonths;
    const n = tenureMonths;
    const r = effectiveRate / 100;
    let sum = 0;
    for (let m = 1; m <= n; m++) {
      // compounding quarterly based on remaining tenure months (n - m + 1) / 12
      const timeYears = (n - m + 1) / 12;
      sum += amount * Math.pow(1 + r / 4, 4 * timeYears);
    }
    maturityAmount = sum;
  }

  const totalInterest = Math.max(0, maturityAmount - totalDeposit);
  let tdsDeductionEstimate = 0;

  // Under Section 194A: TDS at 10% if interest > ₹40,000 (₹50,000 for Senior Citizens)
  const tdsThreshold = isSeniorCitizen ? 50000 : 40000;
  if (estimateTDS && totalInterest > tdsThreshold) {
    tdsDeductionEstimate = totalInterest * 0.1;
  }

  return {
    mode,
    totalDeposit: Math.round(totalDeposit),
    totalInterest: Math.round(totalInterest),
    maturityAmount: Math.round(maturityAmount),
    tdsDeductionEstimate: Math.round(tdsDeductionEstimate),
  };
}
