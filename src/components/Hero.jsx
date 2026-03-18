import { useRef, useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles, Brain, Shield, TrendingUp } from 'lucide-react'
import GradientButton from './ui/GradientButton'
import ReifyCard from './ui/ReifyCard'
import FloatingElement from './ui/FloatingElement'
import TypewriterCycle from './ui/TypewriterCycle'
import useIsMobile from '../lib/useIsMobile'

const HeroScene = lazy(() => import('./3d/HeroScene'))

const LOGO_COLOR = '#7DD3FC'

function AnimatedWords({ children, delay = 0 }) {
  const words = children.split(' ')
  return (
    <span>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '120%', rotateX: -80, opacity: 0 }}
            animate={{ y: '0%', rotateX: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ transformOrigin: 'bottom center' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function GearBrainSVG() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <g fill={LOGO_COLOR}>
        <circle cx="24" cy="24" r="19" />
        {[...Array(12)].map((_, i) => (
          <rect key={i} x="21.5" y="2.5" width="5" height="5" rx="1.2" transform={`rotate(${i * 30} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="14.5" fill="#0c0c18" />
      <g stroke={LOGO_COLOR} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="24" y1="14.5" x2="24" y2="34" />
        <path d="M24 15 C19.5 15, 14.5 18.5, 14.5 24 C14.5 29.5, 19.5 33.5, 24 33.5" />
        <path d="M23 18.5 C19.5 20, 16.5 22.5, 17 25.5" />
        <path d="M23 26 C19.5 27, 17 29.5, 17.5 32" />
        <path d="M24 15 C28.5 15, 33.5 18.5, 33.5 24 C33.5 29.5, 28.5 33.5, 24 33.5" />
        <path d="M25 18.5 C28.5 20, 31.5 22.5, 31 25.5" />
        <path d="M25 26 C28.5 27, 31 29.5, 30.5 32" />
      </g>
      <g fill={LOGO_COLOR}>
        <circle cx="17" cy="25.5" r="1.3" />
        <circle cx="17.5" cy="32" r="1.3" />
        <circle cx="31" cy="25.5" r="1.3" />
        <circle cx="30.5" cy="32" r="1.3" />
        <circle cx="24" cy="14.5" r="1.5" />
        <circle cx="24" cy="34" r="1.3" />
      </g>
    </svg>
  )
}

const CARDS = [
  {
    icon: Brain,
    title: 'AI Analytics',
    desc: 'Deep learning models analyze transactions in real-time.',
  },
  {
    icon: Shield,
    title: 'Smart Compliance',
    desc: 'Automated regulatory monitoring across jurisdictions.',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Forecasting',
    desc: 'Forecast cash flows with institutional-grade accuracy.',
  },
]

function InteractiveGradient() {
  const [pos, setPos] = useState({ x: 50, y: 50 })

  const handleMouse = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 100
    const y = (e.clientY / window.innerHeight) * 100
    setPos({ x, y })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [handleMouse])

  return (
    <div
      className="absolute inset-0 transition-all duration-[1500ms] ease-out pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at ${pos.x}% ${pos.y}%,
            rgba(0,102,255,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at ${100 - pos.x}% ${100 - pos.y}%,
            rgba(124,58,237,0.05) 0%, transparent 60%)
        `,
      }}
    />
  )
}

/* ─── Simple mobile hero — no scroll animations ─── */
function MobileHero() {
  return (
    <section className="relative min-h-screen px-4 pt-20 pb-12 overflow-hidden">
      {/* Simple background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_0%,var(--color-dark)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-electric/5 via-transparent to-purple/5" />

      <div className="relative z-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/[0.08] px-4 py-2 text-xs font-medium text-electric-light mb-6">
          <Sparkles size={12} />
          AI-Powered Financial Infrastructure
        </span>

        <h1 className="font-display text-[2rem] font-bold leading-[0.95] text-white tracking-[-0.03em] max-w-5xl mx-auto">
          The Future of
          <br />
          <span className="gradient-text">Financial</span>{' '}
          <TypewriterCycle words={['Automation', 'Intelligence', 'Analytics', 'Compliance']} />
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-base text-gray-400 leading-relaxed">
          Automate compliance, predict cash flows, detect fraud — all at scale.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <GradientButton className="text-sm px-7 py-3 flex items-center gap-2">
            Get Started Free <ArrowRight size={16} />
          </GradientButton>
          <GradientButton variant="outline" className="text-sm px-7 py-3">
            Watch Demo
          </GradientButton>
        </div>

        {/* Logo */}
        <div className="mt-10 mx-auto w-[180px] opacity-20">
          <img src="/logo-full.png" alt="Finmark" className="w-full h-auto object-contain" />
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-4">
          {CARDS.map((card) => (
            <ReifyCard key={card.title} className="rounded-2xl">
              <div className="p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-electric/20 to-purple/20 flex items-center justify-center mb-4">
                  <card.icon size={24} className="text-electric-light" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </ReifyCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Desktop hero — full scroll animations ─── */
function DesktopHero() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.16], [0, -80])

  const logoBottom = useTransform(scrollYProgress, [0, 0.15], ['8%', '42%'])
  const logoRotate = useTransform(scrollYProgress, [0, 0.18], [90, 0])
  const logoScale = useTransform(scrollYProgress, [0, 0.12, 0.22, 0.32], [0.5, 1.1, 0.8, 0.15])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.05, 0.24, 0.32], [0.15, 0.15, 1, 0])
  const logoBlur = useTransform(scrollYProgress, [0.24, 0.32], [0, 12])
  const logoFilter = useTransform(logoBlur, (v) => `blur(${v}px)`)

  const cardsOpacity = useTransform(scrollYProgress, [0.25, 0.34], [0, 1])
  const cardsContainerScale = useTransform(scrollYProgress, [0.25, 0.42], [0.3, 1])

  const cardSpread = useTransform(scrollYProgress, [0.25, 0.42], [0, 1])
  const card0X = useTransform(cardSpread, [0, 1], [200, 0])
  const card1Scale = useTransform(cardSpread, [0, 0.5, 1], [0.5, 0.8, 1])
  const card2X = useTransform(cardSpread, [0, 1], [-200, 0])
  const cardRiseY = useTransform(cardSpread, [0, 1], [40, 0])

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_0%,var(--color-dark)_100%)]" />

        <div className="glow-orb w-[800px] h-[800px] bg-electric/8 top-[5%] -left-60" />
        <div className="glow-orb w-[600px] h-[600px] bg-purple/8 bottom-[15%] -right-40" />

        <InteractiveGradient />

        <FloatingElement delay={0} duration={7} range={20} className="absolute top-[15%] left-[8%] z-0 opacity-20">
          <div className="w-3 h-3 rounded-full bg-electric blur-[2px]" />
        </FloatingElement>
        <FloatingElement delay={1.5} duration={8} range={18} className="absolute top-[25%] right-[12%] z-0 opacity-15">
          <div className="w-2 h-2 rotate-45 bg-purple" />
        </FloatingElement>
        <FloatingElement delay={3} duration={9} range={12} className="absolute bottom-[30%] left-[15%] z-0 opacity-15">
          <div className="w-4 h-4 rounded-full border border-electric/40" />
        </FloatingElement>
        <FloatingElement delay={2} duration={6} range={16} className="absolute top-[60%] right-[8%] z-0 opacity-20">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-light blur-[1px]" />
        </FloatingElement>
        <FloatingElement delay={4} duration={10} range={14} className="absolute top-[40%] left-[5%] z-0 opacity-10">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" fill="#3388FF" />
          </svg>
        </FloatingElement>

        <div className="absolute inset-0 -z-10">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>

        {/* TEXT */}
        <motion.div
          className="absolute top-0 left-0 right-0 pt-20 sm:pt-28 md:pt-36 px-4 text-center z-20"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/[0.08] px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium text-electric-light mb-6 sm:mb-8 backdrop-blur-sm">
              <Sparkles size={14} />
              AI-Powered Financial Infrastructure
            </span>
          </motion.div>

          <h1 className="font-display text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem] font-bold leading-[0.9] text-white tracking-[-0.03em] max-w-5xl mx-auto">
            <AnimatedWords delay={0.4}>The Future of</AnimatedWords>
            <br />
            <span className="gradient-text">
              <AnimatedWords delay={0.7}>Financial</AnimatedWords>
            </span>{' '}
            <TypewriterCycle words={['Automation', 'Intelligence', 'Analytics', 'Compliance']} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-5 sm:mt-8 max-w-2xl mx-auto text-base md:text-lg text-gray-400 leading-relaxed"
          >
            Automate compliance, predict cash flows, detect fraud — all at scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
          >
            <GradientButton className="text-sm sm:text-base px-7 py-3 sm:px-10 sm:py-4 flex items-center gap-2">
              Get Started Free <ArrowRight size={16} />
            </GradientButton>
            <GradientButton variant="outline" className="text-sm sm:text-base px-7 py-3 sm:px-10 sm:py-4">
              Watch Demo
            </GradientButton>
          </motion.div>
        </motion.div>

        {/* BIG LOGO — starts vertical, rotates to horizontal on scroll */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-[5] pointer-events-none"
          style={{
            bottom: logoBottom,
            rotate: logoRotate,
            scale: logoScale,
            opacity: logoOpacity,
            filter: logoFilter,
          }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 0.15, scale: 0.5 }}
          transition={{ duration: 1.2, delay: 0.5, type: 'spring', stiffness: 50, damping: 14 }}
        >
          <div className="w-[160px] sm:w-[220px] md:w-[280px] lg:w-[340px]">
            <img src="/logo-full.png" alt="Finmark" className="w-full h-auto object-contain" />
          </div>
        </motion.div>

        {/* 3 CARDS */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 px-4"
          style={{
            opacity: cardsOpacity,
            scale: cardsContainerScale,
          }}
        >
          <div className="grid grid-cols-3 gap-6 max-w-5xl w-full">
            {CARDS.map((card, i) => {
              const isMiddle = i === 1
              const style = {
                x: i === 0 ? card0X : i === 2 ? card2X : 0,
                y: cardRiseY,
                scale: isMiddle ? card1Scale : 1,
              }

              return (
                <motion.div key={card.title} style={style}>
                  <ReifyCard className="rounded-2xl">
                    <div className="p-8 text-center">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-electric/20 to-purple/20 flex items-center justify-center mb-5">
                        <card.icon size={28} className="text-electric-light" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-white mb-3">
                        {card.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </ReifyCard>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-white/15 flex items-start justify-center p-1">
              <motion.div
                className="w-1 h-1 rounded-full bg-electric-light"
                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Hero() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileHero /> : <DesktopHero />
}
