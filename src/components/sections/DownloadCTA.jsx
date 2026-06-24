import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeInView from '@/components/motion/FadeInView'
import { supabase } from '@/lib/supabase'

const EASE = [0.22, 1, 0.36, 1]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const TIMEOUT_MS = 10_000
const PHONE_RE = /^\+[1-9]\d{7,14}$/

const inputClass =
  'w-full font-sans text-sm bg-white border border-card rounded-full px-5 py-3.5 text-charcoal placeholder-gray-warm/50 focus:outline-none focus:border-gold transition-colors duration-300'

const TYPEWRITER_CHARS = 'Observing'.split('')

const fieldErrorClass = 'font-sans text-[0.68rem] text-[#CC0000] mt-1 ml-1'

export default function DownloadCTA({ onUnlock }) {
  const [mode, setMode] = useState('join') // 'join' | 'login'

  // Join form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState(() => sessionStorage.getItem('soho_email') || '')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(
    () => sessionStorage.getItem('soho_submitted') === 'true'
  )
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  useEffect(() => {
    const handler = () => setMode('login')
    window.addEventListener('soho:switch-to-login', handler)
    return () => window.removeEventListener('soho:switch-to-login', handler)
  }, [])

  useEffect(() => {
    const handler = () => setMode('join')
    window.addEventListener('soho:switch-to-join', handler)
    return () => window.removeEventListener('soho:switch-to-join', handler)
  }, [])

  const observingRef = useRef(null)
  const observingInView = useInView(observingRef, { once: true })

  function clearError(field) {
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errors = {}

    if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'
    if (!PHONE_RE.test(phone)) errors.phone = 'Use international format, e.g. +12125550123'

    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    setLoading(true)

    let dbError
    try {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS)
      )
      const result = await Promise.race([
        supabase.from('waitlist').insert({ first_name: firstName, last_name: lastName, email, phone }),
        timeout,
      ])
      dbError = result.error
    } catch {
      setLoading(false)
      setFieldErrors({ form: 'Request timed out. Please check your connection and try again.' })
      return
    }
    setLoading(false)

    if (dbError) {
      if (dbError.code === '23505') {
        const details = dbError.details || dbError.message || ''
        if (details.toLowerCase().includes('phone')) {
          setFieldErrors({ phone: "This number is already on the list — we'll be in touch." })
        } else {
          setFieldErrors({ email: "This email is already on the list — we'll be in touch." })
        }
      } else {
        setFieldErrors({ form: 'Something went wrong. Please try again.' })
      }
      return
    }

    sessionStorage.setItem('soho_submitted', 'true')
    sessionStorage.setItem('soho_email', email)
    setSubmitted(true)
    onUnlock?.()
  }

  async function handleLogin(e) {
    e.preventDefault()
    if (!EMAIL_RE.test(loginEmail)) {
      setLoginError('Please enter a valid email address.')
      return
    }
    setLoginError('')
    setLoginLoading(true)

    // Use the same INSERT mechanism that already works for sign-up.
    // If the email is already in the waitlist, Supabase returns error 23505 on the email column.
    // That conflict IS the verification — no SELECT permission needed.
    const dummyPhone = `+9${Date.now()}`
    const { error } = await supabase
      .from('waitlist')
      .insert({ email: loginEmail, first_name: '_', last_name: '_', phone: dummyPhone })

    if (error?.code === '23505') {
      const details = (error.details || error.message || '').toLowerCase()
      if (details.includes('email')) {
        sessionStorage.setItem('soho_submitted', 'true')
        sessionStorage.setItem('soho_email', loginEmail)
        setEmail(loginEmail)
        setSubmitted(true)
        onUnlock?.()
        setLoginLoading(false)
        return
      }
    }

    if (!error) {
      // Email was not in the waitlist — the INSERT succeeded, so clean up the test row
      await supabase.from('waitlist').delete().eq('phone', dummyPhone)
      setLoginError("We couldn't find that email on the waitlist.")
      setLoginLoading(false)
      return
    }

    setLoginError('Something went wrong. Please try again.')
    setLoginLoading(false)
  }

  return (
    <section
      id="waitlist"
      className="relative py-20 lg:py-section px-[8vw] bg-parchment text-center overflow-hidden"
    >
      {/* Radial gold ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 105%, rgba(196,169,110,0.13) 0%, transparent 70%)',
        }}
      />

      {/* Thin gold rule at top of section */}
      <div className="relative flex items-center justify-center mb-12">
        <SectionLabel>Join the Beta</SectionLabel>
      </div>

      {/* Headline */}
      <div ref={observingRef} className="relative mb-12 overflow-visible" style={{ paddingBottom: '0.15em' }}>
        <h2
          className="font-condensed font-semibold tracking-tight"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.1 }}
        >
          <motion.span
            className="text-charcoal"
            initial={{ opacity: 0, y: 16 }}
            animate={observingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 1, ease: EASE }}
            style={{ display: 'inline-block' }}
          >
            Start
          </motion.span>
          {' '}
          <span className="italic gold-shimmer">
            {TYPEWRITER_CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={observingInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.04, delay: 0.2 + i * 0.07, ease: 'linear' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h2>
        {[
          { x: '5%',  y: '-55%', delay: 0,   size: 9 },
          { x: '82%', y: '-48%', delay: 1.2, size: 7 },
          { x: '96%', y: '112%', delay: 2.5, size: 8 },
          { x: '7%',  y: '108%', delay: 0.8, size: 6 },
        ].map((s, i) => (
          <motion.span
            key={i}
            className="absolute pointer-events-none select-none leading-none"
            style={{ left: s.x, top: s.y, fontSize: s.size, color: '#C4A96E' }}
            animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
            aria-hidden="true"
          >
            ✦
          </motion.span>
        ))}
      </div>

      <FadeInView delay={0.3} className="relative max-w-[520px] mx-auto">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col items-center gap-4"
            >
              <div className="inline-flex items-center gap-3 py-3 px-6 rounded-full bg-charcoal">
                <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 animate-pulse" />
                <span className="font-sans text-sm text-parchment">
                  You're on the list — scroll up to view the preview.
                </span>
              </div>
              <p className="font-sans text-xs text-gray-warm/70">
                We'll send your early access details to {email || loginEmail}
              </p>
            </motion.div>

          ) : mode === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="font-sans text-sm text-gray-warm leading-relaxed mb-8 max-w-[400px] mx-auto">
                Already on the list? Enter your email to log back in and access the preview.
              </p>

              <form className="flex flex-col gap-3 max-w-sm mx-auto" onSubmit={handleLogin}>
                <div>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => { setLoginEmail(e.target.value); setLoginError('') }}
                    placeholder="Your email address"
                    className={`${inputClass} ${loginError ? 'border-[#CC0000]' : ''}`}
                  />
                  {loginError && <p className={fieldErrorClass}>{loginError}</p>}
                </div>

                {/* Magic trace CTA button */}
                <div className="relative mt-2">
                  <motion.div
                    className="absolute -inset-5 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 50%, rgba(196,169,110,0.6) 0%, rgba(196,169,110,0.28) 45%, transparent 68%)',
                      filter: 'blur(22px)',
                    }}
                    animate={{ opacity: [0.55, 0.92, 0.55], scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ boxShadow: '0 0 12px 3px rgba(196,169,110,0.5), 0 0 28px 8px rgba(196,169,110,0.2)' }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  />
                  <div
                    className="relative rounded-full overflow-hidden"
                    style={{ padding: '2px', background: 'rgba(196,169,110,0.38)' }}
                  >
                    <div className="magic-trace absolute inset-0 pointer-events-none" aria-hidden="true" />
                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="relative z-10 w-full font-sans text-sm font-medium bg-charcoal text-parchment rounded-full px-7 py-3.5 hover:bg-gold hover:text-charcoal transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loginLoading ? 'Checking…' : 'Log in — Unlock Preview'}
                    </button>
                  </div>
                </div>
              </form>

              <button
                onClick={() => { setMode('join'); setLoginError('') }}
                className="mt-6 font-sans text-[0.7rem] text-gray-warm/60 hover:text-gray-warm transition-colors duration-200"
              >
                Join the waitlist instead
              </button>
            </motion.div>

          ) : (
            <motion.div
              key="form"
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="font-sans text-sm text-gray-warm leading-relaxed mb-8 max-w-[400px] mx-auto">
                Beta access is limited. Join the waitlist and be among the first to identify
                and shop any look — before Soho Observer launches on the App Store.
              </p>

              <form className="flex flex-col gap-3 max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First name"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Last name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                      clearError('email')
                    }}
                    placeholder="Email address"
                    className={`${inputClass} ${fieldErrors.email ? 'border-[#CC0000]' : ''}`}
                  />
                  {fieldErrors.email && <p className={fieldErrorClass}>{fieldErrors.email}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => {
                      setPhone(e.target.value)
                      clearError('phone')
                    }}
                    placeholder="Phone number e.g. +12125550123"
                    className={`${inputClass} ${fieldErrors.phone ? 'border-[#CC0000]' : ''}`}
                  />
                  {fieldErrors.phone && <p className={fieldErrorClass}>{fieldErrors.phone}</p>}
                </div>

                {fieldErrors.form && (
                  <p className="font-sans text-[0.68rem] text-[#CC0000] text-center">{fieldErrors.form}</p>
                )}

                {/* Magic trace CTA button */}
                <div className="relative mt-2">
                  <motion.div
                    className="absolute -inset-5 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 50%, rgba(196,169,110,0.6) 0%, rgba(196,169,110,0.28) 45%, transparent 68%)',
                      filter: 'blur(22px)',
                    }}
                    animate={{ opacity: [0.55, 0.92, 0.55], scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ boxShadow: '0 0 12px 3px rgba(196,169,110,0.5), 0 0 28px 8px rgba(196,169,110,0.2)' }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  />
                  <div
                    className="relative rounded-full overflow-hidden"
                    style={{ padding: '2px', background: 'rgba(196,169,110,0.38)' }}
                  >
                    <div className="magic-trace absolute inset-0 pointer-events-none" aria-hidden="true" />
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative z-10 w-full font-sans text-sm font-medium bg-charcoal text-parchment rounded-full px-7 py-3.5 hover:bg-gold hover:text-charcoal transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Joining…' : 'Join the Waitlist — Unlock Preview'}
                    </button>
                  </div>
                </div>

                {/* Login toggle */}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setFieldErrors({}) }}
                  className="mt-1 font-sans text-[0.7rem] text-gray-warm/60 hover:text-gray-warm transition-colors duration-200"
                >
                  Already on the list? Log back in
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="label-editorial mt-10 text-gray-warm">
          Coming soon to the App Store &nbsp;·&nbsp; iOS only
        </p>
      </FadeInView>
    </section>
  )
}
