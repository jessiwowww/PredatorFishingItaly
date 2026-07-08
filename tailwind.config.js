/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pine: '#13221b',
        pinelight: '#182a20',
        cream: '#f3ead9',
        gold: '#c9a227',
      },
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
        barlow: ['"Barlow Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
