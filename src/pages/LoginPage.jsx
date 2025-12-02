// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage({ onNavigate }) {
  const { signInWithIdentifier, enterGuestMode } = useAuth()
  const [identifier, setIdentifier] = useState('') // username / email
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithIdentifier(identifier, password)
      onNavigate('home')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Gagal login.')
    } finally {
      setLoading(false)
    }
  }

  const handleGuest = () => {
    enterGuestMode()
    onNavigate('home')
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-950 bg-[radial-gradient(circle_at_top,_#1f2937,_#020617)] flex items-center justify-center pb-16">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-50 mb-1 text-center">
          Login ScentPedia
        </h2>
        <p className="text-xs text-slate-300 mb-4 text-center">
          Login dengan <span className="font-semibold">username</span> atau{' '}
          <span className="font-semibold">email</span>, lalu masukkan password.
        </p>

        {error && (
          <div className="mb-3 text-xs text-red-200 bg-red-900/40 border border-red-500/40 rounded-lg p-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs text-slate-100">
          <div>
            <label className="block mb-1 text-slate-300">Username / Email</label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="contoh: parfumlover46 atau user@mail.com"
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
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 space-y-2 text-[11px] text-center">
          <p className="text-slate-400">
            Belum punya akun?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-emerald-300 hover:text-emerald-200 underline"
            >
              Daftar di sini
            </button>
          </p>
          <p className="text-slate-400">atau</p>
          <button
            onClick={handleGuest}
            className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 py-2 text-[11px] text-slate-100"
          >
            Masuk sebagai Guest Mode
          </button>
        </div>
      </div>
    </div>
  )
}
