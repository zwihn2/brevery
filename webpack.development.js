const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostcssPresetEnv = require('postcss-preset-env');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    devServer: {
        port: 3000,
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    mode: 'development',
    entry: {
        config: path.resolve(__dirname, 'conf/config.js'),
        main: path.resolve(__dirname, 'src/app/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[hash].js',
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
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
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
            components: path.resolve(__dirname, 'src/components'),
            constants: path.resolve(__dirname, 'src/constants/'),
            flow: path.resolve(__dirname, 'src/flow/'),
            helpers: path.resolve(__dirname, 'src/helpers/'),
            reducers: path.resolve(__dirname, 'src/reducers/'),
            sagas: path.resolve(__dirname, 'src/sagas/'),
            selectors: path.resolve(__dirname, 'src/selectors/'),
            services: path.resolve(__dirname, 'src/services/'),
            styles: path.resolve(__dirname, 'src/styles/'),
            utilities: path.resolve(__dirname, 'src/utilities/'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new WriteFilePlugin(),
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './src/index.dev.html',
        }),
        new MiniCssExtractPlugin({
            chunkFilename: '[id].css',
            filename: '[name].css',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new webpack.EnvironmentPlugin([
            'ROOT_URL',
        ]),
    ],
};
