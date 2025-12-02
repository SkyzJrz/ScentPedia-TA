// src/pages/RegisterPage.jsx
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage({ onNavigate }) {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  setSuccess('')
  setLoading(true)
  try {
    await signUp(email, password, username)
    setSuccess(
      'Registrasi berhasil. Silakan cek email jika ada verifikasi, lalu login.'
    )
  } catch (err) {
    console.error(err)
    setError(err.message || 'Gagal register.')
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-950 bg-[radial-gradient(circle_at_top,_#1f2937,_#020617)] flex items-center justify-center pb-16">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-50 mb-1 text-center">
          Register ScentPedia
        </h2>
        <p className="text-xs text-slate-300 mb-4 text-center">
          Buat akun baru agar bisa menyimpan wishlist parfum ke Supabase.
        </p>

        {error && (
          <div className="mb-3 text-xs text-red-200 bg-red-900/40 border border-red-500/40 rounded-lg p-2">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 text-xs text-emerald-200 bg-emerald-900/40 border border-emerald-500/40 rounded-lg p-2">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs text-slate-100">
          <div>
            <label className="block mb-1 text-slate-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="contoh: user@mail.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-300">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="cth: parfumlover46"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="minimal 6 karakter"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 py-2 text-xs font-semibold text-emerald-950 transition"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-slate-400 text-center">
          Sudah punya akun?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-emerald-300 hover:text-emerald-200 underline"
          >
            Login di sini
          </button>
        </p>
      </div>
    </div>
  )
}
