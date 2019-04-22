const path = require('path');
const webpack = require('webpack');

const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    entry: path.resolve(__dirname, 'conf/config.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'config.js',
    },
    externals: [
        {
            window: 'window',
        },
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new TerserWebpackPlugin({}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.EnvironmentPlugin([
            'IDM_SERVICE_URL',
            'LOGIN_SERVER_ROOT',
            'VTT_SERVER_URL',
            'PAIL_URL',
            'REVV4_PORTAL_URL',
        ]),
    ],
};
