import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Reify-style premium 3D card.
 *
 * Uses CSS custom properties for the shine + border glow (performant, reliable)
 * and framer-motion spring physics for the 3D tilt only.
 */
export default function ReifyCard({ children, className = '' }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  // Slightly underdamped spring for premium elastic feel
  const cfg = { stiffness: 150, damping: 14, mass: 0.6 }
  const sx = useSpring(mx, cfg)
  const sy = useSpring(my, cfg)

  const rotateY = useTransform(sx, [-0.5, 0.5], [-15, 15])
  const rotateX = useTransform(sy, [-0.5, 0.5], [15, -15])

  const onMove = useCallback((e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    mx.set(x)
    my.set(y)
    // CSS vars for shine + border angle
    ref.current.style.setProperty('--rx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--ry', `${e.clientY - r.top}px`)
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 180
    ref.current.style.setProperty('--angle', `${angle}deg`)
  }, [mx, my])

  const onEnter = useCallback(() => setHovered(true), [])

  const onLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
    setHovered(false)
  }, [mx, my])

  return (
    <motion.div
      ref={ref}
      className={`reify-card ${hovered ? 'is-hovered' : ''} ${className}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Rotating conic gradient border */}
      <div className="reify-border" />

      {/* Card surface */}
      <div className="reify-surface">
        {/* Spotlight / shine that tracks cursor */}
        <div className="reify-shine" />
        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>

      {/* Dynamic floor shadow */}
      <div className="reify-shadow" />
    </motion.div>
  )
}
