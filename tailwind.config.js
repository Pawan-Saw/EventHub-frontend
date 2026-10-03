/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#0A0A0A",
          card: "#141414",
          card2: "#191919",
          border: "#262626",
        },
        accent: {
          DEFAULT: "#FFB800",
          hover: "#E6A500",
          dark: "#B37E00",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
}
