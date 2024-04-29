const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
        popup: path.resolve('./src/popup/popup.tsx')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/manifest.json'),
                    to: path.resolve('dist')
                },
                {
                    from: path.resolve('src/assets/snitch.png'),
                    to: path.resolve('dist')
                },
                {
                    from: path.resolve('src/background/background.js'),
                    to: path.resolve('dist')
                },
            ],
        }),
        new HtmlWebpackPlugin({
            title: "React.js Chrome Extension Popup",
            filename: "popup.html",
            chunks: ['popup']
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'window', // This line might help
    },

};
