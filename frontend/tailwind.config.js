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

