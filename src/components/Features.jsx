import { motion } from 'framer-motion'
import { FEATURES } from '../lib/constants'
import SectionWrapper from './ui/SectionWrapper'
import GlowBadge from './ui/GlowBadge'
import GlassCard from './ui/GlassCard'

export default function Features() {
  return (
    <SectionWrapper id="features">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <GlowBadge>Features</GlowBadge>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Intelligence at Every Layer
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-400">
            Our AI engine processes millions of data points in real-time to deliver
            insights that move your business forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="h-full hover:border-electric/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-purple/20 flex items-center justify-center">
                    <feature.icon size={24} className="text-electric-light" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
