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
    setTransform(`perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`)
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
      className={`glass rounded-2xl p-6 transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  )
}
