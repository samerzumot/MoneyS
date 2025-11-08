/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef5ff",
          100: "#dbe9ff",
          200: "#b7d4ff",
          300: "#8cb8ff",
          400: "#6297ff",
          500: "#3d74f6",
          600: "#2b5ae0",
          700: "#2347b5",
          800: "#1d3a8f",
          900: "#182f72",
        },
        accent: {
          50: "#fef6f9",
          100: "#fdebf2",
          200: "#fbd0e2",
          300: "#f5a9c9",
          400: "#f07cb0",
          500: "#eb5298",
          600: "#d4367d",
          700: "#ac2965",
          800: "#85204f",
          900: "#671a3e",
        },
        success: "#2cb67d",
        warning: "#f4a259",
        danger: "#f25f5c",
        slate: {
          50: "#f7f8fb",
          100: "#eef0f7",
          200: "#dcdff0",
          300: "#c0c6df",
          400: "#a0a9c9",
          500: "#7e89b0",
          600: "#636f95",
          700: "#4f5979",
          800: "#414a63",
          900: "#373f53",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Clash Display'", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 20px 45px -20px rgba(31, 75, 255, 0.35)",
      },
    },
  },
  plugins: [forms],
};

