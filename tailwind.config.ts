import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          900: '#0f172a',
        },
        purple: {
          600: '#9333ea',
          500: '#a855f7',
        },
      },
    },
  },
  plugins: [],
};

export default config;