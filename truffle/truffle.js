// module.exports = {
//   // See <http://truffleframework.com/docs/advanced/configuration>
//   // to customize your Truffle configuration!
// };
const { readFileSync } = require('fs')

require('dotenv').config()

const HDWalletProvider = require('truffle-hdwallet-provider')
const LoomTruffleProvider = require('loom-truffle-provider')

const chainId    = 'default'
const writeUrl   = 'http://127.0.0.1:46658/rpc'
const readUrl    = 'http://127.0.0.1:46658/query'
const privateKey = readFileSync('./priv_key', 'utf-8')

const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)



module.exports = {
  networks: {
    // development: {
    //   host: "localhost",
    //   port: 7545,
    //   network_id: "*", // Match any network id
    //   gas: 6109322
    // },
    // ropsten: {
    //   provider: () => new HDWalletProvider(
    //       process.env.MNEMONIC,
    //       process.env.ROPSTEN_URL),
    //   network_id: 3
    // },
    loom_dapp_chain: {
      provider: loomTruffleProvider,
      network_id: '*'
    }
  }
}