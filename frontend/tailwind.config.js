/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#f43f5e",
        "secondary": "#fff1f2",
      },
    },
  },
  plugins: [],
}