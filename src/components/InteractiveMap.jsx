import { useRef, useState, useCallback } from 'react'
import { MapPin, Plus, Minus } from 'lucide-react'

const cherry = '#9C1B24'

export default function InteractiveMap({ className = '' }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [drag, setDrag] = useState(null)
  const [active, setActive] = useState(null)

  const onWheel = useCallback((e) => {
    e.preventDefault()
    const delta = -e.deltaY
    const factor = delta > 0 ? 1.06 : 0.94
    const next = Math.min(2.2, Math.max(0.7, scale * factor))

    // Zoom relative to mouse position
    const rect = containerRef.current?.getBoundingClientRect()
    const cx = (e.clientX - (rect?.left || 0))
    const cy = (e.clientY - (rect?.top || 0))

    const dx = cx - (cx - offset.x) * (next / scale)
    const dy = cy - (cy - offset.y) * (next / scale)

    setScale(next)
    setOffset({ x: dx, y: dy })
  }, [scale, offset])

  const onMouseDown = (e) => {
    setDrag({ x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y })
  }
  const onMouseMove = (e) => {
    if (!drag) return
    const dx = e.clientX - drag.x
    const dy = e.clientY - drag.y
    setOffset({ x: drag.ox + dx, y: drag.oy + dy })
  }
  const onMouseUp = () => setDrag(null)

  const zoom = (dir) => {
    const factor = dir === 'in' ? 1.1 : 0.9
    const next = Math.min(2.2, Math.max(0.7, scale * factor))
    setScale(next)
  }

  const zones = [
    { id: 'bar', label: 'Brew Bar', x: 40, y: 40, w: 140, h: 70 },
    { id: 'seating', label: 'Seating', x: 190, y: 40, w: 180, h: 140 },
    { id: 'roaster', label: 'Roaster', x: 40, y: 120, w: 120, h: 60 },
    { id: 'lab', label: 'Lab Bench', x: 170, y: 190, w: 120, h: 60 },
  ]

  const location = { x: 250, y: 120 }

  return (
    <div ref={containerRef} className={`relative h-[420px] bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`} onWheel={onWheel} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
      <div className="absolute right-3 top-3 z-10 flex gap-2">
        <button onClick={() => zoom('out')} className="h-9 w-9 grid place-items-center rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50"><Minus size={16} /></button>
        <button onClick={() => zoom('in')} className="h-9 w-9 grid place-items-center rounded-md border border-gray-200 bg-white shadow-sm hover:bg-gray-50"><Plus size={16} /></button>
      </div>
      <svg
        viewBox="0 0 420 300"
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: '0 0' }}
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
          <linearGradient id="panel" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f9fafb" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <g>
          {zones.map(z => (
            <g key={z.id} onClick={() => setActive(z)}>
              <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="10" fill="url(#panel)" stroke={active?.id === z.id ? cherry : '#e5e7eb'} strokeWidth={active?.id === z.id ? 2.5 : 1} />
              <text x={z.x + 10} y={z.y + 24} fontSize="12" fill="#374151">{z.label}</text>
            </g>
          ))}
        </g>

        {/* Path arrows */}
        <g stroke="#d1d5db" strokeDasharray="4 4" fill="none">
          <path d="M 110 110 C 130 130, 160 130, 190 110" />
          <path d="M 260 60 C 270 100, 300 120, 330 140" />
        </g>

        {/* Location marker */}
        <g transform={`translate(${location.x}, ${location.y})`}>
          <circle r="8" fill={cherry} />
          <circle r="18" fill="none" stroke={cherry} strokeOpacity="0.45" >
            <animate attributeName="r" values="18;34;18" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.45;0;0.45" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      {/* Info Card */}
      <div className="absolute left-3 bottom-3 pointer-events-none">
        <div className="pointer-events-auto rounded-xl border border-gray-200 bg-white/90 backdrop-blur px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={16} color={cherry} />
            <p className="text-sm font-medium">You are here: Alloy Ave & 9th</p>
          </div>
          {active && (
            <p className="mt-1 text-xs text-gray-500">Selected: {active.label}</p>
          )}
        </div>
      </div>
    </div>
  )
}
