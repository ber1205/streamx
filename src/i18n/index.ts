import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../../public/locales/en/translation.json'
import zh from '../../public/locales/zh/translation.json'

const savedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('streamx-lang') : null
const browserLang = typeof navigator !== 'undefined' ? navigator.language : 'en'
const defaultLang = savedLang || (browserLang.startsWith('zh') ? 'zh' : 'en')

if (typeof localStorage !== 'undefined') {
  localStorage.setItem('streamx-lang', defaultLang)
}

const ns = ['common', 'nav', 'hero', 'parser', 'platforms', 'features', 'pricing', 'auth', 'footer']

function buildResources(lang: typeof en) {
  const resources: Record<string, unknown> = {}
  for (const n of ns) {
    resources[n] = lang[n]
  }
  return resources
}

i18n.use(initReactI18next).init({
  resources: {
    en: buildResources(en),
    zh: buildResources(zh),
  },
  lng: defaultLang,
  fallbackLng: 'en',
  defaultNS: 'common',
  ns,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang)
  localStorage.setItem('streamx-lang', lang)
  document.documentElement.lang = lang
}

export default i18n
