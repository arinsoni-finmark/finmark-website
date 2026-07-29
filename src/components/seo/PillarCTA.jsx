import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import GradientButton from '../ui/GradientButton'

/**
 * Closing CTA used at the bottom of pillar/cluster pages.
 */
export default function PillarCTA({
  heading = 'See FinMark.ai in action.',
  subhead = 'Book a 30-minute demo and we\'ll walk you through the platform live.',
  primaryCta = { label: 'Get a demo', href: '/demo' },
  secondaryCta,
}) {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,102,255,0.1)_0%,transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
        >
          {heading}
        </h2>
        {subhead && (
          <p className="mt-5 text-base sm:text-lg text-gray-400 leading-relaxed">
            {subhead}
          </p>
        )}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <GradientButton
            to={primaryCta.href}
            className="text-sm sm:text-base px-8 py-3 sm:px-10 sm:py-4 flex items-center gap-2"
          >
            {primaryCta.label} <ArrowRight size={16} />
          </GradientButton>
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
