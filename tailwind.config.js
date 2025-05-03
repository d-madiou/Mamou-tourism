export default {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
        keyframes: {
          zoom: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
          },
        },
        animation: {
          zoom: 'zoom 10s infinite ease-in-out',
        },
      },
    },
    plugins: [require('tailwindcss-motion')],
  };
  