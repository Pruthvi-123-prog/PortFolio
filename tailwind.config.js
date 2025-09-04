/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#1a1a1a',
        'surface-dark': '#0f0f0f',
        text: '#e5e5e5',
        'text-muted': '#a3a3a3',
        accent: '#3b82f6',
        'accent-dark': '#2563eb',
        primary: {
          500: '#1e40af',
          600: '#1d4ed8',
          700: '#1e3a8a',
        },
        neutral: {
          100: '#191919',
          200: '#2e2e2e',
          300: '#525252',
          400: '#737373',
          500: '#d4d4d4',
          800: '#262626',
          900: '#171717',
        },
        silver: '#c0c0c0',
        'off-white': '#f3f3f3',
        transparent: 'transparent',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px #00ff88' },
          '100%': { boxShadow: '0 0 30px #00ff88, 0 0 40px #00ff88' },
        },
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
};

