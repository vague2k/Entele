/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter"],
      },
      textColor: {
        base: {
          50: "rgb(var(--text-50) / <alpha-value>)",
          100: "rgb(var(--text-100) / <alpha-value>)",
          200: "rgb(var(--text-200) / <alpha-value>)",
          300: "rgb(var(--text-300) / <alpha-value>)",
          400: "rgb(var(--text-400) / <alpha-value>)",
          500: "rgb(var(--text-500) / <alpha-value>)",
          600: "rgb(var(--text-600) / <alpha-value>)",
          700: "rgb(var(--text-700) / <alpha-value>)",
          800: "rgb(var(--text-800) / <alpha-value>)",
          900: "rgb(var(--text-900) / <alpha-value>)",
          950: "rgb(var(--text-950) / <alpha-value>)",
        },
      },
      colors: {
        fill: {
          0: "rgb(var(--background-0) / <alpha-value>)",
          50: "rgb(var(--background-50) / <alpha-value>)",
          100: "rgb(var(--background-100) / <alpha-value>)",
          200: "rgb(var(--background-200) / <alpha-value>)",
          300: "rgb(var(--background-300) / <alpha-value>)",
          400: "rgb(var(--background-400) / <alpha-value>)",
          500: "rgb(var(--background-500) / <alpha-value>)",
          600: "rgb(var(--background-600) / <alpha-value>)",
          700: "rgb(var(--background-700) / <alpha-value>)",
          800: "rgb(var(--background-800) / <alpha-value>)",
          900: "rgb(var(--background-900) / <alpha-value>)",
          950: "rgb(var(--background-950) / <alpha-value>)",
          1000: "rgb(var(--background-1000) / <alpha-value>)",
        },
        primary: {
          50: "rgb(var(--primary-50) / <alpha-value>)",
          100: "rgb(var(--primary-100) / <alpha-value>)",
          200: "rgb(var(--primary-200) / <alpha-value>)",
          300: "rgb(var(--primary-300) / <alpha-value>)",
          400: "rgb(var(--primary-400) / <alpha-value>)",
          500: "rgb(var(--primary-500) / <alpha-value>)",
          600: "rgb(var(--primary-600) / <alpha-value>)",
          700: "rgb(var(--primary-700) / <alpha-value>)",
          800: "rgb(var(--primary-800) / <alpha-value>)",
          900: "rgb(var(--primary-900) / <alpha-value>)",
          950: "rgb(var(--primary-950) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
