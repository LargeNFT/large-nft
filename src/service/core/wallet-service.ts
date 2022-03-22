interface WalletService {
  wallet
  initWallet() : Promise<void>
  getWallet() : Promise<any>
}

export {
  WalletService
}

