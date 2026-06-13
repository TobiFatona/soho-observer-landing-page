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

export default function GoldEyeLogo({ size = 20, className = '', textColor = 'text-charcoal' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <GoldEye size={size} />
      <span
        className={`font-sans font-medium ${textColor} tracking-widest`}
        style={{ fontSize: size * 0.6, letterSpacing: '0.22em' }}
      >
        SOHO OBSERVER
      </span>
    </div>
  )
}
