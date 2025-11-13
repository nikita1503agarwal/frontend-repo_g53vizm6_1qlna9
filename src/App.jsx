import { useState } from 'react'
import { motion } from 'framer-motion'
import { Beaker, Thermometer, Gauge, FlaskConical, MapPin, ShoppingBag, Instagram, Facebook, Twitter } from 'lucide-react'
import SteamParticles from './components/SteamParticles'
import ScannerButton from './components/ScannerButton'
import GlassPanel from './components/GlassPanel'
import ParallaxImage from './components/ParallaxImage'

const colors = {
  metal: '#8A8A8A',
  brown: '#7B5638',
  cherry: '#9C1B24'
}

function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`relative min-h-screen w-full ${className}`}>
      {children}
    </section>
  )
}

function Hero() {
  return (
    <Section id="hero" className="grid place-items-center overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#0b0b0b_0%,#0a0a0a_40%,#000_100%)] text-white">
      <div className="absolute inset-0" style={{
        background:
          'radial-gradient(80%_60%_at_50%_20%, rgba(255,255,255,0.06), rgba(255,255,255,0)), radial-gradient(50%_60%_at_80%_40%, rgba(156,27,36,0.18), rgba(156,27,36,0))'
      }} />

      <SteamParticles density={28} color="rgba(255,255,255,0.18)" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-center"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          Laboratorium — Where Coffee Meets Experimentation.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-4 md:mt-6 text-center text-lg md:text-xl text-gray-300"
        >
          Vintage soul, modern science.
        </motion.p>

        <div className="mt-10 flex items-center justify-center">
          <ScannerButton>Access Authorized — Enter the Lab</ScannerButton>
        </div>

        <div className="pointer-events-none select-none mt-16 grid grid-cols-3 gap-6 opacity-70">
          <IconTile Icon={Beaker} label="Glassware" />
          <IconTile Icon={Thermometer} label="Temperature" />
          <IconTile Icon={Gauge} label="Precision" />
        </div>
      </div>

      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 h-48 w-[110%] rounded-[50%] blur-[40px]"
        style={{ background: 'radial-gradient(50%_100%_at_50%_0%, rgba(156,27,36,0.35), rgba(156,27,36,0))' }}
      />
    </Section>
  )
}

function IconTile({ Icon, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="h-14 w-14 grid place-items-center rounded-xl border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <Icon className="text-white" size={26} />
      </div>
      <p className="text-sm text-gray-400">{label}</p>
    </motion.div>
  )
}

function Concept() {
  return (
    <Section id="concept" className="bg-[#0a0a0a] text-white py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-center">
        <div>
          <GlassPanel className="p-8">
            <h2 className="text-3xl md:text-5xl font-semibold">The Concept</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Step into a parallel vintage future where coffee is engineered with scientific precision. Our lab blends
              aged leather warmth with metallic minimalism. Every extraction is a controlled experiment, every cup a
              calibrated result.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <Spec label="Temperature" value="93°C" />
              <Spec label="Roast" value="Medium" />
              <Spec label="Extraction" value="27s" />
            </div>
          </GlassPanel>
        </div>
        <div className="relative">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
            alt="Interior"
            intensity={32}
            className="h-[420px]"
          />
          <SteamParticles density={18} className="mix-blend-screen" />
        </div>
      </div>
    </Section>
  )
}

function Spec({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-lg" style={{ color: colors.cherry }}>{value}</p>
    </div>
  )
}

const experiments = [
  { id: '001', name: 'Espresso', temp: '93°C', acidity: 'Low', aroma: 'Dark Chocolate', intensity: 'High' },
  { id: '002', name: 'Pour Over', temp: '92°C', acidity: 'Medium', aroma: 'Citrus & Floral', intensity: 'Medium' },
  { id: '003', name: 'Cold Brew', temp: '4°C', acidity: 'Low', aroma: 'Caramel', intensity: 'Smooth' },
  { id: '004', name: 'Nitro', temp: '4°C', acidity: 'Low', aroma: 'Velvety', intensity: 'Dense' },
]

function Menu() {
  return (
    <Section id="menu" className="bg-[#0b0b0b] text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-semibold">The Experiments</h2>
        <p className="mt-3 text-gray-400">Each drink is presented as a lab sheet with variables and molecular diagrams.</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((ex) => (
            <ExperimentCard key={ex.id} {...ex} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function ExperimentCard({ id, name, temp, acidity, aroma, intensity }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 p-6"
      style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest text-gray-400">Experiment #{id}</p>
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        <FlaskConical className="text-white/70" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Spec label="Temperature" value={temp} />
        <Spec label="Acidity" value={acidity} />
        <Spec label="Aroma" value={aroma} />
        <Spec label="Intensity" value={intensity} />
      </div>
      <motion.div
        className="absolute -inset-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{
          background:
            'radial-gradient(60%_60%_at_50%_50%, rgba(156,27,36,0.12), rgba(156,27,36,0)), conic-gradient(from 0deg, rgba(255,255,255,0.08), rgba(255,255,255,0) 30%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0) 100%)'
        }}
      />
    </motion.div>
  )
}

function Space() {
  return (
    <Section id="space" className="bg-[#0a0a0a] text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-semibold">The Space</h2>
        <p className="mt-3 text-gray-400">Parallax gallery through our interior — vintage meets steel with cherry-red accents.</p>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600&auto=format&fit=crop"
            alt="Counter"
            intensity={26}
            className="h-[380px]"
          />
          <ParallaxImage
            src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop"
            alt="Vintage"
            intensity={36}
            className="h-[380px]"
          />
        </div>
      </div>
    </Section>
  )
}

function Merch() {
  return (
    <Section id="merch" className="bg-[#0b0b0b] text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-5xl font-semibold">Merch & Beans</h2>
          <div className="flex items-center gap-3 text-gray-300"><ShoppingBag size={20}/> Shop</div>
        </div>
        <p className="mt-3 text-gray-400">Lab-grade compounds — beans and accessories revealed like holograms.</p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {['Obsidian Roast','Copper Blend','Sterling Decaf'].map((label, i) => (
            <motion.div key={label} whileHover={{ y: -6 }} className="relative p-6 rounded-2xl border border-white/10 overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' }}>
              <div className="h-48 rounded-xl bg-gradient-to-br from-neutral-700 to-neutral-900 border border-white/10 grid place-items-center">
                <motion.div
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 6 }}
                  className="h-24 w-24 rounded-full"
                  style={{ background: `radial-gradient(60%_60%_at_50%_50%, ${colors.cherry}33, transparent)` }}
                />
              </div>
              <div className="mt-4">
                <p className="text-gray-400 text-xs tracking-widest">Compound</p>
                <h3 className="text-xl font-semibold">{label}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" className="bg-[#0a0a0a] text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-semibold">Visit the Lab</h2>
        <p className="mt-3 text-gray-400">Find us via a lab-styled floor plan. Pulsing red indicators show our exact location.</p>

        <div className="mt-10 grid md:grid-cols-[1.2fr_1fr] gap-6 items-stretch">
          <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' }}>
            <div className="absolute inset-0 grid place-items-center text-gray-400">
              <MapPin className="text-white" />
              <p className="mt-2">Interactive map placeholder</p>
            </div>
            <motion.div
              className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
              animate={{ boxShadow: [`0 0 0 0 ${colors.cherry}66`, `0 0 0 20px ${colors.cherry}00`], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ border: `2px solid ${colors.cherry}` }}
            />
          </div>
          <div className="grid gap-4">
            <GlassPanel className="p-6">
              <p className="text-sm text-gray-300">Hours</p>
              <p className="text-lg">Mon–Sat 8:00–20:00</p>
            </GlassPanel>
            <GlassPanel className="p-6">
              <p className="text-sm text-gray-300">Address</p>
              <p className="text-lg">221B Alloy Ave, Sector 09</p>
            </GlassPanel>
            <div className="flex items-center gap-4 text-gray-300">
              <Instagram /> <Facebook /> <Twitter />
            </div>
          </div>
        </div>

        <p className="mt-16 text-center text-gray-500 text-sm">Soft industrial ambience playing…</p>
      </div>
    </Section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Concept />
      <Menu />
      <Space />
      <Merch />
      <Contact />
    </div>
  )
}
