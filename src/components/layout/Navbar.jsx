import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GoldEyeLogo from '@/components/ui/GoldEyeLogo'

const EASE = [0.22, 1, 0.36, 1]

const navLinks = [
  { label: 'Why use it', href: '#why' },
  { label: "What's Inside", href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Preview', href: '#preview' },
  { label: 'FAQ', href: '#faq' },
]

const AT_TOP = {
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

const PILL = {
  width: '93%',
  marginTop: 12,
  borderRadius: 9999,
  backgroundColor: 'rgba(245,242,239,0.96)',
  borderColor: 'rgba(232,229,225,1)',
  boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 20,
  paddingRight: 20,
}

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 1024
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
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

  return (
    <>
      {/* Outer wrapper: full-width fixed, centers the pill */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">

        {/* Inner pill: the actual navbar */}
        <motion.header
          className="pointer-events-auto flex items-center justify-between w-full"
          style={{ border: '1px solid transparent' }}
          animate={isDesktop ? (pillActive ? PILL : AT_TOP) : (solidActive ? SCROLLED_MOBILE : AT_TOP)}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <GoldEyeLogo size={26} />

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-sans text-sm text-gray-warm hover:text-gold transition-colors duration-300 whitespace-nowrap"
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
              className="font-sans text-sm text-charcoal hover:text-gold transition-colors duration-300 whitespace-nowrap"
            >
              Log in
            </button>
          <div className="relative">
            <motion.div
              className="absolute -inset-3 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(196,169,110,0.55) 0%, rgba(196,169,110,0.24) 45%, transparent 68%)',
                filter: 'blur(16px)',
              }}
              animate={{ opacity: [0.5, 0.88, 0.5], scale: [1, 1.05, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
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
              <a
                href="#waitlist"
                onClick={() => window.dispatchEvent(new CustomEvent('soho:switch-to-join'))}
                className="relative z-10 inline-flex font-sans text-xs font-medium bg-charcoal text-parchment rounded-full px-5 py-2.5 hover:bg-gold hover:text-charcoal transition-colors duration-300 whitespace-nowrap"
              >
                Join the Waitlist
              </a>
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
            <motion.span
              className="block h-px bg-charcoal"
              style={{ width: 22 }}
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
            />
            <motion.span
              className="block h-px bg-charcoal"
              style={{ width: 22 }}
              animate={menuOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px bg-charcoal"
              style={{ width: 22 }}
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
            />
          </button>
        </motion.header>

        {/* Mobile dropdown — stays inside the flex-col, width matches pill */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="pointer-events-auto lg:hidden bg-parchment/97 backdrop-blur-sm px-8 pt-6 pb-8 flex flex-col items-center"
              style={{
                width: '100%',
                borderRadius: 0,
                borderTop: '1px solid rgba(232,229,225,0.6)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.07)',
              }}
            >
              {navLinks.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-sm text-gray-warm hover:text-gold transition-colors duration-300 py-4 border-b border-card/60 last:border-0 w-full text-center"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE, delay: i * 0.05 }}
                >
                  {label}
                </motion.a>
              ))}

              {/* Magic trace CTA */}
              <motion.div
                className="relative mt-6 w-full max-w-xs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: navLinks.length * 0.05 }}
              >
                <motion.div
                  className="absolute -inset-3 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(196,169,110,0.55) 0%, rgba(196,169,110,0.24) 45%, transparent 68%)',
                    filter: 'blur(16px)',
                  }}
                  animate={{ opacity: [0.5, 0.88, 0.5], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
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
                  <a
                    href="#waitlist"
                    onClick={() => {
                      setMenuOpen(false)
                      window.dispatchEvent(new CustomEvent('soho:switch-to-join'))
                    }}
                    className="relative z-10 block font-sans text-xs font-medium bg-charcoal text-parchment rounded-full px-7 py-3.5 text-center hover:bg-gold hover:text-charcoal transition-colors duration-300"
                  >
                    Join the Waitlist
                  </a>
                </div>
              </motion.div>

              <motion.button
                onClick={() => {
                  setMenuOpen(false)
                  window.dispatchEvent(new CustomEvent('soho:switch-to-login'))
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-3 font-sans text-sm text-charcoal hover:text-gold transition-colors duration-300 text-center py-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: (navLinks.length + 1) * 0.05 }}
              >
                Already on the list? Log in
              </motion.button>
            </motion.nav>
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
