import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedCounter from './ui/AnimatedCounter'

const STATS = [
  { value: 150, suffix: '+', label: 'Enterprise Clients' },
  { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime SLA' },
  { value: 50, prefix: '$', suffix: 'B+', label: 'Transactions Processed' },
  { value: 3, suffix: 'x', label: 'Faster Compliance' },
]

export default function Stats() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.97, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [2, 0])

  return (
    <section ref={containerRef} className="relative py-28 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto max-w-6xl"
        style={{ scale, opacity, rotateX, transformPerspective: 1200 }}
      >
        <div className="relative glass rounded-3xl p-14 md:p-20 overflow-hidden beam-border">
          {/* Background glow */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-electric/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple/8 rounded-full blur-[100px]" />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-5xl md:text-6xl font-bold gradient-text">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <p className="mt-3 text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
