import path from 'path'
import webpack from 'webpack'
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const exec = require('child_process').exec;

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: false,
    presets: ['@babel/preset-env']
  }
}

const fileLoader = {
  loader: 'file-loader',
  options: {
    name: '[folder]/[name].[ext]'
  }
}


let mainConfig = {
  entry: './src/reader.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot)$/,
        use: [fileLoader],
      },
      
      {
        test: /\.(ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[folder]/[name]'
          }
        },
      },

      {
        test: /\.f7.html$/,
        use: [babelLoader, 'framework7-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    alias: {
      buffer: 'buffer'
    },
    fallback: { 
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/"),
      "assert": require.resolve("assert/"),
      "stream": require.resolve("stream-browserify"),
    }
  },
  output: {
    filename: 'reader.js',
    library: "reader",
    path: path.resolve(__dirname, 'public')
  },
  plugins: [

    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true
    }),

    new webpack.DefinePlugin({
      process: {env: {}}
    }),

    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),

    //Admin index page
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Large',
      // favicon: 'src/html/favicon.ico',
      template: 'src/html/reader/index.html',
      filename: 'index.html'
    })

  ]
}

export default mainConfig 





