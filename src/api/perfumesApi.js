// src/api/perfumesApi.js
import { supabase } from '../lib/supabaseClient'

const CACHE_KEY = 'scentpedia_perfumes_cache_v1'


export async function fetchPerfumesWithFallback() {
  try {
    const { data, error } = await supabase
      .from('perfumes')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw error
    if (!data || data.length === 0) throw new Error('Empty perfumes from Supabase')

    const mapped = data.map((row) => ({
      id: row.id,
      name: row.name,
      brand: row.brand,
      image: row.image,
      topNotes: row.top_notes || [],
      middleNotes: row.middle_notes || [],
      baseNotes: row.base_notes || [],
      style: row.style,
      occasion: row.occasion,
      description: row.description,
      buyLink: row.buy_link,
    }))

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            perfumes: mapped,
            timestamp: Date.now(),
          }),
        )
      }
    } catch (e) {
      console.warn('[Perfumes API] Gagal menyimpan cache ke localStorage:', e)
    }

    return { perfumes: mapped, source: 'supabase' }
  } catch (networkErr) {
    console.warn('[Perfumes API] Gagal mengambil dari Supabase:', networkErr)

    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        throw new Error('localStorage not available')
      }

      const raw = localStorage.getItem(CACHE_KEY)
      if (!raw) throw new Error('No cache found')

      const parsed = JSON.parse(raw)
      if (!parsed || !Array.isArray(parsed.perfumes)) {
        throw new Error('Invalid cache format')
      }

      return { perfumes: parsed.perfumes, source: 'cache' }
    } catch (cacheErr) {
      console.error('[Perfumes API] Tidak ada cache lokal yang valid:', cacheErr)
      return { perfumes: [], source: 'none' }
    }
  }
}
