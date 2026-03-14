import { useRef, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import GradientButton from './ui/GradientButton'
import ReifyCard from './ui/ReifyCard'

const DataFlowParticles = lazy(() => import('./3d/DataFlowParticles'))

function useIsMobile() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export default function CTA() {
  const isMobile = useIsMobile()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Aurora background */}
      <div className="aurora" />

      <motion.div
        className="relative mx-auto max-w-4xl"
        style={{ opacity }}
      >
        {!isMobile && (
          <Suspense fallback={null}>
            <DataFlowParticles />
          </Suspense>
        )}

        <ReifyCard className="rounded-3xl beam-border">
          <div className="relative z-10 px-8 py-20 sm:px-16 text-center overflow-hidden">
            {/* Inner glow accents */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-electric/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple/8 rounded-full blur-[120px]" />

            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-electric/20 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-purple/20 rounded-br-lg" />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/5 px-4 py-1.5 text-sm text-electric-light">
                <Zap size={14} />
                Limited Time Offer
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
            >
              Ready to Transform Your{' '}
              <span className="gradient-text">Financial Operations</span>?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative mt-6 text-lg text-gray-400 max-w-2xl mx-auto"
            >
              Join 150+ enterprises already using Finmark to automate, predict,
              and scale their financial workflows.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <GradientButton className="text-base px-8 py-4 flex items-center gap-2">
                Get Started Free <ArrowRight size={18} />
              </GradientButton>
              <GradientButton variant="outline" className="text-base px-8 py-4">
                Schedule a Demo
              </GradientButton>
            </motion.div>
          </div>
        </ReifyCard>
      </motion.div>
    </section>
  )
}
