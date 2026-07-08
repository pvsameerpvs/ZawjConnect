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
          DEFAULT: '#0D9488',
          light: '#2DD4BF',
          dark: '#0F766E',
        },
        surface: {
          DEFAULT: '#FCFCFC',
          light: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#F59E6B',
          light: '#FDE6D5',
          dark: '#D9773E',
        },
        ink: {
          DEFAULT: '#0F172A',
          light: '#64748B',
        },
        muted: '#94A3B8',
        border: '#E2E8F0',
        'border-light': '#F1F5F9',
        success: '#10B981',
        error: '#EF4444',
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
