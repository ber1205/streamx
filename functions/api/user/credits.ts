/**
 * GET /api/user/credits
 *
 * Response: { success: true, data: { balance, total_earned, total_spent, transactions } }
 *
 * Mock implementation: returns a demo credit summary with no transactions.
 * In production this handler would verify the bearer token and aggregate the
 * user's `credit_transactions` ledger in D1.
 */
import { jsonOk, type Env } from '../../_shared'

interface CreditsData {
  balance: number
  total_earned: number
  total_spent: number
  transactions: unknown[]
}

export const onRequestGet: PagesFunction<Env> = async () => {
  const data: CreditsData = {
    balance: 100,
    total_earned: 100,
    total_spent: 0,
    transactions: [],
  }

  return jsonOk(data)
}
