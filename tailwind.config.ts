import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0A0A0A', surface: '#111111', elevated: '#1A1A1A' },
        line: { DEFAULT: '#2A2A2A', highlight: '#3A3A3A' },
        accent: {
          DEFAULT: '#6C63FF',
          light: '#A78BFA',
          glow: 'rgba(108,99,255,0.15)',
        },
        content: { primary: '#FAFAFA', secondary: '#A0A0A0', muted: '#606060' },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        '6xl': ['96px', { lineHeight: '0.95' }],
        '5xl': ['64px', { lineHeight: '1.0' }],
        '4xl': ['48px', { lineHeight: '1.1' }],
        '3xl': ['32px', { lineHeight: '1.2' }],
      },
      maxWidth: {
        container: '1280px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(108,99,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(108,99,255,0.6)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
