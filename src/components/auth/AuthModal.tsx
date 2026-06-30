import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, Eye, EyeOff, Zap, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, Input } from '@/components/ui'

interface AuthModalProps {
  open: boolean
  mode: 'login' | 'register'
  onClose: () => void
  onSwitchMode: (mode: 'login' | 'register') => void
  onLogin: (email: string, credits: number) => void
}

export function AuthModal({ open, mode, onClose, onSwitchMode, onLogin }: AuthModalProps) {
  const { t } = useTranslation('auth')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (mode === 'register' && password !== confirmPassword) {
      setError(t('errors.passwordMismatch'))
      return
    }

    setLoading(true)
    try {
      // Simulate API call - in production this calls /api/auth/login or /api/auth/register
      await new Promise(r => setTimeout(r, 1200))

      if (mode === 'register') {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          onSwitchMode('login')
        }, 2000)
      } else {
        // Mock login success
        onLogin(email, 100)
        onClose()
      }
    } catch {
      setError(mode === 'login' ? t('errors.invalidCredentials') : t('errors.emailExists'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md glass-strong rounded-2xl shadow-glass overflow-hidden"
          >
            {/* Gradient border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric/20 via-transparent to-purple-500/20 pointer-events-none" />

            <div className="relative p-8">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>

              {/* Logo */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  className="relative"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric to-purple-600 flex items-center justify-center shadow-glow-blue">
                    <Zap className="w-8 h-8 text-white" fill="white" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-electric blur-xl opacity-40 -z-10" />
                </motion.div>
              </div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Registration Successful!</h3>
                  <p className="text-sm text-text-secondary">Please check your email to verify your account.</p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-center text-text-primary mb-1">
                    {mode === 'login' ? t('login.title') : t('register.title')}
                  </h2>
                  <p className="text-sm text-center text-text-secondary mb-6">
                    {mode === 'login' ? t('login.subtitle') : t('register.subtitle')}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        {mode === 'login' ? t('login.email') : t('register.email')}
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        icon={<Mail className="w-4 h-4" />}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5">
                        {mode === 'login' ? t('login.password') : t('register.password')}
                      </label>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        icon={<Lock className="w-4 h-4" />}
                        iconRight={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-text-muted hover:text-text-secondary"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        }
                        required
                      />
                      {mode === 'register' && (
                        <p className="text-xs text-text-muted mt-1">{t('register.passwordHint')}</p>
                      )}
                    </div>

                    {mode === 'register' && (
                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5">
                          {t('register.confirmPassword')}
                        </label>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          icon={<Lock className="w-4 h-4" />}
                          required
                        />
                      </div>
                    )}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2"
                      >
                        {error}
                      </motion.div>
                    )}

                    <Button type="submit" fullWidth size="lg" loading={loading}>
                      {mode === 'login' ? t('login.submit') : t('register.submit')}
                    </Button>
                  </form>

                  <div className="mt-6 text-center text-sm">
                    {mode === 'login' ? (
                      <span className="text-text-secondary">
                        {t('login.noAccount')}{' '}
                        <button
                          onClick={() => { onSwitchMode('register'); setError('') }}
                          className="text-electric hover:text-electric-light font-semibold"
                        >
                          {t('login.signUp')}
                        </button>
                      </span>
                    ) : (
                      <span className="text-text-secondary">
                        {t('register.haveAccount')}{' '}
                        <button
                          onClick={() => { onSwitchMode('login'); setError('') }}
                          className="text-electric hover:text-electric-light font-semibold"
                        >
                          {t('register.signIn')}
                        </button>
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
