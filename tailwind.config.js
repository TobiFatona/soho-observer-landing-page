/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F5F2EF',
        gold: {
          DEFAULT: '#C4A96E',
          muted:   '#D4BC8A',
          50:      '#FAF8F2',
          100:     '#F4EFE0',
          200:     '#E8DDC0',
          300:     '#D9C698',
          500:     '#BE9351',
        },
        charcoal: '#1A1A1A',
        'gray-warm': '#8B8B8B',
        card: '#E8E5E1',
        'card-dark': '#2A2520',
      },
      fontFamily: {
        display: ['"Jost"', 'system-ui', 'sans-serif'],
        'display-sc': ['"Jost"', 'system-ui', 'sans-serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
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
