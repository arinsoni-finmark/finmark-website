import { useState, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsMobile(true)
      return
    }
    setIsMobile(false)
    document.body.classList.add('custom-cursor')

    const handleMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }

    const handleOver = (e) => {
      setHovering(
        !!e.target.closest('a, button, input, textarea, [data-cursor-hover]')
      )
    }

    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-white pointer-events-none z-[300] mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: hovering ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[300] mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          borderColor: hovering
            ? 'rgba(255,255,255,0.6)'
            : 'rgba(255,255,255,0.25)',
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />

      {/* Ambient glow following cursor */}
      <motion.div
        className="fixed top-0 left-0 w-56 h-56 rounded-full pointer-events-none z-[250]"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(0, 102, 255, 0.04) 0%, transparent 70%)',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
    </>
  )
}
