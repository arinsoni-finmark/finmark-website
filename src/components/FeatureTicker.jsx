import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const KEYWORDS = [
  'AI-Powered',
  'Real-Time Analytics',
  'Fraud Detection',
  'Smart Compliance',
  'Predictive Forecasting',
  'Automation',
  'Enterprise-Grade',
  'Secure',
  'Intelligent Reporting',
  'Data Integration',
]

function DiamondSeparator() {
  return (
    <span className="mx-6 text-electric/40 flex-shrink-0 text-xs select-none">
      &#9670;
    </span>
  )
}

export default function FeatureTicker() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const doubled = [...KEYWORDS, ...KEYWORDS, ...KEYWORDS]

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative py-6 overflow-hidden border-y border-white/[0.04]"
    >
      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />

      {/* Subtle glow behind */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric/[0.02] to-transparent" />

      {/* Scrolling ticker */}
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {doubled.map((keyword, i) => (
          <span key={i} className="flex items-center">
            <span className="text-sm font-display font-medium text-gray-500 tracking-wide uppercase select-none flex-shrink-0">
              {keyword}
            </span>
            <DiamondSeparator />
          </span>
        ))}
      </div>
    </motion.section>
  )
}
