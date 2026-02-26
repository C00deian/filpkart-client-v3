import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  { id: 1, bg: 'from-blue-600 to-blue-800', title: 'Big Billion Days', subtitle: 'Deals up to 80% off', emoji: '🎉', badge: 'Limited Time' },
  { id: 2, bg: 'from-orange-500 to-red-600', title: 'Electronics Sale', subtitle: 'Smartphones from ₹9,999', emoji: '📱', badge: 'Hot Deals' },
  { id: 3, bg: 'from-purple-600 to-indigo-700', title: 'Fashion Week', subtitle: 'New arrivals every day', emoji: '👗', badge: 'New In' },
]

const HeroBanner = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[current]

  return (
    <div className="relative h-52 md:h-64 rounded-sm overflow-hidden bg-gradient-to-r shadow-card">
      {SLIDES.map((s, i) => (
        <div key={s.id}
          className={`absolute inset-0 bg-gradient-to-r ${s.bg} flex items-center px-8 md:px-16
            transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-white">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
              {s.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-2">{s.title}</h2>
            <p className="text-white/90 text-lg md:text-xl">{s.subtitle}</p>
            <button className="mt-4 bg-white text-primary font-bold px-6 py-2 rounded text-sm hover:bg-slate-100 transition">
              Shop Now
            </button>
          </div>
          <div className="ml-auto hidden md:flex text-8xl">{s.emoji}</div>
        </div>
      ))}

      {/* Arrows */}
      <button onClick={() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button onClick={() => setCurrent(c => (c + 1) % SLIDES.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition">
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-4' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  )
}
export default HeroBanner
