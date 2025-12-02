// src/pages/PerfumeDetailPage.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { addToWishlist } from '../api/wishlistApi'
import { supabase } from '../lib/supabaseClient'

export default function PerfumeDetailPage({
  perfume,
  onBack,
  onAddedToWishlist,
}) {
  const { user, isGuest } = useAuth()
  const [adding, setAdding] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [error, setError] = useState('')

  if (!perfume) {
    return (
      <div className="page-transition min-h-[calc(100vh-120px)] bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] pb-16">
        <div className="max-w-4xl mx-auto px-4 pt-8">
          <p className="text-slate-200 text-sm mb-4">
            Data parfum tidak ditemukan.
          </p>
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-100 text-sm hover:bg-slate-700"
          >
            Kembali
          </button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    let mounted = true

    async function checkWishlist() {
      if (!user || isGuest) {
        setIsInWishlist(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('wishlist')
          .select('id')
          .eq('user_id', user.id)
          .eq('perfume_id', perfume.id)
          .maybeSingle()

        if (!mounted) return

        if (error && error.code !== 'PGRST116') {
          console.error('Cek wishlist error:', error)
        }

        setIsInWishlist(!!data)
      } catch (err) {
        console.error('Cek wishlist gagal:', err)
      }
    }

    checkWishlist()

    return () => {
      mounted = false
    }
  }, [user, isGuest, perfume])

  const handleAddWishlist = async () => {
    if (!user || isGuest) {
      alert('Silakan login dengan akun Supabase untuk menggunakan wishlist.')
      return
    }

    if (isInWishlist) {
      alert('Parfum ini sudah ada di wishlist kamu 😊')
      return
    }

    try {
      setAdding(true)
      setError('')
      await addToWishlist(user.id, perfume.id)
      setIsInWishlist(true)

      if (onAddedToWishlist) {
        onAddedToWishlist()
      }
    } catch (err) {
      console.error(err)
      setError('Gagal menambahkan ke wishlist. Coba beberapa saat lagi.')
    } finally {
      setAdding(false)
    }
  }

  const buyUrl =
    perfume.buyLink ||
    `https://www.google.com/search?q=${encodeURIComponent(
      `${perfume.name} parfum`
    )}`

  return (
    <div className="page-transition min-h-[calc(100vh-120px)] bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] pb-16">
      <div className="max-w-5xl mx-auto px-4 pt-8 space-y-4">
        <button
          onClick={onBack}
          className="text-xs text-slate-300 hover:text-emerald-300 mb-2"
        >
          ← Kembali ke daftar parfum
        </button>

        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 md:p-7 flex flex-col md:flex-row gap-6 shadow-lg">
          {/* Gambar parfum */}
          <div className="md:w-1/3">
            <div className="rounded-3xl overflow-hidden bg-slate-800 aspect-[3/4]">
              <img
                src={perfume.image}
                alt={perfume.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Detail parfum */}
          <div className="md:w-2/3 flex flex-col">
            <div className="mb-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">
                {perfume.brand}
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 leading-tight">
                {perfume.name}
              </h1>
              <p className="text-xs text-emerald-300 mt-1">
                {perfume.style} • {perfume.occasion}
              </p>
            </div>

            <p className="text-xs text-slate-200 mb-3 leading-relaxed">
              {perfume.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] mb-4">
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3">
                <h3 className="text-slate-100 font-semibold text-xs mb-1">
                  Top Notes
                </h3>
                <p className="text-slate-300">
                  {perfume.topNotes?.join(', ') || '-'}
                </p>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3">
                <h3 className="text-slate-100 font-semibold text-xs mb-1">
                  Middle Notes
                </h3>
                <p className="text-slate-300">
                  {perfume.middleNotes?.join(', ') || '-'}
                </p>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3">
                <h3 className="text-slate-100 font-semibold text-xs mb-1">
                  Base Notes
                </h3>
                <p className="text-slate-300">
                  {perfume.baseNotes?.join(', ') || '-'}
                </p>
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="mt-auto flex flex-wrap items-center gap-3">
              {/* Tombol Beli */}
              <a
                href={buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-xs font-semibold text-emerald-950 shadow-md"
              >
                Beli Parfum
              </a>

              {/* Tombol Wishlist (ikon hati) */}
              <button
                type="button"
                onClick={handleAddWishlist}
                disabled={adding}
                className={`inline-flex items-center justify-center w-9 h-9 rounded-full border text-sm shadow-md transition
                  ${
                    isInWishlist
                      ? 'bg-pink-500 border-pink-500 text-pink-50'
                      : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                  }
                  disabled:opacity-60 disabled:cursor-not-allowed`}
                title={
                  isInWishlist
                    ? 'Sudah ada di wishlistmu'
                    : 'Tambahkan ke wishlist'
                }
              >
                {isInWishlist ? '♥' : '♡'}
              </button>

              {error && (
                <p className="text-[11px] text-red-300 mt-1">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
