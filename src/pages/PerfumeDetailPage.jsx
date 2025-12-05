// src/pages/PerfumeDetailPage.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { addToWishlist } from '../api/wishlistApi'
import { supabase } from '../lib/supabaseClient'
import { fetchReviews, addReview } from '../api/reviewsApi'

export default function PerfumeDetailPage({
  perfume,
  onBack,
  onAddedToWishlist,
}) {
  const { user, isGuest } = useAuth()
  const [adding, setAdding] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [error, setError] = useState('')
  const [reviews, setReviews] = useState([])
  const [reviewLoading, setReviewLoading] = useState(true)
  const [reviewError, setReviewError] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
    const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
        ).toFixed(1)
      : null


   useEffect(() => {
    if (!perfume) return

    let mounted = true

    async function loadReviews() {
      setReviewLoading(true)
      setReviewError('')
      try {
        const data = await fetchReviews(perfume.id)
        if (!mounted) return
        setReviews(data)
      } catch (err) {
        console.error(err)
        if (!mounted) return
        setReviewError('Gagal memuat ulasan.')
      } finally {
        if (mounted) setReviewLoading(false)
      }
    }

    loadReviews()
    return () => {
      mounted = false
    }
  }, [perfume?.id])

    const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!user || isGuest) return
    if (!rating || !comment.trim()) return

    try {
      setSubmitting(true)
      const newReview = await addReview({
        perfumeId: perfume.id,
        userId: user.id,
        username: user.user_metadata?.username || user.email,
        rating,
        comment: comment.trim(),
      })
      // Tambah ke list paling atas
      setReviews((prev) => [newReview, ...prev])
      setRating(5)
      setComment('')
    } catch (err) {
      console.error(err)
      alert('Gagal mengirim ulasan, coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }


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
      alert('Silakan login dengan akun Scentpedia untuk menggunakan wishlist.')
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

            {/* ==================== ULASAN PENGGUNA ==================== */}
<section className="mt-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-6">

  {/* ===== SUMMARY RATING ===== */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

    {/* Left: Big rating box */}
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center justify-center w-20 h-20 bg-slate-950 border border-slate-800 rounded-2xl shadow-inner">
        <span className="text-3xl text-amber-300 font-bold">
          {averageRating || "-"}
        </span>
        <span className="text-[12px] text-slate-400">dari 5</span>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-50">Rating & Ulasan</h2>
        <p className="text-[12px] text-slate-400">
          {reviews.length} ulasan pengguna
        </p>
      </div>
    </div>

    {/* Right: Rating breakdown */}
    <div className="flex-1 space-y-1.5 max-w-md">
      {[5,4,3,2,1].map((star) => {
        const count = reviews.filter((r) => r.rating === star).length
        const percent = reviews.length > 0 ? (count / reviews.length) * 100 : 0

        return (
          <div key={star} className="flex items-center gap-2">
            {/* Label */}
            <span className="text-[11px] w-8 text-right text-slate-300">
              {star} ★
            </span>

            {/* Progress bar */}
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400"
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Count */}
            <span className="text-[11px] w-6 text-slate-500 text-right">
              {count}
            </span>
          </div>
        )
      })}
    </div>
  </div>

  {/* ===== FORM REVIEW ===== */}
  {!user || isGuest ? (
    <div className="text-[12px] text-slate-400 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3">
      Login untuk memberi rating & ulasan.  
      Guest mode hanya dapat melihat ulasan.
    </div>
  ) : (
    <form
      onSubmit={handleSubmitReview}
      className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-3"
    >
      {/* Star selector */}
      <div className="flex items-center gap-1">
        {[1,2,3,4,5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="text-2xl transition"
          >
            <span className={star <= rating ? "text-amber-400" : "text-slate-600"}>
              ★
            </span>
          </button>
        ))}
      </div>

      <textarea
        rows={2}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tulis pengalamanmu menggunakan parfum ini..."
        className="w-full rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-[12px] px-3 py-2 placeholder:text-slate-500 focus:ring-1 focus:ring-emerald-400"
      />

      <button
        type="submit"
        disabled={submitting || !comment.trim()}
        className="w-full py-2 rounded-lg bg-emerald-500 text-emerald-950 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition"
      >
        {submitting ? "Mengirim..." : "Kirim Ulasan"}
      </button>
    </form>
  )}

  {/* ===== LIST ULASAN ===== */}
  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
    {reviews.length === 0 ? (
      <p className="text-[12px] text-slate-400">Belum ada ulasan.</p>
    ) : (
      reviews.map((rev) => (
        <article
          key={rev.id}
          className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex gap-3"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold">
            {rev.username?.[0]?.toUpperCase() || "U"}
          </div>

          {/* Review content */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold text-slate-100">
                {rev.username}
              </p>
              <p className="text-[10px] text-slate-500">
                {new Date(rev.created_at).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Rating */}
            <div className="text-amber-300 text-[12px]">
              {"★".repeat(rev.rating)}
              {"☆".repeat(5 - rev.rating)}
            </div>

            {/* Comment */}
            <p className="text-[12px] text-slate-300">{rev.comment}</p>
          </div>
        </article>
      ))
    )}
  </div>
</section>

          </div>
        </div>
      </div>
    </div>
  )
}
