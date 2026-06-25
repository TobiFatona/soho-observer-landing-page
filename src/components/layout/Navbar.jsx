import { useEffect, useRef, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import GoldEyeLogo from '@/components/ui/GoldEyeLogo'

const EASE = [0.22, 1, 0.36, 1]

function GlowAnchor({ href, onClick, className, children }) {
  const anchorRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!anchorRef.current || !glowRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(circle 70px at ${x}px ${y}px, rgba(196,169,110,0.4) 0%, rgba(196,169,110,0.12) 55%, transparent 100%)`
    glowRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }

  return (
    <a
      ref={anchorRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} overflow-hidden`}
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

const navLinks = [
  { label: 'Why use it', href: '#why' },
  { label: "What's Inside", href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Preview', href: '#preview' },
  { label: 'FAQ', href: '#faq' },
]

const AT_TOP_DESKTOP = {
  width: '74%',
  marginTop: 0,
  borderRadius: 0,
  backgroundColor: 'rgba(245,242,239,0)',
  borderColor: 'rgba(232,229,225,0)',
  boxShadow: '0 0 0px rgba(0,0,0,0)',
  paddingTop: 16,
  paddingBottom: 16,
  paddingLeft: 0,
  paddingRight: 0,
}

const AT_TOP_MOBILE = {
  width: '100%',
  marginTop: 0,
  borderRadius: 0,
  backgroundColor: 'rgba(245,242,239,0)',
  borderColor: 'rgba(232,229,225,0)',
  boxShadow: '0 0 0px rgba(0,0,0,0)',
  paddingTop: 16,
  paddingBottom: 16,
  paddingLeft: 24,
  paddingRight: 24,
}

// Cream pill — past the hero section
const PILL = {
  width: '76%',
  marginTop: 8,
  borderRadius: 9999,
  backgroundColor: 'rgba(245,242,239,0.96)',
  borderColor: 'rgba(232,229,225,1)',
  boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 20,
  paddingRight: 20,
}

// Dark pill — scrolled but still within the hero section
const PILL_DARK = {
  width: '76%',
  marginTop: 8,
  borderRadius: 9999,
  backgroundColor: 'rgba(18,18,18,0.96)',
  borderColor: 'rgba(255,255,255,0.1)',
  boxShadow: '0 2px 20px rgba(0,0,0,0.35)',
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 20,
  paddingRight: 20,
}

// Cream mobile bar — past the hero section
const SCROLLED_MOBILE = {
  width: '100%',
  marginTop: 0,
  borderRadius: 0,
  backgroundColor: 'rgba(245,242,239,0.96)',
  borderColor: 'rgba(232,229,225,1)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 24,
  paddingRight: 24,
}

// Dark mobile bar — scrolled but still within the hero section
const SCROLLED_MOBILE_DARK = {
  width: '100%',
  marginTop: 0,
  borderRadius: 0,
  backgroundColor: 'rgba(18,18,18,0.96)',
  borderColor: 'rgba(255,255,255,0.1)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 24,
  paddingRight: 24,
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 1024
  )

  useEffect(() => {
    const onScroll = () => {
      const why = document.getElementById('why')
      // Colour theme switches when the viewport reaches the #why section
      const heroBottom = why ? why.offsetTop - 60 : window.innerHeight
      setScrolled(window.scrollY > 40)
      setPastHero(window.scrollY >= heroBottom)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true, once: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  const solidActive = scrolled || menuOpen
  const pillActive = isDesktop && solidActive

  // true while the navbar is still over the dark hero background
  const onDark = !pastHero

  const desktopStyle = pillActive ? (pastHero ? PILL : PILL_DARK) : AT_TOP_DESKTOP
  const mobileStyle  = solidActive ? (pastHero ? SCROLLED_MOBILE : SCROLLED_MOBILE_DARK) : AT_TOP_MOBILE

  return (
    <>
      {/* Outer wrapper: full-width fixed, centers the pill */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">

        {/* Inner pill: the actual navbar */}
        <m.header
          className="pointer-events-auto flex items-center justify-between w-full"
          style={{ border: '1px solid transparent' }}
          animate={isDesktop ? desktopStyle : mobileStyle}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <GoldEyeLogo size={26} />

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`font-sans text-sm transition-colors duration-300 whitespace-nowrap ${
                  onDark ? 'text-parchment/85 hover:text-gold' : 'text-gray-warm hover:text-gold'
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('soho:switch-to-login'))
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`font-sans text-sm transition-colors duration-300 whitespace-nowrap ${
                onDark ? 'text-parchment hover:text-gold' : 'text-charcoal hover:text-gold'
              }`}
            >
              Log in
            </button>
          <div className="relative">
            <m.div
              className="absolute -inset-3 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(196,169,110,0.55) 0%, rgba(196,169,110,0.24) 45%, transparent 68%)',
                filter: 'blur(16px)',
              }}
              animate={{ opacity: [0.5, 0.88, 0.5], scale: [1, 1.05, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <m.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: '0 0 9px 2px rgba(196,169,110,0.48), 0 0 20px 5px rgba(196,169,110,0.18)' }}
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
            <div
              className="relative rounded-full overflow-hidden"
              style={{ padding: '2px', background: 'rgba(196,169,110,0.38)' }}
            >
              <div className="magic-trace absolute inset-0 pointer-events-none" aria-hidden="true" />
              <GlowAnchor
                href="#waitlist"
                onClick={() => window.dispatchEvent(new CustomEvent('soho:switch-to-join'))}
                className="relative z-10 inline-flex font-sans text-xs font-medium rounded-full px-5 py-2.5 whitespace-nowrap bg-charcoal text-parchment"
              >
                Join the Waitlist
              </GlowAnchor>
            </div>
          </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center gap-[5px] p-1 focus:outline-none"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <m.span
              className={`block h-px ${solidActive && !onDark ? 'bg-charcoal' : 'bg-parchment'}`}
              style={{ width: 22 }}
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
            />
            <m.span
              className={`block h-px ${solidActive && !onDark ? 'bg-charcoal' : 'bg-parchment'}`}
              style={{ width: 22 }}
              animate={menuOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <m.span
              className={`block h-px ${solidActive && !onDark ? 'bg-charcoal' : 'bg-parchment'}`}
              style={{ width: 22 }}
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
            />
          </button>
        </m.header>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <m.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
              className={`pointer-events-auto lg:hidden backdrop-blur-sm px-8 pt-6 pb-8 flex flex-col items-center ${
                onDark ? 'bg-charcoal/97' : 'bg-parchment/97'
              }`}
              style={{
                width: '100%',
                borderRadius: 0,
                borderTop: onDark
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(232,229,225,0.6)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.07)',
              }}
            >
              {navLinks.map(({ label, href }, i) => (
                <m.a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-sans text-sm transition-colors duration-300 py-4 border-b last:border-0 w-full text-center hover:text-gold ${
                    onDark
                      ? 'text-parchment/85 border-white/10'
                      : 'text-gray-warm border-card/60'
                  }`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE, delay: i * 0.05 }}
                >
                  {label}
                </m.a>
              ))}

              {/* Magic trace CTA */}
              <m.div
                className="relative mt-6 w-full max-w-xs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: navLinks.length * 0.05 }}
              >
                <m.div
                  className="absolute -inset-3 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(196,169,110,0.55) 0%, rgba(196,169,110,0.24) 45%, transparent 68%)',
                    filter: 'blur(16px)',
                  }}
                  animate={{ opacity: [0.5, 0.88, 0.5], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <m.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: '0 0 9px 2px rgba(196,169,110,0.48), 0 0 20px 5px rgba(196,169,110,0.18)' }}
                  animate={{ opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
                <div
                  className="relative rounded-full overflow-hidden"
                  style={{ padding: '2px', background: 'rgba(196,169,110,0.38)' }}
                >
                  <div className="magic-trace absolute inset-0 pointer-events-none" aria-hidden="true" />
                  <GlowAnchor
                    href="#waitlist"
                    onClick={() => {
                      setMenuOpen(false)
                      window.dispatchEvent(new CustomEvent('soho:switch-to-join'))
                    }}
                    className="relative z-10 block font-sans text-xs font-medium rounded-full px-7 py-3.5 text-center bg-charcoal text-parchment"
                  >
                    Join the Waitlist
                  </GlowAnchor>
                </div>
              </m.div>

              <m.button
                onClick={() => {
                  setMenuOpen(false)
                  window.dispatchEvent(new CustomEvent('soho:switch-to-login'))
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`mt-3 font-sans text-sm hover:text-gold transition-colors duration-300 text-center py-2 ${
                  onDark ? 'text-parchment' : 'text-charcoal'
                }`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: (navLinks.length + 1) * 0.05 }}
              >
                Already on the list? Log in
              </m.button>
            </m.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Backdrop for mobile — outside pointer-events-none wrapper */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ top: 58 }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
