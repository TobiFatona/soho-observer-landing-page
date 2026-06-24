import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeInView from '@/components/motion/FadeInView'

const EASE = [0.22, 1, 0.36, 1]

const steps = [
  {
    number: '01',
    image: '/images/how-it-works-a.png',
    title: 'Recognition beyond the logo.',
    body: "Soho Observer's AI doesn't look for logos — it reads garment architecture. Silhouette, construction detail, fabric drape, cut lines, and design DNA are analysed in parallel across a model trained on thousands of pieces spanning 100+ labels. Branding obscured? It still identifies. Street photo, editorial scan, or a saved screenshot — the source doesn't matter. What's worn gets recognised.",
  },
  {
    number: '02',
    image: '/images/how-it-works-b.jpg',
    title: 'Curated by aesthetic. Not keyword.',
    body: "When you want alternatives at a different price point, the engine doesn't search keywords — it maps aesthetic DNA. Silhouette category, construction style, material weight, and design language are cross-referenced to surface pieces that carry the same visual character as the original. The same look, made reachable — matched to your price range.",
  },
  {
    number: '03',
    image: '/images/how-it-works-c.png',
    title: 'Linked to buy. One tap away.',
    body: "Every identified piece connects directly to purchase across multiple retailers and price tiers. No manual searching, no lost tabs. Tap to open the exact item — or its curated alternative — and go straight to the retailer. Shortlist pieces as you go, return when you're ready.",
  },
]

function StepCard({ step, i = 0, animated = false, cardClass = '' }) {
  const motionProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: EASE, delay: i * 0.12 },
      }
    : {}

  return (
    <motion.div
      className={`rounded-2xl overflow-hidden bg-white ${cardClass}`}
      style={{ boxShadow: '0 2px 18px rgba(0,0,0,0.07)', border: '1px solid #E8DDC0' }}
      {...motionProps}
    >
      <div className="relative h-52 bg-[#1a1a1a] overflow-hidden">
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(26,26,26,0.35) 100%)' }}
        />
      </div>
      <div className="p-6 lg:p-7">
        <span className="font-sans font-medium text-gold tracking-widest uppercase" style={{ fontSize: '0.6rem' }}>
          {step.number}
        </span>
        <h3
          className="font-condensed font-semibold text-charcoal mt-2 mb-3 leading-tight"
          style={{ fontSize: 'clamp(19px, 2vw, 26px)' }}
        >
          {step.title}
        </h3>
        <span className="block w-8 h-px bg-gold-500 mb-4" />
        <p className="font-sans text-sm text-gray-warm leading-relaxed">{step.body}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const [active, setActive] = useState(0)
  const scrollRef = useRef(null)

  function handleScroll() {
    const el = scrollRef.current
    if (!el || !el.children[0]) return
    const step = el.children[0].offsetWidth + 20
    const idx = Math.round(el.scrollLeft / step)
    setActive(Math.max(0, Math.min(idx, steps.length - 1)))
  }

  function goTo(i) {
    const el = scrollRef.current
    if (!el || !el.children[0]) return
    const step = el.children[0].offsetWidth + 20
    el.scrollTo({ left: i * step, behavior: 'smooth' })
    setActive(i)
  }

  return (
    <section
      id="how-it-works"
      className="py-16 lg:py-section px-[8vw]"
      style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 78%, #F5F2EF 100%)' }}
    >
      <FadeInView className="flex justify-center mb-4">
        <SectionLabel>How It Works</SectionLabel>
      </FadeInView>

      <FadeInView className="text-center mb-14">
        <h2
          className="font-condensed font-semibold tracking-tight text-charcoal leading-tight"
          style={{ fontSize: 'clamp(30px, 7vw, 56px)' }}
        >
          The intelligence<br />behind every scan
        </h2>
        <p className="font-sans text-sm text-gray-warm mt-4 max-w-sm mx-auto">
          From any image to a complete picture — what's worn, where to find it, and every alternative.
        </p>
      </FadeInView>

      {/* Mobile: snap scroll strip */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-[8vw] px-[6vw] pb-6 lg:hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {steps.map((step) => (
          <StepCard
            key={step.number}
            step={step}
            cardClass="snap-center flex-shrink-0 w-[88vw]"
          />
        ))}
      </div>

      {/* Dots — mobile only */}
      <div className="flex gap-2 justify-center mt-1 mb-6 lg:hidden">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to step ${i + 1}`}
            className="focus:outline-none p-1"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === active ? 20 : 6,
                height: 6,
                background: i === active ? '#BE9351' : '#D9C698',
              }}
            />
          </button>
        ))}
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden lg:grid grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <StepCard key={step.number} step={step} i={i} animated />
        ))}
      </div>
    </section>
  )
}
