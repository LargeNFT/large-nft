import { SchemaService } from "./schema-service"

import { SiteSettings } from "../../dto/site-settings"
import { injectable } from "inversify"

@injectable()
class SiteSettingsService {

  public loadedWalletAddress: string
  public siteSettingsStore: any


  constructor(
    private schemaService: SchemaService
  ) { }


  async loadStoreForWallet(walletAddress: string) {

    if (walletAddress == this.loadedWalletAddress) return

    this.siteSettingsStore = await this.schemaService.getSiteSettingsStoreByWalletAddress(walletAddress)

    await this.siteSettingsStore.load()

    this.loadedWalletAddress = walletAddress

  }


  async put(walletAddress: string, settings: SiteSettings): Promise<SiteSettings> {

    await this.siteSettingsStore.put(walletAddress, settings)

    return settings

  }

  async get(walletAddress: string): Promise<SiteSettings> {
    return this.siteSettingsStore.get(walletAddress)
  }

  async delete(walletAddress: string): Promise<void> {
    await this.siteSettingsStore.del(walletAddress)
  }

  async close() {
    await this.siteSettingsStore.close()
  }





}


export {
  SiteSettingsService
}
