import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FEATURES } from '../lib/constants'
import GlowBadge from './ui/GlowBadge'
import ReifyCard from './ui/ReifyCard'
import FloatingElement from './ui/FloatingElement'

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(8% 8% 8% 8% round 16px)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 16px)', opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <ReifyCard className="rounded-2xl h-full">
        <div className="p-8 flex items-start gap-5">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-purple/20 flex items-center justify-center transition-all duration-500">
            <feature.icon size={26} className="text-electric-light" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </ReifyCard>
    </motion.div>
  )
}

export default function Features() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-12" />

      {/* Floating decorative elements */}
      <FloatingElement delay={0} duration={8} range={12} className="absolute top-[10%] right-[5%] z-0 opacity-15">
        <div className="w-3 h-3 rounded-full bg-electric blur-[1px]" />
      </FloatingElement>
      <FloatingElement delay={2} duration={10} range={18} className="absolute bottom-[20%] left-[3%] z-0 opacity-10">
        <div className="w-5 h-5 rounded-full border border-purple/30" />
      </FloatingElement>
      <motion.div
        className="glow-orb w-[600px] h-[600px] bg-electric/6 -top-20 right-0"
        style={{ y: bgY }}
      />
      <motion.div
        className="glow-orb w-[400px] h-[400px] bg-purple/6 bottom-0 -left-20"
        style={{ y: bgY }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlowBadge>Features</GlowBadge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
          >
            Intelligence at <span className="gradient-text">Every Layer</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-2xl mx-auto text-lg text-gray-400"
          >
            Our AI engine processes millions of data points in real-time to
            deliver insights that move your business forward.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
