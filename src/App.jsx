import { useState } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import WhatWeInclude from '@/components/sections/WhatWeInclude'
import WhyChoose from '@/components/sections/WhyChoose'
import HowItWorks from '@/components/sections/HowItWorks'
import Screenshots from '@/components/sections/Screenshots'
import FAQ from '@/components/sections/FAQ'
import DownloadCTA from '@/components/sections/DownloadCTA'

export default function App() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('soho_submitted') === 'true'
  )

  function handleUnlock() {
    sessionStorage.setItem('soho_submitted', 'true')
    setUnlocked(true)
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-parchment">
        <Navbar />
        <main>
          <Hero />
          <WhyChoose />
          <WhatWeInclude />
          <HowItWorks />
          <Screenshots locked={!unlocked} />
          <FAQ />
          <DownloadCTA onUnlock={handleUnlock} />
        </main>
        <Footer />
      </div>
    </LazyMotion>
  )
}
