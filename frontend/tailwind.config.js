/** @type {import('tailwindcss').Config} */
const colorPrimary = {
  200: "#454343",
  300: "#363434",
  400: "#2e2c2c",
  500: "#282828",
  550: "#1e1e1e",
  600: "#1c1c1c",
  700: "#161616"
}
const colorSecondary = {
  100: "#edead3",
  200: "#fb923c",
  300: "#FE8A71",
  400: "#FA8A6F",
  500: "#ff7352",
  600: "#FC5F3A",
  700: "#F0502A",
  800: "#D22D05"
}

export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato, sans-serif;'],
        montserrat: ['Montserrat, sans-serif'],
        anton: ['Anton, sans-serif']
      },
      colors: {
        primary: { ...colorPrimary, DEFAULT: colorPrimary[700] },
        secondary: { ...colorSecondary, DEFAULT: colorSecondary[600] }
      }, boxShadow: {
        lightOn: 'rgb(196 186 0 / 27%) 0 44px 100px -27px, rgb(0 0 0 / 30%) 0px 30px 60px -30px, rgb(28 28 2 / 35%) 0px -2px 6px 0px inset'
      }
    },

  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.truncate-2-lines': {
          display: '-webkit-box',
          overflow: 'hidden',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

