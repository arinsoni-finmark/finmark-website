import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from './ui/SectionWrapper'
import GradientButton from './ui/GradientButton'

const DataFlowParticles = lazy(() => import('./3d/DataFlowParticles'))

function useIsMobile() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export default function CTA() {
  const isMobile = useIsMobile()

  return (
    <SectionWrapper className="overflow-hidden">
      <div className="relative mx-auto max-w-4xl">
        {!isMobile && (
          <Suspense fallback={null}>
            <DataFlowParticles />
          </Suspense>
        )}

        {/* Glow background */}
        <div className="absolute inset-0 -z-20 rounded-3xl bg-gradient-to-br from-electric/10 via-dark-lighter to-purple/10" />

        <div className="relative z-10 glass rounded-3xl px-8 py-16 sm:px-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            Ready to Transform Your{' '}
            <span className="gradient-text">Financial Operations</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Join 150+ enterprises already using Finmark to automate, predict, and
            scale their financial workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GradientButton className="text-base px-8 py-3.5 flex items-center gap-2">
              Get Started Free <ArrowRight size={18} />
            </GradientButton>
            <GradientButton variant="outline" className="text-base px-8 py-3.5">
              Schedule a Demo
            </GradientButton>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
