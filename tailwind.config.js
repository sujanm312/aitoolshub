/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#FF671F',
          light: '#FF9933',
          dark: '#E05510',
        },
        indiaGreen: {
          DEFAULT: '#046A38',
          light: '#138808',
          dark: '#034E28',
        },
        navy: {
          DEFAULT: '#06038D',
          dark: '#0F172A',
          deep: '#05024A',
        },
      },
      boxShadow: {
        '3d-saffron': '0 4px 0 #b45309',
        '3d-green': '0 4px 0 #034e28',
        '3d-navy': '0 4px 0 #05024a',
        'tactile': '0 4px 0 rgba(0,0,0,0.15)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
