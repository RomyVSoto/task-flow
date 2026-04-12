import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F8F9FB",
        card: "#FFFFFF",
        column: "#F1F5F9",
        border: "#E2E8F0",
        primary: {
          DEFAULT: "#1E293B",
          secondary: "#64748B",
        },
        accent: {
          DEFAULT: "#4F46E5",
          light: "#EEF2FF",
        },
        priority: {
          low: "#10B981",
          medium: "#F59E0B",
          high: "#EF4444",
        },
      },
    },
  },
  plugins: [],
};

export default config;