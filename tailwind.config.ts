import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
  plugins: [typography],
};

export default config;
