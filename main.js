const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');
// Data disimpan di folder "DataFenace" di samping file .exe agar benar-benar portable
try {
  const base = process.env.PORTABLE_EXECUTABLE_DIR || path.dirname(process.execPath);
  const dir = path.join(base, 'DataFenace');
  require('fs').mkdirSync(dir, { recursive: true });
  app.setPath('userData', dir);
} catch (e) {}
if (!app.requestSingleInstanceLock()) app.quit();
function buat() {
  const w = new BrowserWindow({
    width: 1280, height: 800, minWidth: 900, minHeight: 600, show: false,
    backgroundColor: '#03120d', icon: path.join(__dirname, 'build', 'icon.png'),
    title: 'Fenace Madrasah',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, preload: path.join(__dirname, 'preload.js') }
  });
  Menu.setApplicationMenu(null);
  w.maximize(); w.once('ready-to-show', () => w.show());
  w.loadFile(path.join(__dirname, 'src', 'index.html'));
  w.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  w.webContents.on('will-navigate', (e, u) => { if (!u.startsWith('file:')) e.preventDefault(); });
  w.webContents.on('before-input-event', (e, i) => { if (i.key === 'F11' && i.type === 'keyDown') w.setFullScreen(!w.isFullScreen()); });
}
// Perbaikan bug Electron/Windows: setelah alert()/confirm() kolom ketik tidak bisa diketik.
// Jendela dibuat kehilangan lalu mendapat fokus lagi supaya input aktif kembali.
ipcMain.on('refocus', (e) => {
  const w = BrowserWindow.fromWebContents(e.sender);
  if (!w) return;
  setTimeout(() => { try { w.blur(); w.focus(); w.webContents.focus(); } catch (x) {} }, 0);
});
app.whenReady().then(buat);
app.on('second-instance', () => { const w = BrowserWindow.getAllWindows()[0]; if (w) { if (w.isMinimized()) w.restore(); w.focus(); } });
app.on('window-all-closed', () => app.quit());
