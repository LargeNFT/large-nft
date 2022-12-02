import { ReaderSettings } from "../dto/reader-settings.js"


interface ReaderSettingsRepository {
    get(): Promise<ReaderSettings>
    put(readerSettings:ReaderSettings) : Promise<void>
}

export {
    ReaderSettingsRepository
}
