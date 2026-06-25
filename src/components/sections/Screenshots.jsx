import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import PhoneMockup from '@/components/ui/PhoneMockup'
import FadeInView from '@/components/motion/FadeInView'

const EASE = [0.22, 1, 0.36, 1]
const COUNT = 7
const ANGLE_STEP = 360 / COUNT
const RADIUS = 310
const PHONE_W = 202
const PHONE_H = 418

const screens = [
  { id: 'home', src: '/images/app-home-v2.webp', alt: 'Home', label: 'Home' },
  { id: 'observe', src: '/images/observe-ui.webp', alt: 'Observe', label: 'Observe' },
  { id: 'camera', alt: 'Camera', label: 'Camera', composite: true },
  { id: 'analyzing', src: '/images/analyzing.webp', alt: 'Analysing', label: 'Analysing' },
  { id: 'results', src: '/images/img-8762.webp', alt: 'Results', label: 'Results' },
  { id: 'archive', src: '/images/archive-looks.webp', alt: 'Saved looks', label: 'Archive' },
  { id: 'wardrobe', src: '/images/archive-wardrobe.webp', alt: 'Wardrobe', label: 'Wardrobe' },
]

function phoneOpacity(active, i) {
  const dist = Math.min(Math.abs(i - active), COUNT - Math.abs(i - active))
  if (dist === 0) return 1
  if (dist === 1) return 0.48
  return 0.16
}

function prevIdx(i) { return (i - 1 + COUNT) % COUNT }
function nextIdx(i) { return (i + 1) % COUNT }

function GlowLink({ href, className, children }) {
  const anchorRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!anchorRef.current || !glowRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(circle 60px at ${x}px ${y}px, rgba(196,169,110,0.4) 0%, rgba(196,169,110,0.12) 55%, transparent 100%)`
    glowRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }

  return (
    <a
      ref={anchorRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} relative overflow-hidden`}
    >
      <span
        ref={glowRef}
        aria-hidden="true"
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      />
      <span className="relative z-10">{children}</span>
    </a>
  )
}

export default function Screenshots({ locked = false }) {
  const [active, setActive] = useState(0)

  return (
    <section
      id="preview"
      className="py-16 lg:py-section relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #F5F2EF 0%, #E8E5E1 15%, #E8E5E1 85%, #F5F2EF 93%, #ffffff 100%)' }}
    >
      <FadeInView className="flex justify-center mb-6">
        <SectionLabel>Preview</SectionLabel>
      </FadeInView>

      <FadeInView className="text-center mb-3">
        <h2
          className="font-condensed font-semibold tracking-tight text-charcoal leading-tight"
          style={{ fontSize: 'clamp(30px, 7vw, 56px)' }}
        >
          A glimpse inside.
        </h2>
      </FadeInView>

      <FadeInView className="text-center mb-14">
        <p className="font-sans text-xs text-gray-warm tracking-wide">
          Coming soon to iOS &nbsp;·&nbsp; Every screen, refined.
        </p>
      </FadeInView>

      {/* Gated carousel */}
      <div className="relative">
        <motion.div
          animate={{ filter: locked ? 'blur(12px)' : 'blur(0px)' }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ pointerEvents: locked ? 'none' : 'auto' }}
        >

      {/* 3D Carousel — desktop */}
      <div className="hidden md:block select-none">
        <div
          className="relative mx-auto overflow-hidden"
          style={{ height: 560, perspective: '1200px', perspectiveOrigin: '50% 50%' }}
        >
          {/* Stage: zero-size centered container with preserve-3d */}
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 0,
              height: 0,
              transformStyle: 'preserve-3d',
            }}
            animate={{ rotateY: -active * ANGLE_STEP }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            {screens.map((screen, i) => (
              <div
                key={screen.id}
                style={{
                  position: 'absolute',
                  left: -PHONE_W / 2,
                  top: -PHONE_H / 2,
                  transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
                  opacity: phoneOpacity(active, i),
                  transition: 'opacity 0.5s ease',
                  cursor: i === active ? 'default' : 'pointer',
                }}
                onClick={() => i !== active && setActive(i)}
              >
                {screen.composite ? (
                  <PhoneMockup alt={screen.label} scale={0.72}>
                    <div className="relative w-full h-full overflow-hidden">
                      <img src="/images/asap-rocky.webp" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-top" style={{ filter: 'brightness(0.88) contrast(1.05)' }} />
                      <img src="/images/camera-ui.webp" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-top" style={{ mixBlendMode: 'screen', opacity: 0.92 }} />
                    </div>
                  </PhoneMockup>
                ) : (
                  <PhoneMockup screenshot={screen.src} alt={screen.label} scale={0.72} />
                )}
                <p
                  className="font-sans font-medium uppercase text-center mt-3 tracking-widest transition-opacity duration-300"
                  style={{
                    fontSize: '0.52rem',
                    color: i === active ? '#C4A96E' : 'transparent',
                  }}
                >
                  {screen.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Prev arrow */}
          <button
            onClick={() => setActive(prevIdx(active))}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-card bg-parchment/80 backdrop-blur-sm flex items-center justify-center text-gray-warm hover:border-gold hover:text-gold transition-colors duration-300"
            aria-label="Previous screen"
          >
            ←
          </button>

          {/* Next arrow */}
          <button
            onClick={() => setActive(nextIdx(active))}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-card bg-parchment/80 backdrop-blur-sm flex items-center justify-center text-gray-warm hover:border-gold hover:text-gold transition-colors duration-300"
            aria-label="Next screen"
          >
            →
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View screen ${i + 1}`}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 20 : 6,
                  height: 6,
                  background: i === active ? '#C4A96E' : '#C4C0BB',
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: horizontal scroll strip */}
      <div className="md:hidden relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #E8E5E1, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #E8E5E1, transparent)' }}
        />
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-12 pb-4 scrollbar-hide">
          {screens.map((screen) => (
            <div key={screen.id} className="flex-shrink-0 snap-center flex flex-col items-center gap-3">
              {screen.composite ? (
                <PhoneMockup alt={screen.label} scale={0.7}>
                  <div className="relative w-full h-full overflow-hidden">
                    <img src="/images/asap-rocky.webp" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-top" style={{ filter: 'brightness(0.88) contrast(1.05)' }} />
                    <img src="/images/camera-ui.webp" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-top" style={{ mixBlendMode: 'screen', opacity: 0.92 }} />
                  </div>
                </PhoneMockup>
              ) : (
                <PhoneMockup screenshot={screen.src} alt={screen.alt} scale={0.7} />
              )}
              <span
                className="font-sans font-medium text-gray-warm uppercase tracking-widest"
                style={{ fontSize: '0.52rem' }}
              >
                {screen.label}
              </span>
            </div>
          ))}
        </div>
      </div>

        </motion.div>

        {/* Lock overlay */}
        <AnimatePresence>
          {locked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
            >
              <div className="w-16 h-16 rounded-full bg-charcoal flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.22)]">
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                  <rect x="2" y="11" width="16" height="12" rx="2.5" fill="#C4A96E" />
                  <path d="M6 11V8a4 4 0 018 0v3" stroke="#C4A96E" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="10" cy="17" r="1.8" fill="#1A1A1A" />
                </svg>
              </div>
              <p
                className="font-sans text-charcoal/60 uppercase text-center"
                style={{ fontSize: '0.62rem', letterSpacing: '0.16em' }}
              >
                Join the waitlist to unlock the full preview
              </p>
              <GlowLink
                href="#waitlist"
                className="font-sans text-xs font-medium bg-charcoal text-parchment rounded-full px-5 py-2.5 pointer-events-auto"
              >
                Join Waitlist →
              </GlowLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>{/* end gated carousel */}

      <FadeInView className="text-center mt-10">
        <p className="font-sans font-medium text-gray-warm text-[0.55rem] tracking-widest uppercase">
          Limited early access · iOS only
        </p>
      </FadeInView>
    </section>
  )
}
