import { ethers } from "ethers"
import { inject, injectable } from "inversify"
import { WalletService } from "../../src/admin/service/core/wallet-service.js"


@injectable()
class HardhatWalletServiceImpl implements WalletService {

  public ethersContracts:any = {}

  public wallet: any
  public address

  constructor(
    @inject("provider") private provider,
    @inject("contracts") private contracts
  ) {}

  async initWallet() {

    console.log('Init wallet')

    this.wallet = await this.provider.getSigner()
    console.log("Init wallet complete") 

  }

  async getWallet() {
    return this.provider.getSigner()
  }


  async getAddress() {

    let accounts = await this.provider.send("eth_accounts", []);
      
      if (accounts?.length > 0) {
        return accounts[0]
      }

  }


  async connect() {
    
    console.log("Connect wallet")

    await this.provider.send("eth_requestAccounts", [])
    
    this.wallet = await this.provider.getSigner()
    this.address = await this.getAddress()
    
    console.log(`Wallet ${this.address} connected`) 

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
  HardhatWalletServiceImpl
}

