//const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require("path");
const fs = require("fs");
const { dependencies } = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')));

const srcPath = path.resolve(__dirname, "src");

module.exports = {
    externals: [...Object.keys(dependencies || {})],
    stats: "errors-only",
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
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        modules: [srcPath, "node_modules"],
        alias: {
            renderer: path.resolve(__dirname, "src/renderer"),
            main: path.resolve(__dirname, "src/main"),
        },
    },
    plugins: [
        //new MonacoWebpackPlugin()
    ],
};
