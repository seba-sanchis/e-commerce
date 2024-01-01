import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-black": "#1d1d1f", // main text
        "secondary-black": "#333336",
        "primary-blue": "#0071e3", // bg button and borders
        "secondary-blue": "#0077ed", // hover
        "tertiary-blue": "#06c", // text link
        "quaternary-blue": "#006edb", // active
        "primary-gray": "#f5f5f7",
        "secondary-gray": "#d2d2d7",
        "tertiary-gray": "#86868b",
        "primary-green": "#68cc45",
        "primary-white": "#fbfbfd",
        "primary-red": "#de071c",
        "secondary-red": "#fef0f0",
        "tertiary-red": "#bf4800",
      },
    },
  },
  plugins: [],
};
export default config;
