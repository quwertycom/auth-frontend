import { heroui } from '@heroui/react';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      transitionTimingFunction: {
        'ease-in-sine': 'cubic-bezier(0.12, 0, 0.39, 0)',
        'ease-out-sine': 'cubic-bezier(0.61, 1, 0.88, 1)',
        'ease-in-out-sine': 'cubic-bezier(0.37, 0, 0.63, 1)',
        'ease-in-quad': 'cubic-bezier(0.11, 0, 0.5, 0)',
        'ease-out-quad': 'cubic-bezier(0.5, 1, 0.89, 1)',
        'ease-in-out-quad': 'cubic-bezier(0.45, 0, 0.55, 1)',
        'ease-in-cubic': 'cubic-bezier(0.32, 0, 0.67, 0)',
        'ease-out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'ease-in-out-cubic': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'ease-in-quart': 'cubic-bezier(0.5, 0, 0.75, 0)',
        'ease-out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'ease-in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'ease-in-quint': 'cubic-bezier(0.64, 0, 0.78, 0)',
        'ease-out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'ease-in-out-quint': 'cubic-bezier(0.83, 0, 0.17, 1)',
        'ease-in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'ease-in-circ': 'cubic-bezier(0.55, 0, 1, 0.45)',
        'ease-out-circ': 'cubic-bezier(0, 0.55, 0.45, 1)',
        'ease-in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',
        'ease-in-back': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        'ease-in-elastic': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
        'ease-out-elastic': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-in-out-elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        'ease-in-bounce': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
        'ease-out-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-in-out-bounce': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
      }
    },
  },
  plugins: [heroui()],
} satisfies Config;
