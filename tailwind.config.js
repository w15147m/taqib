/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'quran-content': ['Al Mushaf Quran', 'sans-serif'],
        'quran-header': ['Al Mushaf Quran', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
