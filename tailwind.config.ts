import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#F2E4F9',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#B056F6',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#4A0A81',
          800: '#400863',
          900: '#240537',
          950: '#1A0329',
        },
        secondary: {
          400: '#CDFF22',
          500: '#B8E61F',
        },
        luna: {
          signature: '#F2E4F9',
          glow: '#E9D5FF',
          surface: '#F9F3FF',
          deep: '#4A0A81',
          dark: '#240537',
          accent: '#B056F6',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Archivo', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      borderRadius: { luna: '24px', 'luna-lg': '32px' },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
        'luna-glow': '0 0 60px rgba(242, 228, 249, 0.5)',
        'lime-glow': '0 0 40px rgba(205, 255, 34, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
