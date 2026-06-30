const API_BASE = '/api'

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem('streamx_access_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error?.message || data?.error?.code || 'Request failed')
  }

  return data
}

export const api = {
  auth: {
    register: (email: string, password: string) =>
      request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    login: (email: string, password: string) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    logout: () => request('/auth/logout', { method: 'POST' }),
  },
  parse: {
    parse: (url: string, qualityHint?: string) =>
      request('/parse', {
        method: 'POST',
        body: JSON.stringify({ url, quality_hint: qualityHint }),
      }),
    history: (page = 1) => request(`/parse/history?page=${page}`),
  },
  user: {
    me: () => request('/user/me'),
    credits: () => request('/user/credits'),
  },
  payment: {
    packages: () => request('/payment/packages'),
    createOrder: (packageId: string) =>
      request('/payment/order', {
        method: 'POST',
        body: JSON.stringify({ package_id: packageId }),
      }),
  },
  health: () => request('/health'),
}

export interface ParseFormat {
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

export interface ParseResult {
  job_id: string
  title: string
  thumbnail: string
  duration: number
  uploader: string
  platform: string
  credits_deducted: number
  credits_remaining: number
  formats: ParseFormat[]
  audio_formats?: ParseFormat[]
}
