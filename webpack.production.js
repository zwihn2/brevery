const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PostcssPresetEnv = require('postcss-preset-env');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    entry: path.resolve(__dirname, 'src/app/index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[hash].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        ident: 'postcss',
                        options: {
                            plugins: [
                                PostcssPresetEnv({
                                    browsers: 'last 2 versions',
                                }),
                            ],
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        alias: {
            actions: path.resolve(__dirname, 'src/actions/'),
            app: path.resolve(__dirname, 'src/app/'),
            clients: path.resolve(__dirname, 'src/clients/'),
            components: path.resolve(__dirname, 'src/components/'),
            constants: path.resolve(__dirname, 'src/constants/'),
            flow: path.resolve(__dirname, 'src/flow/'),
            helpers: path.resolve(__dirname, 'src/helpers/'),
            reducers: path.resolve(__dirname, 'src/reducers/'),
            sagas: path.resolve(__dirname, 'src/sagas/'),
            selectors: path.resolve(__dirname, 'src/selectors/'),
            services: path.resolve(__dirname, 'src/services/'),
            utilities: path.resolve(__dirname, 'src/utilities/'),
            styles: path.resolve(__dirname, 'src/styles/'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new TerserWebpackPlugin({}),
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            chunkFilename: '[id].css',
            filename: '[name].[hash].css',
        }),
        new OptimizeCssAssetsPlugin({}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
};
