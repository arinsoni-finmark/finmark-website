import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useIsMobile from '../lib/useIsMobile'

const LOADING_MESSAGES = [
  'Initializing AI Models...',
  'Analyzing Financial Data...',
  'Encrypting Connections...',
  'Loading Dashboard...',
]

export default function PageLoader({ onComplete }) {
  const isMobile = useIsMobile()
  const [show, setShow] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Shorter loader on mobile
    const timer = setTimeout(() => setShow(false), isMobile ? 1500 : 2800)
    return () => clearTimeout(timer)
  }, [isMobile])

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < LOADING_MESSAGES.length - 1) return prev + 1
        return prev
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const speed = isMobile ? 20 : 40
    const step = isMobile ? 4 : 2
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + step
      })
    }, speed)
    return () => clearInterval(interval)
  }, [isMobile])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] bg-dark flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-grid opacity-10" />

          {/* Ambient orbs — desktop only */}
          {!isMobile && (
            <>
              <motion.div
                className="absolute top-1/3 left-1/3 w-96 h-96 bg-electric/6 rounded-full blur-[150px]"
                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-purple/6 rounded-full blur-[120px]"
                animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
              <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent"
                initial={{ top: '30%', opacity: 0 }}
                animate={{ top: '70%', opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}

          <div className="relative text-center">
            <div className="mx-auto">
              <img src="/logo-full.png" alt="Finmark" className="h-12 sm:h-16 w-auto mx-auto" />
            </div>

            <div className="mt-6 h-6 overflow-hidden">
              <p className="text-sm text-gray-500 tracking-wide font-mono">
                {LOADING_MESSAGES[messageIndex]}
              </p>
            </div>

            <div className="mt-6 h-[2px] w-56 mx-auto bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-electric via-purple to-electric-light rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-xs text-gray-600 font-mono tabular-nums">
              {Math.min(progress, 100)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
