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
  module: {
    loaders: [
      { test: /\.js|jsx$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.svg|jpg|png$/, exclude: /node_modules/, loader: 'file-loader' },
      { test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use:['css-loader', 'sass-loader']}) }
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
