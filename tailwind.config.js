/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    container: {
      center : true,
      padding : 10
    },
    extend: {
      colors: {
        "selected-color" : "var(--color)"
      }
    },
  },
  plugins: [],
}

