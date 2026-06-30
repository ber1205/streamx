import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react'
import { Button } from '@/components/ui'

export function CTA() {
  const { t } = useTranslation(['hero', 'common'])

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative aurora-bg glass-strong rounded-3xl p-8 md:p-16 overflow-hidden text-center"
        >
          {/* Floating orbs */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 right-10 w-20 h-20 rounded-full bg-electric/10 blur-2xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl"
          />

          <div className="relative">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
            >
              <Rocket className="w-4 h-4 text-electric" />
              <span className="text-sm text-text-secondary">Powered by Cloudflare Edge Network</span>
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              <span className="text-text-primary">Ready to </span>
              <span className="gradient-text-electric">download anything?</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mb-8 text-balance">
              Join StreamX today. Get 100 free credits on signup. No credit card required.
              Parse and download from 50+ platforms with zero server storage.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="xl" className="group">
                <Zap className="w-5 h-5" fill="white" />
                {t('cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="xl">
                <Shield className="w-5 h-5" />
                {t('ctaSecondary')}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Zero server storage
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <Rocket className="w-4 h-4" />
                100 free credits on signup
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
