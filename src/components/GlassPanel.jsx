import { motion } from 'framer-motion'

export default function GlassPanel({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`backdrop-blur-xl/5 bg-white/5 border border-white/10 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.25)] ${className}`}
      style={{
        background:
          'linear-gradient( to bottom right, rgba(255,255,255,0.06), rgba(255,255,255,0.02) )',
        borderColor: 'rgba(255,255,255,0.12)'
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl opacity-[0.15] pointer-events-none" style={{
          background: 'radial-gradient(60% 80% at 10% 0%, rgba(156,27,36,0.6), rgba(156,27,36,0) 70%)'
        }} />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  )
}
