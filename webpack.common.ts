//@ts-nocheck
import path, { dirname, resolve } from 'path'
import webpack from 'webpack'
import fs from 'fs'


import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

let configs = []


import packageConfig from './package.json' assert { type: "json" }
const VERSION = JSON.stringify(packageConfig.version)


export default () => {

  let adminConfigs = getAdminConfigs()
  let readerConfigs = getReaderConfigs()

  return [
    ...adminConfigs,
    ...readerConfigs
  ]
  
}


let getAdminConfigs = () => {

  const fileLoader = {
    loader: 'file-loader',
    options: {
      name: 'admin/[folder]/[name].[ext]'
    }
  }

  //Build config for the main admin application.
  let appConfig = {
    entry: './src/admin/app.ts',
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
      filename: `admin/app/js/[name]-${VERSION.replace('"', '').replace('"', '')}.admin.js`,
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
        dry: false,
        dangerouslyAllowCleanPatternsOutsideProject: true,
        cleanOnceBeforeBuildPatterns: [
          resolve('public/admin/app/js/**')
        ],

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
        template: 'src/admin/html/app.html',
        filename: 'index.html',
        base64Version: Buffer.from(JSON.stringify(require("./package.json").version)).toString('base64')
      }),
  
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
  
      new HTMLInlineCSSWebpackPlugin(),
  
  
      {
        apply: (compiler) => {
  
          compiler.hooks.environment.tap('BuildContractsPlugin', (params) => {
            
            let contractJSON = {}
  
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

  return [appConfig]
}

let getReaderConfigs = () => {


  const fileLoader = {
    loader: 'file-loader',
    options: {
      name: 'reader/[folder]/[name].[ext]'
    }
  }

  let generateConfig = {
    entry: "./src/reader/generate.ts",
    externalsPresets: { node: true },
    externals: {
      'convert-svg-to-png': 'convert-svg-to-png',
      'sharp': 'sharp'
    },
    experiments: {
      outputModule: true
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      extensionAlias: {
        ".js": [".js", ".ts"]
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: '/node_modules/',
          loader: 'ts-loader'
        },
        {
          test: /\.ejs?$/,
          type: 'asset/source'
        }
      ]
    },  
    output: {
      filename: 'generate/index.js',
      libraryTarget: "module",
      library: {
        type: "module"
      },
      chunkFormat: 'module',
      path: path.resolve(__dirname, 'public'),
    },
    plugins: [
      // new CleanWebpackPlugin({
      //   dangerouslyAllowCleanPatternsOutsideProject: true
      // })
    ]
  }

  let syncConfig = {
    entry: "./src/sync/sync.ts",
    externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore', 'sharp'],
    externalsPresets: { 
      node: true 
    },    
    experiments: {
      outputModule: true
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      extensionAlias: {
        ".js": [".js", ".ts"]
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: '/node_modules/',
          loader: 'ts-loader'
        }
      ]
    },  
    output: {
      filename: 'sync/index.js',
      libraryTarget: "module",
      library: {
        type: "module"
      },
      chunkFormat: 'module',
      path: path.resolve(__dirname, 'public'),
    },
    plugins: [
      // new CleanWebpackPlugin({
      //   dangerouslyAllowCleanPatternsOutsideProject: true
      // }),

      new webpack.ProvidePlugin({
        fetch: ['node-fetch', 'default'],
      })

    ]
  }

  let startConfig = {
    entry: "./src/reader/start.ts",
    externals: ['fastify', '@fastify/static', 'sharp'],
    externalsPresets: { 
      node: true 
    },    
    experiments: {
      outputModule: true
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      extensionAlias: {
        ".js": [".js", ".ts"]
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: '/node_modules/',
          loader: 'ts-loader'
        }
      ]
    },  
    output: {
      filename: 'start.js',
      libraryTarget: "module",
      library: {
        type: "module"
      },
      chunkFormat: 'module',
      path: path.resolve(__dirname, 'public'),
    },
    plugins: [
      // new CleanWebpackPlugin({
      //   dangerouslyAllowCleanPatternsOutsideProject: true
      // }),

      new webpack.ProvidePlugin({
        fetch: ['node-fetch', 'default'],
      })

    ]
  }

  let syncPushConfig = {
    entry: "./src/sync/sync-push.ts",
    externalsPresets: { 
      node: true 
    },    
    experiments: {
      outputModule: true
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      extensionAlias: {
        ".js": [".js", ".ts"]
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: '/node_modules/',
          loader: 'ts-loader'
        }
      ]
    },  
    output: {
      filename: 'sync/sync-push.js',
      libraryTarget: "module",
      library: {
        type: "module"
      },
      chunkFormat: 'module',
      path: path.resolve(__dirname, 'public'),
    },
    plugins: [
      // new CleanWebpackPlugin({
      //   dangerouslyAllowCleanPatternsOutsideProject: true
      // }),

      new webpack.ProvidePlugin({
        fetch: ['node-fetch', 'default'],
      })

    ]
  }



  let browserConfig = {
    entry: "./src/reader/index.ts",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: '/node_modules/',
          loader: 'ts-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot)$/,
          use: [fileLoader]
        },
        {
          test: /\.(ttf|woff|woff2)$/,
          use: [fileLoader]
        },
        {
          test: /\.f7.html$/,
          use: ['framework7-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
      extensionAlias: {
        ".js": [".js", ".ts"]
      },
      alias: {
        buffer: 'buffer',
        process: 'process/browser.js'
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
    plugins: [

      new CleanWebpackPlugin({
        dry: false,
        dangerouslyAllowCleanPatternsOutsideProject: true,
        cleanOnceBeforeBuildPatterns: [
          resolve('public/reader/browser/js/**')
        ],

      }),
  
  
      new webpack.ProvidePlugin({
        process: 'process/browser.js',
      }),
  
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
  
      // new webpack.ProvidePlugin({
      //   fetch: ['node-fetch', 'default'],
      // }),
  
      new webpack.DefinePlugin({
        VERSION: VERSION
      }),
  
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
  
      new HTMLInlineCSSWebpackPlugin()
  
    ],
    output: {
      library: "reader",
      filename: `reader/browser/js/[name]-${VERSION.replace('"', '').replace('"', '')}.reader.js`,
      path: path.resolve(__dirname, 'public')
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
          },

        }
      }
    },

  }

  let swFilename = `reader/browser/sw-${VERSION.replace('"', '').replace('"', '')}.js`
  
  let serviceWorkerConfig = {
    entry: './src/reader/sw.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: '/node_modules/',
          loader: 'ts-loader',
        }
      ],
    },
    output: {
      filename: swFilename,
      path: path.resolve(__dirname, 'public')
    },
    plugins: [
  
      new CleanWebpackPlugin({
        dry: false,
        dangerouslyAllowCleanPatternsOutsideProject: true,
        cleanOnceBeforeBuildPatterns: [
          resolve('public/reader/browser/sw*')
        ],

      }),

      new webpack.DefinePlugin({
        VERSION: VERSION
      })
    ]
  }
  
  configs.push(serviceWorkerConfig)
  configs.push(browserConfig)
  configs.push(generateConfig)
  configs.push(syncConfig)
  configs.push(startConfig)
  configs.push(syncPushConfig)

  return configs


}
