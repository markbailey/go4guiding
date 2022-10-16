/** @type {import('tailwindcss').Config} */
const girlGuidingColors = require('./src/data/girlguiding-colours.json');
const awardThemeColors = require('./src/data/award-theme-colours.json');
const baseColors = require('./src/data/base-colours.json');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,jsx,tsx}', './index.html'],
  theme: {
    fontFamily: {
      sans: ['Trebuchet MS', 'Frutiger', 'sans-serif'],
      mono: ['Ludicrous', 'monospace']
    },
    extend: {
      colors: {
        ...baseColors,
        ...girlGuidingColors,
        ...awardThemeColors
      }
    }
  },
  plugins: []
};
