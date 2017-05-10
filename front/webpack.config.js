var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/jotapp/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: __dirname + '/jotapp/index.jsx',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, /static/],
                loader: 'babel-loader'
            }
        ],
    },
    output: {
        filename: 'transformed.js',
        path: __dirname + '/build'
    },
    plugins: [HTMLWebpackPluginConfig]
  
};
