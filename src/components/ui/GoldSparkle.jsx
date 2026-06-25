import { m } from 'framer-motion'

const SPARKLES = [
  { x: '8%',  y: '-65%', delay: 0,    size: 7 },
  { x: '78%', y: '-58%', delay: 1.1,  size: 5 },
  { x: '92%', y: '125%', delay: 2.2,  size: 8 },
  { x: '4%',  y: '118%', delay: 0.6,  size: 5 },
]

export default function GoldSparkle({ children, className = '', style = {} }) {
  return (
    <span className={`relative inline-block ${className}`} style={style}>
      <span className="gold-shimmer">{children}</span>
      {SPARKLES.map((s, i) => (
        <m.span
          key={i}
          className="absolute pointer-events-none select-none leading-none"
          style={{ left: s.x, top: s.y, fontSize: s.size, color: '#C4A96E' }}
          animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          aria-hidden="true"
        >
          ✦
        </m.span>
      ))}
    </span>
  )
}
