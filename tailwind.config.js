/** @type {import('tailwindcss').Config} */
import { theme } from './theme';

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: theme,
  },
  plugins: [],
};
