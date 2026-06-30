/**
 * GET /api/payment/packages
 *
 * Response: { success: true, data: { packages: PaymentPackage[] } }
 *
 * Returns the static credit package catalogue. Prices are stored in fen
 * (1 yuan = 100 fen) to avoid floating-point arithmetic on the server.
 */
import { jsonOk, type Env } from '../../_shared'

interface LocalizedName {
  en: string
  zh: string
}

interface PaymentPackage {
  id: string
  name: LocalizedName
  credits: number
  price_fen: number
  currency: string
  popular: boolean
  unit_price: string
  badge?: LocalizedName
}

const PACKAGES: PaymentPackage[] = [
  {
    id: 'pkg_200',
    name: { en: 'Starter', zh: '体验包' },
    credits: 200,
    price_fen: 300,
    currency: 'CNY',
    popular: false,
    unit_price: '¥1.50/100',
  },
  {
    id: 'pkg_600',
    name: { en: 'Standard', zh: '标准包' },
    credits: 600,
    price_fen: 800,
    currency: 'CNY',
    popular: false,
    unit_price: '¥1.33/100',
  },
  {
    id: 'pkg_1500',
    name: { en: 'Premium', zh: '高级包' },
    credits: 1500,
    price_fen: 1800,
    currency: 'CNY',
    popular: true,
    unit_price: '¥1.20/100',
  },
  {
    id: 'pkg_4000',
    name: { en: 'Professional', zh: '专业包' },
    credits: 4000,
    price_fen: 4500,
    currency: 'CNY',
    popular: false,
    unit_price: '¥1.13/100',
  },
  {
    id: 'pkg_annual',
    name: { en: 'Annual Member', zh: '年度会员' },
    credits: 2400,
    price_fen: 8800,
    currency: 'CNY',
    popular: false,
    unit_price: '¥0.73/100',
    badge: { en: 'Best Value', zh: '最优惠' },
  },
]

export const onRequestGet: PagesFunction<Env> = async () => {
  return jsonOk({ packages: PACKAGES })
}
