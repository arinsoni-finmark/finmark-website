import { ArrowRight, Zap } from 'lucide-react'
import GradientButton from './ui/GradientButton'
import ReifyCard from './ui/ReifyCard'

export default function CTA() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative mx-auto max-w-4xl">
        <ReifyCard className="rounded-3xl">
          <div className="relative z-10 px-8 py-20 sm:px-16 text-center overflow-hidden">
            {/* Static glow accents */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-electric/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple/8 rounded-full blur-[120px]" />

            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-electric/20 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-purple/20 rounded-br-lg" />

            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-sm text-electric-light">
                <Zap size={14} />
                Get Started
              </span>
            </div>

            <h2 className="relative font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Automate <span className="gradient-text">What Slows You Down</span>
            </h2>

            <p className="relative mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
              Get a demo and see what FinMark.ai is building for modern finance teams.
            </p>

            <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GradientButton to="/demo" className="text-base px-8 py-4 flex items-center gap-2">
                Get a demo <ArrowRight size={18} />
              </GradientButton>
            </div>
          </div>
        </ReifyCard>
      </div>
    </section>
  )
}
