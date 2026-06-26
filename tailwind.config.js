export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101418",
        muted: "#657080",
        line: "#dfe5ec",
        paper: "#f6f8fb",
        terminal: "#111827",
        accent: "#0b6bcb",
        amber: "#b7791f"
      },
      boxShadow: {
        soft: "0 12px 30px rgba(16, 24, 40, 0.08)"
      }
    },
  },
  plugins: [],
};
