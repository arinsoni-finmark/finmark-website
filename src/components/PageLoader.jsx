import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LogoIcon from './ui/LogoIcon'

const LOADING_MESSAGES = [
  'Initializing AI Models...',
  'Analyzing Financial Data...',
  'Encrypting Connections...',
  'Loading Dashboard...',
]

export default function PageLoader({ onComplete }) {
  const [show, setShow] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  // Cycle through loading messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < LOADING_MESSAGES.length - 1) return prev + 1
        return prev
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  // Animate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] bg-dark flex items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 bg-grid opacity-10" />

          {/* Ambient orbs */}
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

          {/* Horizontal lines sweep */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent"
            initial={{ top: '30%', opacity: 0 }}
            animate={{ top: '70%', opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative text-center">
            {/* Logo mark */}
            <motion.div
              className="mx-auto"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1, type: 'spring', stiffness: 80, damping: 12 }}
            >
              <LogoIcon size={72} variant="dynamic" />
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="mt-8 font-display text-4xl font-bold text-white flex items-center justify-center gap-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {'Finmark'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.5 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Progressive loading messages */}
            <div className="mt-6 h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  className="text-sm text-gray-500 tracking-wide font-mono"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {LOADING_MESSAGES[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-[2px] w-56 mx-auto bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-electric via-purple to-electric-light rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress percentage */}
            <motion.p
              className="mt-3 text-xs text-gray-600 font-mono tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Math.min(progress, 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
