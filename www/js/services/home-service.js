class HomeService {

  async initialize(settings) {

    Template7.global = {
      settings: settings,
      ipfsGateway: `http://${settings.ipfsHost}:${settings.ipfsGatewayPort}/ipfs`
    }

    freedom = await Freedom({
      ipfsHost: settings.ipfsHost,
      ipfsPort: settings.ipfsApiPort,
      recordContractAddress: settings.recordContractAddress,
      recordContractTransactionHash: settings.recordContractTransactionHash
    });



  }


}
