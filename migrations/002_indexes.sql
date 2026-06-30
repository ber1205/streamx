-- StreamX — D1 indexes migration
-- Adds the indexes required for the access patterns used by the API.

-- users
CREATE INDEX IF NOT EXISTS idx_users_email        ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status        ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_invite_code  ON users(invite_code);
CREATE INDEX IF NOT EXISTS idx_users_invited_by   ON users(invited_by);

-- credit_transactions
CREATE INDEX IF NOT EXISTS idx_credit_tx_user_id        ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_tx_created_at     ON credit_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_credit_tx_idempotency    ON credit_transactions(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_credit_tx_reference       ON credit_transactions(reference_id);

-- parse_jobs
CREATE INDEX IF NOT EXISTS idx_parse_jobs_user_id     ON parse_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_parse_jobs_created_at  ON parse_jobs(created_at);
CREATE INDEX IF NOT EXISTS idx_parse_jobs_url_hash     ON parse_jobs(url_hash);
CREATE INDEX IF NOT EXISTS idx_parse_jobs_status       ON parse_jobs(status);

-- orders
CREATE INDEX IF NOT EXISTS idx_orders_user_id          ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status   ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_provider_order   ON orders(provider_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at       ON orders(created_at);

-- email_tokens
CREATE INDEX IF NOT EXISTS idx_email_tokens_user_id    ON email_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_email_tokens_token_hash ON email_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_email_tokens_expires_at ON email_tokens(expires_at);

-- daily_parse_counts (composite key already indexes (user_id, date);
-- add a date-leading index for global "today" sweeps if ever needed).
CREATE INDEX IF NOT EXISTS idx_daily_parse_counts_date ON daily_parse_counts(date);
