/** @type {import('tailwindcss').Config} */
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
        primary: "#ff7352"
      }
    },

  },
  plugins: [
    require('tailwind-scrollbar'),
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

