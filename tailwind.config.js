module.exports = {
  darkMode: 'class', // or 'class'
  content: [
    './index.html', 
    './src/**/*.{js,jsx,ts,tsx}', // paths to your React files
  ],
  theme: {
    extend: {
      fontFamily: {
        Logo: ['"Jacques Francois Shadow"', 'sans-serif'],
        Heading: ['"Julius Sans One"', 'sans-serif'],
        Content: ['"Lekton"', 'sans-serif'],
      },
    },
  },
};
