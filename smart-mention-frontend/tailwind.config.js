/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          950: '#0f111a',
          900: '#181028',
          800: '#232136',
        },
        purple: {
          900: '#2d1457',
          800: '#6d28d9',
          700: '#7c3aed',
          400: '#a78bfa',
        },
        green: {
          400: '#22c55e',
        },
      },
      boxShadow: {
        '2xl': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
