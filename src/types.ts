export type ToolCategory =
  | 'finance'
  | 'media-tools'
  | 'text-tools'
  | 'dev-tools'
  | 'productivity'
  | 'utilities'
  | 'ai-tools'
  | 'daily';

export type CalculatorId = 
  | 'sip-calculator'
  | 'emi-calculator'
  | 'compound-interest'
  | 'gratuity-calculator'
  | 'ppf-calculator'
  | 'fd-rd-calculator'
  | 'old-vs-new-tax'
  | 'step-up-sip'
  | 'swp-calculator'
  | 'home-loan-prepayment'
  | 'freelance-rate-calculator'
  | 'gst-invoice-generator'
  | 'bio-caption-generator'
  | 'youtube-title-tag-generator'
  | 'image-resizer'
  | 'pdf-tools'
  | 'qr-code-suite'
  | 'age-calculator'
  | 'word-counter'
  | 'fuel-trip-calculator'
  | 'password-generator'
  | string;

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
  category?: ToolCategory;
  toolType?: 'calculator' | 'utility' | 'ai-tool';
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
    taxImplications?: {
      title: string;
      rules: { regime: string; detail: string }[];
    };
    prosAndCons?: {
      pros: string[];
      cons: string[];
    };
    commonMistakes?: string[];
    summary?: string;
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
  aliases?: string[];
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
