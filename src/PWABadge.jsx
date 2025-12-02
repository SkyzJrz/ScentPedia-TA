import { useRegisterSW } from 'virtual:pwa-register/react'

function PWABadge() {
  const period = 60 * 60 * 1000

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r)
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target
          if (sw.state === 'activated') registerPeriodicSync(period, swUrl, r)
        })
      }
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (!offlineReady && !needRefresh) return null

  return (
    <div className="fixed bottom-0 right-0 m-4 z-50" role="alert">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[260px] max-w-md">
        <div className="mb-3 text-sm text-gray-700">
          {offlineReady
            ? 'App ready to work offline.'
            : 'New content available, click reload to update.'}
        </div>
        <div className="flex gap-2 justify-end">
          {needRefresh && (
            <button
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-xs font-medium rounded-md"
            onClick={close}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PWABadge

function registerPeriodicSync(period, swUrl, r) {
  if (period <= 0) return
  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: { cache: 'no-store', 'cache-control': 'no-cache' },
    })
    if (resp?.status === 200) await r.update()
  }, period)
}
