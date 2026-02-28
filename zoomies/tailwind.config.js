/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0A14", // Deep Void
        accent: "#7B61FF",  // Plasma
        background: "#F0EFF4", // Ghost
        textDark: "#18181B", // Graphite
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'], // Headings
        serif: ['"Instrument Serif"', 'serif'], // Drama
        mono: ['"Fira Code"', 'monospace'], // Data
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
