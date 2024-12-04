const path = require('path');

// .env stuff...
require('dotenv').config({path: 'public.env'});
require('dotenv').config({path: 'secret.env'});

const ENV_WEBSITE_MODE = process.env.ENV_WEBSITE_MODE;
const EWM_TARGET_DIR   = ENV_WEBSITE_MODE == 'prod' ? 'public' : 'stage';

const ENV_WEBPACK_PORT = process.env.ENV_WEBPACK_PORT;

// Plugins
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
    entry: path.join(__dirname, './frontend/source/index.js'),
    output: {
        filename: 'scripts/bundle.js',
        path: path.join(__dirname, './frontend/' + EWM_TARGET_DIR),
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true, // Allows React's routing to work
        hot: true,
        port: ENV_WEBPACK_PORT,
        proxy: {
            '/api': {
                target: `http://${process.env.ENV_DJANGO_HOST}:${process.env.ENV_DJANGO_PORT}`,
                // pathRewrite: { '^/api': '' },
                changeOrigin: true
            }
        },
        static: [ // Serve static assets
            {
                directory: path.join(__dirname, './frontend/source/documents'),
                publicPath: '/static/documents'
            },
            {
                directory: path.join(__dirname, './frontend/source/fonts'),
                publicPath: '/static/fonts'
            },
            {
                directory: path.join(__dirname, './frontend/source/images'),
                publicPath: '/static/images'
            },
            {
                directory: path.join(__dirname, './frontend/source/languages'),
                publicPath: '/static/languages'
            },
            {
                directory: path.join(__dirname, './frontend/source/other'),
                publicPath: '/static/other'
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
            template: path.join(__dirname, './frontend/source/webpack/template.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/bundle.css'
        }),
        new CopyPlugin({
            patterns: [ // Copy static files to build. This plugin is not designed to copy the bundled files.
                {from: path.join(__dirname, './frontend/source/documents'), to: path.join(__dirname, './frontend/' + EWM_TARGET_DIR + '/documents')},
                {from: path.join(__dirname, './frontend/source/fonts'),     to: path.join(__dirname, './frontend/' + EWM_TARGET_DIR + '/fonts')},
                {from: path.join(__dirname, './frontend/source/images'),    to: path.join(__dirname, './frontend/' + EWM_TARGET_DIR + '/images')},
                {from: path.join(__dirname, './frontend/source/languages'), to: path.join(__dirname, './frontend/' + EWM_TARGET_DIR + '/languages')},
                {from: path.join(__dirname, './frontend/source/other'),     to: path.join(__dirname, './frontend/' + EWM_TARGET_DIR + '/other')},
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
                        publicPath: path.join(__dirname, './frontend/public')
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
                            outputPath: path.join(__dirname, './frontend/fonts')
                        }
                    }
                ]
            }
        ]
    },
    // stats: 'detailed'
});