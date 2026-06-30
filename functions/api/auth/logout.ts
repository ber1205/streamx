/**
 * POST /api/auth/logout
 *
 * Response: { success: true }
 *
 * Mock implementation: the client simply discards its access token. In
 * production this handler would invalidate the JWT/session in the SESSIONS KV.
 */
import { json } from '../../_shared'

export const onRequestPost = async (): Promise<Response> => {
  return json({ success: true })
}
