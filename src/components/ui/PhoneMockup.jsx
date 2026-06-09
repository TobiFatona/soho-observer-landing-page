export default function PhoneMockup({ screenshot, alt = 'App screen', className = '', scale = 1, children }) {
  const W = Math.round(280 * scale)
  const H = Math.round(580 * scale)
  const PAD = Math.round(10 * scale)
  const R_OUTER = Math.round(44 * scale)
  const R_INNER = Math.round(36 * scale)
  const NOTCH_W = Math.round(80 * scale)
  const NOTCH_H = Math.round(28 * scale)
  const NOTCH_TOP = Math.round(16 * scale)

  return (
    <div className={`relative flex-shrink-0 ${className}`} style={{ width: W, height: H }}>
      <div
        className="w-full h-full bg-charcoal"
        style={{
          borderRadius: R_OUTER,
          padding: PAD,
          boxShadow: `0 ${Math.round(40 * scale)}px ${Math.round(80 * scale)}px rgba(0,0,0,0.28), 0 ${Math.round(8 * scale)}px ${Math.round(20 * scale)}px rgba(0,0,0,0.15)`,
        }}
      >
        <div
          className="relative w-full h-full bg-parchment overflow-hidden"
          style={{ borderRadius: R_INNER }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-charcoal rounded-full z-10"
            style={{ top: NOTCH_TOP, width: NOTCH_W, height: NOTCH_H }}
          />
          {children ?? (screenshot ? (
            <img src={screenshot} alt={alt} className="w-full h-full object-cover object-top" style={{ filter: 'contrast(1.08) saturate(1.12)' }} />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-card to-card-dark/30" />
          ))}
        </div>
      </div>
    </div>
  )
}
