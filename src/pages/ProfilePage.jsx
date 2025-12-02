// src/pages/ProfilePage.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage({ onNavigate }) {
  const { user, isGuest, updateProfile } = useAuth()

  const isLoggedIn = !!user && !isGuest

  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!user) return
    const meta = user.user_metadata || {}
    setUsername(meta.username || '')
    setPhone(meta.phone || '')
    setAvatarPreview(meta.avatar || '')
  }, [user])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    setMessage('')
    try {
      await updateProfile({
        username,
        phone,
        avatar: avatarPreview || null,
      })
      setMessage('Profil berhasil diperbarui.')
    } catch (err) {
      console.error(err)
      setMessage('Gagal menyimpan profil.')
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result?.toString() || ''
      setAvatarPreview(result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-950 bg-[radial-gradient(circle_at_top,_#1f2937,_#020617)]">
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <section className="mb-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 leading-snug">
         Kelola Profil,
         <span className="text-emerald-300"> Bangun Identitas Scent-mu.</span>
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl mt-2">
         Atur informasi akunmu mulai dari email, username, nomor telepon, hingga foto profil.
          Semua data disimpan secara aman, dan dapat kamu perbarui kapan saja untuk menyesuaikan pengalamanmu di ScentPedia.
        </p>
        </section>


        {/* Guest mode */}
        {!isLoggedIn && (
         <section className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl p-5 md:p-6 flex flex-col md:flex-row gap-5">
         <div className="flex flex-col items-center md:items-start gap-3 md:w-1/3">
         <div className="relative">
         <div className="h-32 w-32 md:h-36 md:w-36 rounded-full overflow-hidden border-4 border-slate-800 shadow-lg shadow-black/50 bg-slate-800 flex items-center justify-center text-4xl text-slate-500">
            👤
        </div>
        <span className="absolute -bottom-1 -right-1 px-2 py-[2px] rounded-full bg-slate-500 text-[10px] font-semibold text-slate-950 shadow-md">
          Guest
        </span>
      </div>
    </div>

    <div className="flex-1 space-y-3 text-xs text-slate-100">
      <h3 className="text-base font-semibold text-slate-50 mb-1">
        Mode Guest / Belum Login
      </h3>
      <p className="text-slate-300">
        Kamu saat ini tidak login dengan akun Supabase. Dalam Guest Mode:
      </p>
      <ul className="list-disc list-inside text-slate-300 space-y-1">
        <li>Data identitas (email, username, nomor telepon) tidak ditampilkan.</li>
        <li>Foto profil tidak dapat disimpan.</li>
        <li>Fitur wishlist parfum tidak dapat digunakan.</li>
      </ul>

        <button
         type="button"
         onClick={() => onNavigate('register')}
        className="mt-3 inline-flex items-center px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-[11px] font-semibold text-emerald-950"
        >
         Daftar Akun Sekarang
        </button>
        </div>
        </section>
      )}


        {/* Logged in */}
        {isLoggedIn && (
          <section className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl p-5 md:p-6 flex flex-col md:flex-row gap-5">
            {/* Foto profil */}
            <div className="flex flex-col items-center md:items-start gap-3 md:w-1/3">
              <div className="relative">
                <div className="h-32 w-32 md:h-36 md:w-36 rounded-full overflow-hidden border-4 border-slate-800 shadow-lg shadow-black/50 bg-slate-800 flex items-center justify-center">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Foto Profil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl text-slate-500">👤</span>
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 px-2 py-[2px] rounded-full bg-emerald-500 text-[10px] font-semibold text-emerald-950 shadow-md">
                  Online
                </span>
              </div>
              <label className="text-[11px] text-slate-300">
                Ganti foto profil:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="mt-1 block text-[11px] text-slate-200"
                />
              </label>
            </div>

            {/* Data & form */}
            <div className="flex-1 space-y-4 text-sm text-slate-100">
              <div>
                <h3 className="text-base font-semibold text-slate-50 mb-2">
                  Data Identitas
                </h3>
                <form onSubmit={handleSave} className="space-y-3 text-xs">
                  <InfoRow
                    label="Email"
                    value={user?.email || '-'}
                    readOnly
                  />

                  <EditableRow
                    label="Username"
                    value={username}
                    onChange={setUsername}
                    placeholder="cth: parfumlover46"
                  />

                  <EditableRow
                    label="No. Telepon"
                    value={phone}
                    onChange={setPhone}
                    placeholder="cth: 08xxxxxxx"
                  />

                  {message && (
                    <p className="text-[11px] text-emerald-300">{message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={saving}
                    className="mt-2 inline-flex items-center px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-[11px] font-semibold text-emerald-950"
                  >
                    {saving ? 'Menyimpan...' : 'Simpan Profil'}
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function InfoRow({ label, value, readOnly }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] text-slate-400 uppercase tracking-wide">
        {label}
      </span>
      <input
        type="text"
        readOnly={readOnly}
        value={value}
        className="w-full rounded-lg bg-slate-950/50 border border-slate-800 px-3 py-2 text-[11px] text-slate-100"
      />
    </div>
  )
}

function EditableRow({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] text-slate-400 uppercase tracking-wide">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-slate-950/50 border border-slate-800 px-3 py-2 text-[11px] text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />
    </div>
  )
}
