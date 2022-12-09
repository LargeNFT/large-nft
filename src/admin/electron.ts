const { app, BrowserWindow } = require('electron')

// const { ipcMain } = require('electron')
// const path = require('path')
// const fs = require('fs')

let mainWindow

// Handle shutdown gracefully
const shutdown = () => {
  console.log("Closing...")
  mainWindow = null
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

  console.log('Ready')

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.maximize()

  console.log('Main window created')

  // and load the index.html of the app.
  await mainWindow.loadFile('../../public/admin/app.html')

})

