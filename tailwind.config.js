/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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