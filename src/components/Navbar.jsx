import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { NAV_LINKS, PRODUCTS } from '../lib/constants'
import GradientButton from './ui/GradientButton'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [platformOpen, setPlatformOpen] = useState(false)
  const platformRef = useRef(null)
  const closeTimer = useRef(null)
  const { scrollYProgress } = useScroll()
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close platform dropdown when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (platformRef.current && !platformRef.current.contains(e.target)) {
        setPlatformOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const openPlatform = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setPlatformOpen(true)
  }
  const closePlatform = () => {
    closeTimer.current = setTimeout(() => setPlatformOpen(false), 150)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Bottom border that fades in on scroll */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent"
        style={{ opacity: navOpacity }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo-nav.png" alt="FinMark.ai" width={173} height={128} className="h-8 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {/* Platform dropdown */}
            <div
              ref={platformRef}
              className="relative"
              onMouseEnter={openPlatform}
              onMouseLeave={closePlatform}
            >
              <button
                className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white py-1"
                onClick={() => setPlatformOpen(!platformOpen)}
                aria-expanded={platformOpen}
              >
                Products
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${platformOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {platformOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[680px] glass-strong rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    {PRODUCTS.map((product) => (
                      <div key={product.to} className={`px-5 pt-4 ${product.features.length > 0 ? 'pb-5' : 'pb-1'}`}>
                        {/* Product header */}
                        <Link
                          to={product.to}
                          onClick={() => setPlatformOpen(false)}
                          className={`group flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-all ${
                            product.features.length > 0
                              ? 'mb-3 bg-gradient-to-r from-electric/[0.08] to-purple/[0.05] border border-electric/20 hover:border-electric/40'
                              : 'hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white group-hover:text-electric-light transition-colors">
                                {product.label}
                              </span>
                              {product.badge && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-electric/15 border border-electric/30 px-2 py-0.5 text-[10px] font-medium text-electric-light uppercase tracking-wider">
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed mt-1">
                              {product.description}
                            </p>
                          </div>
                          <ArrowRight
                            size={14}
                            className="text-electric-light opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all mt-1"
                          />
                        </Link>

                        {/* Features list — only for products that have them */}
                        {product.features.length > 0 && (
                          <div className="grid grid-cols-2 gap-1">
                            {product.features.map((f) => (
                              <Link
                                key={f.to}
                                to={f.to}
                                onClick={() => setPlatformOpen(false)}
                                className="group/item flex flex-col gap-0.5 rounded-lg px-3 py-2 hover:bg-white/[0.04] transition-colors"
                              >
                                <span className="text-xs font-medium text-gray-300 group-hover/item:text-white transition-colors">
                                  {f.label}
                                </span>
                                <span className="text-[11px] text-gray-600 leading-relaxed">
                                  {f.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* & many more */}
                    <Link
                      to="/demo?product=custom"
                      onClick={() => setPlatformOpen(false)}
                      className="group block px-5 pb-5 pt-3 border-t border-white/[0.06]"
                    >
                      <p className="text-center text-sm font-medium text-gray-400 group-hover:text-electric-light transition-colors">
                        & many more
                      </p>
                      <p className="text-center text-xs text-gray-600 mt-1 group-hover:text-gray-400 transition-colors">
                        Tell us what you need and we'll build it for you within 2 weeks
                      </p>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                <Link
                  to={link.to}
                  className="relative text-sm text-gray-400 transition-colors hover:text-white py-1"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GradientButton to="/demo" className="text-sm px-5 py-2">
                Get a demo
              </GradientButton>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass-strong border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              <p className="px-3 pt-2 pb-1 text-xs uppercase tracking-[0.18em] text-gray-600">
                Products
              </p>
              {PRODUCTS.map((product) => (
                <div key={product.to} className="mb-3">
                  <Link
                    to={product.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-white font-medium hover:bg-white/[0.04] transition-colors text-sm"
                  >
                    {product.label}
                    {product.badge && (
                      <span className="inline-flex items-center rounded-full bg-electric/15 border border-electric/30 px-2 py-0.5 text-[10px] font-medium text-electric-light uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}
                  </Link>
                  <div className="pl-4 mt-1 space-y-0.5 border-l border-white/[0.06] ml-5">
                    {product.features.map((f) => (
                      <Link
                        key={f.to}
                        to={f.to}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-1.5 text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors text-xs"
                      >
                        {f.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                to="/demo?product=custom"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm text-gray-400 hover:text-electric-light transition-colors"
              >
                & many more — tell us what you need
              </Link>
              <div className="h-px bg-white/5 my-3" />
              <p className="px-3 pb-1 text-xs uppercase tracking-[0.18em] text-gray-600">Company</p>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-gray-300 hover:text-white hover:bg-white/[0.04] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3">
                <GradientButton
                  to="/demo"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-sm"
                >
                  Get a demo
                </GradientButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
