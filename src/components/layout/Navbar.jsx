import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GoldEyeLogo from '@/components/ui/GoldEyeLogo'

const EASE = [0.22, 1, 0.36, 1]

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on scroll
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true, once: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 px-6 md:px-8 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-parchment/95 backdrop-blur-sm border-b border-card'
            : 'bg-transparent'
        }`}
      >
        <GoldEyeLogo size={26} />

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-sans text-sm text-gray-warm hover:text-charcoal transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA — magic trace */}
        <div className="hidden md:block relative">
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
              className="relative z-10 inline-flex font-sans text-xs font-medium bg-charcoal text-parchment rounded-full px-5 py-2.5 hover:bg-gold hover:text-charcoal transition-colors duration-300 whitespace-nowrap"
            >
              Join the Waitlist
            </a>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-1 focus:outline-none"
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
      </header>

      {/* Backdrop — closes menu on outside tap */}
      {menuOpen && (
        <div
          className="fixed inset-0 top-[58px] z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed top-[58px] left-0 right-0 z-40 md:hidden bg-parchment/97 backdrop-blur-sm border-b border-card px-8 pt-6 pb-8 flex flex-col"
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-display italic text-charcoal py-4 border-b border-card/60 last:border-0 leading-none"
                style={{ fontSize: 'clamp(28px, 7vw, 36px)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: i * 0.06 }}
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href="#waitlist"
              onClick={() => setMenuOpen(false)}
              className="mt-6 font-sans text-sm font-medium bg-charcoal text-parchment rounded-full px-7 py-3.5 text-center hover:bg-gold hover:text-charcoal transition-colors duration-300"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE, delay: navLinks.length * 0.06 }}
            >
              Join the Waitlist
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
