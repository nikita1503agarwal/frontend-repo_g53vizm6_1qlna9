import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'
import { X, Thermometer, Timer, Droplets, Beaker } from 'lucide-react'

const colors = {
  cherry: '#9C1B24'
}

export default function ExperimentModal({ open, onOpenChange, experiment }) {
  if (!experiment) return null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 text-white"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 opacity-20" style={{
                background: 'radial-gradient(60% 80% at 10% 0%, rgba(156,27,36,0.6), rgba(156,27,36,0) 70%)'
              }} />
              <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-0">
                <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs tracking-widest text-gray-400">Experiment #{experiment.id}</p>
                      <h3 className="mt-1 text-2xl font-semibold">{experiment.name}</h3>
                    </div>
                    <Beaker className="text-white/70" />
                  </div>
                  <div className="mt-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10">
                    <div className="h-full w-full bg-gradient-to-br from-neutral-700 to-neutral-900 grid place-items-center">
                      <motion.div
                        animate={{ rotate: [0, 2, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 8 }}
                        className="h-28 w-28 rounded-full"
                        style={{ background: `radial-gradient(60% 60% at 50% 50%, ${colors.cherry}33, transparent)` }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                    <Spec label="Temperature" value={experiment.temp} Icon={Thermometer} />
                    <Spec label="Extraction" value={experiment.extraction || '27s'} Icon={Timer} />
                    <Spec label="TDS" value={experiment.tds || '8.9%'} Icon={Droplets} />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <Tabs.Root defaultValue="profile">
                    <Tabs.List className="flex gap-2">
                      <Tab value="profile" label="Profile" />
                      <Tab value="curve" label="Curve" />
                      <Tab value="notes" label="Notes" />
                    </Tabs.List>
                    <div className="mt-4">
                      <Tabs.Content value="profile">
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {experiment.name} prepared with lab precision. Expect {experiment.aroma.toLowerCase()} on the nose,
                          {` ${experiment.acidity.toLowerCase()} acidity`}, and a {String(experiment.intensity).toLowerCase()} body.
                        </p>
                      </Tabs.Content>
                      <Tabs.Content value="curve">
                        <div className="h-40 rounded-xl border border-white/10 overflow-hidden relative">
                          <CurveViz />
                        </div>
                        <p className="mt-3 text-xs text-gray-400">Extraction curve — temperature ramp and flow dynamics schematic.</p>
                      </Tabs.Content>
                      <Tabs.Content value="notes">
                        <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                          <li>Grind: medium-fine</li>
                          <li>Ratio: 1:2</li>
                          <li>Preinfusion: 5s</li>
                          <li>Pressure profile: declining</li>
                        </ul>
                      </Tabs.Content>
                    </div>
                  </Tabs.Root>
                </div>
              </div>
              <Dialog.Close asChild>
                <button className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:bg-white/10">
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function Tab({ value, label }) {
  return (
    <Tabs.Trigger
      value={value}
      className="px-3 py-1.5 text-sm rounded-md border border-white/10 data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-300 hover:bg-white/5"
    >
      {label}
    </Tabs.Trigger>
  )
}

function Spec({ label, value, Icon }) {
  return (
    <div className="rounded-lg border border-white/10 p-3 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
      {Icon && <Icon size={16} className="text-white/70" />}
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm" style={{ color: colors.cherry }}>{value}</p>
      </div>
    </div>
  )
}

function CurveViz() {
  return (
    <svg viewBox="0 0 300 140" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(156,27,36,0.0)" />
          <stop offset="50%" stopColor="rgba(156,27,36,0.6)" />
          <stop offset="100%" stopColor="rgba(156,27,36,0.0)" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="rgba(255,255,255,0.02)" />
      <g>
        <polyline
          fill="none"
          stroke="url(#g1)"
          strokeWidth="3"
          points="0,120 40,110 80,90 120,60 160,55 200,70 240,85 280,80 300,90"
        />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 25} y1={0} x2={i * 25} y2={140} stroke="rgba(255,255,255,0.05)" />
        ))}
      </g>
    </svg>
  )
}
