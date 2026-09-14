import { CalculatorMeta } from '../types';

export interface ToolDefinition extends CalculatorMeta {
  category: 'finance' | 'media-tools' | 'text-tools' | 'dev-tools' | 'productivity';
}

export const FIFTY_TOOLS_DATA: Record<string, ToolDefinition> = {
  // ==========================================
  // 1. FINANCE & INVESTMENTS (/finance/...)
  // ==========================================
  'lumpsum-calculator': {
    id: 'lumpsum-calculator',
    path: '/finance/lumpsum-calculator',
    name: 'Mutual Fund Lumpsum Calculator',
    shortName: 'Lumpsum Calculator',
    badge: 'CAGR Compounding',
    category: 'finance',
    toolType: 'calculator',
    tagline: 'Calculate long-term wealth growth from one-time mutual fund & equity investments with annual compounding.',
    description: 'Accurately forecast returns on one-time lumpsum mutual fund investments using CAGR compounding formulas.',
    keywords: ['lumpsum calculator', 'mutual fund lumpsum returns', 'one time investment calculator', 'cagr calculator india'],
    icon: 'TrendingUp',
    primaryFormula: 'A = P * (1 + r/n)^(n*t)',
    formulaBreakdown: {
      title: 'Compound Interest Maturity Formula',
      formula: 'A = P * (1 + r/100)^t',
      explanation: 'Where A is maturity amount, P is initial principal lumpsum, r is annual expected CAGR return percentage, and t is investment tenure in years.',
      sampleCalculation: {
        given: { 'Principal (P)': '₹5,00,000', 'Annual Return (r)': '12%', 'Tenure (t)': '10 Years' },
        substitutions: '5,00,000 * (1 + 0.12)^10 = 5,00,000 * 3.1058',
        result: '₹15,52,924 (Estimated Wealth Gain: ₹10,52,924)',
      },
    },
    keyHighlights: ['Calculates future value for one-time capital', 'Inflation and CAGR return modeling', 'Zero API dependencies'],
    guideContent: {
      title: 'Comprehensive Guide to Mutual Fund Lumpsum Investing in India',
      introduction: 'A lumpsum mutual fund investment involves committing a substantial one-time capital into equity, debt, or hybrid funds to harness long-term compounding over multiple market cycles.',
      sections: [
        {
          heading: '1. Mechanics of Compounding and the Rule of 72',
          content: 'Compounding works by generating earnings on previous earnings. If an investor deploys ₹10,00,000 at a 12% CAGR, the investment doubles roughly every 6 years according to the Rule of 72 (72 / 12 = 6 years). Over a 20-year horizon, ₹10 Lakhs grows to nearly ₹96.4 Lakhs.',
        },
        {
          heading: '2. Lumpsum vs SIP: When to Deploy Lumpsum Capital',
          content: 'Lumpsum investing yields superior outcomes when deployed during broad market corrections, valuations below historical P/E averages, or when receiving sudden windfalls like annual bonuses, inheritance, or property liquidation. When markets trade at all-time highs with elevated valuations, a Systematic Transfer Plan (STP) from a liquid fund is advisable.',
        },
        {
          heading: '3. Long-Term Capital Gains (LTCG) Tax Implications (Budget 2024/25)',
          content: 'Under the revised tax framework, LTCG on listed equity mutual funds held for over 12 months is taxed at 12.5% on profits exceeding ₹1,25,000 in a financial year without indexation benefits. Short-Term Capital Gains (STCG) on equity funds held under 12 months are taxed at a flat 20%.',
        },
        {
          heading: '4. Critical Risk Management Strategies',
          content: 'Avoid putting 100% of lumpsum funds into high-beta small-cap funds in a single tranche. Stagger allocations across diversified flexi-cap funds, large-cap index funds, and debt instruments to ensure downside capital protection.',
        },
      ],
      summary: 'Lumpsum investing is an effective engine for exponential compounding when paired with an investment horizon of 7 to 15+ years and disciplined asset allocation.',
    },
    faqs: [
      { question: 'What is a lumpsum investment in mutual funds?', answer: 'A lumpsum investment is a single, one-time deposit of capital into a mutual fund scheme, rather than recurring monthly contributions like an SIP.' },
      { question: 'Is lumpsum better than SIP?', answer: 'Lumpsum often outperforms SIP during extended bull markets and post-correction recoveries, while SIP provides rupee cost averaging during volatile sideways markets.' },
      { question: 'What is the tax on mutual fund lumpsum gains?', answer: 'Equity LTCG (>12 months) is taxed at 12.5% above ₹1.25 Lakh per financial year. STCG (<12 months) is taxed at 20%.' },
      { question: 'Can I withdraw my lumpsum investment anytime?', answer: 'Yes, in open-ended schemes you can redeem at the prevailing NAV on any business day, subject to applicable exit loads within the initial 12 months.' },
      { question: 'What expected CAGR is realistic for Indian equities?', answer: 'Historically, broad Indian benchmark indices like Nifty 50 and BSE Sensex have delivered 11% to 13% annualized CAGR over 10-15+ year cycles.' },
    ],
  },

  'car-loan-vs-lease': {
    id: 'car-loan-vs-lease',
    path: '/finance/car-loan-vs-lease',
    name: 'Car Loan vs Corporate Lease Calculator',
    shortName: 'Loan vs Lease',
    badge: 'Tax Optimization',
    category: 'finance',
    toolType: 'calculator',
    tagline: 'Compare the net cost of buying a vehicle via auto loan versus taking a corporate salary lease.',
    description: 'Determine whether buying via auto EMI or taking an employer corporate car lease provides higher net cash savings.',
    keywords: ['car loan vs lease', 'corporate car lease calculator', 'car lease tax benefit india', 'auto loan emi comparison'],
    icon: 'Car',
    primaryFormula: 'Net Savings = (Gross Lease Tax Shield + Fuel Deductions) - Total Lease Rentals',
    formulaBreakdown: {
      title: 'Corporate Car Lease Net Cost Model',
      formula: 'Net Monthly Cost = (Lease Rental * (1 - Tax Bracket)) + FBT / Perquisite Tax',
      explanation: 'Evaluates tax depreciation and salary sacrifice benefits against retail bank auto financing interest and down payments.',
      sampleCalculation: {
        given: { 'Car Cost': '₹15,00,000', 'Loan Interest': '9.0%', 'Tax Slab': '30%', 'Lease Tenure': '4 Years' },
        substitutions: 'Salary sacrifice reduces taxable income by ₹35,000/mo, saving ₹10,500 in monthly tax.',
        result: 'Corporate Lease saves ₹1,42,800 over a 4-year tenure for 30% tax bracket employees.',
      },
    },
    keyHighlights: ['Evaluates employer corporate lease perks', 'GST and tax deduction modeling', 'Resale value buyback calculations'],
    guideContent: {
      title: 'Car Loan vs Corporate Lease: Complete Indian Tax & Financial Guide',
      introduction: 'For salaried employees in the 20% and 30% tax brackets, company car lease programs can unlock substantial income tax savings on lease rentals, fuel allowances, and maintenance.',
      sections: [
        {
          heading: '1. How Corporate Car Leasing Works in India',
          content: 'Under a corporate lease program, your employer leases the vehicle from a leasing vendor (e.g., LeasePlan, Orix). The monthly lease rental is deducted pre-tax from your gross salary, lowering your taxable income.',
        },
        {
          heading: '2. Perquisite Tax and Running Cost Deductions',
          content: 'The Income Tax Department levies a small perquisite value (₹1,800/month for cars under 1.6L engine capacity, ₹2,400/month for cars above 1.6L). In exchange, fuel, insurance, and maintenance bills are paid from pre-tax salary.',
        },
        {
          heading: '3. End of Lease: Buyback vs Return',
          content: 'At the end of a 3 to 5-year lease tenure, employees can purchase the vehicle at fair market value (typically 15-20% of original ex-showroom price) or surrender the vehicle.',
        },
        {
          heading: '4. Risks of Changing Employers During Lease',
          content: 'If you switch jobs during the lease tenure, you must either transfer the lease to your new employer (if they permit corporate leasing) or buy out the remaining foreclosed contract balance.',
        },
      ],
      summary: 'Corporate leasing is advantageous for stable salaried professionals in high tax slabs who replace vehicles every 3 to 4 years.',
    },
    faqs: [
      { question: 'What is the main benefit of corporate car leasing?', answer: 'Lease rentals and fuel expenses are deducted before income tax is calculated, reducing your annual taxable salary.' },
      { question: 'Who owns the car during a lease?', answer: 'The leasing company owns the vehicle during the lease period. You can acquire ownership upon lease completion at the predetermined residual value.' },
      { question: 'Can I lease an electric vehicle (EV)?', answer: 'Yes, corporate leasing for EVs is increasingly popular and qualifies for standard perquisite rules.' },
      { question: 'What happens if I quit my job during the lease?', answer: 'You must either transfer the contract to the new employer or pay the foreclosure settlement amount.' },
      { question: 'Is corporate lease available under the New Tax Regime?', answer: 'Perquisites and employer-provided vehicle tax benefits are restricted or evaluated differently under the New Tax Regime. Confirm with your payroll team.' },
    ],
  },

  'retirement-planner': {
    id: 'retirement-planner',
    path: '/finance/retirement-planner',
    name: 'Retirement Corpus & Fire Calculator',
    shortName: 'Retirement Planner',
    badge: 'FIRE Engine',
    category: 'finance',
    toolType: 'calculator',
    tagline: 'Calculate your target retirement corpus, monthly savings requirement, and FIRE readiness with inflation adjustment.',
    description: 'Plan your retirement corpus based on life expectancy, inflation rate, post-retirement returns, and monthly expenses.',
    keywords: ['retirement calculator', 'fire calculator india', 'retirement corpus calculator', 'pension planning'],
    icon: 'ShieldCheck',
    primaryFormula: 'Corpus = Annual Expenses * ((1 - (1 + i)^-n) / i) where i = (r - infl)/(1 + infl)',
    formulaBreakdown: {
      title: 'Inflation-Adjusted Annuity Present Value',
      formula: 'Corpus = Exp_ret * ((1 - ((1 + infl)/(1 + r))^Years) / (r - infl))',
      explanation: 'Computes real rate of return and capital required to sustain monthly lifestyle expenses throughout retirement lifespan.',
      sampleCalculation: {
        given: { 'Current Age': '30', 'Retirement Age': '55', 'Current Expenses': '₹50,000/mo', 'Inflation': '6%' },
        substitutions: 'Future Monthly Expense at age 55 = ₹50,000 * (1.06)^25 = ₹2,14,593/month.',
        result: 'Target Corpus Needed: ₹4.85 Crores. Monthly Investment Needed: ₹32,450/month at 12% CAGR.',
      },
    },
    keyHighlights: ['Models inflation-adjusted lifestyle costs', 'Supports early retirement (FIRE)', 'Computes sustainable withdrawal rate (SWP)'],
    guideContent: {
      title: 'The Blueprint to Retiring Wealthy in India: FIRE & Corpus Guide',
      introduction: 'Retirement planning is the process of building a financial asset base capable of generating lifelong inflation-protected income when active wage earning ceases.',
      sections: [
        {
          heading: '1. The Real Enemy: Healthcare and Lifestyle Inflation',
          content: 'While general consumer price index (CPI) inflation in India averages 5% to 6%, medical inflation hovers around 10% to 12% per year. A medical procedure costing ₹5 Lakhs today will cost ₹20 Lakhs in 20 years.',
        },
        {
          heading: '2. Asset Allocation: The Glide Path Strategy',
          content: 'In your 20s and 30s, maintain 70-80% in equity funds. As retirement nears, transition to a conservative allocation of 40% equity, 40% debt/FD/NPS, and 20% liquid/hybrid assets.',
        },
        {
          heading: '3. Safe Withdrawal Rate (SWR) for Indian Markets',
          content: 'While the US Trinity study suggested a 4% rule, Indian retirees are advised to maintain a 3.0% to 3.5% initial withdrawal rate due to higher inflation and currency volatility.',
        },
        {
          heading: '4. Managing Longevity Risk',
          content: 'Life expectancy is increasing. Plan for your retirement corpus to sustain your living expenses until age 85 or 90 to avoid outliving your savings.',
        },
      ],
      summary: 'Starting retirement investments even 5 years earlier reduces the required monthly savings burden by more than 40% thanks to compounding.',
    },
    faqs: [
      { question: 'What is the FIRE movement?', answer: 'FIRE stands for Financial Independence, Retire Early, focusing on aggressive saving and investing to retire in one’s 30s or 40s.' },
      { question: 'How much corpus is enough to retire in India?', answer: 'Typically, a corpus equal to 25 to 35 times your anticipated annual retirement expenses is recommended for a comfortable retirement.' },
      { question: 'What inflation rate should I assume for India?', answer: 'Assuming a long-term inflation rate between 6.0% and 7.0% provides a realistic buffer for household and healthcare expenses.' },
      { question: 'Is EPF and PPF enough for retirement?', answer: 'EPF and PPF provide safe fixed debt returns, but equity mutual fund exposure is necessary to beat long-term inflation.' },
      { question: 'How does SWP help in retirement?', answer: 'Systematic Withdrawal Plans (SWP) allow you to withdraw fixed monthly amounts from mutual funds while the remaining balance continues to earn returns.' },
    ],
  },

  'inflation-impact': {
    id: 'inflation-impact',
    path: '/finance/inflation-impact',
    name: 'Inflation Impact & Purchasing Power Calculator',
    shortName: 'Inflation Calculator',
    badge: 'Real Returns',
    category: 'finance',
    toolType: 'calculator',
    tagline: 'Calculate how inflation erodes your money’s real purchasing power over 5, 10, 20, and 30 years.',
    description: 'See the true future cost of living and determine the actual purchasing power of your savings under varying inflation rates.',
    keywords: ['inflation calculator india', 'purchasing power calculator', 'future cost of living', 'cpi inflation calculator'],
    icon: 'Percent',
    primaryFormula: 'FV = PV * (1 + i)^n and Real Value = PV / (1 + i)^n',
    formulaBreakdown: {
      title: 'Purchasing Power Degradation Formula',
      formula: 'Real Purchasing Power = Present Cash / (1 + Inflation Rate)^Years',
      explanation: 'Demonstrates the exponential decay of currency value over multi-decade horizons.',
      sampleCalculation: {
        given: { 'Current Amount': '₹1,00,000', 'Annual Inflation': '6%', 'Time Horizon': '15 Years' },
        substitutions: '1,00,000 / (1 + 0.06)^15 = 1,00,000 / 2.3965',
        result: '₹41,727 (Purchasing power drops by 58.3%)',
      },
    },
    keyHighlights: ['Visualizes erosion of cash kept in low-interest accounts', 'Calculates future expense equivalent', 'Zero API dependencies'],
    guideContent: {
      title: 'Inflation in India: The Silent Destroyer of Wealth and Purchasing Power',
      introduction: 'Inflation represents the steady increase in the general price level of goods and services, which progressively diminishes the quantity of goods each Rupee can purchase.',
      sections: [
        {
          heading: '1. Nominal Returns vs Real Returns',
          content: 'A bank Fixed Deposit offering 7% interest while inflation runs at 6% yields a pre-tax real return of only 1%. After a 30% income tax deduction, the real post-tax return turns negative (-0.9%).',
        },
        {
          heading: '2. Compounded Price Escalation Across Decades',
          content: 'At 6% inflation, prices double every 12 years and quadruple in 24 years. An item costing ₹10,000 today will cost ₹40,489 in 24 years.',
        },
        {
          heading: '3. Asset Classes That Beat Inflation',
          content: 'Historically, equity shares, equity mutual funds, and real estate have outpaced inflation by 4% to 7% annualized over rolling 10-year periods, whereas cash in savings accounts loses purchasing power every day.',
        },
        {
          heading: '4. Protecting Your Emergency Fund',
          content: 'Keep 6 to 12 months of expenses in high-yield savings accounts, sweep-in fixed deposits, or liquid mutual funds to balance liquidity with inflation defense.',
        },
      ],
      summary: 'Beating inflation is the primary objective of long-term investing; preserving capital in zero-risk nominal assets guarantees real purchasing power loss.',
    },
    faqs: [
      { question: 'What is the current average inflation rate in India?', answer: 'India’s Consumer Price Index (CPI) inflation has historically fluctuated between 4.5% and 6.5% annually.' },
      { question: 'Does Fixed Deposit beat inflation?', answer: 'After deducting income tax according to your slab, most retail FDs yield real returns near zero or slightly negative.' },
      { question: 'How can I protect my children’s education fund from inflation?', answer: 'Education inflation in India averages 10% to 12%. Invest in equity mutual funds via systematic monthly SIPs to outpace this rate.' },
      { question: 'What is headline vs core inflation?', answer: 'Headline inflation measures total CPI including food and energy, while core inflation excludes volatile food and fuel prices.' },
      { question: 'Why does cash lose value over time?', answer: 'Because governments and central banks expand money supply while aggregate production costs rise, requiring more currency units to purchase the same basket of goods.' },
    ],
  },

  'fd-vs-mutual-fund': {
    id: 'fd-vs-mutual-fund',
    path: '/finance/fd-vs-mutual-fund',
    name: 'Fixed Deposit vs Mutual Fund Calculator',
    shortName: 'FD vs Mutual Fund',
    badge: 'Post-Tax Comparison',
    category: 'finance',
    toolType: 'calculator',
    tagline: 'Compare guaranteed bank FD interest against market-linked mutual fund returns after tax.',
    description: 'Compare post-tax returns, liquidity, and wealth accumulation between Fixed Deposits and Mutual Funds.',
    keywords: ['fd vs mutual fund', 'fixed deposit vs equity returns', 'fd post tax return calculator', 'mutual fund comparison'],
    icon: 'Building',
    primaryFormula: 'FD Post-Tax = P * (1 + r*(1-tax)/100)^t vs MF Post-Tax = (P*(1+r)^t - P)*(1-12.5%) + P',
    formulaBreakdown: {
      title: 'Tax-Differentiated Growth Formula',
      formula: 'FD Net = P + P * r * (1 - SlabRate) * t; MF Net = Corpus - (Gains - ₹1.25L) * 12.5%',
      explanation: 'FD interest is taxed every financial year at your marginal slab rate, while mutual fund equity LTCG is taxed only upon redemption at 12.5% above ₹1.25 Lakh.',
      sampleCalculation: {
        given: { 'Investment': '₹10,00,000', 'FD Rate': '7.2%', 'MF CAGR': '12.5%', 'Tax Slab': '30%', 'Tenure': '10 Years' },
        substitutions: 'FD matures at ₹16,35,000 (after 30% slab tax). MF matures at ₹30,48,000 (after 12.5% LTCG).',
        result: 'Mutual Fund generates ₹14,13,000 more post-tax wealth than the Fixed Deposit.',
      },
    },
    keyHighlights: ['Side-by-side post-tax comparison', 'Incorporates Budget 2024 LTCG rules', 'Interactive risk/return slider'],
    guideContent: {
      title: 'Fixed Deposit vs Mutual Funds: Risk, Returns, and Taxation Compared',
      introduction: 'Choosing between a bank Fixed Deposit and Mutual Funds involves balancing safety and capital guarantee against long-term inflation-beating wealth generation.',
      sections: [
        {
          heading: '1. Understanding the Fundamental Differences',
          content: 'Fixed Deposits offer sovereign or DICGC-insured security (up to ₹5 Lakhs per bank) with fixed returns. Mutual funds pool capital to invest in diversified corporate equities and government bonds with market-linked returns.',
        },
        {
          heading: '2. Taxation Arbitrage: The True Game Changer',
          content: 'FD interest is added to your income and taxed every single year at your marginal tax bracket (up to 30% + cess). In contrast, mutual fund gains compound untaxed until the day you sell them, providing compounding on capital that would have otherwise gone toward taxes.',
        },
        {
          heading: '3. Volatility and Investment Horizon',
          content: 'For horizons under 3 years, Fixed Deposits and liquid/arbitrage funds are suitable. For horizons exceeding 5 to 7 years, equity mutual funds carry significantly lower risk of purchasing power erosion.',
        },
        {
          heading: '4. Creating an Ideal Hybrid Allocation',
          content: 'A prudent financial plan allocates 20-30% to FDs or short-term debt instruments for emergencies and planned upcoming expenses, while deploying 70-80% into equity funds for long-term goals.',
        },
      ],
      summary: 'While FDs provide predictability and peace of mind for short-term goals, mutual funds remain essential for outpacing inflation and compounding long-term wealth.',
    },
    faqs: [
      { question: 'Can I lose money in mutual funds?', answer: 'Yes, equity mutual funds fluctuate with market cycles and can experience short-term drawdowns, but historically recover over 5+ year horizons.' },
      { question: 'Is FD interest taxed every year?', answer: 'Yes, bank FDs deduct TDS once interest exceeds ₹40,000 (₹50,000 for senior citizens) and interest is taxed according to your income tax slab.' },
      { question: 'What is DICGC insurance on Fixed Deposits?', answer: 'DICGC (a subsidiary of RBI) insures bank deposits including principal and interest up to a maximum of ₹5 Lakhs per depositor per bank.' },
      { question: 'What is an arbitrage fund?', answer: 'Arbitrage funds exploit price differentials between cash and derivatives markets, offering FD-like low volatility with favorable equity mutual fund taxation.' },
      { question: 'Can I withdraw mutual funds before maturity?', answer: 'Yes, open-ended mutual funds can be redeemed on any business day, usually credited to your bank account within 1 to 2 working days.' },
    ],
  },

  'hra-exemption': {
    id: 'hra-exemption',
    path: '/finance/hra-exemption',
    name: 'HRA Exemption Calculator (Section 10(13A))',
    shortName: 'HRA Calculator',
    badge: 'Rule 2A Verified',
    category: 'finance',
    toolType: 'calculator',
    tagline: 'Calculate your exact tax-exempt House Rent Allowance under Old Tax Regime rules.',
    description: 'Calculate your HRA tax exemption based on actual rent paid, basic salary, DA, and metro/non-metro rules.',
    keywords: ['hra exemption calculator', 'section 10 13a calculation', 'rule 2a hra formula', 'house rent allowance tax deduction'],
    icon: 'Home',
    primaryFormula: 'Exemption = Min(Actual HRA, Rent Paid - 10% Salary, 50%/40% Salary)',
    formulaBreakdown: {
      title: 'Income Tax Rule 2A HRA Exemption Test',
      formula: 'Min of: 1) Actual HRA; 2) Rent Paid - (0.10 * (Basic + DA)); 3) 0.50 * (Basic + DA) [Metro] or 0.40 [Non-Metro]',
      explanation: 'The least of the three computed amounts is fully exempt from income tax under Section 10(13A) of the Income Tax Act, 1961.',
      sampleCalculation: {
        given: { 'Basic Salary': '₹6,00,000', 'Actual HRA': '₹2,40,000', 'Rent Paid': '₹2,16,000', 'Location': 'Metro (Delhi)' },
        substitutions: '1) ₹2.40L; 2) ₹2.16L - 10% of ₹6L = ₹1.56L; 3) 50% of ₹6L = ₹3.00L. Minimum is ₹1,56,000.',
        result: 'Exempt HRA: ₹1,56,000. Taxable HRA: ₹84,000. Annual Tax Saved (at 20% slab): ₹31,200.',
      },
    },
    keyHighlights: ['Automates Section 10(13A) Rule 2A calculations', 'Monthly & annual calculation modes', 'PAN requirement guidelines for rent > ₹1 Lakh'],
    guideContent: {
      title: 'The Definitive Guide to HRA Tax Exemption Under Section 10(13A)',
      introduction: 'House Rent Allowance (HRA) is one of the most effective tax-saving salary components for Indian employees living in rented accommodation under the Old Tax Regime.',
      sections: [
        {
          heading: '1. Legal Provisions of Section 10(13A) and Rule 2A',
          content: 'Section 10(13A) of the Income Tax Act provides tax relief on rent paid for residential accommodation. To qualify, you must be a salaried employee receiving HRA, live in rented premises, and incur actual rental expenses.',
        },
        {
          heading: '2. Metro vs Non-Metro Classification',
          content: 'For HRA calculation purposes, only four cities qualify as Metros: Delhi, Mumbai, Kolkata, and Chennai. All other cities—including Bengaluru, Hyderabad, Pune, and Gurgaon—are classified as Non-Metro (40% of basic salary).',
        },
        {
          heading: '3. Form 12BB and Landlord PAN Rules',
          content: 'If total annual rent paid exceeds ₹1,00,000 (₹8,333/month), submitting your landlord’s PAN on Form 12BB is legally mandatory. If the landlord lacks a PAN, a signed declaration along with their details is required.',
        },
        {
          heading: '4. Paying Rent to Parents and Joint Ownership',
          content: 'You can claim HRA by paying rent to your parents, provided they legally own the property, you transfer rent via verifiable banking channels, and your parents declare this rental income in their tax returns.',
        },
      ],
      summary: 'HRA provides substantial tax deductions in the Old Tax Regime. Compare total deductions before choosing between the Old and New Tax Regimes.',
    },
    faqs: [
      { question: 'Can I claim HRA in the New Tax Regime?', answer: 'No, HRA exemption under Section 10(13A) is not permitted under the New Tax Regime (Section 115BAC).' },
      { question: 'Is Bengaluru classified as a metro city for HRA?', answer: 'No. For HRA purposes, the Income Tax Department defines only Delhi, Mumbai, Kolkata, and Chennai as metro cities (50% rule).' },
      { question: 'Can I claim both HRA and Home Loan deductions?', answer: 'Yes, if you own a house in a different city or cannot occupy your self-owned house due to employment location constraints.' },
      { question: 'What proof is required to submit to employer?', answer: 'Rent receipts, registered rental agreement, Form 12BB declaration, and landlord PAN (if rent exceeds ₹1 Lakh annually).' },
      { question: 'Can I pay rent to my spouse and claim HRA?', answer: 'No. In the eyes of the law, husband and wife reside together and commercial tenancy agreements between spouses are typically rejected by tax authorities.' },
    ],
  },

  'nps-calculator': {
    id: 'nps-calculator',
    path: '/finance/nps-calculator',
    name: 'NPS Pension & Tax Calculator (80CCD)',
    shortName: 'NPS Calculator',
    badge: 'Tier 1 & 2',
    category: 'finance',
    toolType: 'calculator',
    tagline: 'Calculate your National Pension Scheme retirement corpus, tax savings under 80CCD(1B), and monthly annuity.',
    description: 'Estimate your NPS corpus, lump sum tax-free withdrawal, monthly pension, and Section 80CCD(1B) tax savings.',
    keywords: ['nps calculator', 'national pension scheme returns', '80ccd 1b tax deduction', 'annuity calculator'],
    icon: 'ShieldCheck',
    primaryFormula: 'Corpus = Annuity FV formula; Lump Sum (60%) Tax-Free + Annuity (40%)',
    formulaBreakdown: {
      title: 'NPS Compound Maturity & Annuity Split',
      formula: 'Corpus = P * (((1 + r)^n - 1) / r) * (1 + r); Min 40% converted to Life Annuity',
      explanation: 'At age 60, up to 60% of the corpus can be withdrawn completely tax-free, while the remaining 40% purchases a monthly pension annuity.',
      sampleCalculation: {
        given: { 'Monthly Contribution': '₹10,000', 'Age': '30', 'Tenure': '30 Years', 'Expected Return': '10.5%' },
        substitutions: 'Accumulated Corpus at age 60 = ₹2.41 Crores. 60% Lump Sum = ₹1.45 Crores. 40% Annuity = ₹96.4 Lakhs.',
        result: 'Tax-Free Cash: ₹1.45 Cr + Monthly Pension: ~₹56,200/month (at 7% annuity rate).',
      },
    },
    keyHighlights: ['Computes ₹50,000 extra deduction under 80CCD(1B)', 'Estimates 60% tax-free lump sum and 40% pension', 'Supports Auto and Active equity choice'],
    guideContent: {
      title: 'National Pension System (NPS): The Complete Guide to Wealth & Pension',
      introduction: 'NPS is a voluntary, low-cost, government-backed retirement pension system regulated by PFRDA, offering attractive equity exposure and unique income tax benefits.',
      sections: [
        {
          heading: '1. Tax Benefits: Section 80CCD(1) and 80CCD(1B)',
          content: 'NPS Tier-1 provides an exclusive ₹50,000 tax deduction under Section 80CCD(1B), over and above the ₹1,50,000 limit of Section 80C, saving ₹15,600 annually for individuals in the 30% tax bracket.',
        },
        {
          heading: '2. Corporate NPS Under Section 80CCD(2)',
          content: 'Employer contributions up to 10% of (Basic + DA) can be claimed as a tax deduction under both Old and New Tax Regimes (up to 14% for Central Government employees).',
        },
        {
          heading: '3. Asset Allocation: Active Choice vs Auto Choice',
          content: 'Active Choice allows investors to allocate up to 75% to Equity (Class E), with the remainder in Corporate Bonds (Class C) and Government Securities (Class G). Auto Choice adjusts equity down as you age.',
        },
        {
          heading: '4. Maturity & Withdrawal Rules at Age 60',
          content: 'At age 60, 60% of the total accumulated corpus can be withdrawn as a tax-free lump sum. The remaining 40% must be used to purchase an annuity from a registered life insurer.',
        },
      ],
      summary: 'NPS combines low fund management charges (under 0.09%) with substantial tax benefits, making it an efficient vehicle for retirement wealth accumulation.',
    },
    faqs: [
      { question: 'What is the minimum annual contribution in NPS Tier 1?', answer: 'The minimum contribution to keep an NPS Tier-1 account active is ₹1,000 per financial year.' },
      { question: 'Is the 60% lump sum at age 60 tax-free?', answer: 'Yes, the 60% lump-sum withdrawal upon maturity at age 60 is 100% tax-free under Section 10(12A).' },
      { question: 'Can I withdraw NPS before age 60?', answer: 'Partial withdrawals up to 25% of self-contributions are allowed after 3 years for specific events like marriage, education, or medical emergencies.' },
      { question: 'Is the monthly annuity pension taxable?', answer: 'Yes, the monthly pension received from the annuity provider is taxable as income in the year of receipt according to your tax slab.' },
      { question: 'Can I invest in NPS if I choose the New Tax Regime?', answer: 'Yes! Employer contributions under Section 80CCD(2) remain eligible for deductions under the New Tax Regime.' },
    ],
  },

  'crypto-pnl': {
    id: 'crypto-pnl',
    path: '/finance/crypto-pnl',
    name: 'Crypto Tax & PnL Calculator (Section 115BBH)',
    shortName: 'Crypto Tax',
    badge: 'Budget 2024/25 Law',
    category: 'finance',
    toolType: 'calculator',
    tagline: 'Calculate Indian cryptocurrency capital gains, 30% flat tax liability, and 1% TDS deductions under Section 115BBH.',
    description: 'Calculate cryptocurrency trading profit/loss, flat 30% tax, and 1% Section 194S TDS compliance without API dependencies.',
    keywords: ['crypto tax calculator india', 'section 115bbh crypto tax', '194s tds crypto', 'bitcoin tax india'],
    icon: 'TrendingUp',
    primaryFormula: 'Tax = 30% of Net Gains (No Loss Set-Off) + 4% Health & Education Cess',
    formulaBreakdown: {
      title: 'Virtual Digital Asset (VDA) Tax Computation',
      formula: 'Tax = (Sale Price - Cost of Acquisition) * 31.2% (Inclusive of 4% Cess)',
      explanation: 'Under Section 115BBH, losses from one crypto asset cannot be set off against gains from another. Only direct acquisition cost is deductible.',
      sampleCalculation: {
        given: { 'Buy Price': '₹2,00,000', 'Sell Price': '₹3,50,000', 'Brokerage/Gas Fees': '₹5,000' },
        substitutions: 'Gains = ₹3,50,000 - ₹2,00,000 = ₹1,50,000 (Fees not deductible). Tax = 30% of ₹1.5L + 4% cess = ₹46,800.',
        result: 'Net Profit After Tax: ₹1,03,200. TDS Deducted (1%): ₹3,500.',
      },
    },
    keyHighlights: ['Reflects Section 115BBH regulations', '1% Section 194S TDS tracking', 'Strict zero loss set-off rules'],
    guideContent: {
      title: 'Crypto Tax in India: The Comprehensive Section 115BBH Guide',
      introduction: 'The Indian Finance Act categorizes cryptocurrencies, NFTs, and digital tokens as Virtual Digital Assets (VDAs), subjecting them to a flat tax rate without standard deductions.',
      sections: [
        {
          heading: '1. Flat 30% Tax Rate and 4% Cess',
          content: 'All income from the transfer of any VDA is taxed at a flat 30% (effective 31.2% including cess) regardless of your individual income tax slab.',
        },
        {
          heading: '2. Disallowance of Loss Set-Offs and Carry Forwards',
          content: 'Under Section 115BBH, a loss on Bitcoin cannot be offset against a profit on Ethereum or any equity market gain. Each profitable trade is taxed in isolation.',
        },
        {
          heading: '3. 1% TDS Under Section 194S',
          content: 'A 1% TDS applies on transfer of crypto assets exceeding ₹50,000 annually (₹10,000 for non-specified persons) to maintain an audit trail for the tax department.',
        },
        {
          heading: '4. Non-Deductibility of Mining and Platform Fees',
          content: 'Electricity costs, mining hardware depreciation, gas fees, and exchange transaction fees cannot be deducted from gross proceeds. Only actual acquisition cost is deductible.',
        },
      ],
      summary: 'Accurately report every profitable crypto transaction on Schedule VDA to prevent audit notices and penalty assessments.',
    },
    faqs: [
      { question: 'What is the crypto tax rate in India?', answer: 'Profits from crypto transfers are taxed at a flat 30% plus 4% cess, resulting in an effective tax rate of 31.2%.' },
      { question: 'Can I set off losses against other crypto gains?', answer: 'No, Section 115BBH explicitly prohibits setting off losses from one crypto token against gains from another.' },
      { question: 'How do I claim back 1% TDS deducted by exchanges?', answer: 'The 1% TDS can be claimed as credit against your overall tax liability or refunded when filing your ITR.' },
      { question: 'Is crypto gifting taxable in India?', answer: 'Yes, gifts of VDAs valued over ₹50,000 are taxable in the hands of the recipient under Section 56(2)(x).' },
      { question: 'Which ITR form is required for reporting crypto?', answer: 'Taxpayers with crypto transactions must file ITR-2 or ITR-3 and complete the dedicated Schedule VDA.' },
    ],
  },

  'rd-calculator': {
    id: 'rd-calculator',
    path: '/finance/rd-calculator',
    name: 'Recurring Deposit (RD) Calculator',
    shortName: 'RD Calculator',
    badge: 'Quarterly Compounding',
    category: 'finance',
    toolType: 'calculator',
    tagline: 'Calculate maturity value and interest earned on bank & post office Recurring Deposits with quarterly compounding.',
    description: 'Calculate maturity values and interest returns for monthly bank and India Post Recurring Deposits.',
    keywords: ['rd calculator', 'recurring deposit interest calculator', 'post office rd calculator', 'bank rd formula'],
    icon: 'Building',
    primaryFormula: 'M = P * ((1 + i)^n - 1) / (1 - (1 + i)^(-1/3))',
    formulaBreakdown: {
      title: 'Indian Banking Recurring Deposit Formula',
      formula: 'M = P * n + P * (n * (n + 1) / 2) * (r / 1200) (or exact quarterly compounding table)',
      explanation: 'Banks compound interest quarterly on accumulated monthly installments over the chosen tenure.',
      sampleCalculation: {
        given: { 'Monthly Deposit': '₹5,000', 'Tenure': '36 Months (3 Years)', 'Interest Rate': '7.0%' },
        substitutions: 'Total Invested = ₹1,80,000. Compounded quarterly yield = ₹21,023 in interest.',
        result: 'Maturity Amount: ₹2,01,023.',
      },
    },
    keyHighlights: ['Quarterly compounding as per RBI standards', 'Post Office RD comparison', 'TDS threshold guidance'],
    guideContent: {
      title: 'Recurring Deposits (RD): Safe Monthly Savings Strategy',
      introduction: 'A Recurring Deposit is a traditional fixed-income instrument that allows individuals to save a fixed monthly sum and earn guaranteed interest over a set tenure.',
      sections: [
        {
          heading: '1. How Bank RD Interest is Compounded',
          content: 'Unlike simple interest products, Indian bank RDs compound interest on a quarterly basis, yielding a higher effective annual return than the nominal stated rate.',
        },
        {
          heading: '2. Post Office RD vs Bank RD',
          content: 'India Post RDs offer a 5-year tenure with sovereign security backed by the Government of India, while commercial banks provide flexible tenures from 6 months to 10 years.',
        },
        {
          heading: '3. TDS Rules on Recurring Deposits',
          content: 'TDS applies to RD interest if total bank interest across all deposits exceeds ₹40,000 in a financial year (₹50,000 for senior citizens). Submitting Form 15G/15H avoids TDS if your total income is below the exemption limit.',
        },
        {
          heading: '4. Premature Closure and Penalties',
          content: 'Most banks permit premature withdrawal subject to a nominal penalty (usually 0.5% to 1.0% below the interest rate applicable for the duration the deposit was held).',
        },
      ],
      summary: 'RDs provide disciplined capital accumulation for conservative savers planning predictable expenses over 1 to 5 years.',
    },
    faqs: [
      { question: 'What is the minimum tenure for a bank RD?', answer: 'The minimum tenure for most Indian commercial banks is 6 months, up to a maximum of 10 years (120 months).' },
      { question: 'Is RD interest taxable?', answer: 'Yes, interest earned on Recurring Deposits is taxable according to your income tax slab under "Income from Other Sources".' },
      { question: 'Can I change the monthly deposit amount in an active RD?', answer: 'No, the monthly installment amount is fixed at account opening and cannot be altered during the tenure.' },
      { question: 'What happens if I miss an RD installment?', answer: 'Banks charge a small late fee penalty (typically ₹1.5 to ₹2 per ₹100 of installment) for delayed monthly deposits.' },
      { question: 'Can I take a loan against my RD?', answer: 'Yes, most banks offer overdrafts or loans up to 80-90% of your accumulated RD balance at an interest rate 1-2% above the deposit rate.' },
    ],
  },

  'interest-comparator': {
    id: 'interest-comparator',
    path: '/finance/interest-comparator',
    name: 'Simple vs Compound Interest Comparator',
    shortName: 'Interest Comparator',
    badge: 'Visual Compounding',
    category: 'finance',
    toolType: 'calculator',
    tagline: 'Compare the divergence between Simple Interest and Compound Interest across tenures with frequency adjustments.',
    description: 'Visualize how compounding frequency (annual, quarterly, monthly, daily) accelerates capital accumulation over simple interest.',
    keywords: ['simple vs compound interest', 'compounding frequency calculator', 'interest comparison tool', 'cagr vs simple interest'],
    icon: 'Percent',
    primaryFormula: 'SI = P*r*t vs CI = P*(1 + r/n)^(n*t)',
    formulaBreakdown: {
      title: 'Compounding Divergence Mechanics',
      formula: 'Variance = [P * (1 + r/n)^(n*t)] - [P + (P * r * t)]',
      explanation: 'Measures how reinvesting accrued interest creates exponential growth over arithmetic linear growth.',
      sampleCalculation: {
        given: { 'Principal': '₹1,00,000', 'Rate': '10%', 'Tenure': '20 Years' },
        substitutions: 'SI Maturity = ₹3,00,000. CI Maturity (Annual) = ₹6,72,750.',
        result: 'Compounding generates ₹3,72,750 in additional wealth (over 124% higher return).',
      },
    },
    keyHighlights: ['Compares daily, monthly, quarterly & annual compounding', 'Visual growth comparison', 'Zero API calculation'],
    guideContent: {
      title: 'The Mathematics of Compounding: Simple vs Compound Interest Explained',
      introduction: 'Albert Einstein famously called compound interest the eighth wonder of the world. Understanding the mathematical divergence between linear and exponential interest is foundational to investing.',
      sections: [
        {
          heading: '1. Simple Interest: Linear Capital Accumulation',
          content: 'Simple interest computes returns exclusively on the original principal. Over 30 years at 10%, a ₹1 Lakh deposit generates ₹10,000 per year consistently, resulting in linear growth.',
        },
        {
          heading: '2. Compound Interest: The Snowball Effect',
          content: 'Compound interest pays returns on both the initial principal and accumulated prior interest. In year 30 at 10%, that same ₹1 Lakh generates over ₹1,58,000 in interest in that single year alone.',
        },
        {
          heading: '3. Impact of Compounding Frequencies',
          content: 'The more frequently interest is credited and reinvested (monthly or daily vs annually), the higher the Effective Annual Rate (EAR).',
        },
        {
          heading: '4. Compounding as a Borrower vs Investor',
          content: 'When investing, compounding works in your favor. When carrying revolving credit card debt (compounding at 36% to 42% annualized), compounding works against you.',
        },
      ],
      summary: 'Patience and time in the market unlock the exponential phase of compounding, where late-stage gains vastly overshadow initial principal contributions.',
    },
    faqs: [
      { question: 'What is the formula for compound interest?', answer: 'A = P * (1 + r/n)^(n*t), where P is principal, r is rate, n is compounding frequency per year, and t is time in years.' },
      { question: 'What does compounding frequency mean?', answer: 'It is the number of times accrued interest is added to the principal balance per year (e.g., 4 times for quarterly, 12 for monthly).' },
      { question: 'What is Effective Annual Rate (EAR)?', answer: 'EAR is the actual interest rate earned or paid per year taking into account the effects of intra-year compounding.' },
      { question: 'Why does compound interest accelerate in later years?', answer: 'Because the interest earned in each successive period is calculated on an increasingly larger base of previously accumulated earnings.' },
      { question: 'How does this apply to mutual funds?', answer: 'Mutual funds reinvest dividends and capital gains internally, compounding total fund net asset value over time.' },
    ],
  },

  // ==========================================
  // 2. IMAGE, PDF & MEDIA UTILITIES (/media-tools/...)
  // ==========================================
  'passport-photo-maker': {
    id: 'passport-photo-maker',
    path: '/media-tools/passport-photo-maker',
    name: 'Passport Photo Maker (Multi-Copy A4 Sheet)',
    shortName: 'Passport Photo Maker',
    badge: 'A4 Printable Grid',
    category: 'media-tools',
    toolType: 'utility',
    tagline: 'Create official 35x45mm or 2x2" passport photos and generate multi-copy A4 printable cut sheets.',
    description: 'Format, scale, and align biometric photos for Indian Passports, US Visas, and PAN cards, and generate printable multi-photo A4 sheets.',
    keywords: ['passport photo maker', 'passport photo a4 sheet', '35x45mm photo maker', 'us visa photo 2x2 maker'],
    icon: 'Grid',
    primaryFormula: 'Pixel Dimensions = (Size in mm / 25.4) * DPI (300 DPI Standard)',
    formulaBreakdown: {
      title: 'Biometric Photo DPI Standard Matrix',
      formula: '35mm x 45mm @ 300 DPI = 413px x 531px; 2" x 2" @ 300 DPI = 600px x 600px',
      explanation: 'Computes exact pixel dimensions and arranges photos on an A4 sheet with border cutting guidelines.',
      sampleCalculation: {
        given: { 'Target Spec': 'India Passport 35x45mm', 'Print Resolution': '300 DPI', 'Paper': 'A4 Sheet' },
        substitutions: 'W = (35/25.4)*300 = 413px; H = (45/25.4)*300 = 531px; Grid = 4x8 photos',
        result: '32 Studio-Grade Passport Photos per A4 Sheet with cutting lines.',
      },
    },
    keyHighlights: ['Indian Passport (35x45mm) & US Visa (2x2") presets', 'Client-side background color adjuster', 'Printable A4 / 4x6 inch grid generation'],
    guideContent: {
      title: 'How to Prepare and Print Compliant Passport Photos at Home',
      introduction: 'Government passport authorities and visa consulates enforce strict biometric standards regarding head dimensions, eye line placement, background uniformity, and paper resolution.',
      sections: [
        {
          heading: '1. Official Biometric Standards for Indian Passports and Visas',
          content: 'The Ministry of External Affairs mandates a 35mm x 45mm color photo with the face occupying 70% to 80% of the vertical frame (31mm to 36mm from chin to crown) against a plain light background.',
        },
        {
          heading: '2. Lighting and Facial Posture Requirements',
          content: 'Ensure balanced lighting across both cheeks with no harsh shadows behind ears or neck. Keep facial expression neutral with both eyes open and mouth closed. Eyeglasses must be non-reflective with clear lenses.',
        },
        {
          heading: '3. Cost Savings of Self-Printing on A4 Photo Paper',
          content: 'Professional photo studios charge ₹100 to ₹150 for 4 passport prints. Generating an A4 sheet with 32 copies costs under ₹15 when printed on standard glossy inkjet photo paper.',
        },
        {
          heading: '4. Privacy and Security of Client-Side Processing',
          content: 'All image crops, color adjustments, and sheet renderings are processed locally in your browser using HTML5 Canvas. Your personal biometric photos are never uploaded to any remote server.',
        },
      ],
      summary: 'Follow official biometric guidelines for facial positioning and print on 200+ GSM glossy paper for official passport submissions.',
    },
    faqs: [
      { question: 'What is the official passport photo size for India?', answer: 'The standard size is 35mm wide by 45mm high with the face occupying 70-80% of the image.' },
      { question: 'What background color is required for Indian passport photos?', answer: 'The official requirement is a plain white or light off-white background with no patterns or shadows.' },
      { question: 'Can I take my passport photo with a smartphone?', answer: 'Yes, stand 1.5 to 2 meters away against a plain wall in natural lighting, and upload the image to this tool for cropping.' },
      { question: 'What paper should I print the A4 sheet on?', answer: 'For best results, use glossy photo paper with a minimum weight of 180 to 220 GSM on any standard color inkjet printer.' },
      { question: 'Are my photos stored on your server?', answer: 'No. The tool runs 100% in your browser using client-side Canvas. No photos are sent to or stored on any server.' },
    ],
  },

  'image-to-webp-png': {
    id: 'image-to-webp-png',
    path: '/media-tools/image-to-webp-png',
    name: 'Image Converter (JPG, PNG & WebP)',
    shortName: 'Image Converter',
    badge: 'Lossless & Fast',
    category: 'media-tools',
    toolType: 'utility',
    tagline: 'Convert images between WebP, PNG, and JPEG formats in your browser with quality tuning.',
    description: 'Convert images to WebP, PNG, or JPG formats locally in your browser without uploading to external servers.',
    keywords: ['image to webp', 'png to jpg converter', 'webp to png', 'client side image converter'],
    icon: 'ImageIcon',
    primaryFormula: 'Canvas.toBlob(format, quality)',
    formulaBreakdown: {
      title: 'Browser Native Image Encoding',
      formula: 'canvas.toBlob((blob) => URL.createObjectURL(blob), "image/webp", 0.85)',
      explanation: 'Uses the browser’s native raster graphics pipeline to transcode pixel buffers without quality loss.',
      sampleCalculation: {
        given: { 'Input Format': '3.2 MB PNG', 'Target': 'WebP (Quality 85%)' },
        substitutions: 'Canvas loads bitmap array -> Encodes into WebP container via native browser encoder',
        result: '412 KB WebP (87% file size reduction with high visual fidelity).',
      },
    },
    keyHighlights: ['Converts JPG, PNG, and WebP instantly', 'Adjustable compression quality slider', '100% private in-browser conversion'],
    guideContent: {
      title: 'WebP vs PNG vs JPG: Next-Gen Web Performance Guide',
      introduction: 'Image format selection affects web page load speed, Core Web Vitals, and mobile bandwidth efficiency. Next-generation formats like WebP offer superior compression without noticeable loss of detail.',
      sections: [
        {
          heading: '1. Why WebP is the Modern Standard for Web Publishing',
          content: 'Developed by Google, WebP provides lossless and lossy compression that averages 26% smaller file sizes compared to PNGs and 25-34% smaller than comparable JPEGs at equivalent SSIM quality index.',
        },
        {
          heading: '2. When to Use PNG vs JPEG',
          content: 'PNG excels for UI graphics, logos, icons, and diagrams requiring alpha transparency and sharp text edges. JPEG is best suited for complex photographic content with color gradients.',
        },
        {
          heading: '3. Browser Compatibility Considerations',
          content: 'WebP is supported by all modern browsers (Chrome, Safari, Edge, Firefox). Transcoding legacy assets to WebP improves Largest Contentful Paint (LCP) scores for SEO.',
        },
        {
          heading: '4. Client-Side Transcoding Benefits',
          content: 'Converting images directly on your machine removes upload wait times, server processing queues, and data privacy concerns associated with cloud converters.',
        },
      ],
      summary: 'Convert web imagery to WebP at 80-85% quality to optimize web page speed and user experience while preserving visual fidelity.',
    },
    faqs: [
      { question: 'What is the difference between WebP and JPG?', answer: 'WebP produces 25% to 35% smaller file sizes than JPG at equivalent visual quality and supports transparent backgrounds.' },
      { question: 'Does converting PNG to WebP reduce quality?', answer: 'WebP supports both lossless and lossy modes. In lossless mode, visual quality is preserved with smaller file size.' },
      { question: 'Is there a limit on file size?', answer: 'Since conversion runs in your browser, limits depend only on your device’s available RAM. Files up to 50MB typically process smoothly.' },
      { question: 'Will my converted images have watermarks?', answer: 'No. All conversions are 100% free with no watermarks, registrations, or usage limitations.' },
      { question: 'Can I convert photos on iPhone or Android?', answer: 'Yes, this tool works directly in modern mobile web browsers on both iOS and Android devices.' },
    ],
  },

  'svg-to-png': {
    id: 'svg-to-png',
    path: '/media-tools/svg-to-png',
    name: 'SVG to High-Res PNG Converter',
    shortName: 'SVG to PNG',
    badge: 'Scale to 4K',
    category: 'media-tools',
    toolType: 'utility',
    tagline: 'Render vector SVG files into crisp, high-resolution PNG raster graphics at custom scales.',
    description: 'Convert vector SVG files into high-resolution PNGs at custom pixel dimensions with transparent backgrounds.',
    keywords: ['svg to png converter', 'vector to raster', 'high res png from svg', 'svg 4k export'],
    icon: 'Maximize2',
    primaryFormula: 'Raster Resolution = Vector ViewBox * Scale Factor',
    formulaBreakdown: {
      title: 'Vector Rasterization Transform',
      formula: 'TargetWidth = svg.viewBox.width * scale; TargetHeight = svg.viewBox.height * scale',
      explanation: 'Loads vector paths and renders them onto an HTML5 Canvas at your chosen scale factor before exporting to PNG.',
      sampleCalculation: {
        given: { 'Input SVG': '24px x 24px Icon', 'Scale': '16x (4K Asset)' },
        substitutions: '24 * 16 = 384px x 384px canvas rendering',
        result: 'High-density 384px PNG asset with crisp vector-rendered edges.',
      },
    },
    keyHighlights: ['Scale vector SVGs up to 8x resolution without pixelation', 'Preserves alpha transparency', 'Zero API dependencies'],
    guideContent: {
      title: 'Vector to Raster: Scaling SVGs to High-Resolution PNGs',
      introduction: 'Scalable Vector Graphics (SVG) define shapes mathematically using XML paths. Converting them to high-resolution raster PNGs requires crisp rendering at higher pixel densities.',
      sections: [
        {
          heading: '1. Why Scale Vectors Before Rasterization',
          content: 'Scaling an SVG after rasterizing it to a small PNG introduces blurriness and pixelation. Scaling the vector coordinates before rendering produces sharp, crisp edges at any desired output size.',
        },
        {
          heading: '2. Preserving Alpha Channel Transparency',
          content: 'Vector icons and logos often use transparent backgrounds. Exporting to 32-bit RGBA PNG preserves this transparency for UI buttons, presentations, and design mockups.',
        },
        {
          heading: '3. Troubleshooting Inline Fonts and Styles',
          content: 'If an SVG relies on external web fonts, ensure the fonts are embedded via `<style>` `@import` or converted to outlines to prevent default fallback fonts during export.',
        },
        {
          heading: '4. Performance and Memory Management',
          content: 'Browser Canvas handles resolutions up to 8000x8000 pixels on modern devices, enabling high-quality exports for print, merchandise, and billboard layouts.',
        },
      ],
      summary: 'Export vector SVGs to high-resolution PNGs at 2x, 4x, or 8x scale to ensure clean typography and sharp graphics across retina displays and print media.',
    },
    faqs: [
      { question: 'Why does my PNG look blurry when enlarged?', answer: 'If you enlarge a raster PNG after generation, it pixelates. Re-render the original SVG directly at the larger dimensions to keep it sharp.' },
      { question: 'Does this tool support transparent SVG backgrounds?', answer: 'Yes, full alpha transparency is preserved in the exported PNG.' },
      { question: 'Can I export SVGs to 4K resolutions?', answer: 'Yes, select 4x or 8x scale to generate crisp 4K and 8K raster assets.' },
      { question: 'Are my proprietary logo files secure?', answer: 'Yes. Rendering happens entirely in your local browser sandbox without server communication.' },
      { question: 'What happens if the SVG contains embedded raster images?', answer: 'Embedded raster images render at their native resolution within the vector canvas container.' },
    ],
  },

  'color-picker': {
    id: 'color-picker',
    path: '/media-tools/color-picker',
    name: 'Color Picker & Palette Extractor',
    shortName: 'Color Picker',
    badge: 'EyeDropper API',
    category: 'media-tools',
    toolType: 'utility',
    tagline: 'Pick colors from your screen with the EyeDropper API and convert between HEX, RGB, HSL, and CMYK.',
    description: 'Pick colors directly from your desktop or web pages, extract dominant palettes from uploaded images, and convert across color models.',
    keywords: ['color picker', 'hex to rgb converter', 'eyedropper api', 'palette generator from image', 'hsl color tool'],
    icon: 'Sliders',
    primaryFormula: 'Color Conversion Matrix: HEX <-> RGB <-> HSL <-> CMYK',
    formulaBreakdown: {
      title: 'RGB to HSL Color Space Conversion',
      formula: 'H = 60 * ((G - B) / (Max - Min)); S = (Max - Min) / (1 - |2L - 1|); L = (Max + Min) / 2',
      explanation: 'Calculates hue angle, saturation ratio, and lightness value from normalized red, green, and blue coordinates.',
      sampleCalculation: {
        given: { 'HEX Code': '#FF671F (Saffron)' },
        substitutions: 'R=255, G=103, B=31 -> Max=1.0, Min=0.121',
        result: 'RGB: (255, 103, 31) · HSL: (19°, 100%, 56%) · CMYK: (0%, 60%, 88%, 0%).',
      },
    },
    keyHighlights: ['Screen EyeDropper API integration', 'Image color palette extraction', 'Instant one-click color format copying'],
    guideContent: {
      title: 'The Modern Color Systems Guide: HEX, RGB, HSL, and Accessibility',
      introduction: 'Color selection is key to digital brand identity, user interface legibility, and WCAG accessibility standards.',
      sections: [
        {
          heading: '1. Color Space Models: RGB vs HSL vs CMYK',
          content: 'RGB matches screen hardware pixels. HSL (Hue, Saturation, Lightness) provides an intuitive model for generating harmonious color tints and shades. CMYK is the standard subtractive model used for four-color commercial printing.',
        },
        {
          heading: '2. WCAG Contrast Compliance (AA & AAA Standards)',
          content: 'To meet WCAG 2.1 AA accessibility standards, normal body text requires a minimum contrast ratio of 4.5:1 against its background. Large headings (18pt+ or bold 14pt+) require at least 3:1.',
        },
        {
          heading: '3. Browser-Native EyeDropper API',
          content: 'Chromium browsers support the native `window.EyeDropper` API, enabling users to sample pixel colors anywhere across their operating system display with single-pixel precision.',
        },
        {
          heading: '4. Extracting Dominant Color Harmonies from Imagery',
          content: 'Sampling dominant colors from hero photography helps establish cohesive UI backgrounds, badges, and button highlights that complement the imagery.',
        },
      ],
      summary: 'Use HSL for creating systematic UI color palettes, verify contrast against WCAG AA standards, and test combinations across both light and dark backgrounds.',
    },
    faqs: [
      { question: 'What is the EyeDropper API?', answer: 'The EyeDropper API allows web apps to provide an eyedropper tool for sampling colors directly from the screen.' },
      { question: 'What is the difference between HEX and RGB?', answer: 'HEX is a six-digit hexadecimal representation of RGB values (e.g., #FFFFFF is RGB 255, 255, 255).' },
      { question: 'How do I convert digital RGB to CMYK for print?', answer: 'CMYK calculates Cyan, Magenta, Yellow, and Key (Black) ink percentages needed to reproduce screen colors in print.' },
      { question: 'What is WCAG AA contrast ratio?', answer: 'It is an accessibility guideline requiring at least 4.5:1 contrast between text and background to ensure readability for visually impaired users.' },
      { question: 'Can I extract a color palette from an image?', answer: 'Yes, upload any image to extract its dominant color swatches in HEX and RGB formats.' },
    ],
  },

  // ==========================================
  // 3. TEXT & CONTENT UTILITIES (/text-tools/...)
  // ==========================================
  'case-converter': {
    id: 'case-converter',
    path: '/text-tools/case-converter',
    name: 'Text Case Converter (Title, Camel, Snake, Kebab)',
    shortName: 'Case Converter',
    badge: '10 Formats',
    category: 'text-tools',
    toolType: 'utility',
    tagline: 'Transform text into Title Case, Sentence case, camelCase, snake_case, kebab-case, and UPPERCASE instantly.',
    description: 'Convert text blocks between multiple casing conventions for programming, copywriting, and documentation formatting.',
    keywords: ['case converter', 'title case generator', 'camelcase converter', 'snake case to camelcase', 'text casing tool'],
    icon: 'FileText',
    primaryFormula: 'String.replace(/\\b\\w/g, c => c.toUpperCase()) and Regex transformations',
    formulaBreakdown: {
      title: 'Deterministic Casing State Machine',
      formula: 'Title Case: split words -> capitalize first letter unless minor word (in, of, the, a)',
      explanation: 'Uses regular expressions to segment words, strip delimiters, and apply target capitalization rules.',
      sampleCalculation: {
        given: { 'Input String': 'hello world financial tools' },
        substitutions: 'CamelCase -> helloWorldFinancialTools | Snake -> hello_world_financial_tools | Title -> Hello World Financial Tools',
        result: 'Formatted into 10 casing variations with one click.',
      },
    },
    keyHighlights: ['Supports 10 casing conventions', 'Preserves programming acronyms', 'Word and character counts included'],
    guideContent: {
      title: 'The Comprehensive Guide to Text Casing Conventions in Code and Copy',
      introduction: 'Text casing conventions ensure consistency across software engineering architectures, database schemas, and editorial publication standards.',
      sections: [
        {
          heading: '1. Programming Conventions: camelCase, PascalCase, snake_case, and kebab-case',
          content: 'JavaScript and TypeScript typically use camelCase for variables and PascalCase for React components and classes. Python and SQL favor snake_case for column names, while URLs and CSS class names rely on kebab-case.',
        },
        {
          heading: '2. Editorial Standards: AP and Chicago Title Case',
          content: 'Title Case capitalizes the first letter of major words while leaving short prepositions, conjunctions, and articles (e.g., in, on, the, and, of) lowercase unless they are the first or last word of the title.',
        },
        {
          heading: '3. URL Slug Best Practices for Technical SEO',
          content: 'Search engines treat hyphens in kebab-case (`best-sip-calculator`) as word separators, making it the preferred convention for SEO-friendly URLs over underscores (`best_sip_calculator`).',
        },
        {
          heading: '4. Preserving Data Structure Integrity in Codebases',
          content: 'Consistent casing conventions across API response payloads (e.g., camelCase for JSON keys) prevent parsing errors and ease integration across frontend and backend services.',
        },
      ],
      summary: 'Adopt standard casing conventions—kebab-case for URLs, camelCase for JavaScript, snake_case for SQL—to maintain clean, readable code and content.',
    },
    faqs: [
      { question: 'What is camelCase?', answer: 'A naming convention where words are joined without spaces and each word after the first begins with a capital letter (e.g., myVariableName).' },
      { question: 'What is kebab-case and why is it used in URLs?', answer: 'Words separated by hyphens (e.g., my-article-title). Google recommends hyphens over underscores for URL readability.' },
      { question: 'What is Title Case?', answer: 'A capitalization style where major words are capitalized and minor words (like "in", "and", "of") remain lowercase.' },
      { question: 'Does case conversion work with non-English characters?', answer: 'Yes, modern JavaScript Unicode normalization supports accented characters and multiple language scripts.' },
      { question: 'Is there a character limit on the text converter?', answer: 'No, processing occurs client-side in browser memory and handles documents with hundreds of thousands of characters easily.' },
    ],
  },

  'speech-to-text-and-back': {
    id: 'speech-to-text-and-back',
    path: '/text-tools/speech-to-text-and-back',
    name: 'Speech-to-Text & Audio Reader Studio',
    shortName: 'Speech Studio',
    badge: 'Web Speech API',
    category: 'text-tools',
    toolType: 'utility',
    tagline: 'Dictate text using your microphone and listen to documents read aloud using native browser speech engines.',
    description: 'Convert voice to text via real-time microphone dictation, and read text aloud with customizable pitch and playback speed.',
    keywords: ['speech to text online', 'text to speech reader', 'voice typing tool', 'web speech api dictation'],
    icon: 'Volume2',
    primaryFormula: 'SpeechRecognition() for ASR + SpeechSynthesisUtterance() for TTS',
    formulaBreakdown: {
      title: 'Web Speech API Native Browser Pipeline',
      formula: 'window.SpeechRecognition onresult -> String; window.speechSynthesis.speak(utterance)',
      explanation: 'Directly hooks into browser speech recognition and synthesis engines with zero third-party API dependencies.',
      sampleCalculation: {
        given: { 'Audio Stream': 'Microphone speech at 16kHz', 'Language': 'en-IN (English India)' },
        substitutions: 'Audio frames -> Speech Recognition acoustic model -> Real-time transcribed text stream',
        result: 'Real-time text transcription with interim and final transcript tokens.',
      },
    },
    keyHighlights: ['Continuous voice typing with real-time feedback', 'Multi-accent speech reader with pitch and speed controls', '100% private in-browser audio processing'],
    guideContent: {
      title: 'Voice Typing and Text-to-Speech: Productivity with Web Speech APIs',
      introduction: 'Voice dictation and text-to-speech tools help professionals draft documents, proofread written copy, and make content more accessible.',
      sections: [
        {
          heading: '1. How the Web Speech API Operates',
          content: 'The W3C Web Speech API includes two components: SpeechRecognition for converting voice to text, and SpeechSynthesis for converting written text into spoken audio.',
        },
        {
          heading: '2. Increasing Dictation Accuracy',
          content: 'For best voice recognition results, use an external headset microphone, enunciate clearly, speak punctuation marks explicitly ("period", "comma", "new line"), and work in a quiet environment.',
        },
        {
          heading: '3. Proofreading Written Content via Audio Playback',
          content: 'Listening to your written content read aloud engages auditory processing, helping you catch awkward phrasing, missing words, and grammatical errors that are easy to miss when reading silently.',
        },
        {
          heading: '4. Privacy and Confidentiality Advantages',
          content: 'Because processing leverages native browser capabilities rather than paid cloud audio APIs, your confidential dictations and documents are never shared with third-party servers.',
        },
      ],
      summary: 'Incorporate voice typing for initial drafting and listen back using speech synthesis to streamline your writing and proofreading workflow.',
    },
    faqs: [
      { question: 'Which browsers support speech recognition?', answer: 'Google Chrome, Microsoft Edge, and Safari have built-in Web Speech API recognition support.' },
      { question: 'Does this tool require microphone permissions?', answer: 'Yes, your browser will prompt you to allow microphone access when you click "Start Voice Typing".' },
      { question: 'Can I dictate in languages other than English?', answer: 'Yes, the language selector supports Hindi, British English, US English, and regional Indian language accents.' },
      { question: 'Can I adjust the reading voice and speed?', answer: 'Yes, customize speech playback using your system’s installed voices with pitch and speed sliders from 0.5x to 2.0x.' },
      { question: 'Is there a recording time limit?', answer: 'No, you can dictate continuously as long as your browser session remains active.' },
    ],
  },

  // ==========================================
  // 4. WEB & DEVELOPER UTILITIES (/dev-tools/...)
  // ==========================================
  'css-box-shadow-generator': {
    id: 'css-box-shadow-generator',
    path: '/dev-tools/css-box-shadow-generator',
    name: 'CSS Box Shadow & Elevation Generator',
    shortName: 'Box Shadow Generator',
    badge: 'Tailwind + CSS',
    category: 'dev-tools',
    toolType: 'utility',
    tagline: 'Design realistic CSS box shadows, layered elevations, and generate copy-paste CSS & Tailwind code.',
    description: 'Design smooth multi-layered CSS shadows and generate clean, performant CSS and Tailwind box-shadow code.',
    keywords: ['css box shadow generator', 'layered shadows css', 'tailwind shadow generator', 'smooth elevation css'],
    icon: 'Layers',
    primaryFormula: 'box-shadow: [inset] x-offset y-offset blur-radius spread-radius color;',
    formulaBreakdown: {
      title: 'Layered Shadow Optical Physics Formula',
      formula: 'box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.1);',
      explanation: 'Layering multiple subtle shadow definitions creates realistic, optical elevation and depth without harsh border lines.',
      sampleCalculation: {
        given: { 'Elevation': 'Level 3 Card', 'Light Source': 'Top-Center', 'Blur': '16px' },
        substitutions: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        result: 'Natural depth mimicking a physical surface elevated 12px above the base canvas.',
      },
    },
    keyHighlights: ['Multi-layer shadow stacking', 'Generates standard CSS and Tailwind config syntax', 'Live interactive element preview'],
    guideContent: {
      title: 'Mastering Modern CSS Shadows: Layering, Depth, and Elevation',
      introduction: 'High-quality digital UI design relies on layered shadows that mimic physical light scattering rather than harsh, single-layer outlines.',
      sections: [
        {
          heading: '1. The Problem with Single-Layer Default Shadows',
          content: 'A single shadow like `box-shadow: 0 10px 20px #000` looks artificial and muddy. In the real world, light bends and scatters, creating multiple levels of diffuse ambient occlusion.',
        },
        {
          heading: '2. The Multi-Layer Shadow Technique',
          content: 'Stacking two or three shadow layers with varying blur radii and low-opacity colors produces natural elevation. A tight, darker shadow handles contact occlusion, while a wider, softer shadow simulates ambient light bounce.',
        },
        {
          heading: '3. Performance Considerations and GPU Layers',
          content: 'Large blur radii on frequently animated elements can trigger costly CPU repaints. Animate the `opacity` or `transform` of an absolutely positioned pseudo-element containing the shadow instead of animating `box-shadow` directly.',
        },
        {
          heading: '4. Dark Mode Shadow Adaptations',
          content: 'Dark mode surfaces cannot rely on dark drop shadows against dark backgrounds. Use subtle white or colored edge highlights (e.g., `1px inset rgba(255, 255, 255, 0.08)`) to establish visual depth.',
        },
      ],
      summary: 'Layer multiple low-opacity shadow definitions to create clean, natural depth that enhances UI hierarchy without clutter.',
    },
    faqs: [
      { question: 'What is shadow spread radius in CSS?', answer: 'Spread radius expands or shrinks the shadow shape before the blur radius is applied. Positive values enlarge the shadow; negative values contract it.' },
      { question: 'How do I create inset shadows?', answer: 'Add the `inset` keyword before or after the coordinate parameters to draw the shadow inside the element’s frame.' },
      { question: 'How can I use this with Tailwind CSS?', answer: 'Copy the generated Tailwind utility class or paste the raw box-shadow value into your `tailwind.config.js` theme file.' },
      { question: 'Do shadows affect element layout flow?', answer: 'No, box-shadows are drawn outside the box model layout and do not alter surrounding margin, padding, or flow dimensions.' },
      { question: 'Can I apply box shadows to non-rectangular shapes?', answer: 'Box shadows conform to the element’s `border-radius`. For irregular SVG paths or transparent PNGs, use the CSS `filter: drop-shadow()` property instead.' },
    ],
  },

  'json-validator': {
    id: 'json-validator',
    path: '/dev-tools/json-validator',
    name: 'JSON Validator, Formatter & Minifier',
    shortName: 'JSON Validator',
    badge: 'Strict Syntax Engine',
    category: 'dev-tools',
    toolType: 'utility',
    tagline: 'Validate, format, indent, and minify JSON data with exact line-and-column syntax error pointers.',
    description: 'Format, validate, repair, and minify JSON data with instant error feedback and client-side processing.',
    keywords: ['json validator', 'json formatter', 'json beautifier', 'json minifier', 'json lint online'],
    icon: 'FileCode',
    primaryFormula: 'JSON.parse(string) and JSON.stringify(object, null, 2)',
    formulaBreakdown: {
      title: 'Deterministic JSON Parser and Formatter',
      formula: 'try { JSON.parse(raw); } catch (e) { locateLineAndColumn(e.message, raw); }',
      explanation: 'Evaluates payload against strict RFC 8259 JSON standards, locating misplaced commas, unquoted keys, and syntax errors.',
      sampleCalculation: {
        given: { 'Input JSON': '{"name": "aitoolshub", "active": true,}' },
        substitutions: 'Trailing comma after "active": true violates RFC 8259 Section 6',
        result: 'Syntax Error: Trailing comma at line 1, position 43 flagged and corrected.',
      },
    },
    keyHighlights: ['Precise line and column error indicators', 'Pretty print (2 or 4 spaces) and minify modes', '100% private in-browser validation'],
    guideContent: {
      title: 'The Developer Guide to JSON Data Structures and Common Syntax Errors',
      introduction: 'JavaScript Object Notation (JSON) is the universal data interchange format for RESTful APIs, configuration files, and distributed web microservices.',
      sections: [
        {
          heading: '1. Strict RFC 8259 Standards vs JavaScript Objects',
          content: 'Unlike standard JavaScript object literals, valid JSON requires double quotes around every key string, forbids trailing commas, and does not permit single quotes, comments, or unquoted identifiers.',
        },
        {
          heading: '2. Most Common JSON Syntax Errors',
          content: 'Common errors include trailing commas after the final key/value pair, single quotes instead of double quotes, unescaped control characters inside strings, and unclosed brackets or braces.',
        },
        {
          heading: '3. Pretty Printing vs Minification for Production',
          content: 'Pretty-printed JSON with 2-space indentation improves human readability during debugging, while minifying JSON by stripping whitespace reduces payload sizes and lowers bandwidth consumption in production APIs.',
        },
        {
          heading: '4. Safe Handling of Sensitive API Payloads',
          content: 'Validating confidential JSON payloads—such as authorization tokens, customer records, and database dumps—on cloud-based formatters can expose private data. Client-side tools ensure your data never leaves your browser.',
        },
      ],
      summary: 'Adhere to strict RFC 8259 standards for API data exchange, and validate payloads using client-side tools to ensure privacy and compliance.',
    },
    faqs: [
      { question: 'Why does my valid JavaScript object fail JSON validation?', answer: 'JavaScript allows unquoted keys, single quotes, and trailing commas; strict JSON standard RFC 8259 forbids all three.' },
      { question: 'Can JSON include comments?', answer: 'No, standard JSON does not support comments. For configuration files requiring comments, formats like JSON5 or YAML are used.' },
      { question: 'Is my JSON data uploaded to any server?', answer: 'No. All parsing, validation, and formatting runs locally in your browser’s JavaScript engine.' },
      { question: 'What is the maximum JSON payload size supported?', answer: 'The tool handles multi-megabyte JSON files (up to 50MB+) depending on your device’s available memory.' },
      { question: 'How do I fix a trailing comma error in JSON?', answer: 'Remove the comma following the last property in an object or the last element in an array before the closing brace or bracket.' },
    ],
  },

  // ==========================================
  // 5. LIFESTYLE, HEALTH & PRODUCTIVITY (/productivity/...)
  // ==========================================
  'water-intake-calculator': {
    id: 'water-intake-calculator',
    path: '/productivity/water-intake-calculator',
    name: 'Daily Water Intake & Hydration Calculator',
    shortName: 'Water Intake',
    badge: 'Health Standard',
    category: 'productivity',
    toolType: 'calculator',
    tagline: 'Calculate your personalized daily water hydration needs based on body weight, climate, and physical activity level.',
    description: 'Calculate your optimal daily water intake based on body weight, activity level, and local climate.',
    keywords: ['water intake calculator', 'daily water requirement', 'hydration calculator', 'how much water to drink'],
    icon: 'Heart',
    primaryFormula: 'Water (Liters) = (Weight in kg * 0.033) + (Activity Mins / 30 * 0.35) + Climate Adj',
    formulaBreakdown: {
      title: 'Physiological Hydration Demand Model',
      formula: 'Daily Liters = (Weight_kg * 35ml) + (Exercise_Hours * 500ml) + Climate_Offset',
      explanation: 'Calculates baseline metabolic water needs per kilogram of body weight, plus adjustments for sweat loss from exercise and warm weather.',
      sampleCalculation: {
        given: { 'Body Weight': '70 kg', 'Daily Exercise': '45 minutes', 'Climate': 'Hot / Tropical (Indian Summer)' },
        substitutions: '(70 * 35ml = 2,450ml) + (0.75 * 500ml = 375ml) + 400ml climate buffer',
        result: 'Recommended Daily Water Intake: 3.2 Liters (~13 glasses of 250ml each).',
      },
    },
    keyHighlights: ['Weight, activity, and climate adjustments', 'Glass and bottle equivalents display', 'Practical hydration timing tips'],
    guideContent: {
      title: 'The Science of Hydration: Daily Water Requirements and Health Benefits',
      introduction: 'Water makes up roughly 60% of human body weight and is essential for cellular transport, joint lubrication, cognitive focus, and body temperature regulation.',
      sections: [
        {
          heading: '1. Debunking the "8 Glasses a Day" Rule',
          content: 'The traditional "8x8 rule" (eight 8-ounce glasses) is a general guideline that overlooks individual body mass, metabolic rate, sweat loss, climate conditions, and dietary intake.',
        },
        {
          heading: '2. Calculating Needs Based on Body Mass and Activity',
          content: 'A baseline of approximately 35ml of water per kilogram of body weight is standard. Vigorous exercise increases this demand by 500ml to 750ml per hour of sustained activity.',
        },
        {
          heading: '3. Environmental Factors and Tropical Climates',
          content: 'Living in hot or humid climates elevates perspiration and insensible fluid loss, requiring an additional 300ml to 600ml daily to prevent dehydration.',
        },
        {
          heading: '4. Signs of Optimal Hydration vs Dehydration',
          content: 'A reliable indicator of hydration status is urine color: pale, light straw-colored urine indicates healthy hydration, while dark amber shades signal the need to drink water.',
        },
      ],
      summary: 'Meet your daily hydration target through consistent intake throughout the day rather than drinking large quantities all at once.',
    },
    faqs: [
      { question: 'How many liters of water should I drink daily?', answer: 'Most healthy adults need between 2.5 and 3.5 liters per day, depending on body weight, physical activity, and climate.' },
      { question: 'Do tea and coffee count toward daily fluid intake?', answer: 'Yes, moderate consumption of coffee and tea contributes to hydration, though plain water remains the primary recommended source.' },
      { question: 'Can drinking too much water be harmful?', answer: 'Yes, excessive water intake in a short window can dilute blood sodium levels, a condition known as hyponatremia.' },
      { question: 'Does drinking water aid in weight management?', answer: 'Drinking water before meals can promote satiety and temporarily boost metabolic rate, supporting healthy weight management.' },
      { question: 'What are early symptoms of mild dehydration?', answer: 'Headaches, fatigue, dry mouth, lightheadedness, and dark-colored urine are common early signs of dehydration.' },
    ],
  },

  'pomodoro-timer': {
    id: 'pomodoro-timer',
    path: '/productivity/pomodoro-timer',
    name: 'Pomodoro Productivity & Deep Work Timer',
    shortName: 'Pomodoro Timer',
    badge: 'Focus Engine',
    category: 'productivity',
    toolType: 'utility',
    tagline: 'Boost concentration and combat cognitive fatigue with the proven 25/5 interval productivity technique.',
    description: 'A customizable 25/5 minute Pomodoro timer with audio chimes, cycle tracking, and full client-side privacy.',
    keywords: ['pomodoro timer', 'focus timer', 'deep work timer', 'productivity technique timer', '25 minute timer'],
    icon: 'Clock',
    primaryFormula: 'Interval Cycle: 4 x (25min Focus + 5min Short Break) -> 1 x 15min Long Break',
    formulaBreakdown: {
      title: 'The Cirillo Interval Productivity Cycle',
      formula: 'Work Interval = 25 min; Short Break = 5 min; 4 Cycles -> Long Break = 15-30 min',
      explanation: 'Structures work into manageable intervals to maintain focus while preventing mental fatigue.',
      sampleCalculation: {
        given: { 'Task': 'Financial model analysis', 'Planned Sessions': '4 Pomodoros' },
        substitutions: '(25m + 5m) * 3 + (25m + 15m) = 130 minutes total time',
        result: '100 minutes of focused work completed with structured mental recovery.',
      },
    },
    keyHighlights: ['Standard 25/5 and custom interval lengths', 'Visual circular progress animation', 'Web Audio notification chimes'],
    guideContent: {
      title: 'The Pomodoro Technique: Maximizing Deep Work and Focus',
      introduction: 'Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique is an established time management method that uses timed intervals to maintain sustained concentration.',
      sections: [
        {
          heading: '1. The Cognitive Psychology Behind 25-Minute Sprints',
          content: 'Human attention naturally wanes after prolonged concentration. The 25-minute interval is short enough to remain manageable and long enough to achieve meaningful progress on complex tasks.',
        },
        {
          heading: '2. The Rule of the Dedicated Break',
          content: 'Breaks must be true cognitive rest periods. Avoid checking email, social media, or news feeds during the 5-minute pause. Step away from your desk, stretch, or drink water instead.',
        },
        {
          heading: '3. Managing Internal and External Interruptions',
          content: 'When an unrelated thought or non-urgent task arises during a focus sprint, write it down on a notepad and immediately return to the task at hand until the timer rings.',
        },
        {
          heading: '4. Adapting Intervals for Creative and Technical Work',
          content: 'While 25/5 is the classic structure, complex programming or creative writing can benefit from 50-minute focus blocks paired with 10-minute breaks to support deep immersion.',
        },
      ],
      summary: 'Use timed focus intervals to build consistent momentum on important projects while safeguarding against cognitive burnout.',
    },
    faqs: [
      { question: 'What is the Pomodoro Technique?', answer: 'A time management system that breaks work into 25-minute focused intervals separated by short 5-minute breaks.' },
      { question: 'Why is it called Pomodoro?', answer: 'The creator, Francesco Cirillo, used a tomato-shaped kitchen timer as a university student ("pomodoro" is Italian for tomato).' },
      { question: 'How long should the long break be?', answer: 'After completing four consecutive work intervals, take an extended break of 15 to 30 minutes to fully recharge.' },
      { question: 'What should I do if a task takes less than 25 minutes?', answer: 'Use the remaining time to review your work, document notes, or prepare materials for your next focus session.' },
      { question: 'Does the timer run if I switch browser tabs?', answer: 'Yes, the timer continues running in the background and plays a gentle audio chime when each interval ends.' },
    ],
  },
};
