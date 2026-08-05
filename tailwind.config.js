/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF0FF",
          100: "#E1E4FF",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
        },
        violet: {
          500: "#7C3AED",
          600: "#6D28D9",
        },
        slate: {
          muted: "#6B7280",
          light: "#9CA3AF",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        script: ["'Dancing Script'", "cursive"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      maxWidth: {
        content: "1240px",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)",
      },
      transitionTimingFunction: {
        snappy: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
