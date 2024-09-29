/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#13296B',  // Dark blue
        secondary: '#F5CE02', // Yellow
        lightGray: '#F5F5F5', // Light gray
        mediumGray: '#D8D5DC', // Medium gray
      },
    },
  },
  plugins: [],
}