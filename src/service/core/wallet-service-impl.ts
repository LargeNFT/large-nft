import { Contract, ethers } from "ethers"
import { inject, injectable } from "inversify"
import { WalletService } from "./wallet-service"


@injectable()
class WalletServiceImpl implements WalletService {

  public wallet: any
  public address: any
  // public ethersContracts:any = {}

  public ethersContracts:any = {}


  constructor(
    @inject("contracts") private contracts:Contract[],
    @inject("provider") private provider
  ) {}

  async initWallet() {

    console.log('Init wallet')

    let accounts = await this.provider.send("eth_accounts", [])

    if (accounts?.length > 0) {
      return this.connect()
    }
    
    console.log("Init wallet complete") 


  }


  async connect() {
    
    console.log("Connect wallet")

    await this.provider.send("eth_requestAccounts", []);
    
    this.wallet = await this.provider.getSigner()
    this.address = await this.getAddress()
    
    console.log("Wallet connected") 

  }



  async getAddress() {

    let accounts = await this.provider.send("eth_accounts", []);
      
      if (accounts?.length > 0) {
        return accounts[0]
      }

  }

  async getWallet() {
    return this.provider.getSigner()
  }

  getContract(name:string)  {

    //If it's cached and the same wallet just return it.
    if (this.ethersContracts[name] && this.ethersContracts[name].signer == this.wallet) return this.ethersContracts[name]

    //Initialize and return
    let c = this.contracts[name]
    this.ethersContracts[name] = new ethers.Contract(c.address, c.abi, this.wallet ? this.wallet : this.provider)

    // console.log(`Getting contract ${name}`)

    return this.ethersContracts[name]
  }



  truncateEthAddress(address) : string {
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

