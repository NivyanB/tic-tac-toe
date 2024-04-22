/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        "tic-dark": "#22242A",
        "tic-black": "#1B1E22",
        "tic-blue": "#1777FF",
        "tic-gray": "#363941",
        "tic-light-gray": "#6E6E72",
        "tic-gray-2": "#5B5C60",
      },
    },
  },
};
