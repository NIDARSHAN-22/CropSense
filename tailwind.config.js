/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f3',
          100: '#e1f3e4',
          200: '#c4e6cc',
          300: '#97d3a4',
          400: '#64b976',
          500: '#3d9c52',
          600: '#2d803f',
          700: '#256534',
          800: '#21512c',
          900: '#1c4326',
          950: '#0b2413',
        },
        earth: {
          50: '#faf6f0',
          100: '#f2ebd9',
          200: '#e5d5b3',
          300: '#d5ba87',
          400: '#c49d5c',
          500: '#b28442',
          600: '#9b6c37',
          700: '#7c522e',
          800: '#67442b',
          900: '#563926',
        },
        leaf: '#10b981',
        soil: '#854d0e',
        sun: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scanLine 2.5s ease-in-out infinite',
      },
      keyframes: {
        scanLine: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
