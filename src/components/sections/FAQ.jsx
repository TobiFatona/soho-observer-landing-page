import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import FadeInView from '@/components/motion/FadeInView'

const EASE = [0.22, 1, 0.36, 1]

const categories = [
  {
    label: 'The App',
    faqs: [
      {
        q: 'How does Soho Observer identify clothing?',
        a: 'Our AI model analyses your photograph to detect garments, accessories, and footwear — matching each piece against a continuously updated database of brands, collections, and retail listings worldwide.',
      },
      {
        q: 'What types of items can it recognise?',
        a: 'Tops, trousers, outerwear, footwear, bags, and most accessories. The model is trained on both luxury and high-street garments, spanning decades of fashion and a broad range of aesthetics.',
      },
      {
        q: 'Which devices does it support?',
        a: 'Soho Observer is available exclusively on iOS. An iPad-optimised version is currently in development.',
      },
      {
        q: 'Does it work without an internet connection?',
        a: 'An active connection is required for AI identification and price matching. Your saved archive can be browsed offline at any time.',
      },
    ],
  },
  {
    label: 'Pricing',
    faqs: [
      {
        q: 'Is Soho Observer free to download?',
        a: 'Yes — the app is free to download. A premium subscription is required to fully access the app, including AI-powered observations, wardrobe intelligence, and price matching across all price points.',
      },
      {
        q: 'What will premium cost?',
        a: "We're still finalising our pricing tiers. Join the waitlist to be notified first — early adopters will receive preferential access ahead of our public launch.",
      },
    ],
  },
  {
    label: 'Features',
    faqs: [
      {
        q: 'How does the archive work?',
        a: 'Every observation you save is catalogued in your personal archive — searchable by brand, category, colour, and season. Your wardrobe intelligence, organised in one place.',
      },
      {
        q: 'Can Soho Observer identify items from saved photos or screenshots?',
        a: "Yes — you can import any image from your camera roll, including screenshots from social media, editorial images, or photos you've saved over time. The AI analyses the garments in the image regardless of the source.",
      },
      {
        q: 'How accurate is the AI identification?',
        a: 'Accuracy depends on image quality and the prominence of visible branding or design details. In well-lit photographs with clear garment visibility, our model identifies the brand and style category with over 90% confidence. The model continues to improve with each update.',
      },
    ],
  },
  {
    label: 'Privacy & Data',
    faqs: [
      {
        q: 'Is my wardrobe data private?',
        a: 'Completely. Your archive, observations, and usage data are stored privately and are never sold to third parties or shared with brands. You can export or delete your data at any time from within the app.',
      },
      {
        q: 'Does Soho Observer use my photos for training?',
        a: 'No. Your photographs are processed to generate an observation result and are not retained or used to train our models. Your images remain entirely yours.',
      },
    ],
  },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-t border-gold-200">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
        aria-expanded={open}
      >
        <span
          className="font-condensed font-semibold italic text-charcoal group-hover:text-gold transition-colors duration-300"
          style={{ fontSize: 'clamp(16px, 1.6vw, 22px)' }}
        >
          {item.q}
        </span>
        <motion.span
          className="flex-shrink-0 text-charcoal font-sans text-xl leading-none"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm text-gray-warm leading-relaxed pb-6 max-w-[560px]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section
      id="faq"
      className="py-16 lg:py-section px-[8vw]"
      style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 78%, #F5F2EF 100%)' }}
    >
      {/* Header */}
      <FadeInView className="flex justify-center mb-4">
        <SectionLabel>Your Questions</SectionLabel>
      </FadeInView>

      <FadeInView className="text-center mb-16">
        <h2
          className="font-condensed font-semibold tracking-tight leading-tight"
          style={{ fontSize: 'clamp(30px, 7vw, 56px)' }}
        >
          <span className="text-charcoal">Frequently asked </span>
          <span className="text-gray-warm">questions</span>
        </h2>
      </FadeInView>

      {/* Two-column layout */}
      <div className="max-w-5xl mx-auto lg:flex gap-16">

        {/* Sidebar */}
        <aside className="mb-8 lg:mb-0 flex-shrink-0 lg:w-44">

          {/* Mobile: horizontal pill tabs */}
          <div className="lg:hidden -mx-[8vw] px-[8vw] overflow-x-auto scrollbar-hide flex gap-2.5 pb-1">
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(i)}
                className={`flex-shrink-0 font-sans text-xs px-4 py-2 rounded-full border transition-colors duration-200 ${
                  i === activeCategory
                    ? 'bg-charcoal text-parchment border-charcoal'
                    : 'bg-transparent text-gray-warm border-gold-200 hover:text-charcoal'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Desktop: sticky vertical nav */}
          <nav className="hidden lg:flex flex-col sticky top-32">
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(i)}
                className={`text-left py-2.5 pl-3 font-sans text-sm border-l-2 transition-all duration-200 ${
                  i === activeCategory
                    ? 'text-charcoal border-charcoal font-medium'
                    : 'text-gray-warm border-transparent hover:text-charcoal hover:border-gold-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* FAQ accordion */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: EASE }}
            >
              {categories[activeCategory].faqs.map((item) => (
                <FAQItem key={item.q} item={item} />
              ))}
              <div className="border-t border-gold-200" />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
