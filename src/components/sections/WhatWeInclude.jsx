import { m } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeInView from '@/components/motion/FadeInView'
import PhoneMockup from '@/components/ui/PhoneMockup'
import GoldSparkle from '@/components/ui/GoldSparkle'

const EASE = [0.22, 1, 0.36, 1]

const features = [
  {
    number: '01',
    title: 'Observe & Track',
    body: 'Photograph any outfit live or upload a saved image — a street snap, a screenshot, a runway editorial. Soho Observer scans every visible garment in real time.',
  },
  {
    number: '02',
    title: 'Identify Every Label',
    body: 'Our AI recognises brands, garment types, materials, and era across 100+ labels — from luxury houses to high-street staples.',
  },
  {
    number: '03',
    title: 'Shop & Find Alternatives',
    body: 'Get direct links to every identified piece, plus curated alternatives at every budget. The exact runway item — or an accessible version that captures the look.',
  },
  {
    number: '04',
    title: 'Archive Your Wardrobe',
    body: 'Save looks, name your styles, and build your personal fashion vocabulary. Every observation catalogued by brand, category, and season.',
  },
]

export default function WhatWeInclude() {
  return (
    <section
      id="features"
      className="py-16 lg:py-section px-[8vw]"
      style={{ background: 'linear-gradient(to bottom, #F5F2EF 0%, #F5F2EF 80%, #ffffff 100%)' }}
    >

      {/* ── Mobile layout ── */}
      <div className="lg:hidden">
        <FadeInView className="mb-4 flex justify-center">
          <SectionLabel>What's inside</SectionLabel>
        </FadeInView>

        <FadeInView className="mb-10 text-center">
          <h2
            className="font-condensed font-semibold tracking-tight text-charcoal leading-tight"
            style={{ fontSize: 'clamp(30px, 7vw, 56px)' }}
          >
            What <GoldSparkle>Soho Observer</GoldSparkle><br />includes
          </h2>
        </FadeInView>

        <FadeInView className="flex justify-center mb-10">
          <PhoneMockup screenshot="/images/img-8762.webp" alt="Soho Observer observe UI" scale={0.82} />
        </FadeInView>

        {/* Horizontal scroll feature cards */}
        <div className="-mx-[8vw] px-[6vw] overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-5 pb-4">
          {features.map((f, i) => (
            <m.div
              key={f.number}
              className="snap-center flex-shrink-0 w-[88vw] bg-white rounded-2xl p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
            >
              <span
                className="font-sans font-medium text-gold tracking-widest uppercase block mb-3"
                style={{ fontSize: '0.6rem' }}
              >
                {f.number}
              </span>
              <h3
                className="font-condensed font-semibold text-charcoal mb-2 leading-tight"
                style={{ fontSize: 'clamp(19px, 5vw, 26px)' }}
              >
                {f.title}
              </h3>
              <span className="block w-8 h-px bg-gold-500 mb-4" />
              <p className="font-sans text-sm text-gray-warm leading-relaxed">{f.body}</p>
            </m.div>
          ))}
        </div>

        <FadeInView delay={0.4} className="mt-6">
          <p className="font-sans text-xs text-gray-warm text-center">
            Available in light &amp; dark mode &nbsp;·&nbsp; iOS only
          </p>
        </FadeInView>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden lg:flex max-w-[1400px] mx-auto items-center gap-28">

        <FadeInView className="flex-shrink-0">
          <div className="relative">
            <PhoneMockup screenshot="/images/img-8762.webp" alt="Soho Observer observe UI" scale={1.05} />
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, rgba(196,169,110,0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
                transform: 'scale(1.3)',
              }}
            />
          </div>
        </FadeInView>

        <div className="flex-1 min-w-0">
          <FadeInView className="mb-4 flex justify-start">
            <SectionLabel>What's inside</SectionLabel>
          </FadeInView>

          <FadeInView className="mb-12">
            <h2
              className="font-condensed font-semibold tracking-tight text-charcoal leading-tight text-left"
              style={{ fontSize: 'clamp(30px, 4vw, 56px)' }}
            >
              What <GoldSparkle>Soho Observer</GoldSparkle><br />includes
            </h2>
          </FadeInView>

          <div className="flex flex-col">
            {features.map((f, i) => (
              <m.div
                key={f.number}
                className="flex gap-6 py-7 border-t border-gold-200"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              >
                <span
                  className="font-sans font-medium text-gold tracking-widest uppercase pt-0.5 flex-shrink-0"
                  style={{ fontSize: '0.6rem' }}
                >
                  {f.number}
                </span>
                <div>
                  <h3
                    className="font-condensed font-semibold text-charcoal mb-2 leading-tight"
                    style={{ fontSize: 'clamp(18px, 2.2vw, 28px)' }}
                  >
                    {f.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-warm leading-relaxed">{f.body}</p>
                </div>
              </m.div>
            ))}
            <div className="border-t border-gold-200" />
          </div>

          <FadeInView delay={0.4} className="mt-6">
            <p className="font-sans text-xs text-gray-warm">
              Available in light &amp; dark mode &nbsp;·&nbsp; iOS only
            </p>
          </FadeInView>
        </div>
      </div>

    </section>
  )
}
