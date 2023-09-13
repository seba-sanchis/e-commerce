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
        "primary-black": "#1d1d1f",
        "secondary-black": "#333336",
        "primary-blue": "#0071e3",
        "secondary-blue": "#0077ed",
        "tertiary-blue": "#06c",
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
