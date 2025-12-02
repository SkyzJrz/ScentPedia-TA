// src/components/BottomNav.jsx

export default function BottomNav({ currentPage, onNavigate }) {
  const activeKey = (() => {
    if (currentPage === 'perfumes' || currentPage === 'perfumeDetail') return 'perfumes'
    return currentPage
  })()

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'perfumes', label: 'Parfum', icon: '💐' },
    { id: 'notes', label: 'Notes', icon: '📚' },
    { id: 'wishlist', label: 'Wishlist', icon: '💖' },
    { id: 'profile', label: 'Profil', icon: '👤' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex justify-between px-2 py-1.5">
        {tabs.map((tab) => {
          const active = activeKey === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center flex-1 text-[10px] py-1 rounded-xl mx-0.5 transition ${
                active
                  ? 'bg-slate-800 text-slate-50'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
              }`}
            >
              <span className="text-base leading-none mb-[2px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
