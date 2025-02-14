/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      yellow: '#ffc107',
      green: '#198754',
      black: '#000000',
      white: '#ffffff',
      red: '#ef4444',
      blue: '#0ea5e9',
      gray: '#9ca3af',
      amber: '#f59e0b',
      amber600: '#d97706'
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      mono: ["Share Tech Mono", "monospace"],
      roboto: ["Roboto", "sans-serif"],
      karla: ["Karla", "sans-serif"],
      overpass: ["Overpass", "sans-serif"]
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

