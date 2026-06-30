import { Zap, Code2, Send, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation('footer')

  const sections = [
    {
      title: t('product'),
      links: [
        { label: t('nav.features' as never, { ns: 'nav' }) || 'Features', href: '#features' },
        { label: t('nav.platforms' as never, { ns: 'nav' }) || 'Platforms', href: '#platforms' },
        { label: t('nav.pricing' as never, { ns: 'nav' }) || 'Pricing', href: '#pricing' },
      ],
    },
    {
      title: t('resources'),
      links: [
        { label: t('apiDocs'), href: '#' },
        { label: t('status'), href: '#' },
      ],
    },
    {
      title: t('company'),
      links: [
        { label: t('about'), href: '#' },
        { label: t('contact'), href: '#' },
        { label: t('privacy'), href: '#' },
        { label: t('terms'), href: '#' },
      ],
    },
  ]

  return (
    <footer className="relative border-t border-slate-700/50 mt-20">
      <div className="mesh-gradient absolute inset-0 opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold gradient-text-electric">StreamX</span>
            </div>
            <p className="text-sm text-text-secondary mb-4">{t('tagline')}</p>
            <div className="flex gap-3">
              {[
                { icon: Code2, href: '#' },
              { icon: Send, href: '#' },
                { icon: Mail, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-text-secondary hover:text-electric hover:border-electric/30 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-text-primary mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-electric transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">{t('copyright')}</p>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
