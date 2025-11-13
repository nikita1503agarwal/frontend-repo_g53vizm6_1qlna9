import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const clamp = (num, min, max) => Math.max(min, Math.min(num, max))

export default function BerzeliusGlass({ className = '' }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const { scrollY } = useScroll()
  // Spin continuously as you scroll; not clamped so it keeps spinning
  const spin = useTransform(scrollY, [0, 1200], [0, 540], { clamp: false })

  // Smoothen interactions
  const rX = useSpring(tilt.x, { stiffness: 120, damping: 14, mass: 0.6 })
  const rY = useSpring(tilt.y, { stiffness: 120, damping: 14, mass: 0.6 })
  const rZ = useSpring(spin, { stiffness: 60, damping: 14, mass: 0.8 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width // 0..1
    const py = (e.clientY - rect.top) / rect.height // 0..1
    const tx = (py - 0.5) * -24 // rotateX, invert Y to feel natural
    const ty = (px - 0.5) * 24  // rotateY
    setTilt({ x: clamp(tx, -16, 16), y: clamp(ty, -16, 16) })
  }

  const handleLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div className={`relative mx-auto ${className}`}>
      {/* Ground shadow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-6 h-6 w-56 rounded-full"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 60%, rgba(0,0,0,0) 100%)',
          filter: 'blur(4px)'
        }}
      />

      {/* Soft cherry glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(40% 40% at 50% 30%, rgba(156,27,36,0.12) 0%, rgba(156,27,36,0.06) 40%, rgba(156,27,36,0) 70%)'
        }}
      />

      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative grid place-items-center"
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="relative select-none"
          style={{
            transformStyle: 'preserve-3d',
            rotateX: rX,
            rotateY: rY,
            rotateZ: rZ,
          }}
          initial={{ scale: 0.96, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <BeakerSVG tiltX={rX} tiltY={rY} />
        </motion.div>
      </div>
    </div>
  )
}

function BeakerSVG({ tiltX, tiltY }) {
  // Liquid slosh follows tilt, slightly delayed
  const sloshX = useSpring(tiltY, { stiffness: 80, damping: 12, mass: 0.7 })
  const sloshY = useSpring(tiltX, { stiffness: 80, damping: 12, mass: 0.7 })

  return (
    <svg width="360" height="360" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glass outline - Berzelius style tall beaker with slight shoulder */}
      <defs>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F3F4F6" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6B7280" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="cherry" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9C1B24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9C1B24" stopOpacity="0.7" />
        </linearGradient>
        <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset dx="0" dy="1" />
          <feGaussianBlur stdDeviation="2" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="#000" floodOpacity="0.08" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>

      {/* Body */}
      <g filter="url(#innerShadow)">
        <path d="M110 52 h140 c8 0 12 4 12 10 v16 c0 10-8 18-18 18 H116 c-10 0-18-8-18-18 V62 c0-6 4-10 12-10 z" fill="url(#rimGrad)" opacity="0.3"/>
        <path d="M118 96 h124 c10 0 18 8 18 18 v146 c0 26-22 48-48 48 H148 c-26 0-48-22-48-48 V114 c0-10 8-18 18-18 z" fill="url(#glassGrad)" stroke="#E5E7EB" strokeWidth="2"/>
      </g>

      {/* Measurement ticks */}
      <g stroke="#D1D5DB" strokeWidth="2">
        <line x1="138" y1="124" x2="158" y2="124" />
        <line x1="138" y1="148" x2="170" y2="148" />
        <line x1="138" y1="172" x2="158" y2="172" />
        <line x1="138" y1="196" x2="170" y2="196" />
        <line x1="138" y1="220" x2="158" y2="220" />
        <line x1="138" y1="244" x2="170" y2="244" />
      </g>

      {/* Liquid */}
      <motion.g style={{ x: sloshX, y: sloshY }}>
        <motion.path
          d="M130 230 C150 220, 210 220, 230 230 L230 280 Q180 300 130 280 Z"
          fill="url(#cherry)"
          initial={{ d: 'M130 230 C150 220, 210 220, 230 230 L230 280 Q180 300 130 280 Z' }}
          animate={{ d: ['M130 230 C150 222, 210 218, 230 230 L230 280 Q180 300 130 280 Z', 'M130 230 C150 218, 210 222, 230 230 L230 280 Q180 300 130 280 Z', 'M130 230 C150 222, 210 218, 230 230 L230 280 Q180 300 130 280 Z'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          opacity="0.9"
        />
        <path d="M134 242 Q180 228 226 242" stroke="#FCA5A5" strokeOpacity="0.55" strokeWidth="2" fill="none"/>
      </motion.g>

      {/* Highlights */}
      <g>
        <path d="M204 116 Q216 150 210 184" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round"/>
        <path d="M204 196 Q206 214 202 226" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round"/>
      </g>

      {/* Label */}
      <text x="178" y="150" textAnchor="middle" fontSize="12" fill="#6B7280" style={{ letterSpacing: 2 }}>LABORATORIUM</text>
    </svg>
  )
}
