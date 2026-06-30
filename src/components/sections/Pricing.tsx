import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Check, Sparkles, Crown, Zap } from 'lucide-react'
import { SectionHeading, Badge } from '@/components/ui'
import { PRICING_PACKAGES } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'

export function Pricing() {
  const { t } = useTranslation('pricing')
  const { i18n } = useTranslation()
  const lang = i18n.language === 'zh' ? 'zh' : 'en'

  const freeFeatures = t('freeUser.features', { returnObjects: true }) as string[]
  const paidFeatures = t('paidUser.features', { returnObjects: true }) as string[]

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {/* Free vs Paid comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-electric" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">{t('freeUser.title')}</h3>
                <p className="text-sm text-text-secondary">¥0</p>
              </div>
            </div>
            <ul className="space-y-3">
              {freeFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-text-secondary">
                  <div className="w-5 h-5 rounded-full bg-electric/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-electric" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Premium Tier */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative glass-strong rounded-2xl p-8 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/20 to-electric/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-electric flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{t('paidUser.title')}</h3>
                  <p className="text-sm text-text-secondary">From ¥3</p>
                </div>
              </div>
              <ul className="space-y-3">
                {paidFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-text-secondary">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Credit Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {PRICING_PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative glass rounded-2xl p-6 text-center overflow-hidden ${
                pkg.popular ? 'ring-2 ring-electric shadow-glow-blue' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric to-purple-500" />
              )}
              {'badge' in pkg && pkg.badge && (
                <div className="absolute top-3 right-3">
                  <Badge variant="warning">{pkg.badge[lang]}</Badge>
                </div>
              )}
              {pkg.popular && (
                <div className="mb-3">
                  <Badge variant="electric">
                    <Zap className="w-3 h-3" />
                    {t('popular')}
                  </Badge>
                </div>
              )}

              <h4 className="text-lg font-bold text-text-primary mb-1">{pkg.name[lang]}</h4>
              <div className="text-3xl font-bold gradient-text mb-1">
                {pkg.credits}
              </div>
              <p className="text-xs text-text-muted mb-4">{t('credits')}</p>

              <div className="text-2xl font-bold text-text-primary mb-1">
                {formatPrice(pkg.priceFen)}
              </div>
              <p className="text-xs text-text-muted mb-4">{pkg.unitPrice} {t('per100')}</p>

              <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                pkg.popular
                  ? 'bg-gradient-to-r from-electric to-electric-dark text-white hover:shadow-glow-blue'
                  : 'glass text-text-primary hover:bg-slate-700/50'
              }`}>
                {t('buyNow')}
              </button>
            </motion.div>
          ))}
        </div>

        {/* First purchase bonus */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-warning" />
            <span className="text-sm text-text-secondary">{t('firstBonus')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
