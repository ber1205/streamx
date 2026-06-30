import { useState, useEffect, useCallback } from 'react'

interface User {
  id: string
  email: string
  emailVerified: boolean
  displayName: string | null
  credits: number
  status: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  loading: boolean
}

const TOKEN_KEY = 'streamx_access_token'
const USER_KEY = 'streamx_user'

export function useAuth() {
  const [state, setState] = useState<AuthState>(() => {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(TOKEN_KEY)
      const userStr = localStorage.getItem(USER_KEY)
      if (token && userStr) {
        try {
          return {
            user: JSON.parse(userStr),
            accessToken: token,
            loading: false,
          }
        } catch {
          // ignore parse errors
        }
      }
    }
    return { user: null, accessToken: null, loading: false }
  })

  const login = useCallback((token: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    setState({ user, accessToken: token, loading: false })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setState({ user: null, accessToken: null, loading: false })
  }, [])

  const updateCredits = useCallback((credits: number) => {
    setState(prev => {
      if (!prev.user) return prev
      const updated = { ...prev.user, credits }
      localStorage.setItem(USER_KEY, JSON.stringify(updated))
      return { ...prev, user: updated }
    })
  }, [])

  useEffect(() => {
    // Auto refresh token could be implemented here
  }, [])

  return {
    user: state.user,
    accessToken: state.accessToken,
    isAuthenticated: !!state.user,
    loading: state.loading,
    login,
    logout,
    updateCredits,
  }
}
