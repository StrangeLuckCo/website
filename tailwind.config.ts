import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      cursor: {
        hand: 'url("/hand_cursor.png"), auto',
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom, rgba(13, 8, 136, 1), rgba(13, 8, 136, 0.6), rgba(54, 56, 99, 0))",
      },
      blur: {
        xxs: "0.5px",
        xs: "0.75px",
        sm: "1px",
        md: "1.5px",
      },
    },
  },
  plugins: [],
} satisfies Config;
