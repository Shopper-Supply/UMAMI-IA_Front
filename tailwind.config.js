/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        "roxo-primario": "#5F4B8B",
        "roxo-secundario": "#3C2F58",

        "cinza-primario": "#D9D9D9",

        "branco-primario": "#FFFFFF",
        "branco-secundario": "#F4F3F7",

        "severity-1": "#EAFFB1",
        "severity-2": "#BFE558",
        "severity-3": "#FCFF53",
        "severity-4": "#FB8B4B",
        "severity-5": "#F83636",
      },
      keyframes: {
        showPop: {
          "0%": {
            transform: "translateY(-150px)",
            transform: "translateY(-150px)",
          },
          "100%": {
            transform: "translateY(0)",
            transform: "translateY(0)",
          },
        },
        showModal: {
          "0%": {
            transform: "translateX(-500px)",
            transform: "translateX(-500px)",
          },
          "100%": {
            transform: "translateX(0)",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        showPopAnimation: "showPop 0.5s",
        showModalAnimation: "showModal 1s",
      },
    },
  },
  plugins: [],
};
