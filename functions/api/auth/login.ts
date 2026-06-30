/**
 * POST /api/auth/login
 *
 * Request body: { email, password }
 * Response:      { success: true, data: { access_token, expires_in, user } }
 *
 * Mock implementation: always authenticates successfully and returns a mock
 * JWT. In production this handler would look the user up in D1, verify the
 * password hash, and mint a signed JWT stored in the SESSIONS KV.
 */
import { jsonOk, errorResponse, type Env } from '../../_shared'

interface LoginBody {
  email?: string
  password?: string
}

interface LoginUser {
  id: string
  email: string
  email_verified: boolean
  display_name: string | null
  credits: number
}

interface LoginData {
  access_token: string
  expires_in: number
  user: LoginUser
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: LoginBody
  try {
    body = (await context.request.json()) as LoginBody
  } catch {
    return errorResponse('INVALID_BODY', 'Request body must be valid JSON.', 400)
  }

  const email = (body.email ?? '').trim().toLowerCase()
  const password = body.password ?? ''

  if (!email || !password) {
    return errorResponse('INVALID_CREDENTIALS', 'Email and password are required.', 422)
  }

  const data: LoginData = {
    access_token: 'mock-jwt-token',
    expires_in: 900,
    user: {
      id: 'mock-uuid',
      email,
      email_verified: true,
      display_name: null,
      credits: 100,
    },
  }

  return jsonOk(data)
}
