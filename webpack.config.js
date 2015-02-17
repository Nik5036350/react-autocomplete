
var webpack = require('webpack');

var config = {
    devtool: 'eval',
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path))
    },
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/main.js'
    ],
    output: {
        path: __dirname + '/build/',
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    resolve: {
        alias: {},
        extensions: ['', '.js']
    },
    module: {
        noParse: [],
        loaders: [
            { test: /\.js$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
            {
                test: /\.scss$/,
                // Passing indentedSyntax query param to node-sass
                loader: "style!css!sass?outputStyle=expanded&"
            }
        ]
    }
};
//config.addVendor('react','react');

module.exports = config;