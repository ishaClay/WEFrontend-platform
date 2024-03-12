/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '640px'
      },
      colors: {
        'primary-button': '#00778B',
        'secondary-button': '#64A70B',
        white: "#fff",
        silver: "#b9b9b9",
        olivedrab: "#4c7d0a",
        dimgray: {
          "100": "#4e5566",
          "200": "#555454",
        },
        yellowgreen: {
          "100": "#76bc42",
          "200": "#64a70b",
        },
        lightgreen: "#c1ef85",
        darkslategray: {
          "100": "#3a3a3a",
          "200": "#042937",
          "300": "#002a3a",
        },
        black: "#000",
        teal: "#00778b",
        gainsboro: {
          "100": "#e8e8e8",
          "200": "#d9d9d9",
        },
        darkgray: "#adabab",
        lightslategray: "#7c878e",
        skyblue: "#71b2c9",
        ghostwhite: "#f7f8fc",
        steelblue: {
          "100": "#1762a7",
          "200": "rgba(11, 101, 167, 0.75)",
        },
        paleturquoise: "#acebf5",
        gray: {
          "100": "#fafafa",
          "200": "#898989",
          "300": "#332727",
          "400": "#202020",
          "500": "rgba(255, 255, 255, 0.5)",
        },
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        "d-din-pro": "D-DIN-PRO",
        calibri: "Calibri",
        "uni-neue-trial": "'Uni Neue-Trial'",
        uni_neue: "Uni Neue",
      },
      borderRadius: {
        xl: "20px",
        "3xs": "10px",
        "9xl": "28px",
        "8xs-6": "4.6px",
        "8xs": "5px",
      },
    }, fontSize: {
      xs: "12px",
      base: "16px",
      "5xl": "24px",
      "13xl": "32px",
      lg: "18px",
      sm: "14px",
      "9xl": "28px",
      inherit: "inherit",
    },
  },
  plugins: [],
}

