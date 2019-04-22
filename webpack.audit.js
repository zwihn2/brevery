const production = require('./webpack.production.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = Object.assign(
    {},
    production,
    {
        plugins: production.plugins.concat(
            new BundleAnalyzerPlugin()
        ),
    }
);
