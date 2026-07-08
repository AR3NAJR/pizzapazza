/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "serif"],
      },
      colors: {
        forno: {
          DEFAULT: "#100D0B", // wood-fired oven black, warm not pure black
          light: "#1B1613",
          wall: "#241D18",
        },
        ember: {
          DEFAULT: "#E85D2F",
          soft: "#F2794C",
          dim: "#7A3620",
        },
        pomodoro: "#B23A2E",
        basilico: "#5C6E45",
        crosta: "#D9A441",
        crema: "#F3E9D8",
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      backgroundImage: {
        "grain-dots":
          "radial-gradient(rgba(217,164,65,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grain-size": "18px 18px",
      },
    },
  },
  plugins: [],
};
