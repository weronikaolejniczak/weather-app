/* v8 ignore start */
const { transformBackdrops } = require('./src/utils/transform-backdrops');

const backdrops = transformBackdrops();

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  safelist: {
    pattern: /bg-([a-zA-Z]*)-(light|dark)/,
  },
  prefix: '',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      spacing: {
        18: '5rem',
        128: '27.5rem',
      },
      backgroundImage: {
        ...backdrops,
        placeholder: "url('/assets/backdrops/placeholder.jpg')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
