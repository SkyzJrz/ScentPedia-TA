// src/api/wishlistApi.js
import { supabase } from '../lib/supabaseClient'

export async function addToWishlist(userId, perfumeId) {
  const { data, error } = await supabase
    .from('wishlist')
    .insert([{ user_id: userId, perfume_id: perfumeId }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function fetchWishlist(userId) {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function removeWishlistItem(userId, wishlistId) {
  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', userId)
    .eq('id', wishlistId)

  if (error) throw error
}
