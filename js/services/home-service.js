class HomeService {

  constructor(settingsService) {
    this.settingsService = settingsService
  }

  async initialize() {

    const settings = this.settingsService.getSettings()
    if (!settings) {
      throw 'No settings found'
    }

    Template7.global = {
      settings: settings,
      ipfsGateway: `http://${settings.ipfsHost}:${settings.ipfsGatewayPort}/ipfs`
    }

    global.freedom = await Freedom({
      ipfsHost: settings.ipfsHost,
      ipfsPort: settings.ipfsApiPort,
      recordContractAddress: settings.recordContractAddress,
      recordContractTransactionHash: settings.recordContractTransactionHash
    });

  }
}



module.exports = HomeService

