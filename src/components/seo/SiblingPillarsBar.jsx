import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/**
 * Cross-pillar sibling links. Renders as a row of tasteful link cards.
 * Used to satisfy the "3 sibling cross-links per pillar" rule from the linking matrix.
 *
 * Props:
 *   - siblings: [{ title, description, path }]
 */
export default function SiblingPillarsBar({ siblings, heading = 'Related platform capabilities' }) {
  if (!siblings || siblings.length === 0) return null

  return (
    <section className="relative py-16 sm:py-20 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-600 mb-3 font-medium">
          Connected pillars
        </p>
        <h2 className="text-center font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-12">
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {siblings.map((s) => (
            <div
              key={s.path}
              >
              <Link
                to={s.path}
                className="group block rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-electric/40 transition-all duration-300 p-6 h-full"
              >
                <h3 className="font-display text-base font-semibold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-electric-light text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
