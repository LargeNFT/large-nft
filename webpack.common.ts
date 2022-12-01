//@ts-nocheck
import path, { dirname } from 'path'
import webpack from 'webpack'
import fs from 'fs'


import { createRequire } from 'module'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'



export default () => {

  const fileLoader = {
    loader: 'file-loader',
    options: {
      name: '[folder]/[name].[ext]'
    }
  }
  
  let appConfig = {
    entry: './src/app.ts',
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
      extensionAlias: {
        ".js": [".js", ".ts"]
      },

      alias: {
        buffer: 'buffer',
        process: 'process/browser.js',
        fs: 'memfs'
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
        "dgram": require.resolve("dgram-browserify"),
        "child_process": false
      }
    },
    output: {
      filename: 'admin/[name].admin.js',
      library: "admin",
      path: path.resolve(__dirname, 'public'),
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
        process: 'process/browser.js',
      }),
  
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
  
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version)
      }),
  
      //Admin index page
      new HtmlWebpackPlugin({
        inject: false,
        title: 'Large',
        // favicon: 'src/html/favicon.ico',
        template: 'src/html/app.html',
        filename: 'app.html'
      }),
  
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
  
      new HTMLInlineCSSWebpackPlugin(),
  
  
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


  let indexConfig = {
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
          test: /\.(png|jpe?g|gif|svg|eot|mp4)$/,
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
        },
        {
          test: /\.iframe$/i,
          loader: "html-loader",
        }
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      alias: {
        buffer: 'buffer',
        process: 'process/browser.js',
        fs: 'memfs'
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
        "dgram": require.resolve("dgram-browserify"),
        "child_process": false
      }
    },
    output: {
      filename: 'index/[name].admin.js',
      library: "index",
      path: path.resolve(__dirname, 'public'),
    },

    plugins: [

      new webpack.ProvidePlugin({
        process: 'process/browser.js',
      }),
  
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
  
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version)
      }),
  
      //Admin index page
      new HtmlWebpackPlugin({
        inject: false,
        title: 'Large',
        // favicon: 'src/html/favicon.ico',
        template: 'src/html/index.html',
        filename: 'index.html'
      }),
  
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
  
      new HTMLInlineCSSWebpackPlugin(),
  
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

  return [appConfig, indexConfig]
  
}





