import { useEffect } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useSpring } from 'framer-motion'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureTicker from './components/FeatureTicker'
import Showcase from './components/Showcase'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Services from './components/Services'
import Stats from './components/Stats'
import CTA from './components/CTA'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    // Disable Lenis on mobile/touch devices — it fights native scrolling and causes lag
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768
    if (isMobile) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Cursor />

      <div className="min-h-screen bg-dark noise-overlay">

        {/* Scroll progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-electric via-purple to-electric-light z-[100] origin-left"
          style={{ scaleX }}
        />

        <Navbar />
        <Hero />
        <FeatureTicker />
        <Showcase />
        <Features />
        <HowItWorks />
        <Services />
        <Stats />
        <CTA />
        <About />
        <Footer />
      </div>
    </>
  )
}
