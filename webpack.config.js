'use strict';

// windows - set NODE_ENV=(production|development)

const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(NODE_ENV);
const webpack = require('webpack');

// var phaserModule = path.join(__dirname, '/node_modules/phaser/build/custom/');

module.exports = {
    entry: {
        "area": ["./index.js"]
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].js"
    },

    // watch: NODE_ENV === 'development',
    watch: false,
    watchOptions: {
        aggregateTimeout: 300
    },

    devtool: NODE_ENV === 'development' ? "cheap-inline-module-source-map" : '',

    plugins: [
        // new webpack.NoErrorsPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(NODE_ENV) }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     // name: ['game', 'vendor', 'polyfills']
        // })
        // new webpack.ProvidePlugin({
        //     "Phaser": 'Phaser',
        //     "PIXI": 'PIXI',
        //     "p2": 'p2'
        // })
    ],

    resolve: {
        modules: ['node_modules'],
        extensions: ['.css', '.js', '.ts'],
        // alias: {
        //     "Phaser": path.join(phaserModule, 'phaser-split.js'),
        //     "PIXI": path.join(phaserModule, 'pixi.js'),
        //     "p2": path.join(phaserModule, 'p2.js')
        // }
    },

    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader'],
        extensions: ['.js']
    },

    module: {
        rules: [
    	    {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
            //  {
            //     test: /\.ts$/,
            //     loaders: ['awesome-typescript-loader', 'angular2-template-loader?keepUrl=true'],
            //     exclude: [/\.(spec|e2e)\.ts$/]
            // },
            // {  
            //     test: /\.html$/,
            //     loader: 'html-loader'
            //   },
        ]
    }
};

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
}
