import {
  FileSearch,
  Brain,
  CheckSquare,
  Receipt,
  Database,
  FolderTree,
  Building2,
} from 'lucide-react'

export const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// Nested product structure for the navbar "Products" dropdown.
// Today there is one product (Accounts Payable). Each product has
// a set of features that show as sub-items in the dropdown.
// When more products ship, append new entries here and the dropdown
// expands automatically.
export const PRODUCTS = [
  {
    label: 'Accounts Payable',
    slug: 'accounts-payable-automation',
    to: '/accounts-payable-automation',
    description: 'AI-powered AP automation. Live in production.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'Accounts Payable (AP) Automation Software | FinMark.ai',
      metaDescription: 'AI-powered accounts payable automation. Full invoice-to-ERP workflow — capture, match, validate, approve, post. Live in production with enterprise customers.',
      h1: 'Accounts Payable',
      body: [
        'FinMark.ai runs the full invoice-to-ERP workflow end to end. AI captures invoices in any format. Matching happens against live ERP data. Withholding tax is computed automatically against current regulations. Sanity checks catch what AI alone would miss. Approved invoices post back into the ERP, audit-ready.',
        'What used to take finance teams days now takes minutes. The platform is live in production with enterprise customers today.',
        'Built for finance teams that process hundreds of vendor invoices a month, operate inside an established ERP, and spend more time keying data than analysing it.',
      ],
    },
  },
  {
    label: 'ERP Audit',
    slug: 'erp-audit',
    to: '/erp-audit',
    description: 'Automated audit and compliance for your ERP.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'ERP Audit — Automated Compliance Checks | FinMark.ai',
      metaDescription: 'Automated ERP audit that finds anomalies, control gaps, and compliance issues in your financial data before your auditors do.',
      h1: 'ERP Audit',
      body: [
        'Your ERP holds all your financial data. FinMark.ai\'s ERP Audit scans it automatically — looking for anomalies, control gaps, duplicate transactions, unauthorized changes, and compliance issues that manual audits miss or find too late.',
        'Instead of quarterly reviews that surface problems weeks after they happen, ERP Audit runs continuously on your live data. Findings are flagged with full context so your finance team can act immediately — not after the auditor leaves.',
        'Built on the same AI and ERP integration layer that powers our AP automation product. If you run an ERP, this is the audit tool that actually understands your data.',
      ],
    },
  },
  {
    label: 'FP&A',
    slug: 'fpa',
    to: '/fpa',
    description: 'Financial planning, budgeting, and forecasting.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'FP&A & Financial Reporting Automation | FinMark.ai',
      metaDescription: 'Automated financial reporting for enterprise groups. P&L, balance sheet, cash flow, and budget vs actuals — generated from your trial balance and GL data. Live in production.',
      h1: 'FP&A',
      // TODO: set uploadDate (ISO 8601, e.g. '2026-08-14'). videoSchema stays
      // silent until it is, because Google requires uploadDate for
      // VideoObject and rejects the node without it — so the video plays but
      // is not yet eligible for a video rich result.
      video: {
        youtubeId: 'jcNLfqfxJoE',
        title: 'Adding one engineer costs you 2.4 months of runway. See it before you offer.',
        description:
          'A walkthrough of FinMark.ai FP&A: seeing the runway impact of a hiring decision before the offer goes out.',
        uploadDate: null,
        poster: null,
      },
      body: [
        'Month-end reporting at most enterprise groups still means days of spreadsheet work — pulling trial balances, classifying GL lines, and rebuilding the same P&L, balance sheet, and cash flow every month. FinMark.ai\'s FP&A product automates that: upload your trial balance and GL data, and finished management reports come out the other side.',
        'It goes beyond the core statements — budget vs actuals with annual plans and latest estimates, expense reporting by category, SKU-level margin analysis, rebate analytics, and built-in insights that answer the questions management actually asks at review meetings.',
        'Built for multi-company groups: each entity gets its own isolated reporting portal, with a consolidated view for the group. Live in production with enterprise groups today, on the same platform that powers our accounts payable automation.',
      ],
    },
  },
  {
    label: 'MT Billing',
    slug: 'mt-billing',
    to: '/mt-billing',
    description: 'Automated billing for multi-tenant platforms.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'MT Billing — Multi-Tenant Billing Automation | FinMark.ai',
      metaDescription: 'Automated billing for multi-tenant platforms. Usage tracking, invoice generation, and reconciliation — built for companies running multi-tenant infrastructure.',
      h1: 'MT Billing',
      body: [
        'Multi-tenant platforms generate complex billing — usage-based charges, per-tenant invoicing, tiered pricing, overage calculations. Most teams cobble this together with spreadsheets and custom scripts that break every time the pricing model changes.',
        'FinMark.ai\'s MT Billing automates the entire flow — track usage per tenant, generate invoices automatically, reconcile payments, and push everything into your accounting system. No more month-end billing scrambles.',
        'Built for companies running multi-tenant SaaS, infrastructure platforms, or managed services where billing complexity scales with customer count.',
      ],
    },
  },
  {
    label: 'P&L Auto Track',
    slug: 'pnl-auto-track',
    to: '/pnl-auto-track',
    description: 'A live P&L that updates as transactions post.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'P&L Auto Track — Live Profit & Loss Tracking | FinMark.ai',
      metaDescription: 'A live P&L that updates as transactions post. See margin movement the day it happens instead of waiting for month-end close.',
      h1: 'P&L Auto Track',
      body: [
        'Most finance teams see their P&L once a month, weeks after the decisions that shaped it were made. By the time margin slippage shows up in the month-end pack, it has been quietly compounding for thirty days.',
        'P&L Auto Track keeps a live P&L that updates as transactions post. Margin movement shows up the day it happens — a price change, a cost spike, a product mix shift — so finance can flag it while there is still time to act, not explain it after the fact.',
        'Built on the same data layer that powers our financial reporting product: your transactions flow in, classification happens automatically, and the P&L stays current without anyone rebuilding a spreadsheet.',
      ],
    },
  },
  {
    label: 'RevRecog AI',
    slug: 'revenue-recognition-automation',
    to: '/revenue-recognition-automation',
    description: 'Automated revenue recognition with a full audit trail.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'RevRecog AI — Revenue Recognition Automation | FinMark.ai',
      metaDescription: 'Automates revenue recognition schedules across contracts and billing models, with a defensible audit trail for every entry.',
      h1: 'RevRecog AI',
      body: [
        'Revenue recognition is where finance teams spend the most careful hours for the least visible output — building schedules contract by contract, adjusting them when billing changes, and defending every number when the auditors arrive.',
        'RevRecog AI automates revenue recognition schedules across contracts and billing models. Schedules are generated from the contract terms, updated automatically as billing events land, and every recognised entry carries a defensible audit trail showing exactly why it was recognised, when, and under which rule.',
        'The result is revenue numbers your auditors can trace end to end — without your finance team maintaining the spreadsheet machinery behind them.',
      ],
    },
  },
  {
    label: 'UnitEcon Tracker',
    slug: 'unit-economics-tracker',
    to: '/unit-economics-tracker',
    description: 'True unit economics at customer, product, and SKU level.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'UnitEcon Tracker — Unit Economics Software | FinMark.ai',
      metaDescription: 'Track true unit economics — cost to serve, contribution margin, and payback — at customer, product, and SKU level.',
      h1: 'UnitEcon Tracker',
      body: [
        'Company-level margins hide the truth. Inside every blended number are customers that make money and customers that quietly lose it, SKUs that carry the business and SKUs that drain it — and most finance teams cannot tell them apart without a week of spreadsheet archaeology.',
        'UnitEcon Tracker computes true unit economics — cost to serve, contribution margin, and payback — at customer, product, and SKU level, from the transaction data you already have.',
        'It turns "our margin is 18%" into "these twenty customers are below water and here is why" — the level of detail where pricing, sales, and product decisions actually get made.',
      ],
    },
  },
  {
    label: 'Commission Engine AI',
    slug: 'sales-commission-automation',
    to: '/sales-commission-automation',
    description: 'Sales commissions calculated from live deal data.',
    badge: null,
    features: [],
    intro: {
      metaTitle: 'Commission Engine AI — Sales Commission Automation | FinMark.ai',
      metaDescription: 'Calculates, validates, and posts sales commissions from live deal and payment data — replacing spreadsheet cycles and payout disputes.',
      h1: 'Commission Engine AI',
      body: [
        'Commission season at most companies means a spreadsheet marathon: finance rebuilds the calculations, sales disputes the numbers, and everyone loses days reconciling versions of the truth.',
        'Commission Engine AI calculates, validates, and posts sales commissions from live deal and payment data. Plans are encoded once; every payout is computed against actual closed and collected revenue, validated against the plan rules, and posted with a clear trail from deal to payment to commission.',
        'Sales sees exactly how their number was built, finance stops re-deriving it by hand, and disputes turn into a lookup instead of a negotiation.',
      ],
    },
  },
]

// Flat list of all feature links — derived from PRODUCTS.
// Kept for backward compat with Footer's Product column.
export const PLATFORM_LINKS = PRODUCTS.flatMap((p) => p.features)

// FEATURES — outcome-focused. AI claims are honest about scope:
// - Extraction is genuinely AI (two-model verification approach).
// - Matching, approval, WHT, ERP integration are deterministic rules + sync.
// We don't claim "AI everywhere" because that would be a lie. We claim AI
// where AI actually delivers and rules-based automation where rules deliver.
export const FEATURES = [
  {
    icon: Brain,
    title: 'AI Invoice Extraction',
    description:
      'Two AI models read every invoice and verify each other\'s extraction before the data flows downstream. High accuracy on any vendor format, no per-vendor templates required.',
  },
  {
    icon: Database,
    title: 'Direct ERP Integration',
    description:
      'Connect via SOAP and REST APIs. POs and goods receipts sync into FinMark.ai; approved invoices push back into your ERP with all the fields populated, ready to post.',
  },
  {
    icon: Receipt,
    title: 'Withholding Tax, Built In',
    description:
      'Withholding Tax computed automatically and pushed back to your ERP alongside the invoice. Currently optimized for the Nigerian 2024 regulations; other regions on the roadmap.',
  },
  {
    icon: CheckSquare,
    title: 'Smart Matching',
    description:
      'Auto-match invoices against POs and goods receipts from your ERP using configurable tolerances. Handles the messy real-world cases — telecom invoices, marketing line items, partial receipts — without manual workarounds.',
  },
  {
    icon: FolderTree,
    title: 'SharePoint as Your Repository',
    description:
      'Pick up new invoices from your SharePoint folders automatically. Portal uploads write back to SharePoint. One source of truth, no migration.',
  },
  {
    icon: Building2,
    title: 'Built for Group Companies',
    description:
      'Run multiple subsidiaries on one platform with full data isolation between them and a cross-company admin view for the parent group. Each subsidiary stays independent.',
  },
]

// HOW_IT_WORKS — brand-level homepage content. Original pre-AP copy.
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

// SERVICES — same honest framing as FEATURES.
export const SERVICES = [
  {
    icon: FileSearch,
    title: 'AI Invoice Capture',
    description:
      'Two AI models read each invoice and verify the extraction before it flows downstream. High accuracy on any vendor format with no template setup.',
  },
  {
    icon: CheckSquare,
    title: 'PO & GRN Matching',
    description:
      'Auto-match invoices against purchase orders and goods receipts from your ERP. Configurable tolerances. Handles lump-sum and ratio-based matching for telecom and marketing categories.',
  },
  {
    icon: Receipt,
    title: 'Withholding Tax',
    description:
      'WHT computed automatically and pushed to your ERP alongside the invoice. Currently optimized for the Nigerian 2024 regulations; other regions on the roadmap.',
  },
  {
    icon: Database,
    title: 'ERP Integration',
    description:
      'Direct integration via SOAP and REST APIs. Bidirectional sync of POs, goods receipts, vendor master, and approved invoices. Built for on-premise and cloud ERPs.',
  },
  {
    icon: FolderTree,
    title: 'SharePoint Repository',
    description:
      'Use SharePoint as your AP document repository. We read invoices in and write portal uploads back. Your existing IT governance stays intact.',
  },
  {
    icon: Building2,
    title: 'Multi-Subsidiary Platform',
    description:
      'Run multiple subsidiaries on one platform with full data isolation and a cross-company admin view. Designed for group company structures with multiple legal entities.',
  },
]

export const TRUSTED_LOGOS = []

// TESTIMONIALS — kept for backward compatibility but the Testimonials
// component is no longer rendered on the homepage. Add real customer
// quotes here when you have them; do NOT keep fake quotes.
export const TESTIMONIALS = []

export const FOOTER_LINKS = {
  Product: ['Features', 'How It Works'],
}
