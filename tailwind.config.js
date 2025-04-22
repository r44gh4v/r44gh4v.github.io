/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html', // Scans all HTML files in the root
    './src/**/*.{html,js}', // Scans HTML and JS in src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};