import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionHeading, Badge } from '@/components/ui'
import { PLATFORMS, ENGINE_LABELS, type PlatformCategory } from '@/lib/constants'
import { cn } from '@/lib/utils'

const CATEGORIES: { key: PlatformCategory; labelKey: string; icon: string }[] = [
  { key: 'international', labelKey: 'tabs.international', icon: '🌍' },
  { key: 'china', labelKey: 'tabs.china', icon: '🇨🇳' },
  { key: 'audio', labelKey: 'tabs.audio', icon: '🎵' },
  { key: 'dynamic', labelKey: 'tabs.dynamic', icon: '🌐' },
]

export function PlatformMatrix() {
  const { t, i18n } = useTranslation('platforms')
  const [activeCategory, setActiveCategory] = useState<PlatformCategory>('international')

  const filteredPlatforms = PLATFORMS.filter(p => p.category === activeCategory)

  return (
    <section id="platforms" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.key}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2',
                activeCategory === cat.key
                  ? 'glass-strong text-electric shadow-glow-blue'
                  : 'glass text-text-secondary hover:text-text-primary',
              )}
            >
              <span className="text-base">{cat.icon}</span>
              {t(cat.labelKey)}
            </motion.button>
          ))}
        </div>

        {/* Platform Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredPlatforms.map((platform, idx) => {
              const engineLabel = ENGINE_LABELS[platform.engine]
              return (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
                  whileHover={{ y: -4 }}
                  className="group relative glass rounded-2xl p-5 transition-all duration-300 hover:shadow-glow-blue cursor-default"
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${platform.color}15, transparent 70%)` }}
                  />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                          style={{ backgroundColor: `${platform.color}20`, border: `1px solid ${platform.color}30` }}
                        >
                          {platform.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-text-primary">{platform.name}</h3>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span style={{ color: engineLabel.color }} className="text-xs font-medium">
                              {engineLabel.icon} {engineLabel[i18n.language === 'zh' ? 'zh' : 'en']}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-1.5">
                      {platform.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                          <div className="w-1 h-1 rounded-full bg-electric" />
                          {feature[i18n.language === 'zh' ? 'zh' : 'en']}
                        </div>
                      ))}
                    </div>

                    {/* Engine badge */}
                    <div className="mt-4 pt-3 border-t border-slate-700/30">
                      <Badge variant={platform.engine === 'ytdlp' ? 'electric' : platform.engine === 'lux' ? 'warning' : platform.engine === 'dual' ? 'success' : 'purple'}>
                        {engineLabel.icon} {engineLabel[i18n.language === 'zh' ? 'zh' : 'en']}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Engine Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {Object.entries(ENGINE_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span style={{ color: label.color }}>{label.icon}</span>
              <span className="text-text-secondary">{t(`engineLabels.${key}`)}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
