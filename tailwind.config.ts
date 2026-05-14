import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        cream: '#fffdf7',
        warm: '#fef9f0',
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        dark: '#0f1a0f',
        'dark-mid': '#1a2e1a',
        body: '#3d4f3d',
        muted: '#7a9178',
        border: '#e2ede2',
      },
      fontFamily: {
        display: ['var(--font-instrument)', 'serif'],
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      boxShadow: {
        'green': '0 8px 32px rgba(22,163,74,.22)',
        'green-lg': '0 12px 36px rgba(22,163,74,.3)',
        'card': '0 8px 24px rgba(15,26,15,.1)',
        'card-sm': '0 2px 8px rgba(15,26,15,.08)',
        'card-lg': '0 24px 56px rgba(15,26,15,.14)',
        'card-md': '0 8px 28px rgba(0,0,0,.2)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      maxWidth: {
        'container': '1120px',
        'store': '440px',
      },
      width: {
        '13': '52px',
      },
      height: {
        '13': '52px',
      },
    },
  },
  plugins: [],
}

export default config