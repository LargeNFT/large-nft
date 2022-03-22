import { inject, injectable } from "inversify"
import { WalletService } from "../../src/service/core/wallet-service"


@injectable()
class HardhatWalletServiceImpl implements WalletService {

  public wallet: any

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

}




export {
  HardhatWalletServiceImpl
}

