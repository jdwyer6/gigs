/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandPrimary: {
          DEFAULT: '#fbbc09', // Primary color
          light: '#ffde82',   // Light variant
          dark: '#f1aa00',    // Dark variant
        },
        brandSecondary: {
          DEFAULT: '#4F46E5'
        }
      },
    },
  },
  plugins: [],
}

