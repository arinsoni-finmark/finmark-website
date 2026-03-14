import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', tilt = true }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')

  function handleMouseMove(e) {
    if (!tilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(`perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(10px)`)
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  function handleMouseLeave() {
    setTransform('')
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className={`group relative glass rounded-2xl p-6 transition-all duration-300 ease-out overflow-hidden ${className}`}
    >
      {/* Mouse follow glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 102, 255, 0.08), transparent 40%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
