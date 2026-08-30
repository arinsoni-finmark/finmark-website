// Pillar content config — single source of truth for pillar pages.
//
// FinMark.ai is a Financial Automation company for African enterprise.
// Today's product is AI Accounts Payable automation built for Microsoft
// ERP. AP is the first product in the platform; more will follow
// once each one is real, shipping, and proven at a paying customer.
//
// All copy is OUTCOME-FOCUSED — what the buyer gets, not how the system
// is built internally. No "SOAP middleware", no "every 5 minutes", no
// "SHA-256 fingerprinting", no "2-pass extraction", no internal field counts.
// We don't name the underlying LLM provider — the model is the moat and
// stays opaque. Sophisticated buyers can ask under NDA if they want.
//
// Real product context (sourced from internal vault, NOT promised on website):
//   - Live with a major enterprise group (Nigerian conglomerate) across two operating subsidiaries
//   - Multi-subsidiary support with subdomain isolation
//   - High AI extraction accuracy sustained in production
//   - Direct on-premise ERP integration
//   - Nigerian WHT computation per current regulations
//   - SharePoint integration for document repositories
//   - AWS eu-west-1 hosting, encrypted at rest and in transit
//   - Internal security audit + pentest complete

export const PILLARS = [
  {
    slug: 'accounts-payable-automation',
    primaryKeyword: 'accounts payable automation',
    meta: {
      title: 'Accounts Payable (AP) Automation Software | FinMark.ai',
      description:
        'AI-powered accounts payable automation for Nigerian enterprise running ERP. Live in production at a major enterprise group. Nigerian Withholding Tax computed automatically.',
    },
    hero: {
      badge: 'Accounts Payable Automation',
      h1: 'AP Automation for ERP',
      subhead:
        'Live in production at a major enterprise group. Nigerian Withholding Tax computed automatically. Approved invoices pushed straight into ERP. Built by Nigerian founders for Nigerian enterprise.',
      primaryCta: { label: 'Book a 30-min call', href: '/demo' },
      secondaryCta: null,
    },
    sections: [],
    clusterHubHeading: null,
    clusters: [],
    siblings: [],
    faqs: [
      {
        q: 'What is FinMark.ai?',
        a: 'FinMark.ai is a financial automation platform for enterprise finance teams. It runs the full invoice-to-ERP workflow end to end — capturing vendor invoices in any format, matching them against live ERP data, computing withholding tax automatically, running sanity checks, and posting approved entries back into the ERP. What used to take finance teams days now takes minutes.',
      },
      {
        q: 'Which ERP does FinMark.ai integrate with?',
        a: 'FinMark.ai integrates with the major enterprise ERPs our customers run on. Integrations work against live ERP data — purchase orders, goods-received notes, vendor masters — so matching, tax logic, and posting all happen inside the same source of truth your finance team already operates on. If you run a specific ERP and want to confirm support, request a walkthrough and we\'ll validate against your instance before we talk implementation.',
      },
      {
        q: 'Does FinMark.ai handle withholding tax?',
        a: 'Yes. Withholding tax is not an add-on — it\'s computed automatically inside the core workflow, against current regulations, and written back into the ERP along with every posted invoice. Tax logic is configurable by region, so as regulations change or your operating footprint expands, the platform adapts without your finance team rebuilding spreadsheets.',
      },
      {
        q: 'Does FinMark.ai execute payments?',
        a: 'No. FinMark.ai stops at the ERP. Once invoices are captured, matched, tax-computed, sanity-checked, and approved, they post back into your ERP audit-ready for your existing payment process. Payment execution stays with your bank, your treasury, and the controls your finance and compliance teams already trust — where it belongs.',
      },
      {
        q: 'How accurate is the AI invoice extraction?',
        a: 'High — but we do not rely on AI alone. The platform runs a two-layer approach: AI extracts the invoice, and a sanity-check layer validates the output against purchase orders, goods-received notes, vendor data, and tax logic before anything reaches a human approver. That combination catches the edge cases AI alone would miss — wrong line totals, mismatched currencies, duplicate invoices, miscategorised services. What lands on a finance controller\'s desk is either clean or clearly flagged. Accuracy in production is measured per customer; we\'ll share benchmarks from comparable enterprises on a walkthrough call.',
      },
      {
        q: 'Is FinMark.ai SOC 2 or ISO 27001 certified?',
        a: 'FinMark.ai operates on infrastructure and controls aligned with enterprise-grade security standards — encryption in transit and at rest, least-privilege access, tenant isolation, audit logging, and regular penetration testing. For a full security questionnaire, request one from your point of contact.',
      },
      {
        q: 'Where is the data hosted?',
        a: 'Customer data is hosted on enterprise-grade cloud infrastructure with tenant isolation, encryption in transit and at rest, and regional data residency where required by the customer or regulation.',
      },
      {
        q: 'Who is FinMark.ai built for?',
        a: 'FinMark.ai is built for enterprise finance teams — controllers, finance directors, and CFOs — at organisations large enough that vendor invoice volume, approval hierarchies, and compliance obligations have outgrown spreadsheets and manual ERP entry. If your finance team processes hundreds of vendor invoices a month, operates inside an established ERP, and spends more time keying data than analysing it, you are in the zone FinMark.ai was designed for.',
      },
    ],
  },
]

/**
 * Lookup helper. Used by ProductIntroPage to pull a product page's FAQs
 * when its slug also names a pillar.
 */
export function getPillarBySlug(slug) {
  return PILLARS.find((p) => p.slug === slug)
}

/**
 * Resolve a sibling pillar slug into page metadata. Nothing consumes this
 * today — the site has one pillar — but it is the shape a cross-pillar nav
 * would need if a second one ships.
 */
export function resolveSiblings(siblingSlugs) {
  return siblingSlugs
    .map((slug) => {
      const p = getPillarBySlug(slug)
      if (!p) return null
      return {
        title: p.hero.h1.replace(/^The Modern Operating System for /, ''),
        description: p.meta.description.split('.')[0] + '.',
        path: `/${p.slug}`,
      }
    })
    .filter(Boolean)
}
