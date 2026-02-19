import { motion } from 'framer-motion'

export default function GradientButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  if (variant === 'outline') {
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-colors hover:border-electric/50 hover:bg-white/10 cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-electric to-purple px-6 py-3 font-semibold text-white shadow-lg shadow-electric/25 transition-shadow hover:shadow-electric/40 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
