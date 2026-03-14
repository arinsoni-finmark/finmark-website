import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '../lib/constants'
import GlowBadge from './ui/GlowBadge'
import ReifyCard from './ui/ReifyCard'
import useIsMobile from '../lib/useIsMobile'

function TestimonialCard({ testimonial, index, isMobile }) {
  const content = (
    <ReifyCard className="rounded-2xl h-full">
      <div className="p-8 flex flex-col h-full">
        <Quote size={32} className="text-electric/20 mb-4 flex-shrink-0" />

        <p className="text-gray-300 leading-relaxed flex-1 text-[15px]">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="mt-6 flex items-center gap-3 pt-4 border-t border-white/5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric to-purple flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {testimonial.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {testimonial.name}
            </p>
            <p className="text-xs text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </ReifyCard>
  )

  if (isMobile) return <div>{content}</div>

  return (
    <motion.div
      initial={{ clipPath: 'inset(8% 8% 8% 8% round 16px)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 16px)', opacity: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {content}
    </motion.div>
  )
}

export default function Testimonials() {
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
      id="testimonials"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {!isMobile && (
        <>
          <div className="aurora" style={{ opacity: 0.6 }} />
          <motion.div
            className="glow-orb w-[400px] h-[400px] bg-purple/8 top-1/4 -right-32"
            style={{ y: bgY }}
          />
        </>
      )}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center mb-20">
          {isMobile ? (
            <>
              <GlowBadge>Testimonials</GlowBadge>
              <h2 className="mt-5 font-display text-4xl font-bold text-white tracking-tight">
                Trusted by <span className="gradient-text">Finance Leaders</span>
              </h2>
              <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-400">
                See what industry leaders say about transforming their operations
                with Finmark.
              </p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <GlowBadge>Testimonials</GlowBadge>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
              >
                Trusted by <span className="gradient-text">Finance Leaders</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-5 max-w-2xl mx-auto text-lg text-gray-400"
              >
                See what industry leaders say about transforming their operations
                with Finmark.
              </motion.p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} isMobile={isMobile} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {TESTIMONIALS.slice(3, 5).map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i + 3} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  )
}
