import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, Moon, Sun, Zap, User as UserIcon, LogOut, Gem } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'
import { changeLanguage } from '@/i18n'

interface NavbarProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  onOpenAuth: (mode: 'login' | 'register') => void
  isAuthenticated: boolean
  user: { email: string; credits: number } | null
  onLogout: () => void
}

export function Navbar({ theme, onToggleTheme, onOpenAuth, isAuthenticated, user, onLogout }: NavbarProps) {
  const { t, i18n } = useTranslation(['nav', 'hero', 'common'])
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#features', label: t('nav.features') },
    { href: '#platforms', label: t('nav.platforms') },
    { href: '#pricing', label: t('nav.pricing') },
  ]

  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en'
    changeLanguage(newLang)
    setLangOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'glass-strong shadow-glass py-2' : 'py-4',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2.5 shrink-0"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric to-purple-600 flex items-center justify-center shadow-glow-blue">
                  <Zap className="w-5 h-5 text-white" fill="white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-electric blur-lg opacity-30 -z-10" />
              </div>
              <span className="text-xl font-bold gradient-text-electric">StreamX</span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-slate-700/30"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLang}
                className="p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
                title={t('common:language')}
              >
                <div className="flex items-center gap-1">
                  <Globe className="w-5 h-5 text-text-secondary" />
                  <span className="text-xs font-medium text-text-secondary">{i18n.language === 'en' ? 'EN' : '中'}</span>
                </div>
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleTheme}
                className="p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
                title={t('common:theme')}
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <Moon className="w-5 h-5 text-text-secondary" />
                    </motion.div>
                  ) : (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <Sun className="w-5 h-5 text-warning" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Auth Section */}
              {isAuthenticated && user ? (
                <div className="hidden md:flex items-center gap-3">
                  <Badge variant="electric" className="px-3 py-1.5">
                    <Gem className="w-3.5 h-3.5" />
                    {user.credits}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={onLogout}>
                    <LogOut className="w-4 h-4" />
                    {t('nav.logout')}
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onOpenAuth('login')}>
                    {t('nav.login')}
                  </Button>
                  <Button size="sm" onClick={() => onOpenAuth('register')}>
                    {t('nav.register')}
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-700/30"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden glass-strong"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary rounded-lg hover:bg-slate-700/30"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2 border-t border-slate-700/50 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-sm text-text-secondary">{t('nav.credits')}</span>
                        <Badge variant="electric">{user?.credits || 0}</Badge>
                      </div>
                      <Button variant="ghost" size="sm" fullWidth onClick={onLogout}>
                        <LogOut className="w-4 h-4" />
                        {t('nav.logout')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" fullWidth onClick={() => { onOpenAuth('login'); setMobileOpen(false) }}>
                        {t('nav.login')}
                      </Button>
                      <Button size="sm" fullWidth onClick={() => { onOpenAuth('register'); setMobileOpen(false) }}>
                        {t('nav.register')}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
