import { m } from 'framer-motion'

const LOGO_SPARKLES = [
  { left: 4,     top: -10, delay: 0,   size: 6 },
  { left: '96%', top: -8,  delay: 1.4, size: 4 },
  { left: '90%', top: 22,  delay: 2.8, size: 5 },
]

export function GoldEye({ size = 20, color = '#C4A96E', className = '' }) {
  const height = size * 0.6
  return (
    <svg
      width={size}
      height={height}
      viewBox="-2 -2 40 24"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <path
        d="M1 10 C6 2, 13 0, 18 0 C23 0, 30 2, 35 10 C30 18, 23 20, 18 20 C13 20, 6 18, 1 10Z"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="10" r="6.5" fill={color} />
      <circle cx="18" cy="10" r="2.6" fill="white" />
    </svg>
  )
}

export default function GoldEyeLogo({ size = 20, className = '' }) {
  return (
    <div className={`relative flex items-center gap-2.5 ${className}`}>
      {/* Pulsing ambient glow behind the eye */}
      <m.div
        className="absolute pointer-events-none"
        style={{
          left: -6,
          top: '50%',
          transform: 'translateY(-50%)',
          width: size * 2.4,
          height: size * 1.8,
          background: 'radial-gradient(ellipse at 40% 50%, rgba(196,169,110,0.55) 0%, transparent 70%)',
          filter: 'blur(10px)',
          borderRadius: '50%',
        }}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <GoldEye size={size} />

      <span
        className="gold-shimmer font-sans font-medium tracking-widest"
        style={{ fontSize: size * 0.6, letterSpacing: '0.22em' }}
      >
        SOHO OBSERVER
      </span>

      {LOGO_SPARKLES.map((s, i) => (
        <m.span
          key={i}
          className="absolute pointer-events-none select-none leading-none"
          style={{ left: s.left, top: s.top, fontSize: s.size, color: '#C4A96E' }}
          animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          aria-hidden="true"
        >
          ✦
        </m.span>
      ))}
    </div>
  )
}
