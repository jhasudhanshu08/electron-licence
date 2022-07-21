const { app, dialog, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const server = require("./server");

var licenceCreate = async () => {
  let res = {
    status: false,
    data: null,
  };
  try {
    let data = JSON.parse(fs.readFileSync("./licence.json", "utf-8"));
    // console.log("+++++++++++++", JSON.parse(data.key.value))
    // console.log("readfile11111", JSON.parse(data.key));
    res.data = data.key;
    res.status = true;
    return res;
  } catch {
    (err) => {
      console.log(err);
      res.status = false;
      return res;
    };
    console.log("response", res);
  }
};

const testing = async () => {
  if (fs.existsSync("./licence.txt")) {
    function createWindow() {
      const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          // devTools: isDev,
          nodeIntegration: true,
        },
      });
      mainWindow.webContents.openDevTools();

      mainWindow.loadFile("index.html");
    }

    app.whenReady().then(() => createWindow());
  } else {
    // const key1 = fs.readFile('licence.txt', 'utf8', (err, data) => {
    //   return data;
    // })

    // const key1 = await licenceCreate();

    const validateLicenseKey = async (key, key1) => {
      console.log("key1 : ", key1);
      console.log("key : ", key);

      if (key1.status) {
        if (key == key1.data) {
          return "VALID";
        } else {
          return "ERROR";
        }
      } else {
        return "ERROR";
      }
    };

    function createWindow() {
      const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          // devTools: isDev,
          nodeIntegration: true,
        },
      });
      mainWindow.webContents.openDevTools();

      mainWindow.loadFile("index.html");
    }

    async function gateCreateWindowWithLicense(createWindow) {
      const gateWindow = new BrowserWindow({
        resizable: false,
        frame: false,
        width: 420,
        height: 200,
        webPreferences: {
          preload: path.join(__dirname, "gate.js"),
          // devTools: isDev,
          nodeIntegration: true,
        },
      });

      gateWindow.loadFile("gate.html");

      // setTimeout(waitTime, 5000);

      ipcMain.on("GATE_SUBMIT", async (_event, { key }) => {
        // const code = setTimeout( validateLicenseKey(key), 5000);
        const obj = JSON.stringify({
          key: key,
          status: true
        })

        fs.writeFileSync("licence.json", obj, (err) => {
          if (err) {
            console.log("error");
          }
        });
        console.log("gate key", key);
        const key1 = await licenceCreate();

        const code = await validateLicenseKey(key, key1);
        console.log("code ", code);

        switch (code) {
          case "VALID":
            // Close the license gate window
            gateWindow.close();

            // Create our main window
            createWindow();

            // fs.writeFileSync("licence.txt", "sudhanshu", (err) => {
            //   if (err) {
            //     console.log("error");
            //   }
            // });

            break;
          case "ERROR":
            const choice = await dialog.showMessageBox(gateWindow, {
              type: "error",
              title: "Your license is invalid",
              message:
                "The license key you entered does not exist for this product. Would you like to buy a license?",
              detail: `Error code: ${code ?? res.status}`,
              buttons: ["Continue evaluation", "Try again", "Buy a license"],
            });
            // Exit the application
            // app.exit(1)

            break;
        }
      });

      // TODO(ezekg) Create main window for valid licenses
    }
    app.whenReady().then(() => gateCreateWindowWithLicense(createWindow));
  }
};

// app.whenReady().then(() => createWindow());

testing();

app.on("window-all-closed", () => app.quit());
