import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const LOGO_COLOR = '#7DD3FC'

function GearBrainSVG({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative z-10"
    >
      <g fill={LOGO_COLOR}>
        <circle cx="24" cy="24" r="19" />
        {[...Array(12)].map((_, i) => (
          <rect
            key={i}
            x="21.5"
            y="2.5"
            width="5"
            height="5"
            rx="1.2"
            transform={`rotate(${i * 30} 24 24)`}
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="14.5" fill="#0c0c18" />
      <g stroke={LOGO_COLOR} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1="24" y1="14.5" x2="24" y2="34" />
        <path d="M24 15 C19.5 15, 14.5 18.5, 14.5 24 C14.5 29.5, 19.5 33.5, 24 33.5" />
        <path d="M23 18.5 C19.5 20, 16.5 22.5, 17 25.5" />
        <path d="M23 26 C19.5 27, 17 29.5, 17.5 32" />
        <path d="M24 15 C28.5 15, 33.5 18.5, 33.5 24 C33.5 29.5, 28.5 33.5, 24 33.5" />
        <path d="M25 18.5 C28.5 20, 31.5 22.5, 31 25.5" />
        <path d="M25 26 C28.5 27, 31 29.5, 30.5 32" />
      </g>
      <g fill={LOGO_COLOR}>
        <circle cx="17" cy="25.5" r="1.3" />
        <circle cx="17.5" cy="32" r="1.3" />
        <circle cx="31" cy="25.5" r="1.3" />
        <circle cx="30.5" cy="32" r="1.3" />
        <circle cx="24" cy="14.5" r="1.5" />
        <circle cx="24" cy="34" r="1.3" />
      </g>
    </svg>
  )
}

/**
 * Reify-style premium 3D card animation on the logo icon.
 * - Smooth spring-based 3D tilt following mouse
 * - Moving specular highlight (light reflection)
 * - Dynamic shadow that shifts with tilt
 * - Soft ambient glow
 * - Gentle idle levitation
 */
export default function LogoIcon({ size = 32, animate = true, variant = 'default' }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Raw mouse position relative to center (-0.5 to 0.5)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  // Smooth springs — Reify uses very smooth, slightly underdamped springs
  const springCfg = { stiffness: 120, damping: 14, mass: 0.8 }
  const sx = useSpring(mx, springCfg)
  const sy = useSpring(my, springCfg)

  // 3D tilt
  const tiltDeg = variant === 'subtle' ? 10 : variant === 'dynamic' ? 25 : 18
  const rotateY = useTransform(sx, [-0.5, 0.5], [-tiltDeg, tiltDeg])
  const rotateX = useTransform(sy, [-0.5, 0.5], [tiltDeg, -tiltDeg])

  // Specular highlight position — follows mouse across the surface
  const highlightX = useTransform(sx, [-0.5, 0.5], ['-20%', '120%'])
  const highlightY = useTransform(sy, [-0.5, 0.5], ['-20%', '120%'])

  // Dynamic shadow — shifts opposite to tilt for realism
  const shadowX = useTransform(sx, [-0.5, 0.5], [8, -8])
  const shadowY = useTransform(sy, [-0.5, 0.5], [8, -8])
  // Edge light angle — rotates based on mouse position
  const lightAngle = useTransform(sx, [-0.5, 0.5], [200, 340])

  const onMove = useCallback((e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }, [mx, my])

  const onLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
    setHovered(false)
  }, [mx, my])

  const floatPx = variant === 'subtle' ? 2 : variant === 'dynamic' ? 5 : 3

  // Expand the hit area so hover works naturally
  const hitPad = Math.max(size * 0.6, 16)

  return (
    <div
      ref={ref}
      className="relative flex-shrink-0"
      style={{
        width: size,
        height: size,
      }}
      onMouseMove={animate ? onMove : undefined}
      onMouseEnter={animate ? () => setHovered(true) : undefined}
      onMouseLeave={animate ? onLeave : undefined}
    >
      {/* Expanded hover hit area (invisible) */}
      {animate && (
        <div
          className="absolute pointer-events-auto"
          style={{
            inset: -hitPad,
            zIndex: 0,
          }}
        />
      )}

      {/* Dynamic shadow underneath — shifts with tilt */}
      {animate && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            bottom: -size * 0.2,
            left: '5%',
            right: '5%',
            height: size * 0.4,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${LOGO_COLOR}30, transparent 70%)`,
            filter: 'blur(10px)',
            x: shadowX,
            y: shadowY,
          }}
          animate={{
            opacity: hovered ? 0.8 : 0.3,
            scaleX: hovered ? 1.3 : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}

      {/* Idle levitation + 3D tilt card */}
      <motion.div
        className="relative w-full h-full"
        style={animate ? {
          rotateX,
          rotateY,
          transformPerspective: 800,
          transformStyle: 'preserve-3d',
        } : undefined}
        animate={animate ? {
          y: [-floatPx, floatPx, -floatPx],
        } : undefined}
        transition={animate ? {
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        } : undefined}
        whileHover={animate ? { scale: 1.12 } : undefined}
      >
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {/* The SVG logo */}
          <GearBrainSVG size={size} />

          {/* Moving specular highlight — light reflection that tracks mouse */}
          {animate && (
            <motion.div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: '55%',
                height: '55%',
                left: highlightX,
                top: highlightY,
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)',
                filter: `blur(${size * 0.12}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                opacity: hovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Edge light — bright rim on the side facing the "light source" */}
          {animate && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
              style={{
                background: useTransform(lightAngle, (a) =>
                  `linear-gradient(${a}deg, rgba(255,255,255,0.12) 0%, transparent 50%)`
                ),
              }}
              animate={{
                opacity: hovered ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
            />
          )}

          {/* Ambient glow — soft pulse on idle, stronger on hover */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              inset: -size * 0.25,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${LOGO_COLOR}25 0%, ${LOGO_COLOR}08 50%, transparent 70%)`,
            }}
            animate={{
              opacity: hovered ? 1 : [0.4, 0.7, 0.4],
              scale: hovered ? 1.3 : [1, 1.06, 1],
            }}
            transition={hovered
              ? { duration: 0.4, ease: 'easeOut' }
              : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        </div>
      </motion.div>
    </div>
  )
}
