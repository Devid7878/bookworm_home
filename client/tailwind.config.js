/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Nunito', 'poppins-medium', 'ui-sans-serif', 'system-ui'],
      serif: ['poppins', 'ui-sans-serif', 'system-ui'],
    },
  },
  plugins: [require('daisyui')],
};
