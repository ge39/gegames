/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          'mario-red': '#ff4e4e',
          'mario-blue': '#6ec1e4',
          'mario-yellow': '#ffcc00',
          'mario-green': '#4caf50',
        },
      },
    },
    plugins: [],
  };
  