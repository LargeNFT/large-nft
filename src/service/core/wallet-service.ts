interface WalletService {
  wallet
  address:string
  initWallet() : Promise<void>
  getContract(name:string)
  getWallet() : Promise<any>
  truncateEthAddress(address) : string
}

export {
  WalletService
}

