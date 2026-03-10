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
        apex: {
          charcoal: "#1C1C1C",
          platinum: "#E0E0E0",
          blue: "#007FFF",
        },
        tektite: {
          indigo: "#3B3B98",
          gunmetal: "#2B2B2B",
          cyan: "#00FFF5",
        },
        iron: {
          green: "#2C5F2D",
          gold: "#FFD700",
          cream: "#F5F5DC",
          slate: "#5A5A5A",
        },
      },
    },
  },
  plugins: [],
};
export default config;