module.exports = {
  // purge: false,
  purge: {
    mode: "layers",
    layers: ["utilities"],
    content: ["./src/index.html", "./src/**/*.tsx"],
  },
  theme: {
    extend: {
      animation: {
        "fade-in-bottom":
          "fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      },
      "fade-in-bottom": {
        wiggle: {
          "0%": {
            transform: "translateY(50px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
      },
    },
  },
  variants: {},
  plugins: [],
  experimental: "all",
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
