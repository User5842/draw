const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    mode: 'development',
    devServer: {
        compress: true, 
        open: true,
        port: 8080,
        static: path.resolve(__dirname, 'dist'),
    }
};