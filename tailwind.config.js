module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      darkGray: "hsl(0, 0%, 59%)",
      lightGray: "hsl(0, 0%, 80%)",
      veryDarkGray: "hsl(0, 0%, 17%)",
      white: "hsl(0, 0%, 100%)",
      black: "hsl(0, 0%, 0%)",
    },
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
      awesome: ["Font Awesome 5 Free"],
    },
    gridTemplateColumns: {
      4: "repeat(4, 1fr)",
    },
  },
  plugins: [],
};
