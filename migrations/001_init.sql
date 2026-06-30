-- StreamX — D1 initial schema migration
-- Target: Cloudflare D1 (SQLite)
--
-- Conventions:
--   * UUIDs are stored as TEXT (v4 strings).
--   * Timestamps are stored as TEXT in ISO-8601 UTC.
--   * Boolean-like flags are stored as INTEGER (0 / 1).
--   * Monetary amounts are stored in fen (1 yuan = 100 fen) as INTEGER.

-- ──────────────────────────────── users ────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id                 TEXT PRIMARY KEY,
  email              TEXT NOT NULL UNIQUE,
  email_verified     INTEGER NOT NULL DEFAULT 0,
  password_hash      TEXT NOT NULL,
  salt               TEXT NOT NULL,
  display_name       TEXT,
  invite_code        TEXT,
  invited_by         TEXT,
  status             TEXT NOT NULL DEFAULT 'active',
  created_at         TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at         TEXT NOT NULL DEFAULT (datetime('now')),
  last_login_at      TEXT,
  last_login_ip_hash TEXT
);

-- ───────────────────────── credit_transactions ─────────────────────────
-- Append-only ledger; the running balance is reconstructed from `balance_after`.
CREATE TABLE IF NOT EXISTS credit_transactions (
  id              TEXT PRIMARY KEY,
  user_id         TEXT NOT NULL,
  type            TEXT NOT NULL,            -- earn | spend | refund | grant
  amount          INTEGER NOT NULL,         -- positive = earn, negative = spend
  balance_after   INTEGER NOT NULL,
  reference_id    TEXT,                     -- parse_job id / order id / etc.
  note            TEXT,
  idempotency_key TEXT,                     -- prevents duplicate credit operations
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ──────────────────────────── parse_jobs ───────────────────────────────
CREATE TABLE IF NOT EXISTS parse_jobs (
  id               TEXT PRIMARY KEY,
  user_id          TEXT NOT NULL,
  url_hash         TEXT NOT NULL,           -- sha256 of the source URL (dedupe/cache key)
  platform         TEXT NOT NULL,
  title            TEXT,
  thumbnail_url    TEXT,
  duration         INTEGER,
  engine           TEXT NOT NULL,           -- ytdlp | lux | browser | dual
  status           TEXT NOT NULL DEFAULT 'pending', -- pending | completed | failed
  error_code       TEXT,
  credits_deducted INTEGER NOT NULL DEFAULT 0,
  ip_hash          TEXT,
  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at     TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ────────────────────────────── orders ─────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                 TEXT PRIMARY KEY,
  user_id            TEXT NOT NULL,
  package_id         TEXT NOT NULL,
  credits_amount     INTEGER NOT NULL,
  price_fen          INTEGER NOT NULL,
  currency           TEXT NOT NULL DEFAULT 'CNY',
  payment_provider   TEXT NOT NULL,         -- wechatpay | alipay | stripe
  payment_status     TEXT NOT NULL DEFAULT 'pending', -- pending | paid | failed | refunded
  provider_order_id  TEXT,
  provider_payment_id TEXT,
  paid_at            TEXT,
  created_at         TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at         TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ──────────────────────────── email_tokens ────────────────────────────
-- Used for email verification and password reset flows.
CREATE TABLE IF NOT EXISTS email_tokens (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL,
  token_hash  TEXT NOT NULL,                -- sha256 of the raw token (never store raw)
  token_type  TEXT NOT NULL,                -- verify_email | reset_password
  expires_at  TEXT NOT NULL,
  used        INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ────────────────────────── daily_parse_counts ─────────────────────────
-- Per-user daily parse quota counter (composite key => natural unique row).
CREATE TABLE IF NOT EXISTS daily_parse_counts (
  user_id TEXT NOT NULL,
  date    TEXT NOT NULL,                    -- YYYY-MM-DD
  count   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
