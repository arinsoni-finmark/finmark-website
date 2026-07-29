import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ReifyCard from '../ui/ReifyCard'
import useIsMobile from '../../lib/useIsMobile'

/**
 * The cluster hub list. Lives on every pillar page.
 * Lists all child clusters with descriptive anchor text + a 1-line description.
 * Each card is a contextual link to a cluster page.
 *
 * Props:
 *   - heading: section heading
 *   - clusters: [{ slug, title, description }]
 *   - pillarSlug: parent pillar slug, used to build cluster URL
 */
export default function PillarHubList({ heading, clusters, pillarSlug }) {
  const isMobile = useIsMobile()

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-8" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          className="text-center font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
        >
          {heading}
        </h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-14 text-sm sm:text-base">
          Explore the topics covered by this pillar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clusters.map((c) => {
            const href = c.path || `/${pillarSlug}/${c.slug}`
            const cardInner = (
              <ReifyCard className="rounded-2xl h-full">
                <div className="p-7 h-full flex flex-col">
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {c.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {c.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-electric-light text-sm font-medium">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
              </ReifyCard>
            )

            return isMobile ? (
              <Link key={c.slug} to={href} className="block">
                {cardInner}
              </Link>
            ) : (
              <div
                key={c.slug}
                >
                <Link to={href} className="block">
                  {cardInner}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
