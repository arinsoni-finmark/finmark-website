import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { TRUSTED_LOGOS } from '../lib/constants'

export default function TrustedBy() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const doubled = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS]

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative py-20 overflow-hidden"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-xs text-gray-600 uppercase tracking-[0.3em] mb-12"
      >
        Trusted by industry leaders
      </motion.p>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-dark to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-dark to-transparent z-10" />

        {/* Row 1 */}
        <div className="flex animate-marquee whitespace-nowrap mb-6">
          {doubled.map((name, i) => (
            <div
              key={`a-${i}`}
              className="mx-12 flex-shrink-0 flex items-center justify-center"
            >
              <span className="text-2xl font-display font-semibold text-gray-700/60 select-none hover:text-gray-400 transition-colors duration-500">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 - reverse direction */}
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {doubled.map((name, i) => (
            <div
              key={`b-${i}`}
              className="mx-12 flex-shrink-0 flex items-center justify-center"
            >
              <span className="text-xl font-display font-medium text-gray-700/40 select-none hover:text-gray-500 transition-colors duration-500">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
