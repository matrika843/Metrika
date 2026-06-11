/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        surface: '#0E0C09',
        line: '#1E1B16',
        ivory: '#F4F1EA',
        gold: '#C9A96A',
        stone: '#8A8578',
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
