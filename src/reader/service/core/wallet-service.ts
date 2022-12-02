interface WalletService {
  wallet
  address:string
  provider
  initWallet() : Promise<void>
  getWallet() : Promise<any>
  getContract(name:string)
  truncateEthAddress(address) : string
  connect() : Promise<void>
  initProvider() : Promise<void>
}

export {
  WalletService
}

