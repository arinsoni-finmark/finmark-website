import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import GradientButton from '../ui/GradientButton'
import GlowBadge from '../ui/GlowBadge'

/**
 * Hero used at the top of every pillar page.
 * Big H1, subhead, optional badge, primary + secondary CTAs.
 */
export default function PillarHero({ badge, h1, subhead, primaryCta, secondaryCta }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Background ambience */}
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(0,102,255,0.08)_0%,transparent_70%)]" />
      <div className="glow-orb w-[700px] h-[700px] bg-electric/8 -top-40 -right-40" />
      <div className="glow-orb w-[500px] h-[500px] bg-purple/8 -bottom-32 -left-32" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <div
            className="mb-6 inline-flex"
          >
            <GlowBadge>
              <span className="inline-flex items-center gap-2">
                <Sparkles size={12} />
                {badge}
              </span>
            </GlowBadge>
          </div>
        )}

        <h1
          className="font-display text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.02em] leading-[1.05]"
        >
          {h1}
        </h1>

        {subhead && (
          <p
            className="mt-6 mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            {subhead}
          </p>
        )}

        <div
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          {primaryCta && (
            <GradientButton
              to={primaryCta.href}
              className="text-sm sm:text-base px-7 py-3 sm:px-9 sm:py-4 flex items-center gap-2"
            >
              {primaryCta.label} <ArrowRight size={16} />
            </GradientButton>
          )}
          {secondaryCta && (
            <Link
              to={secondaryCta.href}
              className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors px-2 py-3 underline underline-offset-4 decoration-white/20 hover:decoration-electric"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
