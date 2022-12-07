//@ts-nocheck

import { Changeset } from "../../service/core/database-service.js"

let changesets:Changeset[] = [
    {
        id: '0',
        changeset: async (db) => {
            
            await db.createIndex({
                index: {
                    fields: ['dateCreated']
                }
            })
                    
        }
    },

    {
        id: '1',
        changeset: async (db) => {

            await db.put({
                _id: '_design/attribute_counts',
                views: {
                  attribute_counts: {
                    map: function (doc) { 

                        if (doc.attributeSelections?.length > 0) {
                            for (let as of doc.attributeSelections) {
                                emit ([doc.channelId, as.traitType, as.value])
                            }
                        }

                    }.toString(),
                    reduce: '_count'
                  }
                }
            })


        }
    },

    {
        id: '5',
        changeset: async (db) => {

            await db.put({
                _id: '_design/by_channel_token',
                views: {
                    by_channel_token: {
                        map: function (doc) { 
                            emit([doc.channelId, doc.tokenId])
                        }.toString(),
                    }
                }
            })

            await db.put({
                _id: '_design/by_channel_token_stats',
                views: {
                    by_channel_token_stats: {
                        map: function (doc) { 
                            emit(doc.channelId, doc.tokenId)
                        }.toString(),
                        reduce: "_stats"
                    }
                }
            })


        }
    },
    {
        id: '6',
        changeset: async (db) => {

            await db.createIndex({
                index: {
                    fields: ['animationId']
                }
            })

            await db.put({
                _id: '_design/by_image_id',
                views: {
                    by_image_id: {
                        map: function (doc) { 

                            if (doc.imageIds && doc.imageIds?.length > 0) {
                                for (let imageId of doc.imageIds) {
                                    emit(imageId)
                                }
                            }

                        }.toString(),
                    }
                }
            })

        }
    }

]


export {
    changesets
}