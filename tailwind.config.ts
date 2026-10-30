import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          primary: "var(--surface-primary)",
          secondary: "var(--surface-secondary)",
          elevated: "var(--surface-elevated)",
        },
        border: {
          subtle: "var(--border-subtle)",
          default: "var(--border-default)",
          strong: "var(--border-strong)",
        },
        accent: {
          indigo: "var(--accent-indigo)",
          cyan: "var(--accent-cyan)",
          violet: "var(--accent-violet)",
        },
        status: {
          success: "var(--status-success)",
          "success-subtle": "var(--status-success-subtle)",
          warning: "var(--status-warning)",
          "warning-subtle": "var(--status-warning-subtle)",
          error: "var(--status-error)",
          "error-subtle": "var(--status-error-subtle)",
          inactive: "var(--status-inactive)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
