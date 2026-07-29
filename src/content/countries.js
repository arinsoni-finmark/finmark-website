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

    // Copy below is drawn from content already approved and live on the site
    // (the AP pillar and the Nigerian WHT cluster). No new claims introduced.
    sections: [
      {
        kicker: 'Why a Nigeria-specific product',
        heading: 'Generic AP tools were not built for this market',
        body: [
          'Existing tools were built for tax regimes and workflows that do not match how Nigerian finance teams operate — with no real grasp of regional withholding tax rules, compliance requirements, or the way complex vendor invoices actually move through an enterprise\'s approval chain.',
          'Enterprises running ERP were left with two options: handle it all by hand, or bend foreign tools into shapes they were never designed to take. Neither is a product. Both are workarounds.',
        ],
      },
      {
        kicker: 'What runs here today',
        heading: 'The full invoice-to-ERP workflow',
        body: [
          'AI captures invoices in any format. Matching happens against live ERP data. Withholding tax is computed automatically against current regulations. Sanity checks catch what AI alone would miss. Approved invoices post back into the ERP, audit-ready.',
          'The platform is live in production with enterprise customers in Nigeria today, running across multiple operating subsidiaries with full data isolation between them.',
        ],
      },
    ],

    // Deeper guides this market page links down to
    relatedClusters: ['nigerian-withholding-tax-automation'],
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
