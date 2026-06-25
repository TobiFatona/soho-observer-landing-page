import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const PARCHMENT = '#F5F2EF'

function fadeUp(delay) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  }
}

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 4,
  opacity: Math.random() * 0.45 + 0.18,
}))

const RIPPLE_COUNT = 4

function GoldParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none leading-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            color: '#C4A96E',
            opacity: p.opacity,
          }}
          animate={{
            opacity: [p.opacity * 0.3, p.opacity, p.opacity * 0.3],
            scale: [0.6, 1, 0.6],
            y: [0, -8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  )
}

function RippleRings({ isHovered }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {Array.from({ length: RIPPLE_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ border: '1px solid rgba(196,169,110,0.18)' }}
          animate={{
            width: ['90px', '600px'],
            height: ['54px', '360px'],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: isHovered ? 2.4 : 4,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * (isHovered ? 0.6 : 1),
          }}
        />
      ))}
    </div>
  )
}

// Chroma-key compositor using WebGL — the fragment shader runs the green-screen
// removal entirely on the GPU (no JS pixel loops, no CPU↔GPU readback via
// getImageData). texImage2D(video) uploads each frame as a texture directly.
// Falls back to Canvas 2D on the rare browser that lacks WebGL.
function ChromaVideo({ width = 340 }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    let stopped = false, rafId = null, vfcId = null

    // ── WebGL path (GPU — runs in ~0.2 ms vs ~15 ms for Canvas 2D on mobile) ──
    const gl =
      canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false }) ||
      canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false })

    if (gl) {
      const mkShader = (type, src) => {
        const sh = gl.createShader(type)
        gl.shaderSource(sh, src)
        gl.compileShader(sh)
        return sh
      }
      const prog = gl.createProgram()
      gl.attachShader(prog, mkShader(gl.VERTEX_SHADER,
        'attribute vec2 a_pos;attribute vec2 a_uv;varying vec2 v_uv;' +
        'void main(){gl_Position=vec4(a_pos,0.,1.);v_uv=a_uv;}'
      ))
      gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER,
        'precision mediump float;uniform sampler2D u_tex;varying vec2 v_uv;' +
        'void main(){' +
        // Flip V: WebGL origin is bottom-left, video pixels are top-left
        '  vec4 c=texture2D(u_tex,vec2(v_uv.x,1.-v_uv.y));' +
        '  float r=c.r,g=c.g,b=c.b;' +
        '  float gness=g-max(r,b);' +
        // Smooth alpha: opaque below 40/255, transparent above 95/255
        '  float alpha=1.-smoothstep(.157,.373,gness);' +
        // De-spill: pull green fringe toward neutral
        '  float dg=min(g,(r+b)*.5);' +
        // Per-channel gamma lift toward theme gold (R÷1.45, G÷1.9, B÷2.7)
        '  gl_FragColor=vec4(pow(r,.6897),pow(dg,.5263),pow(b,.3704),alpha);' +
        '}'
      ))
      gl.linkProgram(prog)
      gl.useProgram(prog)

      // Full-screen quad: interleaved pos(x,y) uv(u,v)
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1,-1, 0,0,  1,-1, 1,0,  -1,1, 0,1,  1,1, 1,1,
      ]), gl.STATIC_DRAW)
      const aPos = gl.getAttribLocation(prog, 'a_pos')
      const aUV  = gl.getAttribLocation(prog, 'a_uv')
      gl.enableVertexAttribArray(aPos)
      gl.enableVertexAttribArray(aUV)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0)
      gl.vertexAttribPointer(aUV,  2, gl.FLOAT, false, 16, 8)

      const tex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

      let sized = false
      const draw = () => {
        if (stopped || video.readyState < 2) return
        if (!sized && video.videoWidth) {
          canvas.width  = video.videoWidth
          canvas.height = video.videoHeight
          gl.viewport(0, 0, canvas.width, canvas.height)
          sized = true
        }
        if (!sized) return
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }

      const loopVFC = () => { draw(); vfcId = video.requestVideoFrameCallback(loopVFC) }
      const loopRAF = () => { draw(); rafId = requestAnimationFrame(loopRAF) }

      const start = () => {
        video.play().catch(() => {})
        if ('requestVideoFrameCallback' in video) vfcId = video.requestVideoFrameCallback(loopVFC)
        else rafId = requestAnimationFrame(loopRAF)
      }

      if (video.readyState >= 2) start()
      else video.addEventListener('loadeddata', start, { once: true })

      return () => {
        stopped = true
        video.removeEventListener('loadeddata', start)
        if (rafId) cancelAnimationFrame(rafId)
        if (vfcId && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(vfcId)
      }
    }

    // ── Canvas 2D fallback (CPU path, kept for no-WebGL environments) ─────────
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const LOW = 40, HIGH = 95, RANGE = HIGH - LOW
    const buildLut = (gamma) => {
      const lut = new Uint8ClampedArray(256)
      for (let v = 0; v < 256; v++) lut[v] = 255 * Math.pow(v / 255, 1 / gamma)
      return lut
    }
    const rLut = buildLut(1.45), gLut = buildLut(1.9), bLut = buildLut(2.7)
    let cw = 0, ch = 0

    const setup2d = () => {
      const vw = video.videoWidth, vh = video.videoHeight
      if (!vw || !vh) return false
      const s = Math.min(1, 512 / Math.max(vw, vh))
      cw = Math.round(vw * s); ch = Math.round(vh * s)
      canvas.width = cw; canvas.height = ch
      return true
    }

    const draw2d = () => {
      if (stopped || (!cw && !setup2d())) return
      ctx.drawImage(video, 0, 0, cw, ch)
      const frame = ctx.getImageData(0, 0, cw, ch), d = frame.data
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2]
        const gness = g - (r > b ? r : b)
        const half = (r + b) >> 1
        if (g > half) d[i + 1] = half
        if (gness > LOW) d[i + 3] = gness >= HIGH ? 0 : Math.round(255 * (1 - (gness - LOW) / RANGE))
        d[i] = rLut[d[i]]; d[i + 1] = gLut[d[i + 1]]; d[i + 2] = bLut[d[i + 2]]
      }
      ctx.putImageData(frame, 0, 0)
    }

    const loopVFC2 = () => { draw2d(); vfcId = video.requestVideoFrameCallback(loopVFC2) }
    const loopRAF2 = () => { draw2d(); rafId = requestAnimationFrame(loopRAF2) }

    const start2d = () => {
      setup2d()
      video.play().catch(() => {})
      if ('requestVideoFrameCallback' in video) vfcId = video.requestVideoFrameCallback(loopVFC2)
      else rafId = requestAnimationFrame(loopRAF2)
    }

    if (video.readyState >= 2) start2d()
    else video.addEventListener('loadeddata', start2d, { once: true })

    return () => {
      stopped = true
      video.removeEventListener('loadeddata', start2d)
      if (rafId) cancelAnimationFrame(rafId)
      if (vfcId && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(vfcId)
    }
  }, [])

  return (
    <>
      <video
        ref={videoRef}
        src="/images/observe_eye.mp4"
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0, top: -9999, left: -9999, pointerEvents: 'none' }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ width, height: 'auto', display: 'block' }}
      />
    </>
  )
}

function HeroEye({ mouseX, mouseY }) {
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useTransform(mouseY, [-1, 1], [5, -5])
  const rotateY = useTransform(mouseX, [-1, 1], [-5, 5])

  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 18 })
  const springRotateY = useSpring(rotateY, { stiffness: 60, damping: 18 })

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient gold glow — the "goldish hue coming from the eye" */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 'min(82vw, 660px)',
          height: 'min(56vh, 460px)',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(196,169,110,0.30) 0%, rgba(196,169,110,0.12) 42%, transparent 70%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
        }}
        animate={{
          opacity: isHovered ? [0.7, 1, 0.7] : [0.5, 0.78, 0.5],
          scale: isHovered ? [1, 1.08, 1] : [1, 1.04, 1],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ripple rings */}
      <RippleRings isHovered={isHovered} />

      {/* 3D floating eye */}
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -12, 4, -8, 0],
          x: [0, 4, -3, 6, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.04 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative cursor-pointer pointer-events-auto"
      >
        {/* Drop shadow / bloom */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            inset: -30,
            background: 'radial-gradient(ellipse at 50% 55%, rgba(196,169,110,0.50) 0%, transparent 65%)',
            filter: 'blur(22px)',
          }}
          animate={{
            opacity: isHovered ? [0.7, 1, 0.7] : [0.45, 0.66, 0.45],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Live green-screened rotating eye video — sized like the reference play button */}
        <ChromaVideo width="clamp(260px, 60vw, 470px)" />

        {/* Hover: extra bloom overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(247,224,122,0.16) 0%, transparent 65%)',
                filter: 'blur(8px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function AppStoreBadge() {
  return (
    <div
      className="inline-flex items-center gap-3 rounded-xl"
      style={{
        background: '#000',
        border: '1px solid rgba(255,255,255,0.2)',
        padding: '10px 18px',
      }}
    >
      {/* Apple logo — Font Awesome path, well-tested at small sizes */}
      <svg
        width="15"
        height="19"
        viewBox="0 0 384 512"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <div
        className="flex flex-col items-start"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif' }}
      >
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.62)', letterSpacing: '0.02em', lineHeight: 1.3 }}>
          Coming Soon to the
        </span>
        <span style={{ fontSize: 19, color: 'white', fontWeight: 600, lineHeight: 1.2 }}>
          App Store
        </span>
      </div>
    </div>
  )
}

function WaitlistCTA() {
  const anchorRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!anchorRef.current || !glowRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(circle 90px at ${x}px ${y}px, rgba(196,169,110,0.45) 0%, rgba(196,169,110,0.15) 55%, transparent 100%)`
    glowRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }

  return (
    <div className="relative w-full">
      <motion.div
        className="absolute -inset-4 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(196,169,110,0.50) 0%, rgba(196,169,110,0.20) 45%, transparent 70%)',
          filter: 'blur(18px)',
        }}
        animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.04, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="relative rounded-full overflow-hidden w-full"
        style={{ padding: 2, background: 'rgba(196,169,110,0.45)' }}
      >
        <div className="magic-trace absolute inset-0 pointer-events-none" aria-hidden="true" />
        <a
          ref={anchorRef}
          href="#waitlist"
          onClick={() => window.dispatchEvent(new CustomEvent('soho:switch-to-join'))}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative z-10 block w-full text-center font-sans text-sm font-semibold bg-black text-white rounded-full px-7 py-3.5 cursor-pointer overflow-hidden"
        >
          <span
            ref={glowRef}
            aria-hidden="true"
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
          />
          <span className="relative z-10">Join the Waitlist</span>
        </a>
      </div>
    </div>
  )
}

function SpotlightText({ children, baseColor, brightColor, glowColor, radius = 130 }) {
  const containerRef = useRef(null)
  const overlayRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!overlayRef.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, black 15%, rgba(0,0,0,0.5) 55%, transparent 100%)`
    overlayRef.current.style.WebkitMaskImage = mask
    overlayRef.current.style.maskImage = mask
    overlayRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '0'
  }

  return (
    <span
      ref={containerRef}
      style={{ position: 'relative', display: 'block', color: baseColor, pointerEvents: 'auto' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <span
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          opacity: 0,
          color: brightColor,
          textShadow: `0 0 22px ${glowColor}, 0 0 55px ${glowColor}`,
          pointerEvents: 'none',
          transition: 'opacity 0.25s ease',
        }}
      >
        {children}
      </span>
    </span>
  )
}

const SUBHEAD =
  'Welcome to Soho Observer — the AI-powered fashion discovery app that identifies every piece in an outfit from photo or saved image. Instantly see the brand, price, and where to buy it, then explore curated alternatives across luxury and premium affordable tiers.'

export default function Hero() {
  const sectionRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const eyeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.42], [1, 1, 0])
  const eyeScale = useTransform(scrollYProgress, [0, 0.42], [1, 0.9])
  const eyeVisibility = useTransform(scrollYProgress, (v) => (v >= 0.42 ? 'hidden' : 'visible'))

  useEffect(() => {
    let rafId
    const onMove = (e) => {
      rafId = requestAnimationFrame(() => {
        const w = window.innerWidth
        const h = window.innerHeight
        mouseX.set((e.clientX - w / 2) / (w / 2))
        mouseY.set((e.clientY - h / 2) / (h / 2))
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [mouseX, mouseY])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* ── Cinematic background ── */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        {/* Central gold hue radiating from the eye */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 'min(125vw, 1200px)',
            height: 'min(125vh, 1200px)',
            background:
              'radial-gradient(ellipse at center, rgba(196,169,110,0.22) 0%, rgba(196,169,110,0.09) 28%, rgba(196,169,110,0.03) 46%, transparent 64%)',
            filter: 'blur(12px)',
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 46%, rgba(0,0,0,0.58) 100%)' }}
        />
      </div>

      <GoldParticles />

      {/* ── Fixed, viewport-centred eye — stays put on scroll ── */}
      <motion.div
        className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none"
        style={{ opacity: eyeOpacity, scale: eyeScale, visibility: eyeVisibility }}
      >
        <div>
          <HeroEye mouseX={mouseX} mouseY={mouseY} />
        </div>
      </motion.div>

      {/* ── Desktop foreground: words flank the eye ── */}
      <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none">
        <motion.h1
          {...fadeUp(0.1)}
          className="absolute font-condensed font-semibold tracking-tight leading-[0.9]"
          style={{ top: '18%', left: '13vw', fontSize: 'clamp(44px, 6.5vw, 96px)' }}
        >
          <SpotlightText
            baseColor="rgba(245,242,239,0.6)"
            brightColor="rgba(245,242,239,1)"
            glowColor="rgba(255,255,255,0.5)"
            radius={150}
          >
            <span className="block">From Inspiration</span>
            <span className="block">to Discovery</span>
          </SpotlightText>
        </motion.h1>

        <motion.p
          {...fadeUp(0.4)}
          className="absolute font-sans"
          style={{ top: '46%', left: '13vw', maxWidth: 340, fontSize: 15, lineHeight: 1.6 }}
        >
          <SpotlightText
            baseColor="rgba(245,242,239,0.62)"
            brightColor="rgba(245,242,239,0.95)"
            glowColor="rgba(255,255,255,0.35)"
            radius={100}
          >
            {SUBHEAD}
          </SpotlightText>
        </motion.p>

        {/* Bottom right — above CTA cluster */}
        <motion.h2
          {...fadeUp(0.28)}
          className="absolute font-condensed font-semibold tracking-tight leading-[0.9] text-right"
          style={{ bottom: '28%', right: '13vw', fontSize: 'clamp(36px, 5.5vw, 80px)', maxWidth: '42vw' }}
        >
          <SpotlightText
            baseColor="rgba(196,169,110,0.6)"
            brightColor="rgba(210,182,120,1)"
            glowColor="rgba(196,169,110,0.65)"
            radius={140}
          >
            <span className="block">Unlock your fashion</span>
            <span className="block">potential</span>
          </SpotlightText>
        </motion.h2>

        {/* CTA cluster — outer div handles centering so framer-motion y-animation
            doesn't fight CSS translateX(-50%). Width is shared by both children. */}
        <div
          className="absolute pointer-events-none"
          style={{ bottom: '12%', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}
        >
          <motion.div
            {...fadeUp(0.55)}
            className="flex flex-col items-center gap-3 pointer-events-auto"
            style={{ width: 240 }}
          >
            <WaitlistCTA />
            <AppStoreBadge />
          </motion.div>
        </div>
      </div>

      {/* ── Mobile foreground: mirrors desktop — H1 top-left, H2 bottom-right, CTAs bottom-centre ── */}
      <div className="lg:hidden absolute inset-0 z-20 pointer-events-none">

        {/* H1 — top-left, above the eye */}
        <motion.h1
          {...fadeUp(0.1)}
          className="absolute font-condensed font-semibold tracking-tight leading-[0.95]"
          style={{ top: '17vh', left: '6vw', maxWidth: '55vw', fontSize: 'clamp(32px, 8.5vw, 50px)' }}
        >
          <SpotlightText
            baseColor="rgba(245,242,239,0.6)"
            brightColor="rgba(245,242,239,1)"
            glowColor="rgba(255,255,255,0.5)"
            radius={130}
          >
            <span className="block">From Inspiration</span>
            <span className="block">to Discovery</span>
          </SpotlightText>
        </motion.h1>

        {/* H2 — bottom-right, below the eye, mirrors desktop */}
        <motion.h2
          {...fadeUp(0.28)}
          className="absolute font-condensed font-semibold tracking-tight leading-[0.95] text-right"
          style={{ bottom: '30vh', right: '6vw', maxWidth: '55vw', fontSize: 'clamp(28px, 8vw, 46px)' }}
        >
          <SpotlightText
            baseColor="rgba(196,169,110,0.6)"
            brightColor="rgba(210,182,120,1)"
            glowColor="rgba(196,169,110,0.65)"
            radius={120}
          >
            <span className="block">Unlock your fashion</span>
            <span className="block">potential</span>
          </SpotlightText>
        </motion.h2>

        {/* CTAs — bottom-centre */}
        <div
          className="absolute pointer-events-none flex justify-center"
          style={{ bottom: '8vh', left: 0, right: 0 }}
        >
          <motion.div
            {...fadeUp(0.55)}
            className="flex flex-col items-center gap-3 pointer-events-auto w-full max-w-[240px]"
          >
            <WaitlistCTA />
            <AppStoreBadge />
          </motion.div>
        </div>

      </div>

    </section>
  )
}
