/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-once': 'bounce-once 0.5s ease-in-out',
        'pixel-float': 'pixel-float 3s ease-in-out infinite',
      },
      keyframes: {
        'bounce-once': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pixel-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'pixel': '0 0 10px rgba(168,85,247,0.5)',
        'pixel-hover': '0 0 15px rgba(168,85,247,0.7)',
      },
    },
  },
  plugins: [],
};