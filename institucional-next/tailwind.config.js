/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Mesma identidade visual do app React (src/styles/_variables.scss)
      colors: {
        fmp: {
          ink: '#1f3a68',
          inkHover: '#172d52',
          inkDeep: '#14274a',
          soft: '#eaeff7',
          ocre: '#b8862b',
          bg: '#f5f6f8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
