# StreamX

> Global Audio/Video Smart Parser & Download Platform

Built on Cloudflare's edge network with yt-dlp and Lux dual-engine parsing strategy. 50+ platforms supported, 4K Ultra HD, zero server storage.

## Tech Stack

- **Frontend**: React 19 + Vite 8 + TypeScript + Tailwind CSS 3 + Framer Motion
- **Backend**: Cloudflare Pages Functions (Workers)
- **Database**: Cloudflare D1 (SQLite)
- **Cache**: Cloudflare KV
- **i18n**: react-i18next (English / Chinese)
- **Icons**: Lucide React

## Features

- 50+ platform support with dual-engine routing (yt-dlp + Lux)
- 4K Ultra HD download with frontend ffmpeg.wasm synthesis
- Batch download queue with ZIP export
- Zero server file storage (complete privacy)
- Credit-based SaaS model (no subscription required)
- Dark/Light theme toggle
- English/Chinese language toggle
- Glassmorphism UI with particle animations
- Responsive design

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

```bash
npm run deploy
```

## Project Structure

```
streamx/
├── src/                    # Frontend (React + Vite)
│   ├── components/
│   │   ├── auth/          # Auth modal
│   │   ├── layout/        # Navbar, Footer
│   │   ├── sections/      # Hero, PlatformMatrix, Features, Pricing, CTA
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom hooks (useAuth, useTheme)
│   ├── i18n/              # i18next configuration
│   ├── lib/               # Utils, constants, API client
│   ├── App.tsx
│   └── main.tsx
├── functions/             # Cloudflare Pages Functions (API)
│   ├── api/
│   │   ├── auth/          # Register, Login, Logout
│   │   ├── parse/         # URL parsing, history
│   │   ├── user/          # Profile, credits
│   │   └── payment/       # Credit packages, orders
│   └── _middleware.ts     # CORS & security headers
├── migrations/            # D1 database schema
├── public/                # Static assets + translation files
└── wrangler.toml          # Cloudflare config
```

## License

MIT
