export const CREDIT_COSTS = {
  STANDARD_720P: 2,
  HD_1080P: 5,
  QHD_2K: 10,
  UHD_4K: 25,
  BATCH_PER_URL: 3,
  BROWSER_TRACK: 10,
  AUDIO_ONLY: 2,
} as const

export const PRICING_PACKAGES = [
  { id: 'pkg_200', name: { en: 'Starter', zh: '体验包' }, credits: 200, priceFen: 300, popular: false, unitPrice: '¥1.50/100' },
  { id: 'pkg_600', name: { en: 'Standard', zh: '标准包' }, credits: 600, priceFen: 800, popular: false, unitPrice: '¥1.33/100' },
  { id: 'pkg_1500', name: { en: 'Premium', zh: '高级包' }, credits: 1500, priceFen: 1800, popular: true, unitPrice: '¥1.20/100' },
  { id: 'pkg_4000', name: { en: 'Professional', zh: '专业包' }, credits: 4000, priceFen: 4500, popular: false, unitPrice: '¥1.13/100' },
  { id: 'pkg_annual', name: { en: 'Annual Member', zh: '年度会员' }, credits: 2400, priceFen: 8800, popular: false, unitPrice: '¥0.73/100', badge: { en: 'Best Value', zh: '最优惠' } },
] as const

export type PlatformCategory = 'international' | 'china' | 'audio' | 'dynamic'

export interface PlatformInfo {
  name: string
  icon: string
  engine: 'ytdlp' | 'lux' | 'browser' | 'dual'
  category: PlatformCategory
  features: { en: string; zh: string }[]
  color: string
}

export const PLATFORMS: PlatformInfo[] = [
  // International
  { name: 'YouTube', icon: '🎬', engine: 'ytdlp', category: 'international', color: '#FF0000', features: [{ en: '4K/8K HDR + Subtitles', zh: '4K/8K HDR + 字幕' }, { en: 'Playlist & Channel Batch', zh: '播放列表/频道批量' }] },
  { name: 'TikTok', icon: '🎵', engine: 'ytdlp', category: 'international', color: '#000000', features: [{ en: 'No Watermark HD', zh: '无水印高清' }, { en: 'Profile Batch Download', zh: '主页批量下载' }] },
  { name: 'Instagram', icon: '📷', engine: 'ytdlp', category: 'international', color: '#E4405F', features: [{ en: 'Reels, IGTV, Posts', zh: 'Reels、IGTV、帖子' }, { en: 'Highlights (Cookie)', zh: 'Highlights（需Cookie）' }] },
  { name: 'Twitter / X', icon: '🐦', engine: 'ytdlp', category: 'international', color: '#1DA1F2', features: [{ en: 'Tweet Videos & GIFs', zh: '推文视频和动图' }, { en: 'Batch Media', zh: '批量媒体' }] },
  { name: 'Facebook', icon: '📘', engine: 'ytdlp', category: 'international', color: '#1877F2', features: [{ en: 'Public Videos & Posts', zh: '公开视频和帖子' }, { en: 'Cookie Enhanced', zh: 'Cookie扩展' }] },
  { name: 'Twitch', icon: '🎮', engine: 'ytdlp', category: 'international', color: '#9146FF', features: [{ en: 'VOD & Clips', zh: 'VOD和剪辑' }, { en: 'Sub VOD (Cookie)', zh: '订阅VOD（需Cookie）' }] },
  { name: 'Vimeo', icon: '🎥', engine: 'ytdlp', category: 'international', color: '#1AB7EA', features: [{ en: 'HD Professional Video', zh: '高清专业视频' }, { en: 'Multi-format', zh: '多格式选择' }] },
  { name: 'SoundCloud', icon: '☁️', engine: 'ytdlp', category: 'international', color: '#FF5500', features: [{ en: 'MP3 / Original Format', zh: 'MP3/原始格式' }, { en: 'Public Audio', zh: '公开音频' }] },
  { name: 'Bandcamp', icon: '🎧', engine: 'ytdlp', category: 'international', color: '#629AA9', features: [{ en: 'FLAC / MP3', zh: 'FLAC/MP3' }, { en: 'Independent Artists', zh: '独立音乐人' }] },

  // China
  { name: 'Bilibili', icon: '📺', engine: 'ytdlp', category: 'china', color: '#00A1D6', features: [{ en: '4K HEVC + FLAC Audio', zh: '4K HEVC + FLAC无损' }, { en: 'Batch & Danmaku', zh: '批量+弹幕' }] },
  { name: 'Douyin', icon: '🎯', engine: 'ytdlp', category: 'china', color: '#000000', features: [{ en: 'No Watermark Original', zh: '无水印原画' }, { en: 'Profile Batch', zh: '主页批量' }] },
  { name: 'Kuaishou', icon: '⚡', engine: 'ytdlp', category: 'china', color: '#FF4906', features: [{ en: 'No Watermark Video', zh: '无水印视频' }, { en: 'Profile Batch', zh: '主页批量' }] },
  { name: 'Xiaohongshu', icon: '📕', engine: 'ytdlp', category: 'china', color: '#FF2442', features: [{ en: 'No Watermark Video', zh: '无水印视频' }, { en: 'Note Images', zh: '笔记图片' }] },
  { name: 'Weibo', icon: '🌐', engine: 'ytdlp', category: 'china', color: '#E6162D', features: [{ en: 'Post Videos', zh: '帖子视频' }, { en: 'Repost Videos', zh: '转发视频' }] },
  { name: 'Xigua Video', icon: '🍉', engine: 'ytdlp', category: 'china', color: '#FF0000', features: [{ en: 'HD Video', zh: '高清视频' }, { en: 'Toutiao Ecosystem', zh: '头条系统一' }] },
  { name: 'Youku', icon: '🟡', engine: 'lux', category: 'china', color: '#21A0FF', features: [{ en: 'Public HD Video', zh: '公开高清视频' }, { en: 'Lux Deep Optimization', zh: 'Lux专项优化' }] },
  { name: 'MGTV', icon: '🥭', engine: 'lux', category: 'china', color: '#FF5F00', features: [{ en: 'Variety Shows', zh: '综艺内容' }, { en: 'Rich Quality Options', zh: '丰富画质选择' }] },
  { name: 'CCTV', icon: '📡', engine: 'lux', category: 'china', color: '#C7000B', features: [{ en: 'News & Documentaries', zh: '新闻纪录片' }, { en: 'Proprietary Protocol', zh: '专有协议适配' }] },
  { name: 'iQiyi', icon: '🟢', engine: 'dual', category: 'china', color: '#00BE06', features: [{ en: 'Free Public Content', zh: '免费公开内容' }, { en: 'Dual Engine Fallback', zh: '双引擎兜底' }] },
  { name: 'Tencent Video', icon: '🐧', engine: 'dual', category: 'china', color: '#FF602C', features: [{ en: 'Free Public Content', zh: '免费公开内容' }, { en: 'Dual Engine Fallback', zh: '双引擎兜底' }] },

  // Audio
  { name: 'Doubao Podcast', icon: '🎙️', engine: 'browser', category: 'audio', color: '#3B82F6', features: [{ en: 'Auto Capture Audio Stream', zh: '自动捕获音频流' }, { en: 'Browser Rendering', zh: '浏览器渲染' }] },
  { name: 'Ximalaya', icon: '🏮', engine: 'browser', category: 'audio', color: '#D33A2C', features: [{ en: 'Free Audiobooks', zh: '免费有声书' }, { en: 'Public Podcasts', zh: '公开播客' }] },
  { name: 'Independent Blogs', icon: '📝', engine: 'browser', category: 'audio', color: '#6B7280', features: [{ en: 'Embedded Media Capture', zh: '嵌入式媒体捕获' }, { en: 'Any Dynamic Page', zh: '任意动态页面' }] },
]

export const ENGINE_LABELS = {
  ytdlp: { en: 'yt-dlp', zh: 'yt-dlp引擎', color: '#3B82F6', icon: '✅' },
  lux: { en: 'Lux', zh: 'Lux优先', color: '#F59E0B', icon: '🔴' },
  browser: { en: 'Browser', zh: '浏览器渲染', color: '#8B5CF6', icon: '🌐' },
  dual: { en: 'Dual Engine', zh: '双引擎兜底', color: '#22C55E', icon: '⚡' },
} as const

export const FEATURES = [
  {
    icon: '🎬',
    title: { en: '4K Ultra HD Download', zh: '4K超高清下载' },
    desc: { en: 'Frontend ffmpeg.wasm synthesis, zero quality loss. Supports YouTube 4K/8K and Bilibili 4K HEVC.', zh: '前端ffmpeg.wasm合成，零质量损失。支持YouTube 4K/8K和B站4K HEVC。' },
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '📦',
    title: { en: 'Batch Download Queue', zh: '批量下载队列' },
    desc: { en: 'Async queue with concurrency control. Paste multiple URLs or entire playlists. ZIP export in browser.', zh: '异步队列并发控制。粘贴多个链接或整个播放列表。浏览器内ZIP打包导出。' },
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: '🔒',
    title: { en: 'Zero Server Storage', zh: '零服务器存储' },
    desc: { en: 'Server only returns JSON metadata. All file downloads happen locally in your browser. Complete privacy.', zh: '服务端仅返回JSON元数据。所有文件下载在本地浏览器完成。完整隐私保护。' },
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: '⚡',
    title: { en: 'Lightning Fast Parsing', zh: '极速解析' },
    desc: { en: 'Cloudflare edge network + dual engine strategy. 50+ platforms with intelligent routing.', zh: 'Cloudflare边缘网络+双引擎策略。50+平台智能路由分发。' },
    gradient: 'from-orange-500 to-yellow-500',
  },
  {
    icon: '🛡️',
    title: { en: 'Enterprise Security', zh: '企业级安全' },
    desc: { en: '5-layer defense in depth. PBKDF2 password hashing, JWT auth, SSRF protection, rate limiting.', zh: '5层纵深防御。PBKDF2密码哈希，JWT认证，SSRF防护，速率限制。' },
    gradient: 'from-red-500 to-orange-500',
  },
  {
    icon: '💎',
    title: { en: 'Fair Credit System', zh: '公平积分体系' },
    desc: { en: 'Pay only for what you use. Free daily credits, sign-in rewards. No subscriptions required.', zh: '按需付费。每日免费积分，签到奖励。无需订阅。' },
    gradient: 'from-cyan-500 to-blue-500',
  },
]

export const STATS = [
  { value: '50+', label: { en: 'Platforms Supported', zh: '支持平台' } },
  { value: '4K', label: { en: 'Ultra HD Quality', zh: '超高清画质' } },
  { value: '0', label: { en: 'Server File Storage', zh: '服务器文件存储' } },
  { value: '99.5%', label: { en: 'Uptime SLA', zh: '可用性' } },
]
