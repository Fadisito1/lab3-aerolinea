/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F4EFEB',
          300: '#EAE2D8',
          400: '#D5C7B8',
          sidebar: '#F2EFEB',
        },
        coral: {
          50: '#FFF5F2',
          100: '#FFE8E2',
          200: '#FFD1C4',
          400: '#FF7F5E',
          500: '#FF5733',
          600: '#EB441F',
          700: '#C73210',
        },
        navy: {
          800: '#1E2433',
          900: '#141824',
          950: '#0E111A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 30px -4px rgba(28, 25, 23, 0.04), 0 2px 6px -1px rgba(28, 25, 23, 0.02)',
        'float': '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
