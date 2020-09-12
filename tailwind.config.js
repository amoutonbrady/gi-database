module.exports = {
  purge: {
    mode: "layers",
    layers: ["utilities"],
    content: ["src/index.html", "src/**/*.tsx, 'src/**/*.css"],
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
