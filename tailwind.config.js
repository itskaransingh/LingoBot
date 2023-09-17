/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor:{
        'bg':'#2C313D'
      }
    },
  },
  daisyui: {
    themes: ["dark"],
  },
  plugins: [require("daisyui")],
}
