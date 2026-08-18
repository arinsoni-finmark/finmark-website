import SEO from '../components/seo/SEO'
import Breadcrumb from '../components/seo/Breadcrumb'
import PillarHero from '../components/seo/PillarHero'
import PillarSection from '../components/seo/PillarSection'
import PillarFAQ from '../components/seo/PillarFAQ'
import PillarCTA from '../components/seo/PillarCTA'
import { SECURITY_SECTIONS, SECURITY_FAQS } from '../content/security'
import {
  organizationSchema,
  webPageSchema,
  breadcrumbSchema,
  faqSchema,
} from '../lib/schema'

/**
 * Security page.
 *
 * Exists to answer the questions an enterprise finance buyer asks before they
 * will take a call, so the answers arrive before the objection rather than
 * after an email chain. Content lives in content/security.js — read the note
 * at the top of that file before editing, particularly on certifications.
 */
export default function SecurityPage() {
  const path = '/security'
  const items = [
    { name: 'Home', path: '/' },
    { name: 'Security', path },
  ]

  return (
    <>
      <SEO
        title="Security — Data Protection, Isolation and Access | FinMark.ai"
        description="How FinMark.ai protects customer data: encryption in transit and at rest, per-tenant isolation, least-privilege access, audit logging, and regular penetration testing. We never execute payments."
        path={path}
        schema={[
          organizationSchema(),
          webPageSchema({
            title: 'Security at FinMark.ai',
            description:
              'Data protection, tenant isolation, access control and assurance at FinMark.ai.',
            path,
          }),
          breadcrumbSchema(items),
          faqSchema(SECURITY_FAQS),
        ]}
      />
      <Breadcrumb items={items} />

      <PillarHero
        badge="Security"
        h1="Security at FinMark.ai"
        subhead="We handle vendor invoices and post to your general ledger. Here is exactly what we do with your data, what we never touch, and how to review us properly."
        primaryCta={{ label: 'Request the security questionnaire', href: '/contact' }}
      />

      {SECURITY_SECTIONS.map((section) => (
        <PillarSection
          key={section.heading}
          kicker={section.kicker}
          heading={section.heading}
          body={section.body}
        />
      ))}

      <div className="border-t border-white/5">
        <PillarFAQ faqs={SECURITY_FAQS} heading="Security questions, answered" />
      </div>

      <PillarCTA
        heading="Reviewing us? Start here."
        subhead="Ask for the security questionnaire, or send us yours and we'll complete it."
        primaryCta={{ label: 'Get in touch', href: '/contact' }}
      />
    </>
  )
}
