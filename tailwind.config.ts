import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}", // 👈 important for Contentlayer/MDX posts
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-martian)", "ui-monospace", "monospace"],
        sans: ["var(--font-montserrat)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
