import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ParallaxImage({ src, alt = '', intensity = 40, className = '', overlay = true }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-intensity, intensity])

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-2xl ${className}`}>
      <motion.img src={src} alt={alt} className="w-full h-full object-cover" style={{ y }} />
      {overlay && (
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.45))'
        }} />
      )}
    </div>
  )
}
