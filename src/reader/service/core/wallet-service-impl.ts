import { Contract, ethers } from "ethers"
import { inject, injectable } from "inversify"
import { WalletService } from "./wallet-service.js"
import axios from "axios"


@injectable()
class WalletServiceImpl implements WalletService {

  public wallet: any
  public address: any
  public ethersContracts:any = {}

  public provider 
  

  constructor(
    @inject("contracts") private contracts:Function,
    @inject("provider") private getProvider:Function,
    @inject("framework7") private $f7,
    @inject("hostname") private hostname,
    @inject("baseURI") private baseURI
  ) {

  }

  async initProvider() {

    this.provider = this.getProvider()

    globalThis.ethereum?.on('accountsChanged', async (accounts) => {
          
      delete this.address

      if (accounts?.length > 0) {
        await this.initWallet()
      }

      this.$f7.views.main.router.refreshPage()

    })

    globalThis.ethereum?.on('networkChanged', async (networkId) => {
      this.ethersContracts = {}
      this.provider = this.getProvider()

      await this.initWallet()

    })


  }

  async initWallet() {

    console.log('Init wallet')

    delete this.address


    if (!this.provider) {
      await this.initProvider()
    }
    
    //@ts-ignore
    let accounts = await this.provider.send("eth_accounts", [])

    if (accounts?.length > 0) {
      // this.address = accounts[0]
      return this.connect()
    }
    
    console.log("Init wallet complete") 


  }


  async connect() {
    
    console.log("Connect wallet")

    await this.provider.send("eth_requestAccounts", []);

    this.wallet = await this.provider.getSigner()
    this.address = await this.getAddress()
    
    console.log(`Wallet ${this.address} connected`) 

  }

  async getAddress() {

      if (!this.provider) return

      let accounts = await this.provider.send("eth_accounts", []);

      if (accounts?.length > 0) {
        return ethers.utils.getAddress(accounts[0]) 
      }

  }

  async getWallet() {
    return this.provider.getSigner()
  }

  async getContract(name:string)  {

    let contracts = await this.contracts()

    // //If it's cached and the same wallet just return it.
    // if (this.ethersContracts[name] && this.ethersContracts[name].signer == this.wallet) return this.ethersContracts[name]

    //Initialize and return
    let c = contracts[name]
    this.ethersContracts[name] = new ethers.Contract(c.address, c.abi, this.wallet ? this.wallet : this.provider)

    // console.log(`Getting contract ${name}`)

    return this.ethersContracts[name]
  }


  truncateEthAddress(address) : string {
    if (!address) return
    // Captures 0x + 4 characters, then the last 4 characters.
    const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    const match = address.match(truncateRegex)
    if (!match) return address
    return `${match[1]}…${match[2]}`
  }


}





export {
    WalletServiceImpl
}

