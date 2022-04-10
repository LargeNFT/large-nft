import path from 'path'
import webpack from 'webpack'
import fs from 'fs'


import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

// const nodeExternals = require('webpack-node-externals')

// const exec = require('child_process').exec;


const fileLoader = {
  loader: 'file-loader',
  options: {
    name: '[folder]/[name].[ext]'
  }
}


let adminConfig = {
  entry: './src/index.ts',
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
        use: ['framework7-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
    },
    fallback: { 
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/"),
      "assert": require.resolve("assert/"),
      "stream": require.resolve("stream-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "crypto": require.resolve("crypto-browserify"),
      "fs": require.resolve("browserify-fs"),
      "dgram": require.resolve("dgram-browserify"),
      "child_process": false
    }
  },
  output: {
    filename: 'admin/[name].admin.js',
    library: "admin",
    path: path.resolve(__dirname, 'public'),
    clean: true
  },
  optimization: {
    usedExports: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [

    new CleanWebpackPlugin({
      dangerouslyAllowCleanPatternsOutsideProject: true
    }),

    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),

    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),

    //Admin index page
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Large',
      // favicon: 'src/html/favicon.ico',
      template: 'src/html/index.html',
      filename: 'index.html'
    }),

    {
      apply: (compiler) => {

        compiler.hooks.environment.tap('BuildContractsPlugin', (params) => {
          let contractJSON = {

          }

          let contracts = ['Channel']

          for (let contract of contracts) {

            //Get Truffle contracts and put them in a format we can inject into our services
            let truffleJson = require(`./build/contracts/${contract}.json`)

            contractJSON[contract] = createContractFromTruffle(truffleJson)

          }

          //Add mock
          // contractJSON["MLBC"] = contractJSON["MockMLBCFull"]


          fs.writeFileSync('./contracts.json', JSON.stringify(contractJSON));


        })
      

      }
    }

  ]
}

function createContractFromTruffle(truffleJson)  {

  return {
      // address: truffleJson.networks["31337"].address,
      abi: truffleJson.abi,
      name: truffleJson.contractName,
      bytecode: truffleJson.bytecode,
      deployedBytecode: truffleJson.deployedBytecode
  }

}


export default [adminConfig]





