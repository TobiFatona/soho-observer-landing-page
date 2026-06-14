import { motion } from 'framer-motion'
import PhoneMockup from '@/components/ui/PhoneMockup'
import GoldSparkle from '@/components/ui/GoldSparkle'

const EASE = [0.22, 1, 0.36, 1]

function fadeUp(delay) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  }
}

const stats = [
  { number: '100+', label: 'Brands Identified' },
  { number: '< 1 min', label: 'ID Time' },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-x-hidden"
      style={{ background: 'linear-gradient(to bottom, #F5F2EF 0%, #F5F2EF 92%, #ffffff 100%)' }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-[6vw] flex flex-col md:flex-row items-center gap-12 lg:gap-28 pt-24 pb-16 md:pt-20 md:pb-0">
        {/* LEFT: text */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left min-w-0">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2.5 bg-white border border-card rounded-full px-5 py-2.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
            <span className="font-sans text-xs text-gray-warm tracking-wide">
              Fashion's best-kept secret · Beta launching soon
            </span>
          </motion.div>

          {/* Mobile phone — between badge and headline */}
          <motion.div
            {...fadeUp(0.2)}
            className="block md:hidden self-center mb-6 flex-shrink-0">
            <PhoneMockup scale={0.72}>
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/images/asap-rocky.jpg"
                  alt="ASAP Rocky street style"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ filter: "brightness(0.88) contrast(1.05)" }}
                />
                <img
                  src="/images/camera-ui.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ mixBlendMode: "screen", opacity: 0.92 }}
                />
              </div>
            </PhoneMockup>
          </motion.div>

          <div className="mb-6">
            <motion.span
              {...fadeUp(0.15)}
              className="font-sans font-semibold tracking-tight text-charcoal leading-[1.1] block"
              style={{ fontSize: "clamp(28px, 4.5vw, 62px)" }}>
              Inspiration to Discovery,
            </motion.span>
            <motion.span
              {...fadeUp(0.25)}
              className="font-sans font-semibold tracking-tight leading-[1.1] block"
              style={{ fontSize: "clamp(28px, 4.5vw, 62px)" }}>
              <GoldSparkle>Unlock Your</GoldSparkle>
            </motion.span>
            <motion.span
              {...fadeUp(0.35)}
              className="font-sans font-semibold tracking-tight leading-[1.1] block"
              style={{ fontSize: "clamp(28px, 4.5vw, 62px)" }}>
              <GoldSparkle>Fashion Potential</GoldSparkle>
            </motion.span>
          </div>

          <motion.p
            {...fadeUp(0.5)}
            className="font-sans text-base text-gray-warm leading-relaxed mb-8 max-w-[480px] mx-auto md:mx-0">
            Welcome to Soho Observer — the AI-powered fashion discovery app that
            identifies every piece in an outfit from a photo or saved image.
            Instantly see the brand, price, and where to buy it, then explore
            curated alternatives across luxury, premium, and affordable tiers.
          </motion.p>

          <motion.div
            {...fadeUp(0.6)}
            className="flex flex-col gap-3 mb-9 w-full max-w-[440px] mx-auto md:mx-0">
            {/* Magic trace "Join the Waitlist" */}
            <div className="relative w-full">
              <motion.div
                className="absolute -inset-5 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(196,169,110,0.6) 0%, rgba(196,169,110,0.28) 45%, transparent 68%)",
                  filter: "blur(22px)",
                }}
                animate={{ opacity: [0.55, 0.92, 0.55], scale: [1, 1.06, 1] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow:
                    "0 0 12px 3px rgba(196,169,110,0.5), 0 0 28px 8px rgba(196,169,110,0.2)",
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              />
              <div
                className="relative rounded-full overflow-hidden w-full"
                style={{
                  padding: "2px",
                  background: "rgba(196,169,110,0.38)",
                }}>
                <div
                  className="magic-trace absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                />
                <a
                  href="#waitlist"
                  className="relative z-10 block w-full font-sans text-sm font-medium bg-charcoal text-parchment rounded-full px-7 py-3.5 hover:bg-gold hover:text-charcoal transition-colors duration-300 text-center">
                  Join the Waitlist
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 bg-charcoal/5 border border-charcoal/12 rounded-full px-4 py-1.5">
                <svg
                  width="12"
                  height="15"
                  viewBox="0 0 22 28"
                  fill="currentColor"
                  className="text-charcoal flex-shrink-0">
                  <path d="M18.05 14.76c-.03-3.3 2.7-4.9 2.82-4.97-1.54-2.25-3.93-2.56-4.78-2.59-2.04-.21-3.98 1.2-5.02 1.2-1.04 0-2.65-1.17-4.36-1.14C4.47 7.29 2.41 8.56 1.26 10.56-1.1 14.6.5 21.08 2.84 24.6c1.16 1.68 2.54 3.57 4.35 3.5 1.75-.07 2.41-1.13 4.53-1.13 2.11 0 2.71 1.13 4.56 1.1 1.88-.03 3.07-1.7 4.22-3.38 1.33-1.94 1.88-3.82 1.91-3.92-.04-.02-3.65-1.4-3.68-5.54l.02.03zM14.72 5.3c.96-1.17 1.61-2.79 1.43-4.41-1.38.06-3.07.93-4.06 2.07-.89 1.01-1.67 2.65-1.46 4.2 1.54.12 3.11-.78 4.09-1.86z" />
                </svg>
                <span className="font-sans text-[0.72rem] text-charcoal/80 font-medium">
                  Coming soon to iOS
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.7)}
            className="flex items-stretch justify-center md:justify-start">
            {stats.map(({ number, label }, i) => (
              <div
                key={label}
                className={`flex flex-col items-start py-1 ${
                  i > 0
                    ? "border-l border-gold-200 ml-6 pl-6 sm:ml-10 sm:pl-10"
                    : ""
                }`}>
                <span
                  className="font-sans text-gold leading-none mb-1.5"
                  style={{ fontSize: "0.48rem", letterSpacing: "0.1em" }}>
                  ✦
                </span>
                <span
                  className="font-sans font-bold text-charcoal leading-none"
                  style={{ fontSize: "clamp(19px, 2.2vw, 26px)" }}>
                  {number}
                </span>
                <span className="font-sans text-[0.58rem] text-gray-warm mt-1.5 tracking-wide uppercase">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Cal AI–style demo visual */}
        <motion.div
          className="hidden md:block relative flex-shrink-0"
          style={{ width: 520, height: 600 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}>
          <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10">
            <PhoneMockup scale={0.9}>
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/images/asap-rocky.jpg"
                  alt="ASAP Rocky street style"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ filter: "brightness(0.88) contrast(1.05)" }}
                />
                <img
                  src="/images/camera-ui.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ mixBlendMode: "screen", opacity: 0.92 }}
                />
              </div>
            </PhoneMockup>
          </div>

          {/* Annotation 1 */}
          <div
            className="absolute z-20 flex flex-col items-end gap-1.5"
            style={{ left: 0, top: 162 }}>
            <span
              className="font-sans font-medium text-charcoal uppercase text-right leading-loose"
              style={{ fontSize: "0.48rem", letterSpacing: "0.22em" }}>
              Scan any
              <br />
              outfit
            </span>
            <svg width="116" height="22" viewBox="0 0 116 22" fill="none">
              <path
                d="M3,11 C26,1 90,21 113,11"
                stroke="#C4A96E"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M108,6 L114,11 L108,16"
                stroke="#C4A96E"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Annotation 2: result card */}
          <div
            className="absolute z-20 flex flex-col items-start"
            style={{ right: 0, bottom: 10 }}>
            <svg
              width="46"
              height="42"
              viewBox="0 0 46 42"
              fill="none"
              className="self-start ml-4">
              <path
                d="M44,40 C32,24 10,26 3,8"
                stroke="#C4A96E"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M0,2 L4,10 L10,5"
                stroke="#C4A96E"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              className="rounded-2xl border border-white/5"
              style={{
                width: 180,
                background: "#181818",
                boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                padding: "14px 16px",
              }}>
              <div
                className="font-sans font-medium text-gold uppercase"
                style={{
                  fontSize: "0.44rem",
                  letterSpacing: "0.22em",
                  marginBottom: 10,
                }}>
                Identified
              </div>
              {[
                ["01", "Tie-Dye Knit"],
                ["02", "Cargo Trousers"],
                ["03", "Air Force 1"],
              ].map(([n, label]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 7,
                  }}>
                  <span
                    className="font-sans font-medium"
                    style={{
                      color: "rgba(255,255,255,0.18)",
                      fontSize: "0.38rem",
                    }}>
                    {n}
                  </span>
                  <span
                    className="font-sans"
                    style={{ color: "#F5F2EF", fontSize: "0.66rem" }}>
                    {label}
                  </span>
                </div>
              ))}
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  paddingTop: 9,
                  marginTop: 2,
                }}>
                <span
                  className="font-sans text-gold"
                  style={{ fontSize: "0.56rem" }}>
                  View &amp; shop →
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
