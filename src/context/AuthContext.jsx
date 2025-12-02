import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    let mounted = true

    async function loadUser() {
      setAuthLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (mounted) {
        setUser(user ?? null)
        setIsGuest(false)
      }
      setAuthLoading(false)
    }

    loadUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsGuest(false)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email, password, username) => {
    setIsGuest(false)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })
    if (error) throw error

    const createdUser = data.user
    if (createdUser) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: createdUser.id,
          username,
          email,
        })

      if (profileError) {
        console.error('Error insert profiles:', profileError)
      }
    }

    await supabase.auth.signOut()
    setUser(null)

    return data
  }

  const signInWithIdentifier = async (identifier, password) => {
    setIsGuest(false)

    let email = identifier

    if (!identifier.includes('@')) {
      const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', identifier)
        .maybeSingle()

      if (error) throw error
      if (!data) {
        throw new Error('Username tidak ditemukan')
      }

      email = data.email
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (authError) throw authError
    return data
  }

  const signOut = async () => {
    setIsGuest(false)
    setUser(null)
    await supabase.auth.signOut()
  }

  const enterGuestMode = () => {
    setUser(null)
    setIsGuest(true)
  }

  const updateProfile = async (data) => {
    const { data: result, error } = await supabase.auth.updateUser({ data })
    if (error) throw error
    const updatedUser = result.user
    setUser(result.user)
    return result.user

     if (data.username && updatedUser) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ username: data.username })
      .eq('id', updatedUser.id)

    if (profileError) {
      console.error('Gagal update username di profiles:', profileError)
    }
  }

  return updatedUser
  
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        isGuest,
        signUp,
        signInWithIdentifier,
        signOut,
        enterGuestMode,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
