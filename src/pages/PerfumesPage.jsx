// src/pages/PerfumesPage.jsx
import { useMemo, useState } from 'react'
import { perfumes } from '../data/perfumes'

export default function PerfumesPage({ onSelectPerfume }) {
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name-asc')

  const brands = useMemo(
    () => Array.from(new Set(perfumes.map((p) => p.brand))),
    [],
  )

  const filteredPerfumes = useMemo(() => {
    let result = [...perfumes]

    if (search.trim() !== '') {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.style && p.style.toLowerCase().includes(q)),
      )
    }

    if (brandFilter !== 'all') {
      result = result.filter((p) => p.brand === brandFilter)
    }

    result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
      if (sortBy === 'brand-asc') return a.brand.localeCompare(b.brand)
      if (sortBy === 'brand-desc') return b.brand.localeCompare(a.brand)
      return 0
    })

    return result
  }, [search, brandFilter, sortBy])

  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-950 bg-[radial-gradient(circle_at_top,_#1f2937,_#020617)] pb-16">
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <section className="mb-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 leading-snug">
            Eksplor Koleksi Parfum, 
          <span className="text-emerald-300"> Temukan Aroma Favoritmu.</span>
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl mt-2">
           Temukan berbagai pilihan parfum dari aroma fresh, manis, woody, hingga dark amber.
            Cocok untuk referensi sebelum membeli, mencari rekomendasi, atau mempelajari karakter 
            notes di dunia wewangian.
          </p>
        </section>


        {/* Controls */}
        <section className="mb-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex-1">
            <label className="block text-[11px] font-medium text-slate-300 mb-1">
              Cari parfum (nama / brand / style)
            </label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Contoh: Dior, fresh, manis..."
                className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">
                🔍
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:w-[280px]">
            <div className="flex-1">
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Filter brand
              </label>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-2 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="all">Semua brand</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Urutkan
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-2 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="name-asc">Nama (A → Z)</option>
                <option value="name-desc">Nama (Z → A)</option>
                <option value="brand-asc">Brand (A → Z)</option>
                <option value="brand-desc">Brand (Z → A)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Grid parfums */}
        <section className="grid md:grid-cols-3 gap-4">
          {filteredPerfumes.length === 0 && (
            <div className="col-span-full text-center text-xs text-slate-400 py-8 bg-slate-900/70 rounded-2xl border border-slate-800">
              Tidak ada parfum yang cocok dengan kriteria pencarian.
            </div>
          )}

          {filteredPerfumes.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPerfume(p)}
              className="group bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/60 transition transform hover:-translate-y-1 flex flex-col text-left"
            >
              <div className="relative overflow-hidden">
                <div className="aspect-[3/4] bg-slate-800">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] text-slate-100 backdrop-blur-sm">
                    {p.brand}
                  </span>
                  <span className="inline-flex px-2 py-1 rounded-full bg-slate-50/10 border border-slate-200/30 text-[10px] text-slate-100 backdrop-blur-sm">
                    {p.style}
                  </span>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col text-xs text-slate-100">
                <div className="mb-1">
                  <h3 className="font-semibold text-[14px] leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">by {p.brand}</p>
                </div>

                <p className="text-[11px] text-slate-300 mt-1 mb-2 line-clamp-3">
                  {p.description}
                </p>

                <div className="space-y-1.5 mt-auto">
                  <NotesRow label="Top" notes={p.topNotes} color="emerald" />
                  <NotesRow label="Middle" notes={p.middleNotes} color="sky" />
                  <NotesRow label="Base" notes={p.baseNotes} color="amber" />
                </div>

                <p className="text-[10px] text-slate-400 mt-2 pt-1 border-t border-slate-800">
                  Occasion:{' '}
                  <span className="text-slate-200 font-medium">{p.occasion}</span>
                </p>
              </div>
            </button>
          ))}
        </section>
      </main>
    </div>
  )
}

function NotesRow({ label, notes, color }) {
  const colorClasses =
    {
      emerald: {
        badge: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40',
        dot: 'bg-emerald-400',
      },
      sky: {
        badge: 'bg-sky-500/15 text-sky-200 border-sky-500/40',
        dot: 'bg-sky-400',
      },
      amber: {
        badge: 'bg-amber-500/15 text-amber-100 border-amber-500/40',
        dot: 'bg-amber-400',
      },
    }[color] || {
      badge: 'bg-slate-500/15 text-slate-200 border-slate-500/40',
      dot: 'bg-slate-400',
    }

  return (
    <div className="flex items-start gap-1.5">
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-[2px] rounded-full border text-[10px] ${colorClasses.badge}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${colorClasses.dot}`} />
        {label}
      </span>
      <p className="text-[10px] text-slate-300 leading-snug">
        {notes.join(', ')}
      </p>
    </div>
  )
}
