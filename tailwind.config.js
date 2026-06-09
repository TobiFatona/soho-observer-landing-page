/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F5F2EF',
        gold: '#C4A96E',
        'gold-muted': '#D4BC8A',
        charcoal: '#1A1A1A',
        'gray-warm': '#8B8B8B',
        card: '#E8E5E1',
        'card-dark': '#2A2520',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'display-sc': ['"Cormorant SC"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        label: ['0.65rem', { lineHeight: '1', letterSpacing: '0.25em' }],
      },
      letterSpacing: {
        editorial: '0.25em',
        'widest-2': '0.35em',
      },
      spacing: {
        section: '120px',
        'section-sm': '80px',
      },
    },
  },
  plugins: [],
}
