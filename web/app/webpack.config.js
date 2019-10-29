const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/main/javascript/main.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Smart Home',
            // Load a custom template (lodash by default)
            template: './src/main/resources/assets/templates/index.html',
        }),
        new Dotenv(),
    ],
    node: {
        net: 'empty',
    },
    // For development
    mode: "development",
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"]
            }
        ],
    },
};