interface WalletService {
  wallet
  address:string
  initWallet() : Promise<void>
  getWallet() : Promise<any>
  truncateEthAddress(address) : string
}

export {
  WalletService
}

