/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1E1B2E",
          soft: "#4B4A5E",
        },
        paper: "#FFFFFF",
        surface: {
          DEFAULT: "#0B0A14",
          soft: "#15131F",
          line: "#2A2740",
        },
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
        "hero-glow-light":
          "radial-gradient(60% 60% at 70% 20%, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0) 70%)",
        "hero-glow-dark":
          "radial-gradient(60% 60% at 70% 20%, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0) 70%)",
      },
      transitionTimingFunction: {
        snappy: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
