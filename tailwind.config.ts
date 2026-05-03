import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      colors: {
        green: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        dark: '#111827',
      },
      boxShadow: {
        'green-sm': '0 4px 16px rgba(22,163,74,0.2)',
        'green':    '0 8px 32px rgba(22,163,74,0.25)',
        'green-lg': '0 12px 36px rgba(22,163,74,0.32)',
        'card':     '0 4px 16px rgba(0,0,0,0.08)',
        'card-lg':  '0 20px 48px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        'xl':  '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '28px',
      },
      fontSize: {
        'display-lg': ['clamp(36px, 6.5vw, 72px)', { lineHeight: '1.06', letterSpacing: '-2px' }],
        'display':    ['clamp(28px, 4vw, 46px)',   { lineHeight: '1.12', letterSpacing: '-1.5px' }],
        'display-sm': ['clamp(22px, 3vw, 30px)',   { lineHeight: '1.2',  letterSpacing: '-0.5px' }],
      },
      maxWidth: {
        'container': '1120px',
        'store': '480px',
      },
      animation: {
        'blink': 'blink 2s ease infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
