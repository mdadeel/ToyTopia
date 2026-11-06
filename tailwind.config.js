import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        /* brand palette — warm but restrained */
        cream: "#FBF6EE",
        ink: "#211C18",
        coral: { DEFAULT: "#E2553F", dark: "#C4442F" },
        sun: "#F0B23C",
        sky: "#2FA0CE",
        mint: "#46B98F",
        grape: "#8E74E0",
        line: "#ECE0D0",

        /* muted pastel surfaces */
        blush: "#F7E4E1",
        butter: "#F8EFD2",
        skysoft: "#E4F1F8",
        sage: "#E4F3EC",
        lilac: "#EFEAFB",
        peach: "#FBEADC",

        /* shadcn-compatible tokens (kept for ui primitives) */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ['"Baloo 2 Variable"', '"Baloo 2"', "system-ui", "sans-serif"],
        body: ['"Nunito Variable"', "Nunito", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 6px)",
        sm: "calc(var(--radius) - 10px)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(44,30,20,0.04), 0 14px 30px -18px rgba(44,30,20,0.28)",
        pop: "0 24px 60px -24px rgba(44,30,20,0.35)",
        inset: "inset 0 -4px 0 0 rgba(44,30,20,0.06)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
