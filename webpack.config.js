require('dotenv').config();
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
    entry: path.join(__dirname, './portfolio_frontend/source/index.js'),
    output: {
        filename: 'scripts/bundle.js',
        path: path.join(__dirname, './portfolio_frontend/build'),
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true, // Allows React's routing to work
        hot: true,
        port: process.env.ENV_WEBPACK_PORT,
        static: [ // Serve static assets
            {
                directory: path.join(__dirname, './portfolio_frontend/build/documents'),
                publicPath: '/documents'
            },
            {
                directory: path.join(__dirname, './portfolio_frontend/build/fonts'),
                publicPath: '/fonts'
            },
            {
                directory: path.join(__dirname, './portfolio_frontend/build/images'),
                publicPath: '/images'
            },
            {
                directory: path.join(__dirname, './portfolio_frontend/build/languages'),
                publicPath: '/languages'
            },
            {
                directory: path.join(__dirname, './portfolio_frontend/build/other'),
                publicPath: '/other'
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({ // This creates the index.html
            minify: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
            },
            template: path.join(__dirname, './portfolio_frontend/source/webpack/template.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/bundle.css'
        }),
        new CopyPlugin({
            patterns: [ // Copy static files to build. This plugin is not designed to copy the bundled files.
                {from: path.join(__dirname, './portfolio_frontend/source/documents'), to: path.join(__dirname, './portfolio_frontend/build/documents')},
                {from: path.join(__dirname, './portfolio_frontend/source/fonts'),     to: path.join(__dirname, './portfolio_frontend/build/fonts')},
                {from: path.join(__dirname, './portfolio_frontend/source/images'),    to: path.join(__dirname, './portfolio_frontend/build/images')},
                {from: path.join(__dirname, './portfolio_frontend/source/languages'), to: path.join(__dirname, './portfolio_frontend/build/languages')},
                {from: path.join(__dirname, './portfolio_frontend/source/other'),     to: path.join(__dirname, './portfolio_frontend/build/other')},
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.(css|less|sass|scss)$/,
                use: [ // Do not use style-loader as it's incompatible with MiniCssExtractPlugin
                    {loader: MiniCssExtractPlugin.loader, options: {
                        publicPath: path.join(__dirname, './portfolio_frontend/build')
                    }},
                    {loader: 'css-loader',     options: {url: false}},
                    {loader: 'postcss-loader', options: {postcssOptions: {plugins: () => [require('autoprefixer')]}}},
                    {loader: 'sass-loader',    options: {}}
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: path.join(__dirname, './portfolio_frontend/fonts')
                        }
                    }
                ]
            }
        ]
    },
    // stats: 'detailed'
});