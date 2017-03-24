var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/dist/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './app/index.js',

  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js",
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js|jsx$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
};
