interface WalletService {
  wallet
  address:string
  initWallet() : Promise<void>
  getWallet() : Promise<any>
}

export {
  WalletService
}

