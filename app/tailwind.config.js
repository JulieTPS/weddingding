/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:   '#0c0b09',
        ink2:  '#111009',
        ink3:  '#191713',
        ink4:  '#211f1a',
        gold:  '#c8a86e',
        'gold-bright': '#e4cc92',
        coral: '#d4735a',
        cream: '#f0e8d8',
        t1:    '#ede8de',
        t2:    '#6e6a62',
        t3:    '#3e3c38',
      },
      fontFamily: {
        sans:      ['"DM Sans"', 'sans-serif'],
        serif:     ['"DM Serif Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
