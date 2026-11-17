/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        'surface-elevated': 'var(--surface-elevated)',
        keyline: 'var(--keyline)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-orange': 'var(--accent-orange)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
      },
    },
  },
  plugins: [],
}
