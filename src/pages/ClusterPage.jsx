import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/seo/SEO'
import Breadcrumb from '../components/seo/Breadcrumb'
import PillarHero from '../components/seo/PillarHero'
import PillarSection from '../components/seo/PillarSection'
import PillarFAQ from '../components/seo/PillarFAQ'
import PillarCTA from '../components/seo/PillarCTA'
import ReifyCard from '../components/ui/ReifyCard'
import {
  getClusterByPath,
  resolveClusterSiblings,
} from '../content/clusters'
import { getPillarBySlug } from '../content/pillars'
import {
  organizationSchema,
  webPageSchema,
  breadcrumbSchema,
  faqSchema,
} from '../lib/schema'

/**
 * Generic cluster page renderer.
 *
 * Reads pillar+cluster slugs from props (passed by route definition) or URL,
 * looks up content from clusters.js, and renders the standard cluster layout.
 *
 * One component, N routes.
 *
 * Linking matrix automatically baked in:
 *   - Breadcrumb: Home > Pillar > Cluster
 *   - Hero subhead can reference the parent pillar
 *   - Sibling cluster cards (relatedSiblings)
 *   - Cross-pillar contextual link (crossPillarLink)
 *   - 2× contextual link UP to parent pillar (PillarLinkBlock at intro + PillarCTA at end)
 */
export default function ClusterPage({ pillar: pillarProp, cluster: clusterProp }) {
  const params = useParams()
  const pillarSlug = pillarProp || params.pillar
  const clusterSlug = clusterProp || params.cluster

  const cluster = getClusterByPath(pillarSlug, clusterSlug)
  const pillar = getPillarBySlug(pillarSlug)

  if (!cluster || !pillar) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Cluster not found</h1>
          <p className="text-gray-400">
            No cluster matches /{pillarSlug}/{clusterSlug}.
          </p>
        </div>
      </div>
    )
  }

  const path = `/${pillar.slug}/${cluster.slug}`
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: pillar.hero.badge, path: `/${pillar.slug}` },
    { name: cluster.hero.badge || cluster.primaryKeyword, path },
  ]

  const siblings = resolveClusterSiblings(pillarSlug, cluster.relatedSiblings || [])
  const crossPillar = cluster.crossPillarLink
    ? getPillarBySlug(cluster.crossPillarLink.pillarSlug)
    : null

  return (
    <>
      <SEO
        title={cluster.meta.title}
        description={cluster.meta.description}
        path={path}
        schema={[
          organizationSchema(),
          webPageSchema({
            title: cluster.meta.title,
            description: cluster.meta.description,
            path,
          }),
          breadcrumbSchema(breadcrumbItems),
          faqSchema(cluster.faqs),
        ]}
      />

      <Breadcrumb items={breadcrumbItems} />

      <PillarHero
        badge={cluster.hero.badge}
        h1={cluster.hero.h1}
        subhead={cluster.hero.subhead}
        primaryCta={{ label: 'Get a demo', href: '/demo' }}
        secondaryCta={{
          label: `Explore ${pillar.hero.badge}`,
          href: `/${pillar.slug}`,
        }}
      />

      {/* Up-link to parent pillar — first contextual link */}
      <PillarLinkBlock pillar={pillar} />

      {cluster.sections.map((section, i) => (
        <PillarSection
          key={i}
          kicker={section.kicker}
          heading={section.heading}
          body={section.body}
        />
      ))}

      {/* Sibling clusters within the same pillar */}
      {siblings.length > 0 && <SiblingClustersBar siblings={siblings} />}

      {/* Cross-pillar link */}
      {crossPillar && (
        <CrossPillarBlock pillar={crossPillar} anchor={cluster.crossPillarLink.anchor} />
      )}

      <PillarFAQ faqs={cluster.faqs} />

      {/* Final up-link to parent pillar — second contextual link via CTA */}
      <PillarCTA
        heading={`Ready to see ${cluster.hero.badge} in action?`}
        subhead={`Get a 30-minute demo of the full ${pillar.hero.badge} platform — including ${cluster.hero.badge.toLowerCase()} — walked through live with your data.`}
        primaryCta={{ label: 'Get a demo', href: '/demo' }}
        secondaryCta={{
          label: `← Back to ${pillar.hero.badge}`,
          href: `/${pillar.slug}`,
        }}
      />
    </>
  )
}

/**
 * Inline contextual link UP to parent pillar.
 * Renders right after the hero, satisfying the "1st link to pillar in intro" rule.
 */
function PillarLinkBlock({ pillar }) {
  return (
    <section className="relative pb-2">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-electric/20 bg-electric/[0.04] px-6 py-4 text-sm sm:text-base text-gray-300 leading-relaxed">
          This page is part of FinMark.ai's{' '}
          <Link
            to={`/${pillar.slug}`}
            className="text-electric-light font-medium underline underline-offset-4 decoration-electric/40 hover:decoration-electric transition-colors"
          >
            {pillar.hero.badge}
          </Link>{' '}
          platform. Read the full overview for context, capabilities, and how the pieces fit together.
        </div>
      </div>
    </section>
  )
}

/**
 * Sibling cluster cards. Renders 1-3 related clusters within the same pillar.
 */
function SiblingClustersBar({ siblings }) {
  return (
    <section className="relative py-16 sm:py-20 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-600 mb-3 font-medium">
          Related capabilities
        </p>
        <h2 className="text-center font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-12">
          More from this platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {siblings.map((s) => (
            <div
              key={s.path}
              >
              <Link to={s.path} className="block">
                <ReifyCard className="rounded-2xl h-full">
                  <div className="p-6 h-full flex flex-col">
                    <h3 className="font-display text-base font-semibold text-white mb-2">
                      {s.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed flex-1">
                      {s.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-electric-light text-xs font-medium">
                      Read more <ArrowRight size={12} />
                    </span>
                  </div>
                </ReifyCard>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Cross-pillar contextual link block.
 */
function CrossPillarBlock({ pillar, anchor }) {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-purple/20 bg-purple/[0.04] px-6 py-5 text-sm sm:text-base text-gray-300 leading-relaxed">
          <span className="text-xs uppercase tracking-[0.18em] text-purple-light/80 font-medium block mb-2">
            Connected platform pillar
          </span>
          This capability connects directly to FinMark.ai's{' '}
          <Link
            to={`/${pillar.slug}`}
            className="text-purple-light font-medium underline underline-offset-4 decoration-purple/40 hover:decoration-purple transition-colors"
          >
            {anchor}
          </Link>{' '}
          — every workflow flows through both, on the same unified data layer.
        </div>
      </div>
    </section>
  )
}
