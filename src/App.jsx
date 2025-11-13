import { useState } from 'react'
import { motion } from 'framer-motion'
import { Beaker, Thermometer, Gauge, FlaskConical, MapPin, ShoppingBag, Instagram, Facebook, Twitter } from 'lucide-react'
import SteamParticles from './components/SteamParticles'
import ScannerButton from './components/ScannerButton'
import GlassPanel from './components/GlassPanel'
import ParallaxImage from './components/ParallaxImage'
import ExperimentModal from './components/ExperimentModal'
import ScannerLight from './components/ScannerLight'
import InteractiveMap from './components/InteractiveMap'

const colors = {
  white: '#FFFFFF',
  light: '#F3F4F6',
  gray: '#D1D5DB',
  dark: '#111827',
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
    <Section id="hero" className="grid place-items-center overflow-hidden bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <div className="absolute inset-0" style={{
        background:
          'radial-gradient(80%_60%_at_50%_20%, rgba(156,27,36,0.06), rgba(156,27,36,0)), radial-gradient(50%_60%_at_80%_40%, rgba(156,27,36,0.08), rgba(156,27,36,0))'
      }} />

      <SteamParticles density={22} color="rgba(0,0,0,0.06)" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-center text-gray-900"
        >
          Laboratorium — Where Coffee Meets Experimentation.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-4 md:mt-6 text-center text-lg md:text-xl text-gray-600"
        >
          Vintage soul, modern science.
        </motion.p>

        <div className="mt-10 flex items-center justify-center">
          <ScannerButton>Access Authorized — Enter the Lab</ScannerButton>
        </div>

        <div className="pointer-events-none select-none mt-16 grid grid-cols-3 gap-6 opacity-80">
          <IconTile Icon={Beaker} label="Glassware" />
          <IconTile Icon={Thermometer} label="Temperature" />
          <IconTile Icon={Gauge} label="Precision" />
        </div>
      </div>

      <div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 h-48 w-[110%] rounded-[50%] blur-[40px]"
        style={{ background: 'radial-gradient(50%_100%_at_50%_0%, rgba(156,27,36,0.2), rgba(156,27,36,0))' }}
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
      <div className="h-14 w-14 grid place-items-center rounded-xl border border-gray-200 bg-white">
        <Icon className="text-gray-700" size={26} />
      </div>
      <p className="text-sm text-gray-500">{label}</p>
    </motion.div>
  )
}

function Concept() {
  return (
    <Section id="concept" className="bg-white text-gray-900 py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-center">
        <div>
          <GlassPanel className="p-8">
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">The Concept</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Step into a parallel vintage future where coffee is engineered with scientific precision. Our lab blends
              light minimalism with soft industrial details. Every extraction is a controlled experiment, every cup a
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
        </div>
      </div>
    </Section>
  )
}

function Spec({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-200 p-3 bg-white">
      <p className="text-xs text-gray-500">{label}</p>
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
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)

  const onCardClick = (ex) => {
    setSelected(ex)
    setOpen(true)
  }

  return (
    <Section id="menu" className="bg-gray-50 text-gray-900 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-semibold">The Experiments</h2>
        <p className="mt-3 text-gray-600">Each drink is presented as a lab sheet with variables and diagrams.</p>

        <div className="relative">
          <ScannerLight className="absolute inset-0" color="rgba(156,27,36,0.28)" />
          <div className="relative mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((ex) => (
              <button key={ex.id} onClick={() => onCardClick(ex)} className="text-left">
                <ExperimentCard {...ex} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <ExperimentModal open={open} onOpenChange={setOpen} experiment={selected} />
    </Section>
  )
}

function ExperimentCard({ id, name, temp, acidity, aroma, intensity }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative overflow-hidden rounded-2xl border border-gray-200 p-6 bg-white"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest text-gray-500">Experiment #{id}</p>
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        </div>
        <FlaskConical className="text-gray-700" />
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
            'radial-gradient(60%_60%_at_50%_50%, rgba(156,27,36,0.08), rgba(156,27,36,0)), conic-gradient(from 0deg, rgba(0,0,0,0.04), rgba(0,0,0,0) 30%, rgba(0,0,0,0.04) 60%, rgba(0,0,0,0) 100%)'
        }}
      />
    </motion.div>
  )
}

function Space() {
  return (
    <Section id="space" className="bg-white text-gray-900 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-semibold">The Space</h2>
        <p className="mt-3 text-gray-600">Parallax gallery through our interior — light neutrals with cherry accents.</p>

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
    <Section id="merch" className="bg-gray-50 text-gray-900 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-5xl font-semibold">Merch & Beans</h2>
          <div className="flex items-center gap-3 text-gray-700"><ShoppingBag size={20}/> Shop</div>
        </div>
        <p className="mt-3 text-gray-600">Lab-grade compounds — beans and accessories with a soft industrial vibe.</p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {['Obsidian Roast','Copper Blend','Sterling Decaf'].map((label) => (
            <motion.div key={label} whileHover={{ y: -6 }} className="relative p-6 rounded-2xl border border-gray-200 overflow-hidden bg-white">
              <div className="h-48 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 grid place-items-center">
                <motion.div
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 6 }}
                  className="h-24 w-24 rounded-full"
                  style={{ background: `radial-gradient(60%_60%_at_50%_50%, ${colors.cherry}22, transparent)` }}
                />
              </div>
              <div className="mt-4">
                <p className="text-gray-500 text-xs tracking-widest">Compound</p>
                <h3 className="text-xl font-semibold text-gray-900">{label}</h3>
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
    <Section id="contact" className="bg-white text-gray-900 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-semibold">Visit the Lab</h2>
        <p className="mt-3 text-gray-600">Explore our floor plan. Click zones, drag to pan, and scroll to zoom. A pulsing cherry marker shows our exact spot.</p>

        <div className="mt-10 grid md:grid-cols-[1.2fr_1fr] gap-6 items-stretch">
          <InteractiveMap />
          <div className="grid gap-4">
            <GlassPanel className="p-6">
              <p className="text-sm text-gray-500">Hours</p>
              <p className="text-lg text-gray-900">Mon–Sat 8:00–20:00</p>
            </GlassPanel>
            <GlassPanel className="p-6">
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-lg text-gray-900">221B Alloy Ave, Sector 09</p>
            </GlassPanel>
            <div className="flex items-center gap-4 text-gray-600">
              <Instagram /> <Facebook /> <Twitter />
            </div>
          </div>
        </div>

        <p className="mt-16 text-center text-gray-400 text-sm">Soft industrial ambience playing…</p>
      </div>
    </Section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <Concept />
      <Menu />
      <Space />
      <Merch />
      <Contact />
    </div>
  )
}
