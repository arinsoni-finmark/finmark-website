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
]

export const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Analytics',
    description: 'Deep learning models analyze transaction patterns in real-time, delivering actionable insights that transform raw data into strategic advantage.',
  },
  {
    icon: Shield,
    title: 'Smart Compliance',
    description: 'Automated regulatory monitoring with AI-driven risk scoring ensures you stay ahead of evolving compliance requirements across jurisdictions.',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Forecasting',
    description: 'Machine learning algorithms forecast cash flows, revenue trends, and market movements with institutional-grade accuracy.',
  },
  {
    icon: FileText,
    title: 'Intelligent Reporting',
    description: 'Auto-generated financial reports with natural language summaries, custom dashboards, and one-click stakeholder distribution.',
  },
]

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Connect Your Data',
    description: 'Integrate with your existing banking, accounting, and payment systems in minutes.',
  },
  {
    step: '02',
    title: 'AI Processes & Learns',
    description: 'Our models analyze your financial data, identify patterns, detect anomalies, and build a custom intelligence layer for your business.',
  },
  {
    step: '03',
    title: 'Automate & Scale',
    description: 'Deploy automated workflows for compliance, reporting, and forecasting.',
  },
]

export const SERVICES = [
  {
    icon: CreditCard,
    title: 'Payment Processing',
    description: 'AI-optimized payment routing with fraud prevention and multi-currency support.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    description: 'Automated KYC/AML checks with real-time regulatory updates.',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Management',
    description: 'Predictive risk models that identify threats before they materialize.',
  },
  {
    icon: BarChart3,
    title: 'Financial Reporting',
    description: 'AI-generated reports with natural language insights and custom visualizations.',
  },
  {
    icon: Search,
    title: 'Fraud Detection',
    description: 'Real-time anomaly detection powered by deep learning neural networks.',
  },
  {
    icon: Database,
    title: 'Data Integration',
    description: 'Unified data layer connecting your banking and financial platforms.',
  },
]

export const FOOTER_LINKS = {
  Product: ['Features', 'How It Works', 'Services'],
  Legal: ['Privacy Policy', 'Terms of Service'],
}
