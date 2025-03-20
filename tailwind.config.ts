import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        celestial: "#33d9b2",
        pencil: "#596275",
        rosy_peach: "#f7d794",
        lavender: "#D980FA",
        android: "#A3CB38",
        berryColor: "#B53471",
        blue_martina: "#12CBC4",
      },
    },
  },
  plugins: [],
};
export default config;
