import {  inject, injectable } from "inversify"

import { LibraryChannelRepository } from "../library-channel-repository.js"
import { Channel } from "../../dto/channel.js"


@injectable()
class LibraryChannelRepositoryNodeImpl implements LibraryChannelRepository {

    @inject("sequelize")
    private sequelize:Function

    async get(_id:string, options?:any): Promise<Channel> {
        return Channel.findByPk(_id, options)
    }

    async put(channel: Channel, options?:any): Promise<Channel> {

        await channel.save(options)
        return channel

    }

    async remove(channel: Channel, options?:any) : Promise<void> {
        await channel.destroy(options)
    }

    async listByValue(options?:any) : Promise<ChannelValue[]> {

        let s = await this.sequelize()
        
        let queryOptions = {
            type: s.QueryTypes.RAW,
            plain: false,
            mapToModel: false

        }


        const [queryResults, metadata] = await s.query(`
            SELECT
                c.*,
                IFNULL(tTotals.usdValue, '') AS totalUsdValue,
                IFNULL(tTotals.ethValue, '') AS totalEthValue,
                IFNULL(tYear.usdValue, '') AS yearTotalsUsdValue,
                IFNULL(tYear.ethValue, '') AS yearTotalsEthValue,
                IFNULL(tMonth.usdValue, '') AS monthTotalsUsdValue,
                IFNULL(tMonth.ethValue, '') AS monthTotalsEthValue,
                IFNULL(tDay.usdValue, '') AS dayTotalsUsdValue,
                IFNULL(tDay.ethValue, '') AS dayTotalsEthValue
            FROM channel c
                LEFT JOIN (
                    SELECT
                    _id,
                    JSON_EXTRACT(value, '$.usdValue') AS usdValue,
                    JSON_EXTRACT(value, '$.ethValue') AS ethValue
                    FROM channel, JSON_EACH(totals)
                    WHERE key = 'totals'
                ) tTotals ON c._id = tTotals._id
                LEFT JOIN (
                    SELECT
                    _id,
                    JSON_EXTRACT(value, '$.usdValue') AS usdValue,
                    JSON_EXTRACT(value, '$.ethValue') AS ethValue
                    FROM channel, JSON_EACH(totals)
                    WHERE key = 'yearTotals'
                ) tYear ON c._id = tYear._id
                LEFT JOIN (
                    SELECT
                    _id,
                    JSON_EXTRACT(value, '$.usdValue') AS usdValue,
                    JSON_EXTRACT(value, '$.ethValue') AS ethValue
                    FROM channel, JSON_EACH(totals)
                    WHERE key = 'monthTotals'
                ) tMonth ON c._id = tMonth._id
                LEFT JOIN (
                    SELECT
                    _id,
                    JSON_EXTRACT(value, '$.usdValue') AS usdValue,
                    JSON_EXTRACT(value, '$.ethValue') AS ethValue
                    FROM channel, JSON_EACH(totals)
                    WHERE key = 'dayTotals'
                ) tDay ON c._id = tDay._id
            GROUP BY c._id
            ORDER BY dayTotalsUsdValue, monthTotalsUsdValue, yearTotalsUsdValue, totalUsdValue
                
        `, Object.assign(queryOptions, options))


        for (let qr of queryResults) {
            qr.totals = JSON.parse(qr.totals)
            qr.latest = JSON.parse(qr.latest)
        }


        return queryResults
    }


}

interface ChannelValue extends Channel {
    totalUsdValue
    totalEthValue: '',
    yearTotalsUsdValue: '',
    yearTotalsEthValue: '',
    monthTotalsUsdValue: '',
    monthTotalsEthValue: '',
    dayTotalsUsdValue: '',
    dayTotalsEthValue: ''
}

export {
    LibraryChannelRepositoryNodeImpl, ChannelValue
}