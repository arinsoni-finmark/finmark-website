import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/seo/SEO'
import Breadcrumb from '../components/seo/Breadcrumb'
import PillarHero from '../components/seo/PillarHero'
import PillarSection from '../components/seo/PillarSection'
import PillarFAQ from '../components/seo/PillarFAQ'
import PillarCTA from '../components/seo/PillarCTA'
import VideoEmbed from '../components/VideoEmbed'
import { getCountryBySlug } from '../content/countries'
import { getClusterByPath } from '../content/clusters'
import {
  organizationSchema,
  webPageSchema,
  breadcrumbSchema,
  videoSchema,
  faqSchema,
} from '../lib/schema'

/**
 * Market-level page for one country, e.g. /accounts-payable-automation/nigeria.
 *
 * Sits between the AP pillar and the deeper cluster guides: it covers the
 * whole product for that market and links down to the specifics. Its keyword
 * is "accounts payable automation <country>", deliberately distinct from the
 * cluster guides underneath it.
 *
 * Only routed for countries with `published: true` in content/countries.js.
 */
export default function CountryPage({ pillar, country: slug }) {
  const country = getCountryBySlug(slug)

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Page not found</h1>
          <p className="text-gray-400">No country page matches &ldquo;{slug}&rdquo;.</p>
        </div>
      </div>
    )
  }

  const path = `/${pillar}/${country.slug}`
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Accounts Payable Automation', path: `/${pillar}` },
    { name: country.name, path },
  ]

  const related = (country.relatedClusters || [])
    .map((s) => getClusterByPath(pillar, s))
    .filter(Boolean)

  return (
    <>
      <SEO
        title={country.meta.title}
        description={country.meta.description}
        path={path}
        schema={[
          organizationSchema(),
          webPageSchema({
            title: country.meta.title,
            description: country.meta.description,
            path,
          }),
          breadcrumbSchema(breadcrumbItems),
          videoSchema(country.video),
          faqSchema(country.faqs),
        ]}
      />
      <Breadcrumb items={breadcrumbItems} />

      <PillarHero
        badge={country.hero.badge}
        h1={country.hero.h1}
        subhead={country.hero.subhead}
        primaryCta={{ label: 'Get a demo', href: `/demo?product=${pillar}` }}
      />

      {/* Product walkthrough for this market */}
      {country.video?.youtubeId && (
        <section className="relative py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <VideoEmbed
              youtubeId={country.video.youtubeId}
              title={country.video.title}
              poster={country.video.poster}
            />
          </div>
        </section>
      )}

      {country.sections.map((section) => (
        <PillarSection
          key={section.heading}
          kicker={section.kicker}
          heading={section.heading}
          body={section.body}
        />
      ))}

      {country.faqs?.length > 0 && (
        <div className="border-t border-white/5">
          <PillarFAQ faqs={country.faqs} heading={`${country.name}: common questions`} />
        </div>
      )}

      {/* Down-links to the deeper guides for this market */}
      {related.length > 0 && (
        <section className="relative py-16 sm:py-20 border-t border-white/5">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-12">
              Go deeper on {country.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  to={`/${pillar}/${c.slug}`}
                  className="group block h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-electric/40 hover:bg-electric/[0.04]"
                >
                  <h3 className="font-display text-base font-semibold text-white mb-2">
                    {c.hero.badge || c.primaryKeyword}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {c.meta.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-electric-light text-xs font-medium">
                    Read the guide{' '}
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <PillarCTA
        heading={`See it running for ${country.name}`}
        primaryCta={{ label: 'Book a 30-minute call', href: `/demo?product=${pillar}` }}
      />
    </>
  )
}
