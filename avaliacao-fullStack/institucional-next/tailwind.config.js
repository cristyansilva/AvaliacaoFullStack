/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fmp: {
          blue: '#0d6efd',
          darkBlue: '#0a47a9',
          lightBlue: '#e0f2fe',
        },
      },
    },
  },
  plugins: [],
};
