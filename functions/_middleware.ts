import type { Env } from './_shared'

/**
 * Global middleware for every `/api/*` Pages Function route.
 *
 * Responsibilities:
 *   - Answer CORS preflight (`OPTIONS`) requests.
 *   - Attach permissive CORS headers (locked down in production).
 *   - Attach standard security headers.
 */

/** Security headers applied to every API response. */
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
}

/** Build CORS headers depending on the deployment environment. */
function corsHeaders(env: Env | undefined): Record<string, string> {
  const isProd = env?.ENVIRONMENT === 'production'
  // Allow all origins in development for local Vite dev server; restrict in prod.
  const origin = isProd ? 'https://streamx.pages.dev' : '*'
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    // Credentials can only be enabled alongside a specific (non-`*`) origin.
    ...(isProd ? { 'Access-Control-Allow-Credentials': 'true' } : {}),
  }
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const headers = { ...SECURITY_HEADERS, ...corsHeaders(context.env) }

  // Short-circuit CORS preflight requests.
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers })
  }

  const response = await context.next()

  // Re-create the response so its headers are mutable, then merge ours in.
  const merged = new Response(response.body, response)
  for (const [key, value] of Object.entries(headers)) {
    merged.headers.set(key, value)
  }
  return merged
}
