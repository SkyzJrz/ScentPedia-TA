// src/pages/NewsDetailPage.jsx

export default function NewsDetailPage({ news, onBack }) {
  if (!news) {
    return (
      <div className="min-h-[calc(100vh-120px)] bg-slate-950 pb-16">
        <main className="max-w-5xl mx-auto px-4 py-6">
          <p className="text-sm text-slate-200">
            Data news tidak ditemukan. Silakan kembali ke halaman utama.
          </p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] pb-16">
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <button
          onClick={onBack}
          className="text-[11px] px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 hover:bg-slate-800"
        >
          ← Kembali ke Home
        </button>

        <article className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl p-5 md:p-6 text-xs text-slate-100 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-800 text-[11px] text-sky-200">
              {news.category}
            </span>
            <span className="text-[11px] text-slate-400">
              {formatDate(news.date)}
            </span>
          </div>

          <h1 className="text-lg md:text-xl font-semibold text-slate-50">
            {news.title}
          </h1>
          <p className="text-[11px] text-slate-300 italic">
            {news.highlight}
          </p>

          <div className="border-t border-slate-800 pt-3 text-[11px] leading-relaxed whitespace-pre-line">
            {news.content}
          </div>
        </article>
      </main>
    </div>
  )
}

function formatDate(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
