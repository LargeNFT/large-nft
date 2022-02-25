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
        test:/.*$/,
        include: [
          path.resolve(__dirname, "src/html/ipfs")
        ],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[folder]/[name]'
          }
        }],
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
    filename: 'large.js',
    library: "large",
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

    //Index page for website
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

          let contracts = []

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
      address: truffleJson.networks["31337"].address,
      abi: truffleJson.abi,
      name: truffleJson.contractName,
      bytecode: truffleJson.bytecode,
      deployedBytecode: truffleJson.deployedBytecode
  }

}


export default mainConfig 





