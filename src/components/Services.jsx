import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { SERVICES } from '../lib/constants'
import SectionWrapper from './ui/SectionWrapper'
import GlowBadge from './ui/GlowBadge'
import GlassCard from './ui/GlassCard'

const FloatingShapes = lazy(() => import('./3d/FloatingShapes'))

function useIsMobile() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export default function Services() {
  const isMobile = useIsMobile()

  return (
    <SectionWrapper id="services" className="overflow-hidden">
      {!isMobile && (
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <GlowBadge>Services</GlowBadge>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            End-to-End Financial Solutions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            From payment processing to fraud detection, we cover every aspect of
            modern financial operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard className="h-full group hover:border-electric/20 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-purple/20 flex items-center justify-center mb-4 group-hover:from-electric/30 group-hover:to-purple/30 transition-colors">
                  <service.icon size={24} className="text-electric-light" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
