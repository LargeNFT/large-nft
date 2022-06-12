import { inject, injectable } from "inversify"
import { WalletService } from "../../src/service/core/wallet-service"


@injectable()
class HardhatWalletServiceImpl implements WalletService {

  public wallet: any
  public address

  constructor(
    @inject("provider") private provider
  ) {}

  async initWallet() {

    console.log('Init wallet')

    this.wallet = await this.provider.getSigner()
    console.log("Init wallet complete") 

  }

  async getWallet() {
    return this.provider.getSigner()
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

