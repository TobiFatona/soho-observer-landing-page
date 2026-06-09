import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealLine from '@/components/motion/RevealLine'
import FadeInView from '@/components/motion/FadeInView'
import { features } from '@/constants/features'

const EASE = [0.22, 1, 0.36, 1]

const offsets = ['0%', '15%', '30%']
const aligns = ['items-start', 'items-start', 'items-end']

export default function Features() {
  return (
    <section className="py-section px-[8vw] bg-parchment">
      <FadeInView>
        <SectionLabel className="mb-16">The Intelligence Layer</SectionLabel>
      </FadeInView>

      <div className="flex flex-col gap-0">
        {features.map((f, i) => (
          <div key={f.number}>
            <FadeInView delay={i * 0.1}>
              <div
                className={`relative flex flex-col ${aligns[i]} py-12`}
                style={{ paddingLeft: offsets[i] }}
              >
                {/* Ghost number */}
                <span
                  className="absolute font-display text-gold pointer-events-none select-none leading-none"
                  style={{
                    fontSize: 'clamp(100px, 14vw, 180px)',
                    opacity: 0.07,
                    top: '50%',
                    left: i === 2 ? 'auto' : offsets[i],
                    right: i === 2 ? '0' : 'auto',
                    transform: 'translateY(-50%)',
                  }}
                >
                  {f.number}
                </span>

                <span className="font-sans text-[0.6rem] text-gray-warm tracking-widest mb-3">
                  {f.number}
                </span>

                <h2 className={`font-display italic text-charcoal mb-4 ${i === 2 ? 'text-right' : ''}`}
                  style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
                >
                  {f.label}
                </h2>

                <RevealLine className={`w-12 mb-4 ${i === 2 ? 'ml-auto' : ''}`} />

                <p
                  className={`font-sans text-sm text-gray-warm leading-relaxed max-w-[360px] ${i === 2 ? 'text-right ml-auto' : ''}`}
                >
                  {f.description}
                </p>
              </div>
            </FadeInView>

            {i < features.length - 1 && (
              <RevealLine className="w-2/5 mx-auto" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
