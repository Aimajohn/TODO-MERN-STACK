/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'source': ['Source Sans Pro', 'sans-serif']
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        'auto-cols': 'repeat(auto-fill, 400px)',
      }
    },
  },
  plugins: [],
}
