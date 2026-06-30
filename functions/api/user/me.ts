/**
 * GET /api/user/me
 *
 * Response: { success: true, data: { id, email, ... } }
 *
 * Mock implementation: returns a demo profile with a masked email. In
 * production this handler would verify the bearer token and load the user
 * from D1.
 */
import { jsonOk, type Env } from '../../_shared'

interface MeData {
  id: string
  email: string
  email_verified: boolean
  display_name: string | null
  credits: number
  status: string
  created_at: string
}

export const onRequestGet: PagesFunction<Env> = async () => {
  const data: MeData = {
    id: 'mock-uuid',
    email: 'u***@example.com',
    email_verified: true,
    display_name: null,
    credits: 100,
    status: 'active',
    created_at: '2025-07-01T00:00:00Z',
  }

  return jsonOk(data)
}
