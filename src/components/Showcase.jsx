import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import GlowBadge from './ui/GlowBadge'
import ReifyCard from './ui/ReifyCard'

const SHOWCASE_ITEMS = [
  {
    title: 'Real-Time Dashboard',
    description: 'Monitor every transaction, metric, and insight in one unified view.',
    accent: 'from-electric to-cyan-400',
    stats: [
      { label: 'Active Users', value: '12.4K' },
      { label: 'Transactions/s', value: '847' },
    ],
  },
  {
    title: 'AI Risk Engine',
    description: 'Deep learning models that adapt to emerging threats in milliseconds.',
    accent: 'from-purple to-pink-500',
    stats: [
      { label: 'Accuracy', value: '99.4%' },
      { label: 'False Positives', value: '0.02%' },
    ],
  },
  {
    title: 'Smart Compliance',
    description: 'Automated regulatory checks across 50+ jurisdictions worldwide.',
    accent: 'from-electric to-purple',
    stats: [
      { label: 'Regulations', value: '200+' },
      { label: 'Time Saved', value: '85%' },
    ],
  },
]

function ShowcaseCard({ item, index }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(10% 10% 10% 10% round 24px)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)', opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <ReifyCard className="rounded-3xl h-full">
        {/* Fake app preview area */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-card to-dark" />
          <div className="absolute inset-0 bg-grid opacity-20" />

          {/* Accent gradient blob */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br ${item.accent} opacity-15 rounded-full blur-[60px]`} />

          {/* Animated chart lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
            <motion.path
              d={index === 0
                ? 'M0 160 Q50 140 100 120 T200 80 T300 60 T400 30'
                : index === 1
                ? 'M0 140 Q80 100 160 110 T240 60 T320 70 T400 20'
                : 'M0 170 Q60 150 120 100 T240 90 T360 40 T400 50'
              }
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
            />
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0066FF" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3388FF" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Stats overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-3">
            {item.stats.map((stat, i) => (
              <motion.div
                key={i}
                className="rounded-lg px-3 py-2 flex-1 bg-[rgba(22,22,42,0.7)] backdrop-blur-md border border-white/[0.06]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.15 + i * 0.1 }}
              >
                <div className="text-xs text-gray-500">{stat.label}</div>
                <div className="text-sm font-mono font-bold text-white">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Arrow */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[rgba(22,22,42,0.6)] backdrop-blur-md border border-white/[0.06] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <ArrowUpRight size={16} className="text-electric-light" />
          </div>
        </div>

        {/* Card content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold text-white">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            {item.description}
          </p>
        </div>
      </ReifyCard>
    </motion.div>
  )
}

export default function Showcase() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-8" />
      <motion.div
        className="glow-orb w-[500px] h-[500px] bg-electric/5 top-0 left-1/4"
        style={{ y: bgY }}
      />
      <motion.div
        className="glow-orb w-[400px] h-[400px] bg-purple/5 bottom-0 right-1/4"
        style={{ y: bgY }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlowBadge>Product</GlowBadge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
          >
            Built for <span className="gradient-text">Scale</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-5 max-w-2xl mx-auto text-lg text-gray-400"
          >
            Enterprise-grade tools designed to handle millions of transactions
            while keeping you in control.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWCASE_ITEMS.map((item, i) => (
            <ShowcaseCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
