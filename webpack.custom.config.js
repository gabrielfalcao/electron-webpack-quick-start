const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
//const CopyPlugin = require("copy-webpack-plugin");
//const WriteFilePlugin = require("write-file-webpack-plugin");

const path = require("path");
const fs = require("fs");
const { dependencies } = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')));

const srcPath = path.resolve(__dirname, "src");
const PRODUCTION = process.env.NODE_ENV === "production"

module.exports = {
    //externals: [...Object.keys(dependencies || {})],
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
	    {
		test: /\.ttf$/,
		use: ['file-loader']
	    }
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
        /* new CopyPlugin({
         *     patterns: [
         *         { 'from': "node_modules/monaco-editor/min/vs/", 'to': "vs" },
         *         !PRODUCTION && { from: "node_modules/monaco-editor/min-maps/vs/", "to": "min-maps/vs" }
         *     ].filter(Boolean)
         * }),
         * new WriteFilePlugin({
         *     test: /vs/,
         *     useHashIndex: true
         * }), */
        new MonacoWebpackPlugin({
	    monacoEditorPath: path.resolve(__dirname, 'node_modules/monaco-editor')
        }),
    ],
};
