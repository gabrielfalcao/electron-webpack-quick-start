//const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    alias: {
      "renderer": path.resolve(__dirname, "src/renderer"),
      "main": path.resolve(__dirname, "src/main"),
    },
  },
  plugins: [
    //new MonacoWebpackPlugin()
  ],
};
