/**
 * POST /api/payment/order
 *
 * Request body: { package_id }
 * Response:      { success: true, data: { order_id, package_id, ... } }
 *
 * Mock implementation: creates a pending order record (no payment provider is
 * wired up yet) and returns a fake checkout URL. In production this handler
 * would insert a row into `orders`, call the payment provider to create a
 * real prepay order, and return the provider's checkout link.
 */
import { jsonOk, errorResponse, type Env } from '../../_shared'

interface CreateOrderBody {
  package_id?: string
}

interface OrderData {
  order_id: string
  package_id: string
  credits: number
  price_fen: number
  currency: string
  payment_status: string
  payment_url: string
  created_at: string
}

interface PackageSpec {
  credits: number
  price_fen: number
}

/** Package catalogue keyed by id (kept in sync with `packages.ts`). */
const PACKAGES: Record<string, PackageSpec> = {
  pkg_200: { credits: 200, price_fen: 300 },
  pkg_600: { credits: 600, price_fen: 800 },
  pkg_1500: { credits: 1500, price_fen: 1800 },
  pkg_4000: { credits: 4000, price_fen: 4500 },
  pkg_annual: { credits: 2400, price_fen: 8800 },
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: CreateOrderBody
  try {
    body = (await context.request.json()) as CreateOrderBody
  } catch {
    return errorResponse('INVALID_BODY', 'Request body must be valid JSON.', 400)
  }

  const packageId = (body.package_id ?? '').trim()
  if (!packageId) {
    return errorResponse('PACKAGE_REQUIRED', 'A package_id is required.', 422)
  }

  const pkg = PACKAGES[packageId]
  if (!pkg) {
    return errorResponse('PACKAGE_NOT_FOUND', `Unknown package: ${packageId}.`, 404)
  }

  const data: OrderData = {
    order_id: crypto.randomUUID(),
    package_id: packageId,
    credits: pkg.credits,
    price_fen: pkg.price_fen,
    currency: 'CNY',
    payment_status: 'pending',
    payment_url: `https://example.com/pay/mock-${Date.now()}`,
    created_at: new Date().toISOString(),
  }

  return jsonOk(data)
}
