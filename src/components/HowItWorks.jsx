import { HOW_IT_WORKS } from '../lib/constants'
import GlowBadge from './ui/GlowBadge'
import ReifyCard from './ui/ReifyCard'

/**
 * Three-step explainer.
 *
 * Was an alternating timeline whose connecting line drew itself as you
 * scrolled, with parallax background orbs and cards springing in from
 * alternating sides. Now a plain three-column grid with a static rule.
 */
export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-grid opacity-8" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <GlowBadge>How It Works</GlowBadge>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Three Steps to <span className="gradient-text">Intelligent Automation</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-gray-400">
            Get up and running in minutes—no complexity, no disruption.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <ReifyCard key={item.step} className="rounded-2xl">
              <div className="p-8 h-full">
                <span className="font-display text-5xl font-bold gradient-text leading-none">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-400 leading-relaxed text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            </ReifyCard>
          ))}
        </div>
      </div>
    </section>
  )
}
