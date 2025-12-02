// src/components/Navbar.jsx
import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ currentPage, onNavigate, isAuthPage }) {
  const { user, isGuest, signOut } = useAuth()

  const menu = [
    { key: 'home', label: 'Home' },
    { key: 'perfumes', label: 'Parfums' },
    { key: 'notes', label: 'Notes Guide' },
    { key: 'wishlist', label: 'Wishlist' },
    { key: 'profile', label: 'Profile' },
  ]

  return (
    <nav className="w-full bg-slate-900/80 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo + Brand */}
        <div
          className={`flex items-center gap-3 ${
            !isAuthPage ? 'cursor-pointer' : ''
          } select-none`}
          onClick={() => {
            if (!isAuthPage && onNavigate) onNavigate('home')
          }}
        >
          <div className="h-10 w-10 rounded-full overflow-hidden shadow-[0_0_12px_rgba(248,113,113,0.6)] bg-slate-800 flex items-center justify-center">
            <img
              src="/scentpedia-logo.png"
              alt="ScentPedia Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-semibold tracking-[0.35em] text-slate-50 uppercase">
              SCENTPEDIA
            </span>
            <span className="text-[10px] tracking-[0.30em] text-emerald-300 uppercase">
              YOUR FRAGRANCE JOURNEY
            </span>
          </div>
        </div>

        {/* Menu utama */}
        {!isAuthPage && (
          <div className="hidden md:flex items-center gap-6">
            {menu.map((m) => (
              <button
                key={m.key}
                onClick={() => onNavigate && onNavigate(m.key)}
                className={`text-sm font-medium transition ${
                  currentPage === m.key
                    ? 'text-emerald-300'
                    : 'text-slate-300 hover:text-emerald-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}

        {/* Tombol Login/Logout */}
        {!isAuthPage && (
          <div className="flex items-center gap-3">
            {user && !isGuest && (
              <button
                onClick={signOut}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 transition rounded-lg text-white text-sm font-medium shadow-md"
              >
                Logout
              </button>
            )}

            {(!user || isGuest) && (
              <button
                onClick={() => onNavigate && onNavigate('login')}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 transition rounded-lg text-white text-sm font-medium shadow-md"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
