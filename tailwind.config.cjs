/** @type {import('tailwindcss').Config} */
const girlGuidingColors = require('./src/data/girlguiding-colors.json');
const awardThemeColors = require('./src/data/theme-awards-colors.json');
const baseColors = require('./src/data/base-colors.json');
const breakpoints = require('./src/data/breakpoints.json');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,jsx,tsx}', './index.html'],
  theme: {
    screens: { ...breakpoints },
    fontFamily: {
      sans: ['"Trebuchet MS"', 'Frutiger', 'sans-serif'],
      // heading: ['"Trebuchet MS Bold"'],
      mono: ['Ludicrous', 'monospace']
    },
    extend: {
      backgroundImage: {},
      colors: {
        ...baseColors,
        ...girlGuidingColors,
        ...awardThemeColors
      }
    }
  },
  plugins: []
};
