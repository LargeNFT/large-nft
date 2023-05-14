interface WalletService {
  wallet
  address:string
  provider:any
  initWallet() : Promise<void>
  connect() : Promise<void>
  getContract(name:string)
  getWallet() : Promise<any>
  getAddress() : Promise<string>
  truncateEthAddress(address) : string
  initProvider() : Promise<void>
}

export {
  WalletService
}

