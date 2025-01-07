const path = require('path');

// Load environment variables from two separate files
// public.env contains non-sensitive configuration
// secret.env contains sensitive data like API keys
require('dotenv').config({path: 'public.env'});
require('dotenv').config({path: 'secret.env'});

const ENV_WEBSITE_VERSION = process.env.ENV_WEBSITE_VERSION;
const ENV_WEBPACK_PORT = process.env.ENV_WEBPACK_PORT;

// Plugins
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
    entry: path.join(__dirname, './frontend/source/index.js'),
    // Output settings for bundled files
    output: {
        filename: `scripts/[name].${ENV_WEBSITE_VERSION}.js`,
        chunkFilename: `scripts/[name].chunk.${ENV_WEBSITE_VERSION}.js`,
        path: path.join(__dirname, './frontend/public'),
        publicPath: argv.mode === 'production' ? '/static/' : '/',
        clean: true,
    },
    // Code splitting optimization
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000, // Minimum size in bytes for creating a chunk
            minChunks: 1,   // Minimum number of chunks that share a module
            maxAsyncRequests: 30, // Maximum number of parallel requests when loading chunks
            maxInitialRequests: 30,
            cacheGroups: {
                // Separate vendor (node_modules) code into its own chunk
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors'
                },
                // Group commonly shared code into a separate chunk
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    name: 'common'
                }
            }
        }
    },
    devServer: {
        historyApiFallback: true, // Support client-side routing
        hot: true, // Enable hot module replacement
        port: ENV_WEBPACK_PORT,
        // Proxy API requests to Django backend
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
        // Generate index.html with injected bundles
        new HTMLWebpackPlugin({
            filename: 'index.html',
            minify: {collapseWhitespace: false, minifyCSS: false, minifyJS: false, removeComments: false,},
            template: path.join(__dirname, './frontend/source/webpack/template_index.html')
        }),
        // Generate error.html with injected bundles
        new HTMLWebpackPlugin({
            filename: 'error.html',
            minify: {collapseWhitespace: false, minifyCSS: false, minifyJS: false, removeComments: false,},
            template: path.join(__dirname, './frontend/source/webpack/template_error.html')
        }),
        // Generate maintenance.html with injected bundles
        new HTMLWebpackPlugin({
            filename: 'maintenance.html',
            minify: {collapseWhitespace: false, minifyCSS: false, minifyJS: false, removeComments: false,},
            template: path.join(__dirname, './frontend/source/webpack/template_maintenance.html')
        }),
        // Extract CSS into separate files
        new MiniCssExtractPlugin({
            filename: `styles/[name].${ENV_WEBSITE_VERSION}.css`
        }),
        // Copy static assets to build directory
        new CopyPlugin({
            patterns: [ // Copy static files to build. This plugin is not designed to copy the bundled files.
                {from: path.join(__dirname, './frontend/source/documents'), to: path.join(__dirname, './frontend/public/documents')},
                {from: path.join(__dirname, './frontend/source/fonts'),     to: path.join(__dirname, './frontend/public/fonts')},
                {from: path.join(__dirname, './frontend/source/images'),    to: path.join(__dirname, './frontend/public/images')},
                {from: path.join(__dirname, './frontend/source/languages'), to: path.join(__dirname, './frontend/public/languages')},
                {from: path.join(__dirname, './frontend/source/other'),     to: path.join(__dirname, './frontend/public/other')},
            ]
        })
    ],
    // Configure module loading rules
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
    // Uncomment for detailed build information
    // stats: 'detailed'
});