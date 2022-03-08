
import { SiteSettings } from "../../dto/site-settings"
import { injectable } from "inversify"

@injectable()
class SiteSettingsService {

  public loadedWalletAddress: string
  public siteSettingsStore: any


  constructor(
  ) { }


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


}


export {
  SiteSettingsService
}
