import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import GradientButton from './ui/GradientButton'

const ParticleGlobe = lazy(() => import('./3d/ParticleGlobe'))

function useIsMobile() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Ambient glow orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-electric/20 top-1/4 -left-40" />
      <div className="glow-orb w-[400px] h-[400px] bg-purple/20 bottom-1/4 -right-32" />

      {/* 3D Globe — desktop only */}
      {!isMobile && (
        <Suspense fallback={null}>
          <ParticleGlobe />
        </Suspense>
      )}

      {/* Mobile gradient fallback */}
      {isMobile && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-electric/5 via-transparent to-purple/5" />
      )}

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-sm font-medium text-electric-light mb-6">
            AI-Powered Financial Infrastructure
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-white"
        >
          The Future of{' '}
          <span className="gradient-text">Financial</span>
          <br />
          Automation is Here
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed"
        >
          Harness the power of artificial intelligence to automate compliance,
          predict cash flows, detect fraud, and transform your financial
          operations at scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GradientButton className="text-base px-8 py-3.5 flex items-center gap-2">
            Start Free Trial <ArrowRight size={18} />
          </GradientButton>
          <GradientButton variant="outline" className="text-base px-8 py-3.5">
            Watch Demo
          </GradientButton>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  )
}
