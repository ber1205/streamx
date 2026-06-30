import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
}

export function formatDuration(seconds: number) {
  if (!seconds) return '--:--'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

export function formatPrice(fen: number) {
  return `¥${(fen / 100).toFixed(2)}`
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isValidUrl(url: string) {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

export function getPlatformFromUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace('www.', '')
    const platformMap: Record<string, string> = {
      'youtube.com': 'YouTube',
      'youtu.be': 'YouTube',
      'bilibili.com': 'Bilibili',
      'tiktok.com': 'TikTok',
      'douyin.com': 'Douyin',
      'kuaishou.com': 'Kuaishou',
      'weibo.com': 'Weibo',
      'xiaohongshu.com': 'Xiaohongshu',
      'instagram.com': 'Instagram',
      'twitter.com': 'Twitter',
      'x.com': 'Twitter',
      'facebook.com': 'Facebook',
      'twitch.tv': 'Twitch',
      'vimeo.com': 'Vimeo',
      'soundcloud.com': 'SoundCloud',
      'bandcamp.com': 'Bandcamp',
      'youku.com': 'Youku',
      'mgtv.com': 'MGTV',
      'cctv.com': 'CCTV',
      'iqiyi.com': 'iQiyi',
      'v.qq.com': 'Tencent Video',
      'video.qq.com': 'Tencent Video',
    }
    for (const [domain, name] of Object.entries(platformMap)) {
      if (hostname.includes(domain)) return name
    }
    return 'Unknown'
  } catch {
    return 'Unknown'
  }
}
