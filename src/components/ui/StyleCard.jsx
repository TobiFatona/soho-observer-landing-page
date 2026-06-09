import { motion } from 'framer-motion'

export default function StyleCard({ name, description, gradient, tall = false, className = '' }) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden bg-gradient-to-b ${gradient} ${tall ? 'h-[500px]' : 'h-[238px]'} ${className} group cursor-default`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-card-dark/80 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="block w-0.5 h-4 bg-gold flex-shrink-0" />
          <span className="font-sans text-parchment text-[0.65rem] tracking-widest uppercase">
            {name}
          </span>
        </div>
        <p className="font-display-sc text-parchment/60 text-[0.6rem] tracking-wider pl-3.5">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 bg-card-dark/0 group-hover:bg-card-dark/15 transition-colors duration-400" />
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="label-editorial text-parchment/80 text-[0.55rem] tracking-widest">VIEW</span>
      </div>
    </motion.div>
  )
}
