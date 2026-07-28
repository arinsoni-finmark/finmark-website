import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

const BASE =
  'relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 cursor-pointer overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed'

const VARIANTS = {
  primary:
    'group bg-gradient-to-r from-electric to-purple px-6 py-3 font-semibold text-white shadow-lg shadow-electric/25 hover:shadow-xl hover:shadow-electric/40',
  outline:
    'border border-white/10 bg-dark-card/90 px-6 py-3 text-white hover:border-electric/50 hover:bg-white/10 hover:shadow-lg hover:shadow-electric/10',
}

/**
 * Primary CTA.
 *
 * Pass `to` to navigate — the component then renders as a router Link.
 * Do NOT wrap it in a <Link> instead: that nests a <button> inside an <a>,
 * which is invalid HTML and gives every CTA two tab stops and a muddled
 * screen-reader announcement.
 */
export default function GradientButton({
  children,
  variant = 'primary',
  className = '',
  to,
  ...props
}) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Magnetic effect on hover
  function handleMouseMove(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }

  function handleMouseLeave() {
    if (ref.current) {
      ref.current.style.transform = ''
    }
    setIsHovered(false)
  }

  const Component = to ? MotionLink : motion.button
  const isOutline = variant === 'outline'

  return (
    <Component
      ref={ref}
      {...(to ? { to } : {})}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={`${BASE} ${isOutline ? VARIANTS.outline : VARIANTS.primary} ${className}`}
      {...props}
    >
      {isOutline ? (
        /* Scanning beam on hover */
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '200%' } : { x: '-100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      ) : (
        <>
          {/* Animated shine sweep on hover */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
            initial={{ x: '-150%' }}
            animate={isHovered ? { x: '250%' } : { x: '-150%' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
          {/* Glow pulse on hover */}
          <motion.span
            className="absolute inset-0 rounded-xl bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Component>
  )
}
