import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a2e",
        accent: "#4f46e5",
        surface: "#f8fafc",
        border: "#e2e8f0",
        muted: "#64748b",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      fontSize: {
        base: "16px",
      },
      lineHeight: {
        base: "1.7",
      },
      spacing: {
        "max-content": "1100px",
      },
    },
  },
  plugins: [],
};

export default config;
