/**
 * Minimal ambient type declarations for the Cloudflare Pages Functions runtime.
 *
 * These mirror the relevant subset of `@cloudflare/workers-types` so the project
 * type-checks without pulling in the full Workers types package (which would
 * conflict with the DOM lib used by the Vite frontend in this monorepo).
 *
 * If `@cloudflare/workers-types` is later wired up via a dedicated tsconfig for
 * the `functions/` directory, this file can be deleted.
 */

/** D1 prepared statement (subset of the API used by the app). */
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement
  first<T = unknown>(): Promise<T | null>
  all<T = unknown>(): Promise<D1Result<T>>
  run<T = unknown>(): Promise<D1Result<T>>
}

/** D1 query result. */
interface D1Result<T = unknown> {
  success: boolean
  meta: unknown
  results: T[]
}

/** Cloudflare D1 database binding. */
interface D1Database {
  prepare(query: string): D1PreparedStatement
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>
  exec(query: string): Promise<D1Result>
}

/** Options for `KVNamespace.get`. */
interface KVNamespaceGetOptions {
  type?: 'text' | 'json' | 'arrayBuffer' | 'stream'
  cacheTtl?: number
}

/** Options for `KVNamespace.put`. */
interface KVNamespacePutOptions {
  expirationTtl?: number
  expiration?: number
  metadata?: unknown
}

/** Options for `KVNamespace.list`. */
interface KVNamespaceListOptions {
  limit?: number
  prefix?: string
  cursor?: string
}

/** Cloudflare KV namespace binding. */
interface KVNamespace {
  get(key: string, options?: KVNamespaceGetOptions): Promise<string | null>
  put(key: string, value: string, options?: KVNamespacePutOptions): Promise<void>
  delete(key: string): Promise<void>
  list<Metadata = unknown>(
    options?: KVNamespaceListOptions,
  ): Promise<{
    keys: { name: string; expiration?: number; metadata?: Metadata }[]
    list_complete: boolean
    cacheStatus?: string
  }>
}

/**
 * Context object passed to Pages Functions.
 *
 * Mirrors the real `EventContext` shape. `next()` continues to the next
 * matching function/middleware in the chain.
 */
interface EventContext<
  Env = unknown,
  Params extends string = string,
  Data = Record<string, unknown>,
> {
  request: Request
  functionPath: string
  waitUntil(promise: Promise<unknown>): void
  passThroughOnException(): void
  next(input?: Request | string, init?: RequestInit): Promise<Response>
  env: Env
  params: Record<Params, string | string[]>
  data: Data
  site?: { url: URL }
  ctx: {
    waitUntil(promise: Promise<unknown>): void
    passThroughOnException(): void
  }
}

/** A Cloudflare Pages Function handler. */
type PagesFunction<
  Env = unknown,
  Params extends string = string,
  Data = Record<string, unknown>,
> = (context: EventContext<Env, Params, Data>) => Response | Promise<Response>
