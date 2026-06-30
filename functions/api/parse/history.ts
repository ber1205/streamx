/**
 * GET /api/parse/history?page=1
 *
 * Response: { success: true, data: { items, pagination } }
 *
 * Mock implementation: returns an empty list. In production this handler
 * would verify the bearer token and page through the user's `parse_jobs`
 * rows in D1.
 */
import { jsonOk, type Env } from '../../_shared'

interface Pagination {
  page: number
  total: number
  per_page: number
}

interface HistoryData {
  items: unknown[]
  pagination: Pagination
}

const DEFAULT_PER_PAGE = 20

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const pageParam = new URL(context.request.url).searchParams.get('page')
  const page = pageParam ? Math.max(1, Number(pageParam) || 1) : 1

  const data: HistoryData = {
    items: [],
    pagination: {
      page,
      total: 0,
      per_page: DEFAULT_PER_PAGE,
    },
  }

  return jsonOk(data)
}
