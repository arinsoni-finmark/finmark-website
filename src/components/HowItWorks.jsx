import { motion } from 'framer-motion'
import { HOW_IT_WORKS } from '../lib/constants'
import SectionWrapper from './ui/SectionWrapper'
import GlowBadge from './ui/GlowBadge'

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <GlowBadge>How It Works</GlowBadge>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Three Steps to Automation
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            Get up and running in minutes, not months.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric/50 via-purple/50 to-transparent" />

          <div className="space-y-12 md:space-y-16">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 text-center md:text-left">
                  <span className="font-display text-5xl font-bold gradient-text">
                    {item.step}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-400 leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-electric to-purple neon-glow" />

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
