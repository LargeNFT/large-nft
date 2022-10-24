interface WalletService {
  wallet
  address:string
  initWallet() : Promise<void>
  getContract(name:string)
  getWallet() : Promise<any>
  getAddress() : Promise<string>
  truncateEthAddress(address) : string
}

export {
  WalletService
}

