import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'

export default function HeroBeaker({ className = '' }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const { scrollY } = useScroll()
  const spin = useTransform(scrollY, [0, 1000], [0, 720], { clamp: false })
  const rZ = useSpring(spin, { stiffness: 50, damping: 14, mass: 0.8 })
  const rX = useSpring(tilt.x, { stiffness: 120, damping: 14, mass: 0.6 })
  const rY = useSpring(tilt.y, { stiffness: 120, damping: 14, mass: 0.6 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const tx = (y - 0.5) * -24
    const ty = (x - 0.5) * 24
    setTilt({ x: Math.max(-16, Math.min(16, tx)), y: Math.max(-16, Math.min(16, ty)) })
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} className={`relative ${className}`} style={{ perspective: 1000 }}>
      <motion.div
        className="mx-auto"
        style={{ rotateX: rX, rotateY: rY, rotateZ: rZ, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <BerzeliusSVG />
      </motion.div>
    </div>
  )
}

function BerzeliusSVG() {
  return (
    <svg width="360" height="360" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F3F4F6" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="cherry" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9C1B24" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#9C1B24" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Rim */}
      <path d="M110 52 h140 c8 0 12 4 12 10 v16 c0 10-8 18-18 18 H116 c-10 0-18-8-18-18 V62 c0-6 4-10 12-10 z" fill="#9CA3AF" opacity="0.28"/>
      {/* Body */}
      <rect x="118" y="96" width="124" height="214" rx="34" fill="url(#g1)" stroke="#E5E7EB" strokeWidth="2" />
      {/* Ticks */}
      <g stroke="#D1D5DB" strokeWidth="2">
        <line x1="138" y1="124" x2="158" y2="124" />
        <line x1="138" y1="148" x2="170" y2="148" />
        <line x1="138" y1="172" x2="158" y2="172" />
        <line x1="138" y1="196" x2="170" y2="196" />
        <line x1="138" y1="220" x2="158" y2="220" />
        <line x1="138" y1="244" x2="170" y2="244" />
      </g>
      {/* Liquid */}
      <path d="M130 230 C150 220, 210 220, 230 230 L230 280 Q180 300 130 280 Z" fill="url(#cherry)" opacity="0.9"/>
      <path d="M134 242 Q180 228 226 242" stroke="#FCA5A5" strokeOpacity="0.55" strokeWidth="2" fill="none"/>
      {/* Label */}
      <text x="178" y="150" textAnchor="middle" fontSize="12" fill="#6B7280" style={{ letterSpacing: 2 }}>LABORATORIUM</text>
    </svg>
  )
}
