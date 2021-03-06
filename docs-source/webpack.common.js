const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  entry: "./index.js",
  output: {
    path: resolve(__dirname, 'dist'),
    filename: "source.js"
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CopyWebpackPlugin([{
      from: resolve(__dirname, 'static/')
    }])
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'less-loader' // compiles Less to CSS
      }]
    }]
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'components/'),
      '@functions': resolve(__dirname, 'functions/'),
      '@styles': resolve(__dirname, 'functions/'),
      '@root': __dirname
    }
  }
}
