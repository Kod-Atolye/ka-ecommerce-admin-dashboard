window.tailwind = window.tailwind || {};

tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Manrope"', "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', '"Manrope"', "sans-serif"],
      },
      colors: {
        canvas: "#f4f7fb",
        ink: "#0f172a",
        accent: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          500: "#0f766e",
          600: "#0d9488",
          700: "#115e59",
        },
        sunrise: {
          50: "#fff7ed",
          100: "#ffedd5",
          500: "#f97316",
          600: "#ea580c",
        },
      },
      boxShadow: {
        panel: "0 28px 80px rgba(15, 23, 42, 0.10)",
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        "grid-soft":
          "linear-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.15) 1px, transparent 1px)",
      },
    },
  },
};
