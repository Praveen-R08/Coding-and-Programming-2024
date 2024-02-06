const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDeveloper = false;

const createWindow = () => {
   const window = new BrowserWindow({
      width: 1600,
      height: 900,
      minWidth: 800,
      minHeight: 450,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
      }
   });
   window.setMenuBarVisibility(false);
   if (isDeveloper) window.webContents.openDevTools();
   window.loadFile(path.join(__dirname, './src/html/partners.html'));
}

app.whenReady().then(() => {
   createWindow();
   app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
   });
});

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') app.quit();
});