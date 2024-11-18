// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors: {
        primary: '#191A1F',
        gray: '#C3C3C4',
        background:'#141519'
      },
    
    
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
