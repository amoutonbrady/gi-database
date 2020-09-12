module.exports = {
  purge: {
    mode: "layers",
    layers: ["utilities"],
    content: ["./src/index.html", "./src/**/*.tsx"],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  experimental: "all",
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
