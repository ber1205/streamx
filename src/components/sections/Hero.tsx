import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, ArrowRight, Gem, Calendar, Plus, Link2, AlertCircle, CheckCircle2, Download, Lock, Zap, Clock, Music } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button, Badge, Input } from '@/components/ui'
import { cn, formatBytes, formatDuration, getPlatformFromUrl } from '@/lib/utils'
import { CREDIT_COSTS } from '@/lib/constants'
import { api, type ParseResult, type ParseFormat } from '@/lib/api'

// ============ Particle Background ============
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; opacity: number }> = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

// ============ Hero Section ============
interface HeroProps {
  onOpenAuth: () => void
  isAuthenticated: boolean
  credits: number
  onCreditsUpdate: (credits: number) => void
}

export function Hero({ onOpenAuth, isAuthenticated, credits, onCreditsUpdate }: HeroProps) {
  const { t } = useTranslation(['hero', 'parser', 'common'])
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ParseResult | null>(null)

  const handleParse = async () => {
    if (!url.trim()) {
      setError(t('parser:error.invalidUrl'))
      return
    }
    if (!isAuthenticated) {
      onOpenAuth()
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      // Try real API first, fall back to demo data
      try {
        const data = await api.parse.parse(url.trim())
        setResult(data.data)
        onCreditsUpdate(data.data.credits_remaining)
      } catch {
        // Demo mode - generate mock result
        await new Promise(r => setTimeout(r, 2000))
        const platform = getPlatformFromUrl(url.trim())
        const mockResult: ParseResult = {
          job_id: crypto.randomUUID(),
          title: `${platform} Video — Demo Preview`,
          thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=480',
          duration: 225,
          uploader: 'StreamX Demo',
          platform: platform.toLowerCase(),
          credits_deducted: 5,
          credits_remaining: credits - 5,
          formats: [
            { format_id: '4k', label: '4K (2160p)', height: 2160, vcodec: 'vp9', acodec: null, ext: 'mp4', filesize_approx: 2300000000, url: '#', is_video_only: true, requires_merge: true, credit_cost: 25, available: false, unavailable_reason: '4K download coming in Phase 2' },
            { format_id: '1080p', label: '1080p', height: 1080, vcodec: 'avc1', acodec: 'mp4a', ext: 'mp4', filesize_approx: 502300000, url: '#', is_video_only: false, requires_merge: false, credit_cost: 5, available: true, unavailable_reason: null },
            { format_id: '720p', label: '720p', height: 720, vcodec: 'avc1', acodec: 'mp4a', ext: 'mp4', filesize_approx: 180000000, url: '#', is_video_only: false, requires_merge: false, credit_cost: 2, available: true, unavailable_reason: null },
            { format_id: '480p', label: '480p', height: 480, vcodec: 'avc1', acodec: 'mp4a', ext: 'mp4', filesize_approx: 80000000, url: '#', is_video_only: false, requires_merge: false, credit_cost: 2, available: true, unavailable_reason: null },
          ],
          audio_formats: [
            { format_id: 'audio1', label: '128kbps MP3', height: 0, vcodec: null, acodec: 'mp3', ext: 'mp3', filesize_approx: 3600000, url: '#', is_video_only: false, requires_merge: false, credit_cost: 2, available: true, unavailable_reason: null },
          ],
        }
        setResult(mockResult)
        onCreditsUpdate(credits - 5)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('parser:error.parseFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-space-blue pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-electric/10 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <Sparkles className="w-4 h-4 text-electric" />
            <span className="text-sm text-text-secondary">{t('hero.badge')}</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-5xl md:text-7xl font-bold tracking-tight mb-4 text-balance"
        >
          <span className="text-text-primary">{t('hero.title')}</span>
          <br />
          <span className="gradient-text-electric">{t('hero.titleHighlight')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-base md:text-lg text-text-secondary max-w-2xl mx-auto mb-8 text-balance"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative group">
            {/* Gradient border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-electric via-purple-500 to-electric rounded-2xl blur-sm opacity-40 group-focus-within:opacity-70 transition-opacity duration-500" />

            <div className="relative glass-strong rounded-2xl p-2 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-3 pl-3">
                <Link2 className="w-5 h-5 text-text-muted shrink-0" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleParse()}
                  placeholder={t('hero.placeholder')}
                  className="flex-1 bg-transparent border-none focus:outline-none text-text-primary placeholder:text-text-muted py-2"
                />
              </div>
              <Button
                onClick={handleParse}
                loading={loading}
                size="lg"
                className="shrink-0"
              >
                {!loading && <Search className="w-5 h-5" />}
                {t('hero.parseButton')}
              </Button>
            </div>
          </div>

          {/* Supported formats */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <p className="text-xs text-text-muted">{t('hero.supportedFormats')}</p>
          </div>

          {/* Credits bar */}
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-3 mt-4"
            >
              <Badge variant="electric" className="px-4 py-2">
                <Gem className="w-4 h-4" />
                {t('hero.credits')}: {credits}
              </Badge>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4" />
                {t('hero.checkin')}
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4" />
                {t('hero.topup')}
              </Button>
            </motion.div>
          )}

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mt-4 flex items-center gap-2 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl px-4 py-3"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mt-8"
            >
              <div className="glass rounded-2xl p-8 text-center">
                <div className="inline-flex items-center gap-3 text-text-secondary">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-6 h-6 text-electric" />
                  </motion.div>
                  <span className="text-sm">{t('parser:parsing')}</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 rounded-full bg-slate-700/50 shimmer overflow-hidden" />
                  <div className="h-3 rounded-full bg-slate-700/50 shimmer overflow-hidden w-3/4 mx-auto" />
                  <div className="h-3 rounded-full bg-slate-700/50 shimmer overflow-hidden w-1/2 mx-auto" />
                </div>
                <p className="text-xs text-text-muted mt-4">{t('parser:wakingUp')}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Parse Result */}
        <AnimatePresence>
          {result && !loading && (
            <ParseResultDisplay result={result} onClose={() => setResult(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// ============ Parse Result Display ============
function ParseResultDisplay({ result, onClose }: { result: ParseResult; onClose: () => void }) {
  const { t } = useTranslation('parser')
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video')
  const [downloading, setDownloading] = useState<string | null>(null)

  const handleDownload = (format: ParseFormat) => {
    if (!format.available) return
    setDownloading(format.format_id)
    setTimeout(() => setDownloading(null), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="max-w-2xl mx-auto mt-8"
    >
      <div className="glass-strong rounded-2xl overflow-hidden shadow-glass">
        {/* Header */}
        <div className="flex gap-4 p-5 border-b border-slate-700/50">
          <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-800">
            <img
              src={result.thumbnail}
              alt={result.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-text-primary text-lg leading-snug mb-2 line-clamp-2">{result.title}</h3>
            <div className="flex flex-wrap gap-3 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDuration(result.duration)}</span>
              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" />{result.platform}</span>
              <span className="flex items-center gap-1"><Music className="w-3 h-3" />{result.uploader}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-700/30 transition-colors shrink-0">
            <ArrowRight className="w-5 h-5 text-text-secondary rotate-45" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-2 border-b border-slate-700/50">
          <button
            onClick={() => setActiveTab('video')}
            className={cn(
              'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all',
              activeTab === 'video' ? 'glass text-electric' : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {t('videoFormats')}
          </button>
          {result.audio_formats && result.audio_formats.length > 0 && (
            <button
              onClick={() => setActiveTab('audio')}
              className={cn(
                'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all',
                activeTab === 'audio' ? 'glass text-electric' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {t('audioFormats')}
            </button>
          )}
        </div>

        {/* Format List */}
        <div className="p-3 space-y-2 max-h-96 overflow-y-auto scrollbar-hide">
          {(activeTab === 'video' ? result.formats : (result.audio_formats || [])).map((format, idx) => (
            <motion.div
              key={format.format_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl transition-all',
                format.available ? 'hover:bg-slate-700/30 cursor-pointer' : 'opacity-50',
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text-primary text-sm">{format.label}</span>
                  {format.requires_merge && (
                    <Badge variant="warning" className="text-[10px] px-2 py-0.5">
                      <Zap className="w-2.5 h-2.5" />
                      {t('mergeRequired')}
                    </Badge>
                  )}
                  {!format.available && (
                    <Badge variant="default" className="text-[10px] px-2 py-0.5">
                      <Lock className="w-2.5 h-2.5" />
                      {t('locked')}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                  {format.vcodec && <span>{format.vcodec}</span>}
                  {format.acodec && <span>{format.acodec}</span>}
                  <span className="uppercase">.{format.ext}</span>
                  {format.filesize_approx && <span>~{formatBytes(format.filesize_approx)}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={format.credit_cost >= 25 ? 'warning' : format.credit_cost >= 5 ? 'electric' : 'success'}>
                  {format.credit_cost} {t('creditsNeeded', { count: format.credit_cost }).replace(' ' + format.credit_cost + ' credits', '')}
                </Badge>
                <Button
                  size="sm"
                  variant={format.available ? 'primary' : 'secondary'}
                  disabled={!format.available}
                  loading={downloading === format.format_id}
                  onClick={() => handleDownload(format)}
                  className="min-w-[100px]"
                >
                  {!format.available ? (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      {t('locked')}
                    </>
                  ) : downloading === format.format_id ? null : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      {format.requires_merge ? t('download4K') : t('download')}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-text-secondary">
              {result.credits_deducted} credits used · {result.credits_remaining} remaining
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            {t('parseAnother')}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
