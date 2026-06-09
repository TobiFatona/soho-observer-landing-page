import { motion } from 'framer-motion'

export default function RevealLine({ className = '', vertical = false }) {
  return (
    <motion.span
      className={`block bg-gold ${vertical ? 'w-px' : 'h-px'} ${className}`}
      initial={{ [vertical ? 'scaleY' : 'scaleX']: 0 }}
      whileInView={{ [vertical ? 'scaleY' : 'scaleX']: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: vertical ? 'top center' : 'left center' }}
    />
  )
}
