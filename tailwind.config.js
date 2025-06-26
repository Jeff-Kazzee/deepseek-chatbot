/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00FF00",
        "primary-hover": "#33FF33",
        secondary: "#CCCCCC",
        background: "#000000",
      },
      fontFamily: {
        mono: ["Courier New", "monospace"],
      },
      spacing: {
        section: "4rem",
      },
      borderRadius: {
        container: "0.5rem",
      },
    },
  },
  plugins: [],
};
