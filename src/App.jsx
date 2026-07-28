import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { motion, useScroll, useSpring } from 'framer-motion'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const location = useLocation()
  const lenisRef = useRef(null)

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

    // Track the handle so cleanup can actually stop the loop. Without this
    // the callback kept firing against a destroyed Lenis instance forever,
    // and every StrictMode double-mount or HMR update stacked another loop.
    let frame
    function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    lenisRef.current = lenis
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Scroll to top on route change so each new page starts at the top.
  // Go through Lenis when it owns the scroll, otherwise its internal
  // position desyncs from the real one and the next wheel event jumps back.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

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
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
