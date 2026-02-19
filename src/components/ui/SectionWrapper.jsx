import { motion } from 'framer-motion'
import { useSectionInView } from '../../hooks/useSectionInView'

export default function SectionWrapper({ children, id, className = '' }) {
  const { ref, inView } = useSectionInView(0.1)

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative py-24 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.section>
  )
}
