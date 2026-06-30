import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/ui'
import { FEATURES, STATS } from '@/lib/constants'

export function Features() {
  const { t } = useTranslation('features')
  const { i18n } = useTranslation()
  const lang = i18n.language === 'zh' ? 'zh' : 'en'

  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="relative max-w-7xl mx-auto">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-text-secondary">{stat.label[lang]}</div>
            </motion.div>
          ))}
        </motion.div>

        <SectionHeading title={t('title')} subtitle={t('subtitle')} />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-2xl p-6 overflow-hidden"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />

              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-text-primary mb-2">{feature.title[lang]}</h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed">{feature.desc[lang]}</p>
              </div>

              {/* Bottom gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
