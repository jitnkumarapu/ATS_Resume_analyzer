/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f19",
        card: "#111827",
        accent: "#4f46e5",
      },
    },
  },
  safelist: [
    // Background colors
    { pattern: /^bg-(slate|gray|blue|purple|pink|green|yellow|emerald|orange|red)-\d+/ },
    // Text colors
    { pattern: /^text-(slate|gray|blue|purple|pink|green|yellow|emerald|orange|red)-\d+/ },
    // Border colors
    { pattern: /^border-(slate|gray|blue|purple|pink|green|yellow|emerald|orange|red)-\d+/ },
    // Gradient colors
    { pattern: /^(from|to|via)-(slate|gray|blue|purple|pink|green|yellow|emerald|orange|red)-\d+/ },
    // Ring colors
    { pattern: /^ring-(slate|gray|blue|purple|pink|green|yellow|emerald|orange|red)-\d+/ },
  ],
  plugins: [],
};
