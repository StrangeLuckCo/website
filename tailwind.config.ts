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
        hand: 'url("/hand_cursor_2.png"), auto',
      },
      backdropBlur: {
        sm: "5px",
      },
      backgroundImage: {
        "nav-gradient":
          "linear-gradient(180deg, #0D0888 0%, rgba(13, 8, 136, 0.60) 26.92%, rgba(54, 56, 99, 0.00) 100%)",
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
