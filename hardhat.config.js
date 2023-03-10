
// require("@nomiclabs/hardhat-etherscan");

// import "@nomiclabs/hardhat-etherscan"

const { API_URL, PRIVATE_KEY } = process.env
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
   
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100000
      }
    },
  }

}
