/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor:{
        'primary':'#2C313D'
      }
    },
  },
  plugins: [require("daisyui")],
}
