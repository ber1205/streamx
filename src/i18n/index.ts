import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const savedLang = typeof localStorage !== 'undefined' ? localStorage.getItem('streamx-lang') : null
const browserLang = typeof navigator !== 'undefined' ? navigator.language : 'en'
const defaultLang = savedLang || (browserLang.startsWith('zh') ? 'zh' : 'en')

if (typeof localStorage !== 'undefined') {
  localStorage.setItem('streamx-lang', defaultLang)
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {},
    },
    zh: {
      translation: {},
    },
  },
  lng: defaultLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

// Load translations dynamically
const loadTranslations = async () => {
  try {
    const [enRes, zhRes] = await Promise.all([
      fetch('/locales/en/translation.json'),
      fetch('/locales/zh/translation.json'),
    ])
    const en = await enRes.json()
    const zh = await zhRes.json()
    i18n.addResourceBundle('en', 'translation', en, true, true)
    i18n.addResourceBundle('zh', 'translation', zh, true, true)
    i18n.changeLanguage(defaultLang)
  } catch (e) {
    console.error('Failed to load translations:', e)
  }
}

loadTranslations()

export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang)
  localStorage.setItem('streamx-lang', lang)
  document.documentElement.lang = lang
}

export default i18n
