/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
       keyframes: {
      slideDown: {
        '0%': { opacity: '0', transform: 'translateY(-8px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      slideUp: {
        '0%': { opacity: '1', transform: 'translateY(0)' },
        '100%': { opacity: '0', transform: 'translateY(-8px)' },
      },
    },
    animation: {
      slideDown: 'slideDown 0.3s ease-out',
      slideUp: 'slideUp 0.2s ease-in',
    },
      colors: {
        primary: '#2874f0',
        'primary-dark': '#1a5dc8',
        'text-main': '#212121',
        'text-secondary': '#878787',
        'bg-light': '#f1f3f6',
      },
      boxShadow: {
        card: '0 2px 4px 0 rgba(0,0,0,.08)',
        'card-hover': '0 4px 16px 0 rgba(0,0,0,.16)',
      },
    },
  },
  plugins: [],
}