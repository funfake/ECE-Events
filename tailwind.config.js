const path = require('path');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    path.resolve(__dirname, './node_modules/litepie-datepicker/**/*.js'),
    "./index.html", 
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Change with you want it
        'litepie-primary': colors.sky, // color system for light mode
        'litepie-secondary': colors.coolGray // color system for dark mode
      }
    }
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      textOpacity: ['disabled'],
      textColor: ['disabled']
    }
  },
  plugins: []
};