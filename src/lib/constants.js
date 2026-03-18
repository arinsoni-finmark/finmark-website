import {
  Brain,
  Shield,
  TrendingUp,
  FileText,
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
      'Deep learning models analyze transaction patterns in real-time, delivering actionable insights that transform raw data into strategic advantage.',
  },
  {
    icon: Shield,
    title: 'Smart Compliance',
    description:
      'Automated regulatory monitoring with AI-driven risk scoring ensures you stay ahead of evolving compliance requirements across jurisdictions.',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Forecasting',
    description:
      'Machine learning algorithms forecast cash flows, revenue trends, and market movements with institutional-grade accuracy.',
  },
  {
    icon: FileText,
    title: 'Intelligent Reporting',
    description:
      'Auto-generated financial reports with natural language summaries, custom dashboards, and one-click stakeholder distribution.',
  },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Connect Your Data',
    description:
      'Integrate with your existing banking, accounting, and payment systems in minutes.',
  },
  {
    step: '02',
    title: 'AI Processes & Learns',
    description:
      'Our models analyze your financial data, identify patterns, detect anomalies, and build a custom intelligence layer for your business.',
  },
  {
    step: '03',
    title: 'Automate & Scale',
    description:
      'Deploy automated workflows for compliance, reporting, and forecasting.',
  },
]

export const SERVICES = [
  {
    icon: CreditCard,
    title: 'Payment Processing',
    description:
      'AI-optimized payment routing with fraud prevention and multi-currency support.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    description: 'Automated KYC/AML checks with real-time regulatory updates.',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Management',
    description:
      'Predictive risk models that identify threats before they materialize.',
  },
  {
    icon: BarChart3,
    title: 'Financial Reporting',
    description:
      'AI-generated reports with natural language insights and custom visualizations.',
  },
  {
    icon: Search,
    title: 'Fraud Detection',
    description:
      'Real-time anomaly detection powered by deep learning neural networks.',
  },
  {
    icon: Database,
    title: 'Data Integration',
    description:
      'Unified data layer connecting your banking and financial platforms.',
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
