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
            favicon: './src/main/resources/assets/favicon.ico'
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
        https: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"]
            },
            /** React Components **/
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ],
    },
};