import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HOW_IT_WORKS } from '../lib/constants'
import GlowBadge from './ui/GlowBadge'
import ReifyCard from './ui/ReifyCard'
import useIsMobile from '../lib/useIsMobile'

function StepCard({ item, index, isMobile }) {
  const content = (
    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
      <ReifyCard className="rounded-2xl inline-block">
        <div className="p-10">
          <span className="font-display text-7xl font-bold gradient-text leading-none">
            {item.step}
          </span>
          <h3 className="mt-5 font-display text-2xl font-semibold text-white">
            {item.title}
          </h3>
          <p className="mt-3 text-gray-400 leading-relaxed max-w-md">
            {item.description}
          </p>
        </div>
      </ReifyCard>
    </div>
  )

  if (isMobile) {
    return <div className="text-center">{content}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 40,
        damping: 15,
      }}
      className={`flex flex-col md:flex-row items-center gap-8 ${
        index % 2 === 1 ? 'md:flex-row-reverse' : ''
      }`}
    >
      {content}

      {/* Center dot with glow */}
      <div className="hidden md:flex flex-shrink-0 relative">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-electric to-purple neon-glow z-10 relative" />
        <div className="absolute inset-[-4px] rounded-full bg-electric/30 animate-ping" />
      </div>

      <div className="flex-1" />
    </motion.div>
  )
}

export default function HowItWorks() {
  const isMobile = useIsMobile()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], ['0%', '100%'])
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-8" />

      {!isMobile && (
        <>
          <motion.div
            className="glow-orb w-[500px] h-[500px] bg-purple/8 top-1/4 -left-40"
            style={{ y: bgY }}
          />
          <motion.div
            className="glow-orb w-[300px] h-[300px] bg-electric/6 bottom-1/4 -right-20"
            style={{ y: bgY }}
          />
        </>
      )}

      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-20">
          {isMobile ? (
            <>
              <GlowBadge>How It Works</GlowBadge>
              <h2 className="mt-5 font-display text-4xl font-bold text-white tracking-tight">
                Three Steps to <span className="gradient-text">Automation</span>
              </h2>
              <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-400">
                Get up and running in minutes, not months.
              </p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <GlowBadge>How It Works</GlowBadge>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
              >
                Three Steps to <span className="gradient-text">Automation</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-5 max-w-2xl mx-auto text-lg text-gray-400"
              >
                Get up and running in minutes, not months.
              </motion.p>
            </>
          )}
        </div>

        <div className="relative">
          {!isMobile && (
            <>
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5" />
              <motion.div
                className="hidden md:block absolute left-1/2 top-0 w-[2px] -ml-[0.5px] bg-gradient-to-b from-electric via-purple to-electric-light origin-top"
                style={{
                  height: lineHeight,
                  filter: 'drop-shadow(0 0 6px rgba(0, 102, 255, 0.6)) drop-shadow(0 0 12px rgba(124, 58, 237, 0.3))',
                }}
              />
            </>
          )}

          <div className="space-y-16 md:space-y-28">
            {HOW_IT_WORKS.map((item, i) => (
              <StepCard key={item.step} item={item} index={i} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
