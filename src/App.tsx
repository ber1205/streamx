import { useState, useCallback } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { PlatformMatrix } from '@/components/sections/PlatformMatrix'
import { Features } from '@/components/sections/Features'
import { Pricing } from '@/components/sections/Pricing'
import { CTA } from '@/components/sections/CTA'
import { AuthModal } from '@/components/auth/AuthModal'
import { useTheme } from '@/hooks/useTheme'
import { useAuth } from '@/hooks/useAuth'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, login, logout, updateCredits } = useAuth()
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const openAuth = useCallback((mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode)
    setAuthOpen(true)
  }, [])

  const handleLogin = useCallback((email: string, credits: number) => {
    login('mock-access-token', {
      id: crypto.randomUUID(),
      email,
      emailVerified: true,
      displayName: null,
      credits,
      status: 'active',
    })
    setAuthOpen(false)
  }, [login])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAuth={openAuth}
        isAuthenticated={isAuthenticated}
        user={user ? { email: user.email, credits: user.credits } : null}
        onLogout={handleLogout}
      />

      <main>
        <Hero
          onOpenAuth={() => openAuth('login')}
          isAuthenticated={isAuthenticated}
          credits={user?.credits || 0}
          onCreditsUpdate={updateCredits}
        />
        <Features />
        <PlatformMatrix />
        <Pricing />
        <CTA />
      </main>

      <Footer />

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={setAuthMode}
        onLogin={handleLogin}
      />
    </div>
  )
}
