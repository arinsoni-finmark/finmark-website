import { motion } from 'framer-motion'

export default function GlowBadge({ children }) {
  return (
    <motion.span
      className="inline-block rounded-full border border-electric/30 bg-electric/10 px-5 py-2 text-sm font-medium text-electric-light backdrop-blur-sm"
      whileHover={{ scale: 1.05, borderColor: 'rgba(0, 102, 255, 0.5)' }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )
}
