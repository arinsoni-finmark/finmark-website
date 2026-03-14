import { useRef, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SERVICES } from '../lib/constants'
import GlowBadge from './ui/GlowBadge'
import ReifyCard from './ui/ReifyCard'
import FloatingElement from './ui/FloatingElement'
import useIsMobile from '../lib/useIsMobile'

const FloatingShapes = lazy(() => import('./3d/FloatingShapes'))

function ServiceCard({ service, index, isMobile }) {
  if (isMobile) {
    return (
      <div>
        <ReifyCard className="rounded-2xl h-full">
          <div className="p-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-purple/20 flex items-center justify-center mb-5">
              <service.icon size={26} className="text-electric-light" />
            </div>
            <h3 className="font-display text-xl font-semibold text-white mb-3">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        </ReifyCard>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ clipPath: 'inset(8% 8% 8% 8% round 16px)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 16px)', opacity: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <ReifyCard className="rounded-2xl h-full">
        <div className="p-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-purple/20 flex items-center justify-center mb-5 transition-all duration-500">
            <service.icon size={26} className="text-electric-light" />
          </div>
          <h3 className="font-display text-xl font-semibold text-white mb-3">
            {service.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </ReifyCard>
    </motion.div>
  )
}

export default function Services() {
  const isMobile = useIsMobile()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {!isMobile && (
        <>
          <Suspense fallback={null}>
            <FloatingShapes />
          </Suspense>
          <motion.div
            className="glow-orb w-[500px] h-[500px] bg-electric/6 top-1/4 -right-40"
            style={{ y: bgY }}
          />
          <motion.div
            className="glow-orb w-[300px] h-[300px] bg-purple/6 bottom-0 left-0"
            style={{ y: bgY }}
          />
          <FloatingElement delay={1} duration={9} range={14} className="absolute top-[8%] left-[6%] z-0 opacity-12">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z" fill="#7C3AED" opacity="0.5" />
            </svg>
          </FloatingElement>
          <FloatingElement delay={3} duration={7} range={10} className="absolute bottom-[15%] right-[4%] z-0 opacity-15">
            <div className="w-2.5 h-2.5 rounded-full bg-electric-light blur-[1px]" />
          </FloatingElement>
        </>
      )}

      <div className="absolute inset-0 bg-grid opacity-8" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-20">
          {isMobile ? (
            <>
              <GlowBadge>Services</GlowBadge>
              <h2 className="mt-5 font-display text-4xl font-bold text-white tracking-tight">
                End-to-End <span className="gradient-text">Financial</span> Solutions
              </h2>
              <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-400">
                From payment processing to fraud detection, we cover every aspect of
                modern financial operations.
              </p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <GlowBadge>Services</GlowBadge>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
              >
                End-to-End <span className="gradient-text">Financial</span> Solutions
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-5 max-w-2xl mx-auto text-lg text-gray-400"
              >
                From payment processing to fraud detection, we cover every aspect of
                modern financial operations.
              </motion.p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  )
}
