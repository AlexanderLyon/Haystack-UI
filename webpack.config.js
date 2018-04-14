var path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  entry: './src/main.js',

  output: {
    filename: 'HaystackUI.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    inline: true, // autorefresh
    port: 8080 // development port server
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, // search for js files
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'] // use es2015 and react
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.svg/,
        use: {
            loader: 'svg-url-loader',
            options: {}
        }
      }
    ]
  }
}
