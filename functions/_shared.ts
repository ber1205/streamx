/**
 * Shared types and response helpers for the StreamX Pages Functions API.
 *
 * Every endpoint returns a consistent JSON envelope:
 *   - success: { success: true, data: T }
 *   - error:   { success: false, error: { code, message } }
 */

/** Environment bindings configured in `wrangler.toml`. */
interface Env {
  /** D1 database — users, credits, parse jobs, orders. */
  DB: D1Database
  /** KV namespace for response / rate-limit caching. */
  CACHE: KVNamespace
  /** KV namespace for session tokens and idempotency state. */
  SESSIONS: KVNamespace
  /** Secret used to sign JWTs. */
  JWT_SECRET: string
  /** Cloudflare Turnstile secret key for bot protection. */
  TURNSTILE_SECRET_KEY: string
  /** Deployment environment: `development` | `production`. */
  ENVIRONMENT: string
}

/** Standard success envelope. */
interface ApiSuccess<T> {
  success: true
  data: T
}

/** Standard error envelope. */
interface ApiError {
  success: false
  error: {
    code: string
    message: string
  }
}

/** A single downloadable format returned by the parse endpoint. */
interface ParseFormat {
  format_id: string
  label: string
  height: number
  vcodec: string | null
  acodec: string | null
  ext: string
  filesize_approx: number | null
  url: string
  is_video_only: boolean
  requires_merge: boolean
  credit_cost: number
  available: boolean
  unavailable_reason: string | null
  audio_url?: string
}

/** Build a JSON `Response` with an optional status and extra headers. */
function json<T>(data: T, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  })
}

/** Build the success envelope `{ success: true, data }`. */
function ok<T>(data: T): ApiSuccess<T> {
  return { success: true, data }
}

/** Return a `200` JSON success response. */
function jsonOk<T>(data: T): Response {
  return json(ok(data), 200)
}

/** Return a JSON error response with the given code, message and status. */
function errorResponse(code: string, message: string, status = 400): Response {
  const body: ApiError = {
    success: false,
    error: { code, message },
  }
  return json(body, status)
}

/** Generate a v4 UUID using the Web Crypto API. */
function uuid(): string {
  return crypto.randomUUID()
}

export type { Env, ApiSuccess, ApiError, ParseFormat }
export { json, ok, jsonOk, errorResponse, uuid }
