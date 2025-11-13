import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// Subtle steam/particle field that reacts to cursor
export default function SteamParticles({ className = '', density = 24, color = 'rgba(255,255,255,0.3)' }) {
  const containerRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-6, 6])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mx.set(x - 0.5)
      my.set(y - 0.5)
    }
    el.addEventListener('mousemove', handleMove)
    return () => el.removeEventListener('mousemove', handleMove)
  }, [mx, my])

  const particles = Array.from({ length: density })

  return (
    <motion.div
      ref={containerRef}
      style={{ perspective: 800, rotateX, rotateY }}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map((_, i) => {
        const delay = Math.random() * 4
        const left = Math.random() * 100
        const size = 8 + Math.random() * 24
        const duration = 6 + Math.random() * 6
        const blur = 2 + Math.random() * 6
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 0.6, 0], y: [-10, -60 - Math.random() * 60] }}
            transition={{ duration, repeat: Infinity, delay, ease: 'easeOut' }}
            style={{ left: `${left}%`, width: size, height: size, filter: `blur(${blur}px)`, background: color }}
            className="absolute bottom-[-10%] rounded-full"
          />
        )
      })}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(156,27,36,0.08)] to-transparent" />
    </motion.div>
  )
}
