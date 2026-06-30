/**
 * GET /api/health
 *
 * Liveness probe used by the frontend and monitoring tooling.
 */
import { json } from '../_shared'

export const onRequestGet: PagesFunction = async () => {
  return json({ status: 'ok' })
}
