const { app, BrowserWindow } = require('electron')
const IPFS = require('ipfs')


let ipfs 


let mainWindow


const stopIpfs = async () => {
  if (ipfs) {
    await ipfs.stop()
    ipfs = null
  }
}



// Handle shutdown gracefully
const shutdown = () => {
  console.log("Closing...")
  mainWindow = null
  stopIpfs()
  setTimeout(() => {
    console.log("All done!\n")
    app.exit(0)
    process.exit(0)
  }, 1000)
}







app.on('window-all-closed', shutdown)

app.on('will-quit', (e) => {
  e.preventDefault()
  shutdown()
})

process.on('SIGINT', () => shutdown())
process.on('SIGTERM', () => shutdown())


app.on('ready', async () => {

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  let node = await IPFS.create({
    EXPERIMENTAL: {
        pubsub:true
    },
    relay: {
      enabled: true, // enable circuit relay dialer and listener
      hop: {
        enabled: true // enable circuit relay HOP (make this node a relay)
      }
    },
    config: {
      Addresses: {
        Swarm: [
          "/ip4/0.0.0.0/tcp/4002",
          "/ip4/127.0.0.1/tcp/4003/ws",
          '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'

        ],
        API: '/ip4/127.0.0.1/tcp/5002',
        Gateway: '/ip4/127.0.0.1/tcp/9090'
      }
    }
  })

  //Start the API gateway
  // const Gateway = require('ipfs/src/http')
  // const gateway = new Gateway(node)
  // await gateway.start()



  //@ts-ignore
  let id = await node.id()

  //@ts-ignore
  global.ipfsHost = id.addresses


  // and load the index.html of the app.
  await mainWindow.loadFile('www/index.html')

})
