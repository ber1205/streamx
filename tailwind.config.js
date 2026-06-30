/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./functions/**/*.{js,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors from PRD
        'space-blue': '#0F172A',
        'space-darker': '#0a0f1e',
        'space-light': '#1E293B',
        'electric': '#3B82F6',
        'electric-light': '#60A5FA',
        'electric-dark': '#2563EB',
        'success': '#22C55E',
        'warning': '#F59E0B',
        'danger': '#EF4444',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'text-muted': '#64748B',
        'surface': {
          DEFAULT: '#1E293B',
          light: '#334155',
          dark: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'gradient-y': 'gradient-y 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'scale-in': 'scaleIn 0.4s ease forwards',
        'slide-in-right': 'slideInRight 0.5s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'aurora': 'aurora 15s ease infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'ripple': 'ripple 1s ease-out',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { 'background-position': '50% 0%' },
          '50%': { 'background-position': '50% 100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { 'box-shadow': '0 0 20px -10px rgba(59, 130, 246, 0.5)' },
          'to': { 'box-shadow': '0 0 30px 0px rgba(59, 130, 246, 0.8)' },
        },
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', 'box-shadow': '0 0 20px -5px rgba(59, 130, 246, 0.4)' },
          '50%': { opacity: '0.85', 'box-shadow': '0 0 40px 5px rgba(59, 130, 246, 0.7)' },
        },
        aurora: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '25%': { 'background-position': '50% 0%' },
          '50%': { 'background-position': '100% 50%' },
          '75%': { 'background-position': '50% 100%' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        'gradient-electric': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #3B82F6 100%)',
        'gradient-success': 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-blue': '0 0 30px -5px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 30px -5px rgba(139, 92, 246, 0.5)',
        'glow-green': '0 0 30px -5px rgba(34, 197, 94, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4), 0 0 20px -5px rgba(59, 130, 246, 0.3)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}
