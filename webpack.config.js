var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/dist/index.html',
  filename: 'index.html',
  inject: 'body'
});
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/index.js',

  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js",
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js|jsx$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.svg|jpg|png|woff|woff2$/, exclude: /node_modules/, loader: 'url-loader' },
      { test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use:[{loader: 'css-loader', options: {sourceMap: true}}, {loader: 'sass-loader', options: {sourceMap: true}}]}) },
      { test: /\.json$/, use: 'json-loader' }
    ]
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new ExtractTextPlugin({
      filename: 'dist/style.css',
      allChunks: true
    })
  ]
};
