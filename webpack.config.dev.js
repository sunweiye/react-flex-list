const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: "eval",
    mode: process.env.NODE_ENV,
    entry: [
        'babel-polyfill',
        "react-hot-loader/patch",
        "webpack-hot-middleware/client?reload=true",
        "webpack/hot/only-dev-server",
        "./example/index.js"
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: "/static/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin(),
        //do not emit compiled assets that include errors
    ],
    module: {
        rules:[
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "example"),
                    path.join(__dirname, "src")
                ],
                loader: require.resolve('babel-loader'),
                options: {
                    // This is a feature of `babel-loader` for Webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel'],
                    compact: false
                },
            },
            // {
            //     test: /\.jsx?$/,
            //     include: [
            //         path.join(__dirname, "example")
            //     ],
            //     use: [
            //         {loader: 'react-hot-loader/webpack', query: {compact: false}},
            //         {loader: 'babel-loader', query: {compact: false}}
            //     ]
            // },
            // {
            //     test: /\.css$/,
            //     use: { loader: "style-loader" },
            //     include: [
            //         path.join(__dirname, "css"),
            //         path.join(__dirname, "playground"),
            //         path.join(__dirname, "node_modules"),
            //     ]
            // }
        ]
    }
};
