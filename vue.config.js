const path = require("path");
const resolve = function(dir) {
  return path.join(__dirname, dir);
};
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: true, // 是否开启eslint保存检测
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@p", resolve("src/pages"))
      .set("@c", resolve("src/components"));
    config.optimization.runtimeChunk("single");
  },
  devServer: {
    open: true,
    before: require("./src/mock/mock-server")
  }
};
