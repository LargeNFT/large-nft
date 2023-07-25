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
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const TerserPlugin = require("terser-webpack-plugin")


const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


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

  //Build config for the main admin application.
  let appConfig = {
    entry: './src/admin/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: '/node_modules/',
          loader: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
          type: 'asset/resource',
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
      filename: `large/admin/app/js/[name].admin.js`,
      library: "admin",
      path: path.resolve(__dirname, 'public')
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(), new TerserPlugin()
      ],
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
          resolve('public/large/admin/app/js/**')
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
        filename: 'large/index.html',
        base64Version: Buffer.from(JSON.stringify(require("./package.json").version)).toString('base64')
      }),
  
      new MiniCssExtractPlugin({
        filename: "large/admin/app/css/[name].css",
        chunkFilename: "large/admin/app/css/[id].css"
      }),
  

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

  let importCollectionConfig = {
    entry: "./src/admin/import.ts",
    target: "node",
    externalsPresets: { 
      node: true 
    },   
    externals: ['pouchdb-node', 'ipfs-http-client', 'jsdom', 'canvas'],
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
      filename: 'large/admin/import.js',
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

  let publishCollectionConfig = {
    entry: "./src/admin/publish.ts",
    target: "node",
    externalsPresets: { 
      node: true 
    },   
    externals: ['pouchdb-node', 'ipfs-http-client'],
    experiments: {
      outputModule: true
    },
    resolve: {
      extensions: ['.*', '.js', '.jsx', '.tsx', '.ts'],
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
      filename: 'large/admin/publish.js',
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


  function createContractFromTruffle(truffleJson)  {
  
    return {
        // address: truffleJson.networks["31337"].address,
        abi: truffleJson.abi,
        name: truffleJson.contractName,
        bytecode: truffleJson.bytecode,
        deployedBytecode: truffleJson.deployedBytecode
    }
  
  }

  return [appConfig, importCollectionConfig, publishCollectionConfig]
}

let getReaderConfigs = () => {

  let generateConfig = {
    entry: "./src/generate/index.ts",
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
      filename: 'large/generate/index.js',
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
    entry: "./src/sync/index.ts",
    externals: ['sequelize', 'sequelize-typescript', 'sharp' ],
    externalsPresets: { 
      node: true 
    },    
    experiments: {
      outputModule: true
    },
    resolve: {
      extensions: ['.*', '.js', '.jsx', '.tsx', '.ts'],
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
      filename: 'large/sync/index.js',
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

    externals: ['fastify', '@fastify/static', 'sequelize', 'sequelize-typescript', 'sharp'],
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
        },
        {
          test: /\.ejs?$/,
          type: 'asset/source'
        }
      ]
    },  
    output: {
      filename: 'large/start.js',
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

  let syncLibraryConfig = {
    entry: "./src/sync-library/index.ts",
    externals: ['sequelize', 'sequelize-typescript'],
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
        },
        {
          test: /\.ejs?$/,
          type: 'asset/source'
        }
      ]
    },  
    output: {
      filename: 'large/sync/sync-library.js',
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


  let optimization = {

    minimizer: [
      new CssMinimizerPlugin(), new TerserPlugin()
    ],

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
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
          type: 'asset/resource',
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
          resolve('public/large/reader/browser/js/**')
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
        filename: "large/reader/browser/css/[name].css",
        chunkFilename: "large/reader/browser/css/[id].css"
      }),
  

      // new BundleAnalyzerPlugin()

  
    ],
    output: {
      library: "reader",
      filename: `large/reader/browser/js/[name].reader.js`,
      path: path.resolve(__dirname, 'public')
    },
    optimization: optimization,

  }

  let swFilename = `large/reader/browser/sw-${VERSION.replace('"', '').replace('"', '')}.js`
  
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
          resolve('public/large/reader/browser/sw*')
        ],

      }),

      new webpack.DefinePlugin({
        VERSION: VERSION
      })
    ],

    optimization: {
      minimizer: [new TerserPlugin()],
    }
  }
  
  let libraryConfig = {
    entry: "./src/library/index.ts",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: '/node_modules/',
          loader: 'ts-loader'
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
          type: 'asset/resource',
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
          resolve('public/large/library/browser/js/**')
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
        filename: "large/library/browser/css/[name].css",
        chunkFilename: "large/library/browser/css/[id].css"
      }),
  
  
    ],
    output: {
      library: "library",
      filename: `large/library/browser/js/[name].library.js`,
      path: path.resolve(__dirname, 'public')
    },
    optimization: optimization,

  }

  let librarySwFilename = `sw-library-${VERSION.replace('"', '').replace('"', '')}.js`

  let libraryServiceWorkerConfig = {
    entry: './src/library/sw.ts',
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
      filename: librarySwFilename,
      path: path.resolve(__dirname, 'public')
    },
    plugins: [
  
      new CleanWebpackPlugin({
        dry: false,
        dangerouslyAllowCleanPatternsOutsideProject: true,
        cleanOnceBeforeBuildPatterns: [
          resolve('public/sw-library*')
        ],

      }),

      new webpack.DefinePlugin({
        VERSION: VERSION
      })
    ],

    optimization: {
      minimizer: [new TerserPlugin()],
    }
  }
  

  configs.push(libraryConfig)
  configs.push(serviceWorkerConfig)
  configs.push(browserConfig)
  configs.push(generateConfig)
  configs.push(syncConfig)
  configs.push(startConfig)
  configs.push(syncLibraryConfig)
  configs.push(libraryServiceWorkerConfig)


  return configs


}
