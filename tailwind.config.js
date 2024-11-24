/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          50: 'rgb(255, 241, 238)',
          100: 'rgb(255, 228, 221)',
          200: 'rgb(255, 201, 187)',
          300: 'rgb(255, 174, 153)',
          400: 'rgb(255, 147, 119)',
          500: 'rgb(255, 131, 96)',
          600: 'rgb(204, 105, 77)',
          700: 'rgb(153, 78, 58)',
          800: 'rgb(102, 52, 38)',
          900: 'rgb(51, 26, 19)',
        },
        paper: 'rgb(255, 253, 247)',
        ink: 'rgb(44, 62, 80)',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        handdrawn: ['Architects Daughter', 'cursive'],
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'drawn': '3px 3px 0 rgb(44, 62, 80)',
        'drawn-lg': '4px 4px 0 rgb(44, 62, 80)',
        'drawn-xl': '6px 6px 0 rgb(44, 62, 80)',
      },
    },
  },
  safelist: [
    'coral-gradient',
    'paper-card',
    'button-handdrawn',
    'input-handdrawn',
    'table-handdrawn',
    {
      pattern: /(bg|text|border)-coral-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
  plugins: [],
};