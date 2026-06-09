import { motion } from 'framer-motion'
import FadeInView from '@/components/motion/FadeInView'

const EASE = [0.22, 1, 0.36, 1]

const reasons = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: 'Find the Impossible Piece',
    body: 'That jacket you\'ve clocked on three different strangers and still can\'t name. Shoot it live or upload a saved photo — AI scanning identifies any garment — brand, collection, and where to buy — in under a minute.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
    title: 'Break the Fashion Barrier',
    body: 'Runway aesthetics are no longer gatekept by price. Soho Observer finds you the exact piece — or curated alternatives at your price point. Same look. Every budget. The invisible fashion barrier, lifted.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    title: '100+ Brands. Expanding Weekly.',
    body: 'From Balenciaga to Uniqlo — luxury houses to high-street staples. Our brand database spans the full fashion spectrum and grows with every update. If it\'s worn on the street, Soho Observer knows it.',
  },
]

export default function WhyChoose() {
  return (
    <section
      className="py-16 lg:py-section px-[8vw]"
      style={{ background: 'linear-gradient(to bottom, #F5F2EF 0%, #F5F2EF 80%, #ffffff 100%)' }}
    >
      <FadeInView className="text-center mb-4">
        <h2
          className="font-display italic text-charcoal leading-tight"
          style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}
        >
          Why choose Soho Observer?
        </h2>
      </FadeInView>

      <FadeInView className="text-center mb-16">
        <p className="font-sans text-sm text-gray-warm">
          The intelligence layer fashion has been missing.
        </p>
      </FadeInView>

      {/* Mobile: snap scroll strip */}
      <div className="md:hidden -mx-[8vw] px-[6vw] overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-5 pb-4">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            className="snap-center flex-shrink-0 w-[88vw] bg-white rounded-2xl p-6 flex flex-col"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.12 }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-charcoal mb-6 flex-shrink-0"
              style={{ background: '#F5F2EF' }}
            >
              {r.icon}
            </div>
            <h3
              className="font-display italic text-charcoal mb-3 leading-tight"
              style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
            >
              {r.title}
            </h3>
            <p className="font-sans text-sm text-gray-warm leading-relaxed">{r.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid max-w-5xl mx-auto grid-cols-3 gap-5">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            className="bg-white rounded-2xl p-6 lg:p-8 flex flex-col"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.12 }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-charcoal mb-6 flex-shrink-0"
              style={{ background: '#F5F2EF' }}
            >
              {r.icon}
            </div>
            <h3
              className="font-display italic text-charcoal mb-3 leading-tight"
              style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
            >
              {r.title}
            </h3>
            <p className="font-sans text-sm text-gray-warm leading-relaxed">{r.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
