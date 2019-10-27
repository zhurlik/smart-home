const path = require('path');

module.exports = {
    entry: './src/main/javascript/main.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    }
};