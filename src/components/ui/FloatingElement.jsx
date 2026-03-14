import { motion } from 'framer-motion'

export default function FloatingElement({
  children,
  delay = 0,
  duration = 6,
  range = 15,
  className = '',
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -range, 0, range * 0.5, 0],
        x: [0, range * 0.3, 0, -range * 0.3, 0],
        rotateZ: [0, 3, 0, -3, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
}
