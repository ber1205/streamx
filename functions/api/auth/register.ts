/**
 * POST /api/auth/register
 *
 * Request body: { email, password, turnstile_token }
 * Response:      { success: true, data: { message: 'Registration successful' } }
 *
 * Mock implementation: D1 is not wired up yet, so registration always
 * succeeds once basic input validation passes. In production this handler
 * would verify the Turnstile token, check for an existing user, hash the
 * password (PBKDF2) and insert a row into the `users` table.
 */
import { jsonOk, errorResponse, type Env } from '../../_shared'

interface RegisterBody {
  email?: string
  password?: string
  turnstile_token?: string
}

/** Naive but sufficient email format check. */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: RegisterBody
  try {
    body = (await context.request.json()) as RegisterBody
  } catch {
    return errorResponse('INVALID_BODY', 'Request body must be valid JSON.', 400)
  }

  const email = (body.email ?? '').trim().toLowerCase()
  const password = body.password ?? ''
  const turnstileToken = body.turnstile_token ?? ''

  if (!email || !isValidEmail(email)) {
    return errorResponse('INVALID_EMAIL', 'A valid email address is required.', 422)
  }
  if (!password) {
    return errorResponse('PASSWORD_REQUIRED', 'A password is required.', 422)
  }

  // Turnstile verification is optional in mock/dev mode (the frontend does
  // not yet send a token). In production this would call the siteverify API.
  void turnstileToken

  return jsonOk({ message: 'Registration successful' })
}
