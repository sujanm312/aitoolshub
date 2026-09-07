export type CalculatorId = 
  | 'sip-calculator'
  | 'emi-calculator'
  | 'compound-interest'
  | 'gratuity-calculator'
  | 'ppf-calculator'
  | 'fd-rd-calculator';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FormulaStep {
  title: string;
  formula: string;
  explanation: string;
  sampleCalculation: {
    given: Record<string, string | number>;
    substitutions: string;
    result: string;
  };
}

export interface CalculatorMeta {
  id: CalculatorId;
  path: string;
  name: string;
  shortName: string;
  badge: string;
  tagline: string;
  description: string;
  keywords: string[];
  icon: string;
  primaryFormula: string;
  formulaBreakdown: FormulaStep;
  keyHighlights: string[];
  guideContent: {
    title: string;
    introduction: string;
    sections: {
      heading: string;
      content: string;
      bulletPoints?: string[];
    }[];
    taxImplications: {
      title: string;
      rules: { regime: string; detail: string }[];
    };
    prosAndCons: {
      pros: string[];
      cons: string[];
    };
    commonMistakes: string[];
  };
  faqs: FAQItem[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color: string;
  formattedValue?: string;
  percentage?: number;
}

export interface AmortizationRow {
  period: number; // Year or Month
  openingBalance: number;
  emi: number;
  principal: number;
  interest: number;
  closingBalance: number;
}

export interface AdSettings {
  topBanner: boolean;
  inlineBelowCalc: boolean;
  sidebarAd: boolean;
  bottomInArticle: boolean;
  testMode: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  tags: string[];
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
  isFeatured?: boolean;
}

export interface AdminMetrics {
  totalCalculationsToday: number;
  monthlyActiveCalculators: number;
  averageSessionDuration: string;
  adsenseCTR: string;
  adImpressions: number;
  topTools: {
    name: string;
    path: string;
    count: number;
    pct: number;
  }[];
}

export interface SeoInjectionSettings {
  enabled: boolean;
  headerCode: string;
  bodyTopCode: string;
  footerCode: string;
}
