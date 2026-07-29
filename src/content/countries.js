// Country pages — one per market FinMark.ai is live or launching in.
//
// These are MARKET-LEVEL hubs: "accounts payable automation in <country>",
// covering the whole product for that market. They sit above the deeper
// cluster guides and link down to them. Keep them distinct from a cluster's
// keyword — /nigeria targets "accounts payable automation nigeria", while
// /nigerian-withholding-tax-automation targets the WHT search. Do not let
// the two converge or they will cannibalise each other.
//
// A country only gets a route and a sitemap entry when `published: true`.
// That gate exists so an entry can be drafted here without a half-written
// page reaching Google — thin pages cost more than missing ones.
//
// PUBLISHING CHECKLIST, per country:
//   1. `video.youtubeId` set, and the recording checked frame by frame for
//      real vendor names, amounts, approver names, and — the classic leak —
//      the tenant subdomain in the URL bar. Demo tenant only.
//   2. `video.uploadDate` set (ISO 8601). Google requires it for VideoObject.
//   3. Compliance copy written from a real source. NEVER invent a tax rate,
//      a filing deadline, or a mandate date. On a finance site an invented
//      compliance claim is worse than an empty page.
//   4. Flip `published` to true.

export const COUNTRIES = [
  {
    slug: 'nigeria',
    name: 'Nigeria',
    published: false, // waiting on video id — see checklist above

    video: {
      youtubeId: null, // TODO
      title: 'FinMark.ai Accounts Payable — Nigeria walkthrough',
      description:
        'A walkthrough of the FinMark.ai accounts payable workflow for Nigerian enterprise: invoice capture, matching against live ERP data, automatic Withholding Tax computation, and posting back into the ERP.',
      uploadDate: null, // TODO — ISO 8601, e.g. '2026-07-30'
      poster: null, // optional; falls back to the YouTube thumbnail
    },

    meta: {
      title: 'Accounts Payable Automation in Nigeria | FinMark.ai',
      description:
        'AI-powered accounts payable automation for Nigerian enterprise running ERP. Withholding Tax computed automatically per current regulations. Live in production.',
    },

    hero: {
      badge: 'Nigeria',
      h1: 'Accounts Payable Automation for Nigeria',
      subhead:
        'Live in production at a major enterprise group. Nigerian Withholding Tax computed automatically. Approved invoices pushed straight into ERP.',
    },

    // Every claim below is drawn from copy already approved and live on the
    // site (the AP pillar, the Nigerian WHT cluster, the NAV and multi-tenant
    // clusters). No new capability, rate or date has been introduced. If you
    // edit this, hold that line — see the note at the top of the file.
    sections: [
      {
        kicker: 'The problem',
        heading: 'Generic AP tools were never built for this market',
        body: [
          'Nigerian Withholding Tax is a real compliance burden for any business operating here. The regulations specify rate variations by vendor type — registered companies, individuals, foreign entities — by service category, covering consulting, construction, supply, technical services, rent and royalties, and by TIN registration status. Computing it correctly means looking up the right rate for each invoice line, applying it to the right base amount, and producing the supporting fields the filing needs.',
          'AP automation built for the US, the UK or the EU does none of that. Those tools treat tax as a single sales tax field, which is the wrong model entirely for Nigerian WHT. So finance teams running Nigerian operations end up computing WHT by hand outside the tool, which defeats most of the automation they paid for, or paying local consultants to do it, which is expensive, slow, and does not scale with invoice volume.',
          'That leaves two options that are both workarounds: handle it manually, or bend a foreign tool into a shape it was never designed to take. Neither is a product. FinMark.ai exists because a Nigerian enterprise running ERP deserved an actual one.',
        ],
      },
      {
        kicker: 'The difference',
        heading: 'Withholding tax is computed before anyone approves anything',
        body: [
          'When an invoice enters the pipeline, the WHT engine decides whether WHT applies, which rate to use, and what the tax base should be. That decision draws on the vendor type, the service category mapped from the invoice line items, the TIN status, and the current Nigerian regulation table. It applies the rate, computes the amount, and produces the supporting fields the certificate needs.',
          'This happens automatically, as part of processing. By the time an invoice reaches a human approver the tax is already computed, the rate that was applied is visible in the audit trail, and the supporting fields are ready to move. Nobody is maintaining a parallel WHT spreadsheet, and nobody is copying numbers between systems.',
          'There is no major AP automation tool that handles Nigerian WHT this way, for a simple reason: they are built for the US or Europe, and Nigeria is not on their roadmap. For a Nigerian finance team, this one capability is the difference between automation that runs end to end and automation that stops at the hard part.',
        ],
      },
      {
        kicker: 'The workflow',
        heading: 'Invoice to ERP, without the keying',
        body: [
          'AI reads vendor invoices in whatever format they arrive in — no per-vendor templates to configure. Two models read each invoice and verify each other before anything flows downstream, and a sanity-check layer validates the result against purchase orders, goods-received notes, vendor data and tax logic before a human ever sees it. What lands on a controller\'s desk is either clean or clearly flagged.',
          'Matching runs against live ERP data with configurable tolerances, and handles the messy real-world cases — telecom invoices, marketing line items, partial receipts — without manual workarounds. Approved invoices post back into the ERP with the WHT fields populated alongside the standard ones, audit-ready.',
          'Integration is direct, over SOAP and REST APIs, and is built for the on-premise ERP reality that cloud-first AP vendors handle badly. Purchase orders, goods-received notes, vendor master data and approved invoices all move between FinMark.ai and your ERP instance automatically. SharePoint can stay as the document repository — invoices are picked up from your existing folders and portal uploads are written back, so nothing has to migrate.',
        ],
      },
      {
        kicker: 'Group structures',
        heading: 'Built for how Nigerian groups are actually organised',
        body: [
          'Group company structures are the norm in Nigerian enterprise. A parent holding company runs multiple operating subsidiaries, each with its own ERP instance, its own vendor base, its own approval policy and its own tax obligations. The parent needs visibility across all of it without the subsidiaries seeing each other\'s data.',
          'FinMark.ai runs every subsidiary on one platform with full data isolation between them, and a cross-company admin view for the parent group. Each subsidiary stays independent; the group gets the consolidated picture. That is the structure the product was designed around, not an enterprise tier bolted on afterwards.',
        ],
      },
      {
        kicker: 'Status',
        heading: 'Live in production, not a pilot',
        body: [
          'FinMark.ai is running in production at a major enterprise group in Nigeria today, across multiple operating subsidiaries. What used to take finance teams days now takes minutes.',
          'We did not start with code. We started in the seat next to the finance controller — watching invoices arrive in dozens of formats, listening to how PO and goods-received matching breaks down for services and marketing categories, and tracking how withholding tax certificates actually get produced. Every design decision came out of that.',
        ],
      },
    ],

    // Nigeria-specific questions. Deliberately distinct from the eight on the
    // AP pillar page so the two do not compete for the same FAQ rich result.
    faqs: [
      {
        q: 'Does FinMark.ai compute Nigerian Withholding Tax automatically?',
        a: 'Yes. Every applicable invoice gets WHT computed automatically against the current Nigerian regulations, with the rate selected from the vendor type, the service category mapped from the line items, and the TIN registration status. The computation happens before the invoice reaches an approver, and the rule that was applied stays visible in the audit trail.',
      },
      {
        q: 'Where does the WHT data end up?',
        a: 'In your ERP, alongside the standard invoice fields, when the approved invoice posts back. Your ERP then holds everything it needs to post the invoice with WHT correctly captured for the filing. There is no separate WHT spreadsheet to maintain and no copying numbers between systems.',
      },
      {
        q: 'Why not use a US or European AP automation tool in Nigeria?',
        a: 'Those tools model tax as a single sales tax field, which does not describe Nigerian WHT at all — there is no place for rate variation by vendor type, service category or TIN status. Teams that adopt them end up computing WHT by hand outside the tool or outsourcing it to consultants, which removes most of the value they bought the tool for.',
      },
      {
        q: 'Does it work with on-premise ERP?',
        a: 'Yes, and that is deliberate. Integration is direct over SOAP and REST APIs, built for the on-premise ERP reality that cloud-first AP vendors handle badly. Purchase orders, goods-received notes, vendor master data and approved invoices move automatically between FinMark.ai and your ERP instance.',
      },
      {
        q: 'We run several subsidiaries. Can they share one platform?',
        a: 'Yes. Every subsidiary runs on one platform with full data isolation between them, plus a cross-company admin view for the parent group. Each subsidiary keeps its own vendor base, approval policy and tax obligations while the group gets a consolidated view.',
      },
      {
        q: 'Do we have to move our documents off SharePoint?',
        a: 'No. SharePoint can remain your AP document repository. New invoices are picked up from your existing folders automatically and portal uploads are written back to SharePoint, so there is one source of truth and no migration project.',
      },
    ],

    // Deeper guides this market page links down to
    relatedClusters: [
      'nigerian-withholding-tax-automation',
      'microsoft-dynamics-nav-integration',
      'multi-tenant-ap-platform',
      'sharepoint-invoice-integration',
    ],
  },

  {
    slug: 'india',
    name: 'India',
    published: false, // waiting on video id AND compliance copy

    video: {
      youtubeId: null, // TODO
      title: 'FinMark.ai Accounts Payable — India walkthrough',
      description: null, // TODO — write once the video content is known
      uploadDate: null, // TODO — ISO 8601
      poster: null,
    },

    meta: {
      title: 'Accounts Payable Automation in India | FinMark.ai',
      description: null, // TODO — 150-160 chars, must reflect real capability
    },

    hero: {
      badge: 'India',
      h1: 'Accounts Payable Automation for India',
      subhead: null, // TODO
    },

    // TODO — needs the India specifics from the founder. Candidate topics,
    // NONE of which may be written without a source: TDS treatment, GST
    // input credit reconciliation, e-invoicing / IRN generation thresholds,
    // and which ERPs are in play in this market. Leave empty until supplied.
    sections: [],

    relatedClusters: [],
  },
]

/** Countries with a live page. Everything downstream reads this, not COUNTRIES. */
export const PUBLISHED_COUNTRIES = COUNTRIES.filter((c) => c.published)

export function getCountryBySlug(slug) {
  return PUBLISHED_COUNTRIES.find((c) => c.slug === slug)
}
