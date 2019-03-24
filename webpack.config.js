var path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  entry: './src/App.js',

  output: {
    filename: 'HaystackUI.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'HaystackUI',
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
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
  },

  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    }
  }
}
