/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette mapped onto existing keys
        forest: {
          50: '#EEF4EA',
          100: '#E3EBDD',
          200: '#C9D6BE',
          300: '#AEC1A0',
          400: '#8FA878',
          500: '#587E33', // Bean Green
          600: '#4B6E2C',
          700: '#3E5C25',
          800: '#244019',
          900: '#0B291B', // Deep Green (Negro Mate)
        },
        cacao: {
          50: '#FEF6EE',
          100: '#FDEAD7',
          200: '#F9D1A8',
          300: '#F1B475',
          400: '#E3953E',
          500: '#C26A1C', // Accent 01
          600: '#A85718',
          700: '#7F4012',
          800: '#5F3010',
          900: '#44230A',
        },
        cream: {
          50: '#fff8e1',
          100: '#EDF2E3',
          200: '#DAE3C7',
          300: '#CDD7BF', // Creamy Aroma
          400: '#BECBA9',
          500: '#AEBE93',
          600: '#97A77B',
          700: '#7D8B64',
          800: '#636F4E',
          900: '#4E583D',
        },
        brand: {
          bean: '#587E33',
          deep: '#0B291B',
          creamy: '#CDD7BF',
          accent1: '#C26A1C',
          accent2: '#1E3D7A',
          accent3: '#610B31',
        }
      },
      fontFamily: {
        'serif': ['Blacker Display', 'Blacker Text', 'serif'],
        'sans': ['Product Sans', 'system-ui', 'sans-serif'],
        'mono': ['Source Code Variable', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
