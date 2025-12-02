// src/components/LoadingScreen.jsx

export default function LoadingScreen() {
  const bottles = ['🧴', '💐', '✨']

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-32 w-32 flex items-center justify-center">
          {bottles.map((icon, idx) => (
            <div
              key={idx}
              className="absolute flex items-center justify-center"
              style={{
                transform: `rotate(${idx * 120}deg) translateY(-44px)`,
              }}
            >
              <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center animate-spin">
                <span className="text-2xl">{icon}</span>
              </div>
            </div>
          ))}
          <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40">
            <span className="text-xl">🧴</span>
          </div>
        </div>
        <p className="text-xs text-slate-300">
          Menyiapkan ScentPedia...
        </p>
      </div>
    </div>
  )
}
