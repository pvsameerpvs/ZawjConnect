/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3D7A6A',
          light: '#5F9A8A',
          dark: '#2A5B4D',
        },
        surface: {
          DEFAULT: '#F7F3ED',
          light: '#FCFAF6',
        },
        accent: {
          DEFAULT: '#C68D4E',
          light: '#DCB17A',
          dark: '#A0703A',
        },
        ink: {
          DEFAULT: '#2C2824',
          light: '#6B6359',
        },
        muted: '#9A9288',
        border: '#E4DDD2',
        'border-light': '#EDE8E0',
        success: '#4A7C5A',
        error: '#C4665A',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
    },
  },
  plugins: [],
}
