// src/pages/HomePage.jsx
import { useEffect, useState } from 'react'
import { fetchPerfumesWithFallback } from '../api/perfumesApi'
import { newsItems } from '../data/news'

export default function HomePage({ onSelectPerfume, onSelectNews }) {
  const [featuredPerfumes, setFeaturedPerfumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState('supabase')

  const latestNews = newsItems.slice(0, 3)

  useEffect(() => {
    let mounted = true

    async function loadFeatured() {
      try {
        setLoading(true)
        const result = await fetchPerfumesWithFallback()

        if (!mounted) return

        const perfumes = result.perfumes || []
        setSource(result.source)

        // Ambil 3 parfum pertama
        setFeaturedPerfumes(perfumes.slice(0, 3))
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadFeatured()
    return () => (mounted = false)
  }, [])

  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] pb-16">
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">

        {/* =============================== */}
        {/* HERO SECTION */}
        {/* =============================== */}
        <section className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 space-y-3">
            <p className="text-[11px] inline-flex px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-200 mb-1">
              ScentPedia • PWA Parfum Explorer
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 leading-snug">
              Jelajahi Dunia Parfum,
              <span className="text-emerald-300"> Temukan Signature Scent-mu</span>.
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              ScentPedia membantu kamu mengenal parfum dari sisi notes, mood, dan SPL. 
              Cocok sebagai panduan dasar sebelum membeli atau meracik koleksi parfum pribadi.
            </p>
          </div>

          {/* Decorative Bottle Art */}
          <div className="w-full md:w-64">
            <div className="relative h-48 md:h-56 rounded-3xl bg-gradient-to-br from-emerald-500/30 via-pink-500/20 to-slate-900 border border-emerald-400/30 shadow-[0_0_40px_rgba(16,185,129,0.4)] overflow-hidden">
              <div className="absolute -bottom-4 -left-4 h-40 w-24 bg-slate-950/80 border border-slate-700 rounded-3xl rotate-[-12deg] flex items-center justify-center text-4xl">
                🧴
              </div>
              <div className="absolute -bottom-6 left-12 h-44 w-28 bg-slate-950/70 border border-emerald-500/40 rounded-3xl rotate-[8deg] flex items-center justify-center text-4xl">
                💐
              </div>
              <div className="absolute inset-x-5 top-4 flex flex-col gap-1 text-[10px] text-slate-100">
                <span className="px-2 py-1 rounded-full bg-slate-900/70 border border-slate-700 w-max">
                  Jelajahi Aroma
                </span>
                <span className="px-2 py-1 rounded-full bg-slate-900/70 border border-slate-700 w-max">
                  Static data & Wishlist
                </span>
                <span className="px-2 py-1 rounded-full bg-slate-900/70 border border-slate-700 w-max">
                  Notes • SPL • Mood
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =============================== */}
        {/* FEATURED PERFUME SECTION */}
        {/* =============================== */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-emerald-200 mb-1">Pilihan Editor</p>
              <h2 className="text-lg font-semibold text-slate-50">Featured Perfume</h2>
              <p className="text-[11px] text-slate-400">
                Tiga parfum populer dengan karakter berbeda yang cocok sebagai referensi awal.
              </p>
            </div>

            {featuredPerfumes[0] && (
              <button
                onClick={() => onSelectPerfume(featuredPerfumes[0])}
                className="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] text-slate-200 hover:bg-slate-800"
              >
                Lihat salah satu detail
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-slate-400 text-xs">Memuat parfum unggulan...</div>
          )}

          <div className="grid md:grid-cols-3 gap-4 text-xs">
            {featuredPerfumes.map((p) => (
              <article
                key={p.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col"
              >
                <div className="aspect-[3/4] bg-slate-800">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3.5 flex-1 flex flex-col">
                  <h3 className="text-[14px] font-semibold text-slate-50">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-1">
                    by {p.brand}
                  </p>
                  <p className="text-[11px] text-slate-300 line-clamp-3">
                    {p.description}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.style && (
                      <span className="px-2 py-[2px] rounded-full bg-slate-800 text-[10px] text-slate-300">
                        {p.style}
                      </span>
                    )}
                    {p.occasion && (
                      <span className="px-2 py-[2px] rounded-full bg-slate-800 text-[10px] text-slate-300">
                        {p.occasion}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectPerfume(p)}
                    className="mt-3 inline-flex items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-600 text-[11px] font-semibold text-emerald-950 py-1.5"
                  >
                    Lihat Detail Parfum
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =============================== */}
        {/* NEWS SECTION */}
        {/* =============================== */}
        <section className="space-y-3">
          <div>
            <p className="text-[11px] text-sky-200 mb-1">News & Insight</p>
            <h2 className="text-lg font-semibold text-slate-50">Berita & Tren Parfum</h2>
            <p className="text-[11px] text-slate-400">
              Update ringan seputar rilis baru, tren, dan tips layering parfum.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-xs">
            {latestNews.map((n) => (
              <article
                key={n.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-[2px] rounded-full bg-slate-800 text-[10px] text-sky-200">
                    {n.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {formatDate(n.date)}
                  </span>
                </div>

                <h3 className="text-[14px] font-semibold text-slate-50 line-clamp-2">
                  {n.title}
                </h3>

                <p className="text-[11px] text-slate-300 line-clamp-3">
                  {n.highlight}
                </p>

                <button
                  onClick={() => onSelectNews(n)}
                  className="mt-1 inline-flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-100 py-1.5"
                >
                  Baca Selengkapnya
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function formatDate(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
