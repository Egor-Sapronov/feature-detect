const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        index: ['webpack-hot-middleware/client', './src/index'],
        elm: './src/elm/index',
        detector: './src/detector',
    },
    output: {
        path: path.join(__dirname, 'static'),
        filename: '[name].js',
        publicPath: '/static/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_HOST: JSON.stringify(process.env.API_HOST),
            },
        }),
        new HtmlWebpackPlugin({
            filename: 'elm.html',
            template: './src/elm/index.html',
            chunks: ['elm'],
        }),
        new HtmlWebpackPlugin({
            filename: 'landing.html',
            template: './src/landing/index.html',
            chunks: [],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index', 'detector'],
        }),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src'),
        }, {
            test: /\.css$/,
            loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]',
        }, {
            test: /\.elm$/,
            exclude: [/elm-stuff/, /node_modules/],
            loader: 'elm-webpack',
        }],
    },
};
