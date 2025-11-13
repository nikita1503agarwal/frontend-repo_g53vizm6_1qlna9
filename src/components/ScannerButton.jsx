import { motion } from 'framer-motion'

export default function ScannerButton({ children = 'Enter the Lab', onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative inline-flex items-center justify-center px-8 py-3 rounded-full text-sm tracking-wider font-semibold text-white overflow-hidden"
      style={{
        background:
          'radial-gradient(80% 120% at 50% 10%, rgba(156,27,36,0.9) 0%, rgba(156,27,36,0.65) 40%, rgba(156,27,36,0.35) 100%)',
        boxShadow:
          '0 0 20px rgba(156,27,36,0.35), inset 0 0 10px rgba(255,255,255,0.08)'
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        style={{
          background:
            'repeating-linear-gradient( to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 4px, rgba(255,255,255,0.06) 5px )'
        }}
      />
      <motion.span
        className="absolute -inset-x-10 -inset-y-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, rgba(156,27,36,0.0), rgba(156,27,36,0.25), rgba(156,27,36,0.0) 55%)'
        }}
      />
    </motion.button>
  )
}
