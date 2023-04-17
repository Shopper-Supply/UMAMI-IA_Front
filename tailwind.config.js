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
    },
  },
  plugins: [],
};
