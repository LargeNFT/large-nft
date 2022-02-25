let Baseballs = artifacts.require("Baseballs")
let BaseballWords = artifacts.require("BaseballWords")
let Words = artifacts.require("Words")
let TokenUri = artifacts.require("TokenUri")
let MockMLBCFull = artifacts.require("MockMLBCFull")


module.exports = async function (deployer, network) {

    // let mlbcAddress = "0x8c9b261faef3b3c2e64ab5e58e04615f8c788099";

    try {

        await deployer.deploy(MockMLBCFull, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")

        await deployer.deploy(Words)
        await deployer.deploy(Baseballs, MockMLBCFull.address)
        await deployer.deploy(TokenUri, Words.address)
        await deployer.deploy(BaseballWords, Words.address, Baseballs.address, TokenUri.address)
    } catch (e) {
        console.log(`Error in migration: ${e.message}`)
    }
}