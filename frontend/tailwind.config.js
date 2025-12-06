/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // use CSS variables so palette can be changed globally
        background: "var(--bg-primary)",
        surface: "var(--surface)",
        secondary: "var(--bg-secondary)",
        border: "var(--border)",
        primary: "var(--accent-primary)",
        accent: "var(--accent-secondary)",
        success: "var(--success)",
        danger: "var(--danger)",
        text: "var(--text-primary)",
        muted: "var(--text-muted)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl: "1rem",
      },
      transitionDuration: {
        DEFAULT: "200",
      },
    },
  },
  plugins: [],
};
