import { merge } from 'webpack-merge'
import path from 'path'
import common from './webpack.common'


let mainConfig = merge(common, {
    //@ts-ignore
    mode: 'development',
    devtool: 'source-map',
    devServer: {

        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: false,
        port: 8081,
    }
})


export default [mainConfig]
