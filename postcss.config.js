module.exports = {
  plugins: [
    require("postcss-nested")(),
    require("autoprefixer")({ overrideBrowserslist: "cover 99.5%" })
  ]
};
