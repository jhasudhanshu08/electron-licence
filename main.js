const { app, dialog, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const server = require("./server")
 
const isDev = process.env.NODE_ENV === 'development'
const key1 = "1234567";


const validateLicenseKey = (key) => {
    if(key == key1) {
        return "VALID"
    }
    else {
        return "ERROR"
    }
}
 
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: isDev,
    }
  })
 
  mainWindow.loadFile('index.html')
}


async function gateCreateWindowWithLicense(createWindow) { 
    const gateWindow = new BrowserWindow({
      resizable: false,
      frame: false,
      width: 420,
      height: 200,
      webPreferences: {
        preload: path.join(__dirname, 'gate.js'),
        devTools: isDev,
      },
    })
   
    gateWindow.loadFile('gate.html')
   
    if (isDev) {
      gateWindow.webContents.openDevTools({ mode: 'detach' })
    }

    ipcMain.on('GATE_SUBMIT', async (_event, { key }) => { 
        const code = await validateLicenseKey(key) 
 
            switch (code) {
                case 'VALID':
                // Close the license gate window
                gateWindow.close()

                // Create our main window
                createWindow()

                break
                case 'ERROR':

                    const choice = await dialog.showMessageBox(gateWindow, {
                        type: 'error',
                        title: 'Your license is invalid',
                        message: 'The license key you entered does not exist for this product. Would you like to buy a license?',
                        detail: `Error code: ${code ?? res.status}`,
                        buttons: [
                          'Continue evaluation',
                          'Try again',
                          'Buy a license',
                        ],
                      })
                // Exit the application
                // app.exit(1)

                break
            }
      }) 
   
    // TODO(ezekg) Create main window for valid licenses
  } 
 
// app.whenReady().then(() => createWindow());
app.whenReady().then(() => gateCreateWindowWithLicense(createWindow));
 
app.on('window-all-closed', () => app.quit())