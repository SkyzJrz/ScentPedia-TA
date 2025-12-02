// src/pages/WishlistPage.jsx
import { useEffect, useState } from 'react'
import { fetchWishlist, removeWishlistItem } from '../api/wishlistApi'
import { perfumes } from '../data/perfumes'
import { useAuth } from '../context/AuthContext'

export default function WishlistPage() {
  const { user, isGuest } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  if (!user || isGuest) {
    return (
      <div className="min-h-[calc(100vh-120px)] bg-slate-950 bg-[radial-gradient(circle_at_top,_#1f2937,_#020617)] pb-16">
        <main className="max-w-5xl mx-auto px-4 py-6">
          <h2 className="text-xl font-semibold text-slate-50 mb-2">Wishlist Parfum</h2>
          <p className="text-sm text-slate-300">
            Fitur wishlist hanya tersedia untuk pengguna yang login. 
            Silakan login terlebih dahulu, Guest Mode tidak dapat menyimpan wishlist.
          </p>
        </main>
      </div>
    )
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await fetchWishlist(user.id)
        if (!mounted) return
        const withPerfume = data
          .map((w) => {
            const p = perfumes.find((pf) => pf.id === w.perfume_id)
            if (!p) return null
            return { ...w, perfume: p }
          })
          .filter(Boolean)
        setItems(withPerfume)
      } catch (err) {
        console.error(err)
        if (!mounted) return
        setError('Gagal memuat wishlist. Pastikan koneksi internet aktif.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [user])

  const handleRemove = async (id) => {
    try {
      await removeWishlistItem(user.id, id)
      setItems((prev) => prev.filter((it) => it.id !== id))
    } catch (err) {
      console.error(err)
      alert('Gagal menghapus dari wishlist.')
    }
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-950 bg-[radial-gradient(circle_at_top,_#1f2937,_#020617)] pb-16">
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <section>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 leading-snug">
            Parfum Favoritmu,
            <span className="text-emerald-300"> Tersimpan di Sini.</span>
            </h1>

            <p className="text-sm text-slate-300 max-w-2xl mt-2">
            Kumpulkan parfum yang kamu sukai dalam satu tempat.  
            Gunakan wishlist untuk menyimpan aroma yang menarik perhatianmu —  
            baik untuk referensi membeli, eksplorasi aroma baru, atau daftar impian koleksimu.
            </p>
        </section>


        {loading && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-xs text-slate-200">
            Memuat wishlist...
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-900/40 border border-red-500/40 rounded-xl p-4 text-xs text-red-100">
            {error}
          </div>
        )}

        {!loading && !error && (
          <section className="grid md:grid-cols-3 gap-4 text-xs">
            {items.length === 0 && (
              <div className="col-span-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-slate-300">
                Wishlist kamu masih kosong. Buka halaman daftar parfum dan tekan tombol
                <span className="font-semibold"> “Tambah ke Wishlist”</span> pada parfum yang kamu suka.
              </div>
            )}

            {items.map((item) => (
              <article
                key={item.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-md flex flex-col"
              >
                <div className="aspect-[3/4] bg-slate-800">
                  <img
                    src={item.perfume.image}
                    alt={item.perfume.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3.5 flex-1 flex flex-col">
                  <h3 className="text-[14px] font-semibold text-slate-50">
                    {item.perfume.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-1">
                    by {item.perfume.brand}
                  </p>
                  <p className="text-[11px] text-slate-300 line-clamp-3">
                    {item.perfume.description}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="mt-3 inline-flex items-center justify-center rounded-xl bg-pink-500/90 hover:bg-pink-500 text-[11px] font-semibold text-pink-950 py-1.5"
                  >
                    Hapus dari Wishlist
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
