// Security page content.
//
// EVERY claim here is already approved and live elsewhere on the site — the
// AP pillar FAQs and the multi-tenant and SharePoint clusters. Nothing new
// has been asserted. Two lines are deliberately NOT crossed:
//
//   1. No certification claim. FinMark.ai is not SOC 2 or ISO 27001
//      certified, and the copy says "aligned with" rather than "certified",
//      exactly as the existing FAQ does. Implying a certification you do not
//      hold is the fastest way to fail an enterprise security review.
//   2. No naming the cloud provider or region. The approved public wording is
//      "enterprise-grade cloud infrastructure"; the specific provider and
//      region are vault-only (see the note at the top of pillars.js).
//
// If a certification is genuinely in progress, saying so here is worth a lot —
// but it must come from the founder, not be inferred.

export const SECURITY_SECTIONS = [
  {
    kicker: 'Blast radius',
    heading: 'The safest permission is the one we never ask for',
    body: [
      'FinMark.ai stops at the ERP. Invoices are captured, matched, tax-computed, sanity-checked and approved, then posted back into your ERP audit-ready — and that is where our involvement ends. We do not execute payments. Payment stays with your bank, your treasury, and the controls your finance and compliance teams already trust.',
      'That is a deliberate design decision, not a missing feature. A system that cannot move money cannot be used to move money, which takes the single largest category of financial risk off the table before any other control is considered.',
      'The same principle runs through the rest of the platform. Where SharePoint is already your document repository, invoices stay there — picked up from your existing folders, with your existing access controls, retention policies and audit logs still governing them. Nothing has to be migrated into a new storage layer to be processed.',
    ],
  },
  {
    kicker: 'Data protection',
    heading: 'Encrypted in transit and at rest, isolated by tenant',
    body: [
      'Customer data is hosted on enterprise-grade cloud infrastructure with encryption in transit and at rest, and regional data residency where required by the customer or by regulation.',
      'Every subsidiary runs as its own isolated tenant. Group structures are the norm in the enterprises we serve — a parent holding company with several operating subsidiaries, each with its own ERP instance, vendor base, approval policy and tax obligations — and the isolation between them is enforced by the platform, not by convention.',
      'A separate admin view runs above the tenants. Super admins, typically group CFOs and internal audit, can see invoices, approvals and key metrics across every subsidiary in one place without that isolation being weakened for anyone else.',
    ],
  },
  {
    kicker: 'Access and accountability',
    heading: 'Least privilege, and a trail for every decision',
    body: [
      'Access follows least privilege: people and services get the minimum needed to do their job, and no more.',
      'Actions are logged. Because tax and matching decisions are made automatically, the rule that produced each one stays visible in the audit trail — an auditor asking why a particular withholding tax rate was applied to a particular invoice can be shown the answer rather than told it.',
    ],
  },
  {
    kicker: 'Assurance',
    heading: 'Tested regularly, and documented for your review',
    body: [
      'The platform is subject to regular penetration testing, and operates on infrastructure and controls aligned with enterprise-grade security standards.',
      'FinMark.ai is not currently SOC 2 or ISO 27001 certified. We would rather say that plainly than imply otherwise and have it surface halfway through your review. If your process requires a certified vendor, tell us early and we will be straight with you about where we are.',
      'A full security questionnaire is available on request, and we are happy to complete your own. Ask your point of contact, or use the form below.',
    ],
  },
]

export const SECURITY_FAQS = [
  {
    q: 'Does FinMark.ai ever move money?',
    a: 'No. FinMark.ai stops at the ERP. Once invoices are captured, matched, tax-computed, sanity-checked and approved, they post back into your ERP audit-ready for your existing payment process. Payment execution stays with your bank, your treasury, and the controls your finance and compliance teams already trust.',
  },
  {
    q: 'Is FinMark.ai SOC 2 or ISO 27001 certified?',
    a: 'Not currently. FinMark.ai operates on infrastructure and controls aligned with enterprise-grade security standards — encryption in transit and at rest, least-privilege access, tenant isolation, audit logging, and regular penetration testing — but we do not hold either certification today and will not imply that we do. A full security questionnaire is available on request.',
  },
  {
    q: 'Where is our data hosted?',
    a: 'On enterprise-grade cloud infrastructure, with tenant isolation, encryption in transit and at rest, and regional data residency where required by the customer or by regulation. If you have a specific residency requirement, raise it early and we will confirm whether we can meet it before you invest time in an evaluation.',
  },
  {
    q: 'We run several subsidiaries. Can one see another\'s data?',
    a: 'No. Each subsidiary runs as its own isolated tenant with its own vendor base, approval policy and tax obligations. A separate group-level admin view lets super admins — typically group CFOs and internal audit — see across all of them, without weakening the isolation between the subsidiaries themselves.',
  },
  {
    q: 'Do our invoice documents have to move into FinMark.ai?',
    a: 'Not where SharePoint is already your repository. Invoices are picked up from your existing folders and portal uploads are written back, so your current access controls, retention policies and audit logs keep governing the documents. There is no migration project and no second copy of your records to secure.',
  },
  {
    q: 'Can we run our own security review?',
    a: 'Yes, and we would encourage it. A full security questionnaire is available on request, and we are happy to complete yours instead. Get in touch and we will send it over.',
  },
]
