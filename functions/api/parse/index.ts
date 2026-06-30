/**
 * POST /api/parse
 *
 * Request body: { url, quality_hint }
 * Response:      { success: true, data: ParseResult }
 *
 * Mock implementation: returns a fixed demo video with a formats array where
 * 4K is locked (requires membership) and 1080p / 720p / 480p are available.
 * The `platform` is derived from the submitted URL. In production this handler
 * would enqueue a parse job, call the yt-dlp/lux engine, deduct credits from
 * D1 and return real format metadata.
 */
import { jsonOk, errorResponse, type Env, type ParseFormat } from '../../_shared'

interface ParseRequestBody {
  url?: string
  quality_hint?: string
}

interface ParseResultData {
  job_id: string
  title: string
  thumbnail: string
  duration: number
  uploader: string
  platform: string
  credits_deducted: number
  credits_remaining: number
  formats: ParseFormat[]
}

/** Demo formats: 4K locked, 1080p / 720p / 480p available. */
const MOCK_FORMATS: ParseFormat[] = [
  {
    format_id: '4k-2160p',
    label: '4K UHD (2160p)',
    height: 2160,
    vcodec: 'vp9',
    acodec: null,
    ext: 'webm',
    filesize_approx: 524288000,
    url: 'https://example.com/demo/4k-video.webm',
    is_video_only: true,
    requires_merge: true,
    credit_cost: 25,
    available: false,
    unavailable_reason: '4K requires premium membership',
    audio_url: 'https://example.com/demo/audio.webm',
  },
  {
    format_id: '1080p',
    label: '1080p Full HD',
    height: 1080,
    vcodec: 'avc1',
    acodec: 'mp4a',
    ext: 'mp4',
    filesize_approx: 78643200,
    url: 'https://example.com/demo/1080p.mp4',
    is_video_only: false,
    requires_merge: false,
    credit_cost: 5,
    available: true,
    unavailable_reason: null,
  },
  {
    format_id: '720p',
    label: '720p HD',
    height: 720,
    vcodec: 'avc1',
    acodec: 'mp4a',
    ext: 'mp4',
    filesize_approx: 36700160,
    url: 'https://example.com/demo/720p.mp4',
    is_video_only: false,
    requires_merge: false,
    credit_cost: 2,
    available: true,
    unavailable_reason: null,
  },
  {
    format_id: '480p',
    label: '480p SD',
    height: 480,
    vcodec: 'avc1',
    acodec: 'mp4a',
    ext: 'mp4',
    filesize_approx: 18874368,
    url: 'https://example.com/demo/480p.mp4',
    is_video_only: false,
    requires_merge: false,
    credit_cost: 2,
    available: true,
    unavailable_reason: null,
  },
]

/** Map a URL host to a known platform slug. */
function detectPlatform(url: string): string {
  let host: string
  try {
    host = new URL(url).hostname.toLowerCase()
  } catch {
    return 'unknown'
  }
  if (host.includes('youtube') || host.includes('youtu.be')) return 'youtube'
  if (host.includes('bilibili')) return 'bilibili'
  if (host.includes('tiktok')) return 'tiktok'
  if (host.includes('douyin')) return 'douyin'
  if (host.includes('xigua')) return 'xigua'
  if (host.includes('weibo')) return 'weibo'
  if (host.includes('xiaohongshu')) return 'xiaohongshu'
  if (host.includes('kuaishou')) return 'kuaishou'
  if (host.includes('vimeo')) return 'vimeo'
  if (host.includes('instagram')) return 'instagram'
  if (host.includes('twitter') || host.includes('x.com')) return 'twitter'
  return host || 'unknown'
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: ParseRequestBody
  try {
    body = (await context.request.json()) as ParseRequestBody
  } catch {
    return errorResponse('INVALID_BODY', 'Request body must be valid JSON.', 400)
  }

  const url = (body.url ?? '').trim()
  const qualityHint = body.quality_hint ?? 'auto'

  if (!url) {
    return errorResponse('URL_REQUIRED', 'A media URL is required.', 422)
  }

  // Validate the URL shape (SSRF / allow-list checks would live here in prod).
  try {
    // eslint-disable-next-line no-new
    new URL(url)
  } catch {
    return errorResponse('INVALID_URL', 'The provided URL is not valid.', 422)
  }

  // Reserved for future engine/quality routing.
  void qualityHint

  const data: ParseResultData = {
    job_id: crypto.randomUUID(),
    title: 'Demo Video',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=480',
    duration: 225,
    uploader: 'Demo Channel',
    platform: detectPlatform(url),
    credits_deducted: 5,
    credits_remaining: 95,
    formats: MOCK_FORMATS,
  }

  return jsonOk(data)
}
