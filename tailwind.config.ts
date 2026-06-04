import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Garante que classes dinâmicas (template literals) não sejam purgadas em produção
  safelist: [
    'reveal-delay-1','reveal-delay-2','reveal-delay-3',
    'reveal-delay-4','reveal-delay-5','reveal-delay-6',
    'is-visible',
    'border-[var(--border-bright)]',
    { pattern: /^reveal/ },
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0c0b',
        panel: '#111614',
        'panel-2': '#171c19',
        accent: '#c6f24e',
        teal: '#3dd7b0',
        'text-primary': '#edf0ea',
        'text-secondary': '#9aa39a',
        'text-faint': '#5d655d',
        border: 'rgba(198,242,78,0.15)',
      },
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        body: ['var(--font-hanken)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'radar-sweep': 'radar-sweep 3s linear infinite',
        'pulse-core': 'pulse-core 2s ease-in-out infinite',
        'blip-appear': 'blip-appear 0.3s ease-out forwards',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'reveal': 'reveal 0.7s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-core': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
        'blip-appear': {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '60%': { opacity: '1', transform: 'scale(1.3)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal': {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
