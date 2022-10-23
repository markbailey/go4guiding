/** @type {import('tailwindcss').Config} */
const girlGuidingColors = require('./src/data/girlguiding-colors.json');
const awardThemeColors = require('./src/data/theme-awards-colors.json');
const baseColors = require('./src/data/base-colors.json');

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
