const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {

    entry: {
        app: './src/js/app.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist', 'js')
    },

    devtool: 'source-map',

    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }],
                fallback: 'style-loader',
            })
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            'targets': {
                                browsers: ['last 2 versions', 'ie >= 11']
                            }
                        }]
                    ]
                }
            }]
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    outputPath: 'img/'
                }
            }]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            loader: "file-loader",
            options: {
                name: '/font/[name].[ext]',
                // outputPath: '/font'
            }
        }
        ]
    },

    plugins: []
};


if (isProduction) {
    config.plugins = config.plugins.concat([

        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('../css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            script: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD3LTkgH_ASYBXH-63RyoCNnklwXscJVek&libraries=places&language=en",
            template: 'src/index.html'
        })
    ]);
} else {
    config.plugins = config.plugins.concat([
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('../css/[name].css').replace('css/js', 'css');
            },
            allChunks: true,
            disable: true
        }),
        new HtmlWebpackPlugin({
            script: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD3LTkgH_ASYBXH-63RyoCNnklwXscJVek&libraries=places&language=en",
            template: 'src/index.html'
        })
    ]);

    config.devServer = {
        contentBase: path.resolve(__dirname, 'dist', 'js'),
        port: 9000
    };
}

module.exports = config;