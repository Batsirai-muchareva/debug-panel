const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        main: path.resolve(__dirname, 'assets/js/main.ts'),
        styles: path.resolve(__dirname, 'assets/scss/styles.scss'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],

        alias: {
            '@component': path.resolve(__dirname, 'assets/js/app/components'),
            '@app': path.resolve(__dirname, 'assets/js/app'),
            '@libs': path.resolve(__dirname, 'assets/js/libs'),
        }
    },
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'sass-loader'
            //     ],
            // },
        ],
    },
    plugins: [
        ...defaultConfig.plugins,
        new MiniCssExtractPlugin( {
            filename: '[name].css', // Output CSS files
        } ),
    ],
};
