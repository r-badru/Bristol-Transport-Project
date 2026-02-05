/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
  
    safelist: [
      { pattern: /(from|to|bg|text)-(red|orange|blue|purple|green)-?(50|100|200|300|400|500|600|700|800|900)?/ },
      { pattern: /border-(red|blue|green|purple|orange)-600/ }
    ],
  
    theme: {
      extend: {}
    },
  
    plugins: []
  }  