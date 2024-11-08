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
        cream: '#FDF6E3',
        'dark-cream': '#ECE1C6',
        'dark-gray': '#333333',
      },
    },
  },
  plugins: [],
};
export default config;
