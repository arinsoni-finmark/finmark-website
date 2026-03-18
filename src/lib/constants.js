import {
  Brain,
  Shield,
  TrendingUp,
  FileText,
  Zap,
  Layers,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
  Search,
  Database,
} from 'lucide-react'

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
]

export const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Analytics',
    description:
      'Leverage advanced AI models to analyze data across business functions in real time—turning raw information into actionable insights and strategic decisions.',
  },
  {
    icon: Shield,
    title: 'Smart Compliance',
    description:
      'Stay ahead of regulatory requirements with automated monitoring, intelligent risk scoring, and audit-ready systems across financial and operational workflows.',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Forecasting',
    description:
      'Forecast revenue, demand, and performance trends using machine learning models that provide accurate, forward-looking insights for better planning.',
  },
  {
    icon: FileText,
    title: 'Intelligent Reporting',
    description:
      'Generate real-time reports with automated summaries, customizable dashboards, and seamless sharing across teams and stakeholders.',
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    description:
      'Automate repetitive tasks across finance, operations, and marketing—improving efficiency and reducing manual effort.',
  },
  {
    icon: Layers,
    title: 'Unified Data Platform',
    description:
      'Bring all your business data into a single source of truth, enabling better collaboration, visibility, and decision-making.',
  },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Connect Your Systems',
    description:
      'Integrate your existing tools across finance, operations, marketing, and more. FinMark.ai brings all your data into one unified platform—no silos, no friction.',
  },
  {
    step: '02',
    title: 'Automate Your Workflows',
    description:
      'Design and deploy intelligent workflows tailored to your business. From financial processes to operational tasks and marketing activities, automate everything with precision.',
  },
  {
    step: '03',
    title: 'Gain Insights & Scale',
    description:
      'Unlock real-time insights, monitor performance, and make data-driven decisions. As your business grows, FinMark.ai scales with you—ensuring efficiency at every stage.',
  },
]

export const SERVICES = [
  {
    icon: CreditCard,
    title: 'Payment Processing',
    description:
      'Optimize and automate payment flows with intelligent routing, multi-currency support, and built-in fraud prevention for seamless global transactions.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    description:
      'Stay compliant with automated KYC/AML checks, real-time regulatory updates, and audit-ready systems designed for modern businesses.',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Management',
    description:
      'Proactively identify and mitigate risks using predictive analytics and AI-driven models that safeguard your financial and operational processes.',
  },
  {
    icon: BarChart3,
    title: 'Financial Reporting',
    description:
      'Generate accurate, real-time reports with AI-powered insights, enabling better forecasting, analysis, and strategic decision-making.',
  },
  {
    icon: Search,
    title: 'Fraud Detection',
    description:
      'Detect anomalies and prevent fraud in real-time with advanced machine learning models that continuously learn and adapt.',
  },
  {
    icon: Database,
    title: 'Data Integration',
    description:
      'Unify your data across systems with seamless integrations, creating a single source of truth for finance and operations.',
  },
]

export const TRUSTED_LOGOS = [
  'Goldman Sachs',
  'JPMorgan',
  'Stripe',
  'Bloomberg',
  'Visa',
  'Mastercard',
  'Deloitte',
  'McKinsey',
  'Revolut',
  'Plaid',
]

export const TESTIMONIALS = [
  {
    quote:
      'Finmark reduced our compliance processing time by 85%. The AI-driven automation is nothing short of transformative for our operations.',
    name: 'Sarah Chen',
    role: 'CFO, Nexus Financial',
    avatar: 'SC',
  },
  {
    quote:
      'The predictive forecasting alone paid for itself in the first quarter. We now have institutional-grade insights at a fraction of the cost.',
    name: 'Marcus Williams',
    role: 'VP Finance, TechScale Inc.',
    avatar: 'MW',
  },
  {
    quote:
      'Fraud detection accuracy went from 72% to 99.4% after implementing Finmark. Our risk team can finally focus on strategic decisions.',
    name: 'Elena Rodriguez',
    role: 'Head of Risk, PayFlow',
    avatar: 'ER',
  },
  {
    quote:
      'Integration took 15 minutes, not 15 weeks. The unified data layer connects seamlessly with our existing banking infrastructure.',
    name: 'David Park',
    role: 'CTO, FinBridge',
    avatar: 'DP',
  },
  {
    quote:
      'The automated reporting saves our team 40+ hours per month. Stakeholders love the natural language summaries.',
    name: 'Amara Osei',
    role: 'Director of Operations, CloudBank',
    avatar: 'AO',
  },
]

export const FOOTER_LINKS = {
  Product: ['Features', 'How It Works', 'Services'],
  Legal: ['Privacy Policy', 'Terms of Service'],
}
