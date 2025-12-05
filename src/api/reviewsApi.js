// src/api/reviewsApi.js
import { supabase } from '../lib/supabaseClient'

// Ambil semua review untuk 1 parfum
export async function fetchReviews(perfumeId) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('perfume_id', perfumeId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Tambah review baru
export async function addReview({ perfumeId, userId, username, rating, comment }) {
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        perfume_id: perfumeId,
        user_id: userId,
        username,
        rating,
        comment,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}
