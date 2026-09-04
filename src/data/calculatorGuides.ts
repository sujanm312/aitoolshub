import { CalculatorMeta } from '../types';

export const CALCULATORS_DATA: Record<string, CalculatorMeta> = {
  'sip-calculator': {
    id: 'sip-calculator',
    path: '/calculators/sip-calculator',
    name: 'SIP Calculator (Systematic Investment Plan)',
    shortName: 'SIP Calculator',
    badge: 'Wealth Builder',
    tagline: 'Calculate mutual fund compound growth, step-up returns, and goal milestones.',
    description: 'Accurately forecast your wealth accumulation through monthly mutual fund SIPs with compound interest, annual step-up adjustments, and inflation calculations.',
    keywords: ['SIP calculator', 'mutual fund returns', 'step up sip', 'rupee cost averaging', 'compound growth India'],
    icon: 'TrendingUp',
    primaryFormula: 'M = P × [ (1 + i)^n - 1 ] / i × (1 + i)',
    formulaBreakdown: {
      title: 'SIP Compound Future Value Formula',
      formula: 'M = P × [ (1 + i)^n - 1 ] / i × (1 + i)',
      explanation: 'Where M is the future maturity amount, P is your monthly periodic investment, i is the periodic monthly interest rate (Annual Rate ÷ 1200), and n is the total number of monthly payments (Tenure in Years × 12).',
      sampleCalculation: {
        given: {
          'Monthly Investment (P)': '₹10,000',
          'Expected Annual Return (R)': '12% p.a.',
          'Tenure': '10 Years (120 Months)',
          'Monthly Rate (i)': '12 / (12 × 100) = 0.01',
          'Total Installments (n)': '120',
        },
        substitutions: 'M = 10,000 × [ (1 + 0.01)^120 - 1 ] / 0.01 × (1 + 0.01) = 10,000 × [ 3.300386 - 1 ] / 0.01 × 1.01',
        result: 'Total Invested: ₹12,00,000 | Estimated Capital Gains: ₹11,23,391 | Maturity Value: ₹23,23,391',
      },
    },
    keyHighlights: [
      'Harnesses the 8th Wonder: Compounding returns over 5 to 30 years',
      'Rupee Cost Averaging eliminates the need to time market peaks and valleys',
      'Step-up SIP accelerates corpus accumulation by 40–80% over plain SIPs',
      'Tax-optimized under Section 112A with ₹1.25 Lakh annual LTCG exemption',
    ],
    guideContent: {
      title: 'The Definitive Guide to Systematic Investment Plans (SIP) in India',
      introduction: 'A Systematic Investment Plan (SIP) is a disciplined, automated methodology for investing fixed sums into equity or debt mutual funds at regular periodic intervals. Rather than risking lump sum capital at market peaks, SIPs deploy Rupee Cost Averaging: purchasing more mutual fund units when valuations drop and fewer units when prices surge, systematically lowering your average acquisition cost while harnessing long-term compound growth.',
      sections: [
        {
          heading: '1. The Mathematics of Rupee Cost Averaging & Compounding',
          content: 'The core superpower of an SIP is time in the market rather than timing the market. When you invest continuously across bull and bear economic cycles, volatility shifts from an emotional enemy into a mathematical ally. In descending markets, your fixed rupee contribution buys units at discounted Net Asset Values (NAVs). When macroeconomic sentiment reverses, those low-cost units create exponential capital expansion.',
          bulletPoints: [
            'Automated emotional discipline preventing panic selling during standard market corrections',
            'Compounding generates yield not just on your initial capital, but on reinvested returns year after year',
            'Eliminates the stress of monitoring daily benchmark indices like Nifty 50 or Sensex',
          ],
        },
        {
          heading: '2. The Exponential Edge of Step-Up SIPs',
          content: 'Most salaried professionals experience annual compensation increments ranging from 8% to 15%. Yet many investors leave their SIP amounts static for a decade. Implementing an annual 10% Step-Up SIP transforms a baseline ₹10,000 monthly investment into an extraordinary corpus. For instance, over 20 years at 12% CAGR, a flat SIP produces approximately ₹99.9 Lakhs, whereas a 10% annual Step-Up SIP produces over ₹2.05 Crores—more than doubling your eventual retirement wealth with painless proportional adjustments.',
        },
        {
          heading: '3. Factoring in Real Inflation (Purchasing Power Parity)',
          content: 'A nominal maturity value of ₹1 Crore in 20 years does not equate to ₹1 Crore in today’s purchasing power. Assuming an average headline inflation rate of 6% in India, ₹1 Crore twenty years from now will buy goods equivalent to only ₹31.18 Lakhs today. Therefore, when setting financial targets for your children’s higher education, marriage, or your personal retirement corpus, always run inflation-adjusted projections and aim for an equity allocation capable of delivering a 4–6% real alpha above CPI inflation.',
        },
        {
          heading: '4. Critical Mistakes to Avoid in SIP Investing',
          content: 'Investors frequently undermine their compound momentum through preventable behavioural errors. Recognizing these pitfalls is essential for achieving multi-decade compounding longevity.',
          bulletPoints: [
            'Stopping SIPs during market downturns: Pausing investments during bear phases locks in missed accumulation opportunities at discounted prices.',
            'Over-diversifying into 15+ redundant mutual funds with overlapping portfolio holdings.',
            'Treating equity SIPs like short-term liquid savings accounts: Equity requires a minimum 5-to-7-year horizon.',
            'Failing to rebalance your asset allocation as retirement approaches.',
          ],
        },
      ],
      taxImplications: {
        title: 'Taxation of Mutual Fund SIPs in India (Budget 2024–2025 Updates)',
        rules: [
          {
            regime: 'Equity Mutual Funds (>65% domestic equity exposure)',
            detail: 'Long Term Capital Gains (held > 12 months) are taxed at 12.5% on gains exceeding the ₹1.25 Lakh statutory exemption threshold per financial year. Short Term Capital Gains (held ≤ 12 months) are taxed at a flat 20%.',
          },
          {
            regime: 'FIFO Principle in SIP Taxation',
            detail: 'Every individual SIP monthly installment is treated as an independent investment lot under First-In, First-Out (FIFO). Gains on units bought 13 months ago qualify as LTCG, while units bought within 12 months are STCG.',
          },
          {
            regime: 'Debt Mutual Funds',
            detail: 'Gains on debt funds acquired after April 1, 2023 are added directly to your taxable income and taxed at your applicable personal income tax slab rate without indexation benefit.',
          },
        ],
      },
      prosAndCons: {
        pros: [
          'High liquidity: Open-ended mutual funds permit redemptions at applicable NAV on business days',
          'Low barrier to entry: Start investing with as low as ₹500 per month',
          'Automated bank mandates (eNACH) ensure absolute investment discipline',
          'Professionally managed by SEBI-registered asset management fund managers',
        ],
        cons: [
          'Subject to equity market volatility in short durations (under 3 years)',
          'Requires steady monthly cash flow to avoid ECS/mandate bounce charges from your bank',
          'Past performance and historical mutual fund returns do not guarantee future returns',
        ],
      },
      commonMistakes: [
        'Redeeming funds impulsively upon watching sensationalized financial news broadcasts',
        'Chasing last year’s top-performing thematic or sector fund right before its cycle peaks',
        'Ignoring fund expense ratios (TER) and opting for regular distributor plans instead of Direct plans',
        'Failing to link each SIP to a clearly designated milestone goal (e.g., Home Down Payment, Retirement)',
      ],
    },
    faqs: [
      {
        question: 'SIP vs Lumpsum: Which yields higher returns in volatile markets?',
        answer: 'In sideways or declining markets, an SIP reliably outperforms a lumpsum investment due to Rupee Cost Averaging. A lumpsum investment delivers superior returns only during prolonged, uninterrupted bull rallies. For most investors with regular monthly salaries, SIP minimizes emotional timing risk and delivers superior risk-adjusted outcomes.',
      },
      {
        question: 'Can I pause or alter my SIP investment amount anytime?',
        answer: 'Yes. Mutual fund SIPs offer full flexibility. You can pause your SIP for up to 3 to 6 months via your investment portal, modify the monthly debit amount, or cancel the mandate entirely without incurring any penalty from the Asset Management Company (AMC).',
      },
      {
        question: 'What is the tax treatment on SIP returns under current rules?',
        answer: 'Under the updated 2024 union budget provisions, Long-Term Capital Gains (LTCG) on equity mutual fund units held for over 12 months are taxed at 12.5% for capital gains exceeding ₹1.25 Lakh per financial year. Short-Term Capital Gains (STCG) on units held for 12 months or less are taxed at 20%.',
      },
      {
        question: 'What is the ideal tenure for an equity mutual fund SIP?',
        answer: 'An equity SIP should be maintained for a minimum of 5 to 7 years. Over a rolling 7-to-10-year holding period, the historical probability of negative returns in diversified Indian equity funds (Nifty 50 TRI / Nifty 500) drops to virtually zero.',
      },
      {
        question: 'What is a Step-Up SIP and why is it recommended?',
        answer: 'A Step-Up SIP (or Top-Up SIP) is an instruction to automatically increase your monthly investment by a predetermined percentage (typically 5% to 15%) or a fixed rupee value each year. As your income grows, stepping up your SIP helps you achieve financial independence 5 to 8 years earlier.',
      },
    ],
  },

  'emi-calculator': {
    id: 'emi-calculator',
    path: '/calculators/emi-calculator',
    name: 'Loan EMI Calculator & Amortization Schedule',
    shortName: 'EMI Calculator',
    badge: 'Debt Optimizer',
    tagline: 'Compute monthly installments, total interest burden, and prepayment savings.',
    description: 'Accurate Equated Monthly Installment (EMI) calculator for Home Loans, Car Loans, and Personal Loans with full month-by-month and year-by-year amortization schedules.',
    keywords: ['EMI calculator', 'home loan EMI', 'car loan calculator', 'amortization schedule', 'loan prepayment savings'],
    icon: 'Landmark',
    primaryFormula: 'E = P × r × (1 + r)^n / [ (1 + r)^n - 1 ]',
    formulaBreakdown: {
      title: 'Equated Monthly Installment (EMI) Reducing Balance Formula',
      formula: 'E = P × r × (1 + r)^n / [ (1 + r)^n - 1 ]',
      explanation: 'Where E is your monthly installment, P is the principal loan borrowed, r is the monthly interest rate (Annual Interest ÷ 1200), and n is the loan tenure in total months.',
      sampleCalculation: {
        given: {
          'Loan Principal (P)': '₹40,00,000',
          'Annual Interest Rate (R)': '8.50% p.a.',
          'Tenure': '20 Years (240 Months)',
          'Monthly Rate (r)': '8.50 / (12 × 100) = 0.0070833',
          'Total Installments (n)': '240',
        },
        substitutions: 'E = 40,00,000 × 0.0070833 × (1.0070833)^240 / [ (1.0070833)^240 - 1 ]',
        result: 'Monthly EMI: ₹34,713 | Total Interest Payable: ₹43,31,093 | Total Repayment: ₹83,31,093',
      },
    },
    keyHighlights: [
      'Instant breakdown of interest vs principal repayment throughout tenure',
      'Supports home loans, car loans, personal loans, and education loans',
      'Unveils how initial installments are up to 75% interest in long-tenure loans',
      'Generates downloadable amortization schedule for tax deduction filing',
    ],
    guideContent: {
      title: 'Comprehensive Guide to Loan EMIs, Amortization & Smart Debt Elimination',
      introduction: 'An Equated Monthly Installment (EMI) is a predetermined monthly payment made by a borrower to a bank or non-banking financial company (NBFC) on a scheduled date. Understanding the mathematical mechanics of amortization is the single most crucial step in saving lakhs of rupees over the lifecycle of a long-term home loan or vehicle financing.',
      sections: [
        {
          heading: '1. The Front-Loaded Interest Reality of Amortization',
          content: 'Most borrowers are astonished to discover that during the first 5 to 7 years of a 20-year home loan, more than 70% of their monthly EMI goes towards paying interest, while barely 30% reduces the actual loan principal. Because Indian lending institutions compute interest on a monthly reducing balance method, interest is always calculated on the outstanding balance. As the principal gradually drops, the interest slice diminishes while the principal repayment slice expands.',
        },
        {
          heading: '2. The Power of Making Just 1 Extra EMI Per Year',
          content: 'Prepayment is the ultimate wealth protector against compounding debt. By paying just one additional EMI each calendar year on a 20-year, ₹50 Lakh home loan at 8.75%, you can effectively compress your repayment tenure from 20 years down to approximately 16 years, saving upwards of ₹12 to ₹15 Lakhs in pure interest outgo.',
          bulletPoints: [
            'Round up your EMI: Paying ₹36,000 instead of ₹34,713 pays off principal silently every month',
            'Channel annual salary bonuses directly into principal prepayment without prepayment penalty on floating rate loans',
            'Always verify with your lender that extra payments are allocated towards principal reduction, not future interest',
          ],
        },
        {
          heading: '3. Fixed Rate vs. Floating Rate Loans: Strategic Considerations',
          content: 'Under Reserve Bank of India (RBI) directives, commercial banks are prohibited from charging foreclosure or prepayment penalties on individual floating-rate home loans. Floating rate loans are benchmarked directly to the Repo Linked Lending Rate (RLLR) or External Benchmark Lending Rate (EBLR). When the central bank slashes repo rates, your borrowing costs decrease automatically.',
        },
        {
          heading: '4. Maintaining an Optimum Debt-to-Income (DTI) Ratio',
          content: 'Prudent financial underwriting dictates that your total household EMIs across all obligations (home, car, credit cards, personal loans) should never exceed 40% to 45% of your net monthly take-home salary. Maintaining a CIBIL credit score above 750 empowers you to negotiate interest rate discounts of 0.25% to 0.50% from prime lenders.',
        },
      ],
      taxImplications: {
        title: 'Tax Deductions on Home Loan EMIs in India (Old vs New Tax Regime)',
        rules: [
          {
            regime: 'Section 80C (Principal Repayment)',
            detail: 'Under the Old Tax Regime, principal repayment of up to ₹1.5 Lakh per financial year qualifies for tax deduction alongside PF, PPF, and ELSS.',
          },
          {
            regime: 'Section 24(b) (Interest Payment)',
            detail: 'Deduction of up to ₹2,00,000 per financial year on home loan interest for self-occupied residential property. For let-out property, the entire interest is eligible subject to set-off caps.',
          },
          {
            regime: 'New Tax Regime (Section 115BAC)',
            detail: 'Note that Section 80C and Section 24(b) deductions for self-occupied home loans are not available under the default New Tax Regime. Evaluate whether your total deductions exceed the standard deduction threshold before choosing.',
          },
        ],
      },
      prosAndCons: {
        pros: [
          'Enables immediate capital asset acquisition (such as home ownership) without liquidating long-term investments',
          'Predictable monthly cash flow budgeting through equal installments',
          'Timely repayments actively enhance your CIBIL and Experian credit rating',
        ],
        cons: [
          'High cumulative interest outgo: A 25-year loan can result in paying more in total interest than the original home cost',
          'Defaulting can result in legal recovery proceedings under the SARFAESI Act',
          'Prepayment penalties still apply to fixed-rate loans and commercial corporate borrowings',
        ],
      },
      commonMistakes: [
        'Extending loan tenure to 30 years solely to minimize monthly EMI, inadvertently doubling total interest outgo',
        'Borrowing the absolute maximum permissible eligibility without keeping a 6-month emergency reserve',
        'Failing to shop around and negotiate processing fees or loan transfer options between banks',
        'Prioritizing high-interest personal loan EMIs last instead of aggressively eliminating debt with >12% interest',
      ],
    },
    faqs: [
      {
        question: 'How does loan tenure impact my monthly EMI and total interest?',
        answer: 'A shorter loan tenure increases your monthly EMI but drastically curtails your total interest burden. Conversely, a longer tenure (e.g., 25 or 30 years) drops the monthly EMI payment slightly, but inflates the total interest paid to more than 100% of the original principal amount borrowed.',
      },
      {
        question: 'Are there any penalties for prepaying a floating rate home loan in India?',
        answer: 'No. As per RBI regulations, banks and housing finance companies (HFCs) are strictly barred from levying any prepayment or foreclosure charges on floating-rate home loans sanctioned to individual borrowers.',
      },
      {
        question: 'What happens when the RBI alters the benchmark Repo Rate?',
        answer: 'For loans linked to an External Benchmark Lending Rate (EBLR) or Repo Rate, any change by the RBI monetary policy committee is passed on to your interest rate. Generally, banks adjust the loan tenure first rather than adjusting the monthly EMI amount, unless requested otherwise.',
      },
      {
        question: 'How is interest calculated on reducing balance vs flat rate loans?',
        answer: 'In a reducing balance loan, interest is calculated solely on the outstanding principal at the end of each billing cycle. In a flat rate loan (often seen in deceptive car or personal loan marketing), interest is calculated on the full original principal for the entire tenure, making the effective interest rate nearly double the stated headline rate.',
      },
      {
        question: 'Can co-borrowers claim separate home loan tax deductions?',
        answer: 'Yes. If a home loan is taken jointly with a spouse or parent who is also a co-owner of the property, both individuals can independently claim Section 80C deductions up to ₹1.5 Lakh and Section 24(b) interest deductions up to ₹2.0 Lakh, effectively doubling the household tax benefit to ₹7 Lakhs under the Old Tax Regime.',
      },
    ],
  },

  'compound-interest': {
    id: 'compound-interest',
    path: '/calculators/compound-interest',
    name: 'Compound Interest Calculator & Frequency Estimator',
    shortName: 'Compound Interest',
    badge: 'Wealth Multiplier',
    tagline: 'Visualize the compounding phenomenon across daily, monthly, and annual cycles.',
    description: 'Calculate future wealth with multi-frequency compound interest, recurring monthly contributions, and comparative linear growth analysis.',
    keywords: ['compound interest calculator', 'compound frequency', 'rule of 72', 'future value formula', 'wealth accumulation'],
    icon: 'Zap',
    primaryFormula: 'A = P × (1 + r/n)^(n·t)',
    formulaBreakdown: {
      title: 'Standard Compound Interest Formula',
      formula: 'A = P × (1 + r/n)^(n·t)',
      explanation: 'Where A is the final accrued amount, P is the principal sum invested, r is the nominal annual interest rate (in decimal), n is the compounding frequency per year, and t is the time duration in years.',
      sampleCalculation: {
        given: {
          'Principal Amount (P)': '₹5,00,000',
          'Annual Interest (r)': '10% (0.10)',
          'Compounding Frequency (n)': 'Quarterly (4 times/yr)',
          'Investment Horizon (t)': '15 Years',
        },
        substitutions: 'A = 5,00,000 × (1 + 0.10/4)^(4 × 15) = 5,00,000 × (1.025)^60',
        result: 'Total Maturity: ₹21,99,895 | Total Compound Interest Earned: ₹16,99,895 (Over 3.4x the principal!)',
      },
    },
    keyHighlights: [
      'Compare Annual, Semi-Annual, Quarterly, Monthly, and Daily compounding cycles',
      'The Rule of 72 integration: Instantly find how fast your capital doubles',
      'Shows how compounding generates exponential curves rather than linear straight lines',
      'Visualizes the exact tipping point where annual interest exceeds your total principal',
    ],
    guideContent: {
      title: 'The Master Guide to Compound Interest: How Money Multiplies Exponentially',
      introduction: 'Albert Einstein famously designated compound interest as the Eighth Wonder of the World: "He who understands it, earns it; he who doesn’t, pays it." Unlike simple interest, which computes yield solely on initial principal, compound interest computes interest on accumulated interest. Over multi-decade horizons, this non-linear mathematical curve transforms modest monthly savings into generational wealth.',
      sections: [
        {
          heading: '1. The Crucial Role of Compounding Frequency',
          content: 'Compounding frequency defines how often accrued interest is credited back into the principal pool. The higher the frequency, the higher your Effective Annual Rate (EAR). For a ₹10 Lakh deposit at 9% nominal interest over 10 years, annual compounding yields ₹23.67 Lakhs, while monthly compounding yields ₹24.51 Lakhs—generating an extra ₹84,000 with zero additional risk purely through mathematical compounding mechanics.',
        },
        {
          heading: '2. The Rule of 72: Mental Math for Wealth Building',
          content: 'The Rule of 72 is an indispensable heuristic to calculate how many years it will take your investment to double at a given rate of return. Simply divide 72 by the expected annual interest rate:',
          bulletPoints: [
            'At 6% return (conservative debt/FD): 72 ÷ 6 = 12 years to double your money',
            'At 12% return (diversified equity mutual fund): 72 ÷ 12 = 6 years to double your money',
            'At 18% return (high-growth equity portfolio): 72 ÷ 18 = 4 years to double your money',
          ],
        },
        {
          heading: '3. The Horizon Tipping Point (The Snowball Effect)',
          content: 'In the first 3 to 5 years of an investment, compounding feels frustratingly sluggish because the principal base is modest. However, between years 10 and 20, the exponential hockey stick activates. By year 15, the annual interest generated in a single year often surpasses your entire initial investment capital. Patience during the early stagnant years is the defining psychological attribute of successful wealth creators.',
        },
        {
          heading: '4. The Reverse Side: How Compound Interest Works Against You',
          content: 'While compounding elevates investors, it mercilessly penalizes indebted consumers. Unpaid credit card balances compound at annual percentage rates (APR) of 36% to 42%, compounded monthly. Under such punitive rates, a ₹50,000 credit card debt can balloon to over ₹2,80,000 in just 5 years if left revolving with only minimum payments.',
        },
      ],
      taxImplications: {
        title: 'Tax Treatment of Compounded Instruments in India',
        rules: [
          {
            regime: 'Accrual Basis vs Receipt Basis',
            detail: 'For Fixed Deposits and Corporate Bonds, interest is taxed annually on an accrual basis under "Income from Other Sources", regardless of whether the interest is paid out or compounded until maturity.',
          },
          {
            regime: 'Growth Mutual Funds (Tax-Deferred Compounding)',
            detail: 'Equity mutual funds in Growth option do not pay out annual dividends. Capital gains compound tax-free within the fund until redemption, deferring tax liability and maximizing net compound expansion.',
          },
        ],
      },
      prosAndCons: {
        pros: [
          'Wealth expansion accelerates automatically over time without manual reinvestment',
          'Protects capital purchasing power against long-term monetary inflation',
          'Rewards disciplined, long-horizon investors disproportionately',
        ],
        cons: [
          'Requires disciplined multi-year horizons to witness dramatic outcomes',
          'Nominal gains can be eroded if investment returns fail to outpace inflation and taxes',
        ],
      },
      commonMistakes: [
        'Withdrawing interest dividends instead of choosing the cumulative/growth option',
        'Delaying the start of investing: Starting at age 25 vs 35 can mean a difference of crores in retirement corpus',
        'Failing to adjust return expectations down for capital gains taxes and inflation',
      ],
    },
    faqs: [
      {
        question: 'What is the primary difference between simple and compound interest?',
        answer: 'Simple interest is calculated solely on the original principal sum for the duration of the tenure. Compound interest is calculated on the initial principal plus all accumulated interest from prior compounding periods, creating exponential rather than linear growth.',
      },
      {
        question: 'How does daily compounding compare to monthly compounding?',
        answer: 'Daily compounding recalculates interest 365 times per year, slightly increasing the Effective Annual Rate compared to monthly compounding (12 times per year). While the difference is modest for small amounts, on high capital portfolios over multi-year periods, daily compounding yields noticeable gains.',
      },
      {
        question: 'Can compound interest beat inflation?',
        answer: 'Yes, provided the compounded rate of return exceeds the headline inflation rate. For example, equity investments delivering 12% to 14% CAGR comfortably outpace typical Indian inflation of 5% to 6%, resulting in significant real wealth expansion.',
      },
      {
        question: 'Why is time more important than amount in compound interest?',
        answer: 'Because the exponent in the formula (n·t) is time. Doubling the time horizon has an exponential multiplying effect, whereas doubling the starting capital only produces a linear 2x outcome.',
      },
      {
        question: 'What is the Effective Annual Rate (EAR)?',
        answer: 'The Effective Annual Rate reflects the true annual return earned when compounding takes place more frequently than once a year. For instance, a 10% nominal rate compounded quarterly produces an EAR of 10.38%.',
      },
    ],
  },

  'gratuity-calculator': {
    id: 'gratuity-calculator',
    path: '/calculators/gratuity-calculator',
    name: 'Gratuity Calculator (Payment of Gratuity Act 1972)',
    shortName: 'Gratuity Calculator',
    badge: 'Employee Benefit',
    tagline: 'Calculate statutory retirement gratuity payout, eligibility, and tax-free limits.',
    description: 'Accurately compute your statutory gratuity payout based on Indian Payment of Gratuity Act provisions, 15/26 formula, 5-year tenure criteria, and ₹20 Lakh tax exemption caps.',
    keywords: ['gratuity calculator India', 'Payment of Gratuity Act', 'gratuity formula 15/26', 'tax free gratuity limit', 'gratuity eligibility rules'],
    icon: 'Award',
    primaryFormula: 'Gratuity = (15 × Last Drawn Basic + DA × Tenure) / 26',
    formulaBreakdown: {
      title: 'Payment of Gratuity Act Statutory Formula',
      formula: 'Gratuity = (15 × [Last Drawn Basic + DA] × Completed Years of Service) / 26',
      explanation: 'Where 15 represents the number of days of wages per year of service, 26 represents the official working days in a month (excluding Sundays), Basic + DA is your last drawn basic salary plus dearness allowance, and Tenure is your completed service in years (with tenure > 6 months rounded up to the next full year).',
      sampleCalculation: {
        given: {
          'Last Drawn Basic + DA': '₹80,000 / month',
          'Completed Tenure': '12 Years & 7 Months',
          'Tenure Counted': '13 Years (rounded up)',
          'Formula': '(15 × 80,000 × 13) / 26',
        },
        substitutions: '(15 × 80,000 × 13) / 26 = 15,600,000 / 26',
        result: 'Total Gratuity Payable: ₹6,00,000 | Tax-Exempt Amount: ₹6,00,000 (100% Tax Free under ₹20 Lakh limit)',
      },
    },
    keyHighlights: [
      'Strictly adheres to the Indian Payment of Gratuity Act 1972 statutory formula',
      'Automatically checks the 5-year continuous service eligibility threshold',
      'Supports both covered establishments (15/26) and non-covered employers (15/30)',
      'Highlights the current ₹20,00,000 income tax exemption limit under Section 10(10)',
    ],
    guideContent: {
      title: 'The Essential Guide to Gratuity Laws, Calculations & Rights in India',
      introduction: 'Gratuity is a statutory monetary benefit mandated under the Payment of Gratuity Act, 1972, paid by an employer to an employee as a token of gratitude for rendering continuous, dedicated service. It serves as a vital component of retirement and terminal compensation for Indian professionals in the organized corporate and public sectors.',
      sections: [
        {
          heading: '1. Who Is Eligible for Gratuity in India?',
          content: 'Under the Act, any establishment employing 10 or more individuals on any single day in the preceding 12 months falls under mandatory gratuity coverage. An employee becomes legally entitled to receive gratuity upon terminating employment (via resignation, retirement, superannuation, or voluntary separation) after rendering continuous service of at least 5 years.',
          bulletPoints: [
            'Exception to 5-year rule: In the tragic event of an employee’s demise or permanent disablement due to accident or disease, the 5-year requirement is waived completely.',
            'Continuous service: An employee must have worked for at least 240 days in a given year in a non-seasonal establishment to count as one continuous year.',
          ],
        },
        {
          heading: '2. Why Does the Formula Divide by 26 Days?',
          content: 'Many employees wonder why the standard formula uses 26 rather than 30 or 31. Under Indian labour jurisprudence, a month is calculated as having 26 working days after excluding 4 weekly holidays (Sundays). Thus, dividing your monthly wages by 26 isolates your actual daily wage rate, which is then multiplied by 15 days of compensation for each year of service.',
        },
        {
          heading: '3. What Components of Your Salary Are Included?',
          content: 'A frequent point of friction during employee resignations involves the definition of salary. Gratuity calculations strictly consider ONLY Basic Salary and Dearness Allowance (DA). Special allowances, performance bonuses, house rent allowance (HRA), conveyance allowances, and medical reimbursements are legally excluded from the formula.',
        },
        {
          heading: '4. Employer Obligations & Timelines for Payment',
          content: 'The employer is statutorily required to determine and disburse the gratuity amount within 30 days from the date it becomes payable. If the employer fails to disburse gratuity within 30 days without lawful justification, they are liable to pay simple interest on the delayed sum at the prevailing rate specified by the Central Government.',
        },
      ],
      taxImplications: {
        title: 'Taxation and Exemption Limits under Section 10(10)',
        rules: [
          {
            regime: 'Government Employees (Central, State, Local Authority)',
            detail: 'Gratuity received by government employees is 100% tax-free with zero monetary ceiling.',
          },
          {
            regime: 'Private Sector Employees Covered Under Act',
            detail: 'Tax exemption is the least of: 1) Actual gratuity received, 2) Statutory calculation formula amount, or 3) The maximum statutory limit of ₹20,00,000 (Twenty Lakh Rupees).',
          },
          {
            regime: 'Private Sector Not Covered Under Act',
            detail: 'Exemption is calculated on a 15/30 basis with the same overall lifetime ₹20 Lakh tax-free cap.',
          },
        ],
      },
      prosAndCons: {
        pros: [
          'Guaranteed statutory legal right backed by central labour laws',
          'Generous tax-free threshold up to ₹20 Lakhs under Section 10(10)',
          'Provides lump sum financial buffer during career transitions or retirement',
        ],
        cons: [
          '5-year mandatory continuous service requirement limits benefits for frequent job switchers',
          'Calculated solely on Basic + DA, excluding performance bonuses and special allowances',
          'Subject to forfeiture in rare cases of dismissal for misconduct involving moral turpitude or violence',
        ],
      },
      commonMistakes: [
        'Resigning at 4 years and 10 months without realizing that completing 5 full continuous years is essential for eligibility',
        'Using Gross CTC instead of Basic Salary + DA when forecasting gratuity',
        'Not checking whether their company structure rounds tenure over 6 months to the nearest full year',
      ],
    },
    faqs: [
      {
        question: 'Can an employer legally withhold or forfeit gratuity payout?',
        answer: 'An employer can forfeit gratuity only under extremely narrow circumstances stipulated in Section 4(6) of the Act: specifically if the employee was formally terminated for riotous or disorderly behaviour, violence, or an act involving moral turpitude committed in the course of employment.',
      },
      {
        question: 'Is gratuity calculated on Gross Salary or Basic Salary?',
        answer: 'Gratuity is calculated strictly on Basic Salary plus Dearness Allowance (DA). Allowances such as HRA, Special Allowance, LTA, and annual bonuses are legally excluded from the gratuity base.',
      },
      {
        question: 'What happens if I complete 4 years and 7 months of service?',
        answer: 'Under strict interpretations of Section 2A and high court precedents (such as Madras High Court rulings), if an employee has completed 4 years and 240 days of continuous service in the 5th year, they may be deemed eligible. However, to eliminate disputes, completing 5 full calendar years is strongly recommended.',
      },
      {
        question: 'What is the maximum tax-free gratuity limit for private employees?',
        answer: 'The Government of India raised the maximum tax-exempt limit for gratuity under Section 10(10) of the Income Tax Act to ₹20,00,000 (₹20 Lakhs) for non-government employees.',
      },
      {
        question: 'Can an employer pay more gratuity than the statutory formula?',
        answer: 'Yes. The Payment of Gratuity Act stipulates the minimum statutory entitlement. An employer or corporate policy is free to offer higher gratuity under contract or collective bargaining agreement, though amounts exceeding ₹20 Lakhs will be subject to personal income tax.',
      },
    ],
  },

  'ppf-calculator': {
    id: 'ppf-calculator',
    path: '/calculators/ppf-calculator',
    name: 'PPF Calculator (Public Provident Fund)',
    shortName: 'PPF Calculator',
    badge: 'Sovereign Guarantee',
    tagline: 'Plan your 15-year risk-free retirement corpus with sovereign government backing.',
    description: 'Calculate Public Provident Fund (PPF) maturity proceeds, annual interest accrual at 7.1% p.a., Section 80C tax deductions, and 5-year block extension growth.',
    keywords: ['PPF calculator India', 'Public Provident Fund', 'PPF interest rate 7.1', 'EEE tax exemption', '15 year PPF scheme'],
    icon: 'ShieldCheck',
    primaryFormula: 'F = P × [ (1 + i)^n - 1 ] / i × (1 + i) (Annual Compounding)',
    formulaBreakdown: {
      title: 'PPF Compounding Mechanism',
      formula: 'Interest = Monthly Minimum Balance (between 5th and end of month) × Annual Rate / 12',
      explanation: 'PPF earns compound interest compounded annually on March 31st. Crucially, monthly interest is calculated on the lowest balance maintained in the account between the close of the 5th day and the last day of each calendar month.',
      sampleCalculation: {
        given: {
          'Annual Contribution': '₹1,50,000 (Max permissible per FY)',
          'Interest Rate': '7.1% p.a. (Govt fixed)',
          'Tenure': '15 Years',
        },
        substitutions: 'Depositing ₹1.5 Lakh annually before the 5th of April each financial year',
        result: 'Total Invested: ₹22,50,000 | Total Tax-Free Interest: ₹18,18,209 | Total Maturity Value: ₹40,68,209 (100% Tax Free EEE)',
      },
    },
    keyHighlights: [
      'True EEE Tax Status: Exempt at investment (80C), Exempt during growth, Exempt at maturity',
      'Sovereign safety: Backed 100% by the Government of India with zero credit default risk',
      'Immune from court attachments under civil or commercial litigation decrees',
      'Loan against PPF available from 3rd to 6th financial year at nominal interest rates',
    ],
    guideContent: {
      title: 'The Complete Guide to Public Provident Fund (PPF): Safe, Sovereign & Tax-Free',
      introduction: 'Established by the National Savings Institute under the Ministry of Finance, the Public Provident Fund (PPF) remains the gold standard of risk-free long-term savings in India. It offers sovereign capital protection, attractive quarterly reviewed interest rates, and the coveted Exemplary Triple Exemption (EEE) tax status.',
      sections: [
        {
          heading: '1. The Golden 5th Day Rule of PPF Deposits',
          content: 'A pivotal technical detail often overlooked by investors: PPF interest is calculated monthly on the minimum balance maintained between the 5th day and the end of the month. If you deposit funds on the 6th of a month, you lose interest on that deposit for the entire month. To maximize your yield, always transfer your annual PPF contribution between April 1st and April 5th of each financial year.',
        },
        {
          heading: '2. The Unmatched EEE (Exempt-Exempt-Exempt) Tax Advantage',
          content: 'PPF belongs to the elite EEE tax category in India:',
          bulletPoints: [
            'Exemption 1 (Entry): Deposits qualify for tax deduction under Section 80C up to ₹1.5 Lakh per year (Old Tax Regime)',
            'Exemption 2 (Growth): Annual interest credited is 100% tax-free and exempt from wealth tax or annual TDS',
            'Exemption 3 (Exit): Entire principal and accumulated interest withdrawn at maturity is completely tax-free',
          ],
        },
        {
          heading: '3. Account Extensions in 5-Year Blocks',
          content: 'Upon completing the initial 15-year statutory tenure, you do not have to close the account. You can extend your PPF indefinitely in blocks of 5 years. You have two choices: 1) Extension with fresh contributions (earning 7.1% on both old corpus and new deposits), or 2) Extension without contributions (where your accumulated ₹40+ Lakh corpus continues to compound safely at 7.1% tax-free with partial withdrawal flexibility).',
        },
        {
          heading: '4. Liquidity Rules: Partial Withdrawals & Loans Against PPF',
          content: 'While PPF is a 15-year commitment, it provides liquidity cushions in emergencies. You can avail of a loan against your PPF balance starting from the 3rd financial year up to the 6th financial year (up to 25% of balance). Starting from the 7th financial year, partial withdrawals of up to 50% of the balance are permitted once a year for medical emergencies, higher education, or house construction.',
        },
      ],
      taxImplications: {
        title: 'PPF Tax Framework and Annual Contribution Ceilings',
        rules: [
          {
            regime: 'Annual Investment Limits',
            detail: 'Minimum annual deposit is ₹500; maximum permissible deposit is ₹1,50,000 per financial year across all PPF accounts held by an individual (including minor child accounts).',
          },
          {
            regime: 'Exemption from Court Attachment',
            detail: 'Under the Public Provident Fund Act, PPF account balances cannot be attached by any court of law in execution of a debt or commercial liability decree.',
          },
        ],
      },
      prosAndCons: {
        pros: [
          'Absolute sovereign guarantee with zero risk of capital loss',
          'Triple Exemption (EEE) provides unbeatable post-tax returns compared to bank FDs',
          'Immune to equity market downturns, delivering guaranteed stable growth',
        ],
        cons: [
          'Rigid 15-year lock-in period with restricted liquidity in initial years',
          'Annual deposit capped at ₹1.5 Lakh per individual',
          'Fixed interest rate (currently 7.1%) may lag behind high inflation compared to equities',
        ],
      },
      commonMistakes: [
        'Depositing funds after the 5th of the month, forfeiting 30 days of interest income',
        'Failing to deposit the minimum mandatory ₹500 per year, leading to account deactivation',
        'Closing the account at 15 years instead of extending in 5-year blocks to let a large tax-free corpus compound',
      ],
    },
    faqs: [
      {
        question: 'What happens if I miss the annual minimum deposit in my PPF account?',
        answer: 'If you fail to deposit the minimum ₹500 in a financial year, the PPF account becomes inactive or discontinued. You can easily revive it by paying a nominal penalty fee of ₹50 for each inactive year plus the arrear subscription of ₹500 per year at your post office or authorized bank branch.',
      },
      {
        question: 'Can NRIs (Non-Resident Indians) open a new PPF account?',
        answer: 'No. NRIs cannot open fresh PPF accounts. However, if an Indian resident opens a PPF account and subsequently becomes an NRI, they can continue maintaining the account until its original 15-year maturity on a non-repatriable basis.',
      },
      {
        question: 'Can I open multiple PPF accounts to invest more than ₹1.5 Lakh?',
        answer: 'No. An individual can legally hold only one PPF account in their name. You may open an additional account as a guardian for a minor child, but the combined deposit across both accounts cannot exceed the statutory limit of ₹1,50,000 per financial year.',
      },
      {
        question: 'When is interest credited to the PPF account?',
        answer: 'Although interest is calculated each month based on the minimum balance between the 5th and the end of the month, it is formally credited to the account once a year at the end of the financial year on March 31st.',
      },
      {
        question: 'How does PPF compare to ELSS Mutual Funds for 80C tax saving?',
        answer: 'ELSS mutual funds have a much shorter lock-in of only 3 years and higher return potential (12-15% historically), but carry equity market volatility and 12.5% LTCG tax above ₹1.25 Lakh. PPF is 100% risk-free and tax-free (EEE), but requires a 15-year horizon. A balanced portfolio often combines both.',
      },
    ],
  },

  'fd-rd-calculator': {
    id: 'fd-rd-calculator',
    path: '/calculators/fd-rd-calculator',
    name: 'FD & RD Calculator (Fixed & Recurring Deposit)',
    shortName: 'FD & RD Calculator',
    badge: 'Guaranteed Returns',
    tagline: 'Forecast quarterly compounding yields, senior citizen bonuses, and TDS deductions.',
    description: 'Compare Fixed Deposit (FD) and Recurring Deposit (RD) maturity payouts, compounding frequencies, 0.5% senior citizen bonuses, and Section 194A TDS deductions.',
    keywords: ['FD calculator', 'RD calculator', 'fixed deposit returns', 'recurring deposit interest', 'senior citizen FD rates India'],
    icon: 'PiggyBank',
    primaryFormula: 'FD: A = P × (1 + r/400)^(4·t) | RD: Indian Bank Compound Method',
    formulaBreakdown: {
      title: 'Fixed Deposit Quarterly Compounding Formula',
      formula: 'A = P × (1 + r / 400)^(4 × t)',
      explanation: 'In Indian commercial banks, FD interest is compounded quarterly (every 3 months). Here P is the principal deposit, r is the annual interest rate percentage, and t is the deposit tenure in years.',
      sampleCalculation: {
        given: {
          'Deposit Amount (P)': '₹10,00,000',
          'Interest Rate (r)': '7.25% p.a.',
          'Tenure (t)': '5 Years',
          'Compounding': 'Quarterly (n = 4)',
        },
        substitutions: 'A = 10,00,000 × (1 + 7.25/400)^(4 × 5) = 10,00,000 × (1.018125)^20',
        result: 'Total Maturity Value: ₹14,31,788 | Total Interest Accrued: ₹4,31,788',
      },
    },
    keyHighlights: [
      'Seamless toggle between lump-sum Fixed Deposit and monthly Recurring Deposit',
      'Senior Citizen bonus toggle: Automatically adds standard 0.50% interest rate premium',
      'DICGC insured: Up to ₹5 Lakhs per depositor protected by the RBI subsidiary',
      'Section 194A TDS deduction preview and Form 15G/15H exemption guidance',
    ],
    guideContent: {
      title: 'The Comprehensive Guide to Bank FDs & RDs: Maximizing Guaranteed Returns',
      introduction: 'Fixed Deposits (FD) and Recurring Deposits (RD) remain the bedrock of household financial safety in India. Backed by established scheduled commercial banks, small finance banks, and postal savings schemes, they provide guaranteed capital safety and predictable cash flow for conservative investors and retirees.',
      sections: [
        {
          heading: '1. Fixed Deposit (FD) vs. Recurring Deposit (RD): Which Fits Your Goal?',
          content: 'The core distinction lies in the mode of contribution: An FD requires a single upfront lump sum deposit, whereas an RD is structured for salaried individuals who wish to deposit a fixed installment every month. Both instruments utilize quarterly compounding in Indian banking conventions, providing identical interest yields for equivalent time periods.',
        },
        {
          heading: '2. The DICGC Insurance Shield: How Safe Are Your Bank Deposits?',
          content: 'Deposits in all scheduled commercial banks (public, private, foreign, cooperative, and small finance banks) are insured by the Deposit Insurance and Credit Guarantee Corporation (DICGC), a wholly owned subsidiary of the Reserve Bank of India. The insurance covers up to ₹5,00,000 per depositor per bank (encompassing both principal and interest). Depositors with large corpuses can strategically distribute funds across multiple distinct scheduled banks to maintain 100% insurance coverage.',
        },
        {
          heading: '3. Senior Citizen Rate Advantages',
          content: 'Most Indian financial institutions offer an extra 0.50% (50 basis points) interest rate premium to senior citizens (aged 60 and above). Several banks also run "Super Senior" schemes offering up to 0.75% or 0.80% extra for citizens aged 80+. Over a 5-year deposit of ₹20 Lakhs, an additional 0.50% yield generates over ₹65,000 in additional interest.',
        },
        {
          heading: '4. Understanding TDS (Tax Deducted at Source) Under Section 194A',
          content: 'Banks are legally mandated to deduct TDS at 10% on FD/RD interest if total interest across all branches exceeds ₹40,000 in a financial year for general citizens (₹50,000 for senior citizens under Section 80TTB). If your total income is below the taxable threshold, you can submit Form 15G (for general citizens under 60) or Form 15H (for senior citizens) at the beginning of the financial year to prevent TDS deduction.',
        },
      ],
      taxImplications: {
        title: 'Tax Treatment of Bank Fixed & Recurring Deposits',
        rules: [
          {
            regime: 'Marginal Tax Slab Rate',
            detail: 'Interest income from FDs and RDs is fully taxable under "Income from Other Sources" at your applicable personal income tax slab rate.',
          },
          {
            regime: 'Tax-Saving 5-Year FDs',
            detail: 'Investments in designated 5-year Tax-Saving FDs qualify for Section 80C deduction up to ₹1.5 Lakh per year (Old Tax Regime). These deposits have a strict 5-year lock-in with no premature withdrawal.',
          },
          {
            regime: 'Senior Citizen Section 80TTB Deduction',
            detail: 'Under Section 80TTB, resident senior citizens can claim a deduction of up to ₹50,000 on interest earned from bank and post office deposits.',
          },
        ],
      },
      prosAndCons: {
        pros: [
          'Guaranteed principal protection with zero market price volatility',
          'Choice between cumulative (compounded at maturity) or regular payout options (monthly/quarterly for pension)',
          'High liquidity: Premature withdrawal permissible with nominal 0.5-1% interest penalty',
        ],
        cons: [
          'Post-tax returns often struggle to beat inflation for individuals in 30% tax brackets',
          'Premature withdrawal during urgent liquidity needs triggers penalty reductions',
        ],
      },
      commonMistakes: [
        'Neglecting to submit Form 15G/15H when eligible, leading to unnecessary TDS deductions and waiting for IT refunds',
        'Auto-renewing FDs blindly without checking if other tenures currently offer higher special interest promotional rates',
        'Concentrating funds exceeding ₹50 Lakhs in a single cooperative bank rather than diversifying across prime banks',
      ],
    },
    faqs: [
      {
        question: 'How is interest compounded on Indian bank Fixed Deposits?',
        answer: 'By default, Indian scheduled commercial banks compound FD interest on a quarterly basis (every 3 calendar months). This means interest earned in the first quarter is added to the principal to compute interest for subsequent quarters.',
      },
      {
        question: 'What is the TDS threshold on FD interest for senior citizens?',
        answer: 'Under Section 194A, banks do not deduct TDS if the total interest earned across all accounts in that bank is under ₹50,000 in a financial year for senior citizens (aged 60+). For general citizens, the threshold is ₹40,000.',
      },
      {
        question: 'Can I take a loan against my Fixed Deposit?',
        answer: 'Yes. Most banks permit overdrafts or loans against FDs up to 90% to 95% of the deposit value. The interest charged is typically only 1% to 2% higher than your FD rate, allowing you to meet urgent cash needs without breaking the deposit and sacrificing returns.',
      },
      {
        question: 'Is Recurring Deposit (RD) interest subject to TDS?',
        answer: 'Yes. Under the amended Finance Act provisions, interest on Recurring Deposits is clubbed with Fixed Deposit interest and subject to 10% TDS if the cumulative interest exceeds the statutory threshold of ₹40,000 (or ₹50,000 for senior citizens).',
      },
      {
        question: 'Cumulative vs Non-Cumulative FD: Which should I choose?',
        answer: 'In a Cumulative FD, interest is reinvested quarterly and paid in full at maturity, maximizing compound growth. In a Non-Cumulative FD, interest is paid out at monthly, quarterly, or half-yearly intervals into your savings account, which is ideal for retirees seeking regular income.',
      },
    ],
  },
};
