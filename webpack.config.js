var webpack = require('webpack')
var path = require('path')
var loaders = require('./webpack.loaders')
var HtmlWebpackPlugin = require('html-webpack-plugin')

//  global css
loaders.push({
  test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
  loaders: [
    'style?sourceMap',
    'css'
  ]
})

// local css modules
loaders.push({
  test: /[\/\\]src[\/\\].*\.css/,
  exclude: /(node_modules|bower_components|public)/,
  loaders: [
    'style?sourceMap',
    'css'
  ]
})

module.exports = {
  entry: [
    `./src/index.jsx` // Appʼs entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'Havegunwilltravel'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders
  },
  devServer: {
    contentBase: './dist',
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
