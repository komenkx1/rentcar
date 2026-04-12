import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Material Design 3 Color Tokens (dari Stitch) ───
      colors: {
        // Primary — Navy Blue
        primary: "#003180",
        "primary-container": "#0046b0",
        "primary-fixed": "#dae2ff",
        "primary-fixed-dim": "#b2c5ff",
        "on-primary": "#ffffff",
        "on-primary-container": "#a6bdff",
        "on-primary-fixed": "#001848",
        "on-primary-fixed-variant": "#0040a2",

        // Secondary — Slate
        secondary: "#525f73",
        "secondary-container": "#d6e3fb",
        "secondary-fixed": "#d6e3fb",
        "secondary-fixed-dim": "#bac7de",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#586579",
        "on-secondary-fixed": "#0f1c2d",
        "on-secondary-fixed-variant": "#3b485a",

        // Tertiary — Green (Available badge)
        tertiary: "#004019",
        "tertiary-container": "#71fe93",
        "tertiary-fixed": "#71fe93",
        "tertiary-fixed-dim": "#52e079",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#49d872",
        "on-tertiary-fixed": "#002109",
        "on-tertiary-fixed-variant": "#005322",

        // Surface
        surface: "#f9f9ff",
        "surface-dim": "#d2daf0",
        "surface-bright": "#f9f9ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f1f3ff",
        "surface-container": "#e9edff",
        "surface-container-high": "#dde3f8",
        "surface-container-highest": "#dbe2f9",
        "surface-variant": "#dbe2f9",
        "inverse-surface": "#293041",
        "inverse-on-surface": "#edf0ff",

        // On Surface
        "on-surface": "#141b2c",
        "on-surface-variant": "#434653",
        "on-background": "#141b2c",

        // Error
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",

        // Outline
        outline: "#737784",
        "outline-variant": "#c3c6d5",

        // Background
        background: "#f9f9ff",
      },

      // ─── Typography ───
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },

      // ─── Border Radius ───
      borderRadius: {
        DEFAULT: "0.125rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },

      // ─── Box Shadow ───
      boxShadow: {
        card: "0 4px 24px rgba(20, 27, 44, 0.04)",
        "card-hover": "0 8px 32px rgba(20, 27, 44, 0.08)",
        "card-lg": "0 12px 48px -12px rgba(20, 27, 44, 0.06)",
        "bottom-nav": "0 -1px 0 rgba(192, 196, 213, 0.3), 0 -4px 16px rgba(20,27,44,0.06)",
      },

      // ─── Animation ───
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },

      // ─── Screen breakpoints ───
      screens: {
        xs: "390px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};

export default config;
