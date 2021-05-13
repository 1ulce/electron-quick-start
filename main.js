// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog, Notification, globalShortcut} = require('electron')
const path = require('path')
const is_mac = process.platform==='darwin'

if(is_mac) {     // macOSの時のみこの設定を反映する
  app.dock.hide()          // Dockを非表示にする
}

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,    // ウィンドウの背景を透過
    frame: false,     // 枠の無いウィンドウ
    resizable: false,  // ウィンドウのリサイズを禁止
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: false
    }
  })
  mainWindow.setAlwaysOnTop(true, "screen-saver")
  mainWindow.setVisibleOnAllWorkspaces(true)
  mainWindow.setIgnoreMouseEvents(true)

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(() => {
  createWindow()
  console.log(dialog.showMessageBox({ 
    message: "こんにちは",
    type: "none"
  }))
  
  showNotification()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()

    }
  })
})

app.on('ready', function() {
  globalShortcut.register('CommandOrControl+Alt+K', function() {
    dialog.showMessageBox({
      type: 'info',
      message: 'Success!',
      detail: 'You pressed the registered global shortcut keybinding.',
      buttons: ['OK']
    })
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
