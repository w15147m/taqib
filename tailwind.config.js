/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'quran-content': ['Al Mushaf Quran', 'sans-serif'],
        'quran-header': ['ArabQuranIslamic140-K7n4W', 'sans-serif'],
        'quran-header-alt': ['ArabQuranIslamic140-vnmnZ', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
