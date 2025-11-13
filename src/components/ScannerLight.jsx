import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Cursor-reactive light sweep that follows the pointer and adds depth to cards/sections
export default function ScannerLight({ className = '', color = 'rgba(156,27,36,0.35)', size = 280, children }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 100, damping: 20, mass: 0.2 })
  const springY = useSpring(my, { stiffness: 100, damping: 20, mass: 0.2 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mx.set(x)
      my.set(y)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <div ref={ref} className={`pointer-events-none ${className}`}>
      {children}
      <motion.div className="pointer-events-none absolute -inset-10">
        <motion.div className="absolute h-[1px] w-[1px]" style={{ x: springX, y: springY }}>
          <div
            className="-translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: size, height: size, boxShadow: `0 0 160px 40px ${color}` }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
