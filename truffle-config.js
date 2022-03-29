require("ts-node").register({
  files: true,
})


module.exports = {

  plugins: ["truffle-contract-size"],

  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    }
  },

  compilers: {
    solc: {
      version: "0.8.13",
      settings: {
        optimizer: {
          enabled: true,
          runs: 100000
        },
      }
    }
  },

  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: "USD",
      coinmarketcap: "299f57b4-456e-432a-b59c-7124e4ddd5ed"
    },

    enableTimeouts: false,
    before_timeout: 120000000 // Here is 2min but can be whatever timeout is suitable for you.
  }

  
}
