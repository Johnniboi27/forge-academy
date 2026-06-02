import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          black: "#070707",
          panel: "#111214",
          panel2: "#181a1d",
          line: "#2a2d31",
          ink: "#f4f4f5",
          muted: "#a1a1aa",
          burgundy: "#7f1d1d",
          wine: "#991b1b",
          ember: "#dc2626"
        }
      },
      boxShadow: {
        forge: "0 18px 50px rgba(0, 0, 0, 0.32)"
      }
    }
  },
  plugins: []
};

export default config;
